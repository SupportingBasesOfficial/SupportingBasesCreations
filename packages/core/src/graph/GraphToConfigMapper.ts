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

function toPascalCase(input: string): string {
  const camel = toCamelCase(input);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

const FIELD_TYPE_MAP: Record<string, string> = {
  string: "STRING",
  text: "TEXT",
  uuid: "UUID",
  integer: "INTEGER",
  bigint: "BIGINT",
  float: "FLOAT",
  decimal: "DECIMAL",
  boolean: "BOOLEAN",
  timestamp: "TIMESTAMP",
  datetime: "DATETIME",
  date: "DATE",
  jsonb: "JSONB",
  json: "JSON",
  enum: "ENUM",
  array: "ARRAY",
  blob: "BLOB",
};

function normalizeFieldType(rawType: string): string {
  const normalized = FIELD_TYPE_MAP[rawType.toLowerCase()];
  if (normalized) return normalized;
  const upper = rawType.toUpperCase();
  if (
    upper in FIELD_TYPE_MAP ||
    Object.values(FIELD_TYPE_MAP).includes(upper)
  ) {
    return upper;
  }
  return "STRING";
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
    const webhookNodes = this.getNodesByType(NodeType.WEBHOOK_HANDLER);

    const hasAuth = authNodes.length > 0;
    const dbRelationships = this.extractDbRelationships(databaseNodes);

    const entities = databaseNodes.map((node) =>
      this.mapEntity(node, dbRelationships, hasAuth),
    );
    const services = apiNodes.map((node) =>
      this.mapService(node, this.graph.edges),
    );
    const webhookServices = webhookNodes.map((node) =>
      this.mapWebhookService(node),
    );
    const allServices = [...services, ...webhookServices];

    const providers = this.extractProviders(authNodes);
    const features = this.extractAllFeatures(hasAuth, webhookNodes.length > 0);
    const regions = this.extractRegions();
    const frontend = this.mapFrontend(
      frontendNodes,
      features,
      entities,
      hasAuth,
    );
    const infrastructure = this.mapInfrastructure(
      cacheNodes,
      queueNodes,
      cdnNodes,
      databaseNodes,
      regions,
    );

    const description = this.extractDescription();

    return {
      name: this.projectName,
      description,
      architecture: this.determineArchitecture(apiNodes),
      regions: regions.length > 0 ? regions : ["us-east-1"],
      entities,
      services: allServices,
      providers,
      frontend,
      infrastructure,
    };
  }

  private extractDescription(): string {
    const frontendNode = this.getNodesByType(NodeType.FRONTEND_COMPONENT)[0];
    if (frontendNode?.data.description) {
      return frontendNode.data.description;
    }
    const anyNode = this.graph.nodes.find((n) => n.data.description);
    return anyNode?.data.description ?? `Aplicação ${this.projectName}`;
  }

  private extractDbRelationships(
    databaseNodes: GraphNode[],
  ): Map<string, Array<{ target: string; type: string }>> {
    const relationships = new Map<
      string,
      Array<{ target: string; type: string }>
    >();
    const dbIds = new Set(databaseNodes.map((n) => n.id));

    for (const edge of this.graph.edges) {
      if (dbIds.has(edge.source) && dbIds.has(edge.target)) {
        const sourceNode = this.graph.nodes.find((n) => n.id === edge.source);
        const targetNode = this.graph.nodes.find((n) => n.id === edge.target);
        if (!sourceNode || !targetNode) continue;

        const sourceName = toPascalCase(sourceNode.data.label);
        const targetName = toPascalCase(targetNode.data.label);
        const relType = edge.label ?? "ONE_TO_MANY";

        const existing = relationships.get(sourceName) ?? [];
        existing.push({ target: targetName, type: relType });
        relationships.set(sourceName, existing);
      }
    }

    return relationships;
  }

  private getNodesByType(type: NodeType): GraphNode[] {
    return this.graph.nodes.filter((n) => n.type === type);
  }

  private mapEntity(
    node: GraphNode,
    relationships: Map<string, Array<{ target: string; type: string }>>,
    hasAuth: boolean,
  ): NonNullable<ProjectConfig["entities"]>[0] {
    const entityName = toPascalCase(node.data.label);
    const baseFields = (node.data.fields ?? []).map((f) => ({
      name: f.name,
      type: normalizeFieldType(f.type),
      required: f.required ?? false,
      unique: f.unique ?? false,
      nullable: f.nullable ?? false,
    }));

    const relFields = (relationships.get(entityName) ?? []).map((rel) => ({
      name: `${rel.target.toLowerCase()}Id`,
      type: "RELATION",
      required: false,
      unique: false,
      nullable: true,
    }));

    const features = [...(node.data.features ?? [])];
    if (hasAuth && !features.includes("AUTH")) {
      features.push("AUTH");
    }

    return {
      name: entityName,
      fields: [...baseFields, ...relFields],
      features,
      tableName: node.data.tableName ?? entityName.toLowerCase(),
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
      .map((n) => toPascalCase(n!.data.label));

    const connectedToQueue = edges
      .filter((e) => e.source === node.id)
      .some((e) => {
        const target = this.graph.nodes.find((n) => n.id === e.target);
        return target?.type === NodeType.QUEUE_SERVICE;
      });

    const serviceType = connectedToQueue ? "ASYNC" : "SYNC";

    return {
      name: toCamelCase(node.data.label),
      entities: connectedEntities,
      type: serviceType,
    };
  }

  private mapWebhookService(
    node: GraphNode,
  ): NonNullable<ProjectConfig["services"]>[0] {
    return {
      name: toCamelCase(node.data.label),
      entities: [],
      type: "EVENT_DRIVEN",
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

  private extractAllFeatures(hasAuth: boolean, hasWebhooks: boolean): string[] {
    const features = new Set<string>();
    for (const node of this.graph.nodes) {
      if (node.data.features) {
        for (const f of node.data.features) {
          features.add(f);
        }
      }
    }
    if (hasAuth) {
      features.add("AUTH");
    }
    if (hasWebhooks) {
      features.add("WEBHOOKS");
    }
    const hasCdn = this.getNodesByType(NodeType.CDN_EDGE).length > 0;
    if (hasCdn) {
      features.add("CDN");
    }
    const hasCache = this.getNodesByType(NodeType.CACHE_LAYER).length > 0;
    if (hasCache) {
      features.add("RATE_LIMITING");
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
    entities: { name: string; tableName?: string }[],
    hasAuth: boolean,
  ): ProjectConfig["frontend"] {
    const primary = frontendNodes[0];
    const pages = new Set<string>();

    // Always have a home page
    pages.add("/");

    // Auth pages
    if (hasAuth) {
      pages.add("/login");
      pages.add("/register");
    }

    // Entity list/detail pages
    for (const entity of entities) {
      const slug = toCamelCase(entity.name).toLowerCase();
      pages.add(`/${slug}`);
      pages.add(`/${slug}/new`);
    }

    // Dashboard page if there are entities
    if (entities.length > 0) {
      pages.add("/dashboard");
    }

    // Explicit routes from frontend nodes
    for (const n of frontendNodes) {
      const route = n.data.route;
      if (route && route.startsWith("/")) {
        pages.add(route);
      } else {
        const label = toCamelCase(n.data.label);
        pages.add(`/${label}`);
      }
    }

    return {
      framework: primary?.data.framework ?? "NEXTJS",
      styling: primary?.data.styling ?? "TAILWIND",
      features,
      pages: Array.from(pages),
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
      queue: hasQueue ? "RABBITMQ" : "NONE",
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
