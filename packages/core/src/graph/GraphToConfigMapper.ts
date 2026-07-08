import {
  NodeType,
  type ArchitectureGraph,
  type GraphNode,
  type ProjectConfig,
} from "@sbc/shared";

function toCamelCase(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, ch) => ch.toUpperCase())
    .replace(/^[A-Z]/, (ch) => ch.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, "");
}

export class GraphToConfigMapper {
  private graph: ArchitectureGraph;
  private projectName: string;

  constructor(graph: ArchitectureGraph, projectName: string) {
    this.graph = graph;
    this.projectName = projectName;
  }

  map(): ProjectConfig {
    const databaseNodes = this.getNodesByType(NodeType.CLOUD_DATABASE);
    const frontendNodes = this.getNodesByType(NodeType.FRONTEND_COMPONENT);
    const apiNodes = this.getNodesByType(NodeType.API_ROUTE);
    const authNodes = this.getNodesByType(NodeType.AUTH_SERVICE);
    const cacheNodes = this.getNodesByType(NodeType.CACHE_LAYER);
    const queueNodes = this.getNodesByType(NodeType.QUEUE_SERVICE);
    const cdnNodes = this.getNodesByType(NodeType.CDN_EDGE);

    const entities = databaseNodes.map((node) => this.mapEntity(node));
    const services = apiNodes.map((node) =>
      this.mapService(node, this.graph.edges),
    );
    const providers = this.extractProviders(authNodes);
    const features = this.extractAllFeatures();
    const regions = this.extractRegions();
    const frontend = this.mapFrontend(frontendNodes, features);
    const infrastructure = this.mapInfrastructure(
      cacheNodes,
      queueNodes,
      cdnNodes,
      databaseNodes,
      regions,
    );

    return {
      name: this.projectName,
      description: this.graph.nodes[0]?.data.description ?? "",
      architecture: this.determineArchitecture(apiNodes),
      regions: regions.length > 0 ? regions : ["us-east-1"],
      entities,
      services,
      providers,
      frontend,
      infrastructure,
    };
  }

  private getNodesByType(type: NodeType): GraphNode[] {
    return this.graph.nodes.filter((n) => n.type === type);
  }

  private mapEntity(
    node: GraphNode,
  ): NonNullable<ProjectConfig["entities"]>[0] {
    return {
      name: toCamelCase(node.data.label),
      fields: (node.data.fields ?? []).map((f) => ({
        name: f.name,
        type: f.type,
        required: f.required ?? false,
        unique: f.unique ?? false,
        nullable: f.nullable ?? false,
      })),
      features: node.data.features ?? [],
      tableName: node.data.tableName ?? toCamelCase(node.data.label),
    };
  }

  private mapService(
    node: GraphNode,
    edges: ArchitectureGraph["edges"],
  ): NonNullable<ProjectConfig["services"]>[0] {
    const connectedEntities = edges
      .filter((e) => e.source === node.id)
      .map((e) => this.graph.nodes.find((n) => n.id === e.target))
      .filter((n) => n?.type === NodeType.CLOUD_DATABASE)
      .map((n) => toCamelCase(n!.data.label));

    return {
      name: toCamelCase(node.data.label),
      entities: connectedEntities,
      type: node.data.method ?? "SYNC",
    };
  }

  private extractProviders(authNodes: GraphNode[]): string[] {
    const providers: string[] = [];
    for (const node of authNodes) {
      if (node.data.provider) {
        providers.push(node.data.provider);
      }
    }
    return [...new Set(providers)];
  }

  private extractAllFeatures(): string[] {
    const features = new Set<string>();
    for (const node of this.graph.nodes) {
      if (node.data.features) {
        for (const f of node.data.features) {
          features.add(f);
        }
      }
    }
    return Array.from(features);
  }

  private extractRegions(): string[] {
    const regions = new Set<string>();
    for (const node of this.graph.nodes) {
      if (node.data.region) {
        regions.add(node.data.region);
      }
    }
    return Array.from(regions);
  }

  private mapFrontend(
    frontendNodes: GraphNode[],
    features: string[],
  ): ProjectConfig["frontend"] {
    const primary = frontendNodes[0];
    return {
      framework: primary?.data.framework ?? "NEXTJS",
      styling: primary?.data.styling ?? "TAILWIND",
      features,
      pages: frontendNodes
        .map((n) => n.data.route ?? toCamelCase(n.data.label))
        .filter(Boolean),
    };
  }

  private mapInfrastructure(
    cacheNodes: GraphNode[],
    queueNodes: GraphNode[],
    cdnNodes: GraphNode[],
    databaseNodes: GraphNode[],
    regions: string[],
  ): ProjectConfig["infrastructure"] {
    const hasCache = cacheNodes.length > 0;
    const hasQueue = queueNodes.length > 0;
    const hasCdn = cdnNodes.length > 0;
    const dbType = databaseNodes[0]?.data.provider ?? "POSTGRESQL";

    return {
      cloud: "VERCEL",
      database: dbType,
      cache: hasCache ? "REDIS" : "NONE",
      queue: hasQueue ? (queueNodes[0]?.data.provider ?? "RABBITMQ") : "NONE",
      cdn: hasCdn,
      regions: regions.length > 0 ? regions : ["us-east-1"],
    };
  }

  private determineArchitecture(apiNodes: GraphNode[]): string {
    if (apiNodes.length > 3) return "MICROSERVICES";
    if (apiNodes.length > 1) return "MODULAR_MONOLITH";
    return "MODULAR_MONOLITH";
  }
}
