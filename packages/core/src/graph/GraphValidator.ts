import {
  NodeType,
  type GraphNode,
  type ArchitectureGraph,
  type GraphValidationResult,
  type GraphValidationError,
} from "@sbc/shared";

const CONNECTION_RULES: Record<NodeType, NodeType[]> = {
  [NodeType.FRONTEND_COMPONENT]: [
    NodeType.API_ROUTE,
    NodeType.AUTH_SERVICE,
    NodeType.CDN_EDGE,
    NodeType.FRONTEND_COMPONENT,
  ],
  [NodeType.API_ROUTE]: [
    NodeType.CLOUD_DATABASE,
    NodeType.AUTH_SERVICE,
    NodeType.CACHE_LAYER,
    NodeType.QUEUE_SERVICE,
    NodeType.WEBHOOK_HANDLER,
    NodeType.API_ROUTE,
    NodeType.FRONTEND_COMPONENT,
  ],
  [NodeType.CLOUD_DATABASE]: [
    NodeType.API_ROUTE,
    NodeType.AUTH_SERVICE,
    NodeType.CACHE_LAYER,
  ],
  [NodeType.AUTH_SERVICE]: [
    NodeType.CLOUD_DATABASE,
    NodeType.CACHE_LAYER,
    NodeType.API_ROUTE,
  ],
  [NodeType.CACHE_LAYER]: [NodeType.CLOUD_DATABASE, NodeType.API_ROUTE],
  [NodeType.QUEUE_SERVICE]: [NodeType.WEBHOOK_HANDLER, NodeType.API_ROUTE],
  [NodeType.CDN_EDGE]: [NodeType.FRONTEND_COMPONENT, NodeType.API_ROUTE],
  [NodeType.WEBHOOK_HANDLER]: [NodeType.QUEUE_SERVICE, NodeType.API_ROUTE],
};

const BLOCKED_CONNECTIONS: Array<{
  from: NodeType;
  to: NodeType;
  reason: string;
}> = [
  {
    from: NodeType.FRONTEND_COMPONENT,
    to: NodeType.CLOUD_DATABASE,
    reason:
      "Security breach: Frontend cannot connect directly to Database without an API layer.",
  },
  {
    from: NodeType.FRONTEND_COMPONENT,
    to: NodeType.CACHE_LAYER,
    reason:
      "Security breach: Frontend cannot connect directly to Cache without an API layer.",
  },
  {
    from: NodeType.FRONTEND_COMPONENT,
    to: NodeType.QUEUE_SERVICE,
    reason:
      "Security breach: Frontend cannot connect directly to Queue without an API layer.",
  },
];

export class GraphValidator {
  private graph: ArchitectureGraph;

  constructor(graph: ArchitectureGraph) {
    this.graph = graph;
  }

  validate(): GraphValidationResult {
    const errors: GraphValidationError[] = [];

    const cycleErrors = this.detectCycles();
    errors.push(...cycleErrors);

    const connectionErrors = this.validateConnectionRules();
    errors.push(...connectionErrors);

    const orphanErrors = this.validateOrphanNodes();
    errors.push(...orphanErrors);

    const duplicateErrors = this.validateDuplicateIds();
    errors.push(...duplicateErrors);

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  validateEdge(
    source: NodeType,
    target: NodeType,
  ): GraphValidationError | null {
    const blocked = BLOCKED_CONNECTIONS.find(
      (r) => r.from === source && r.to === target,
    );
    if (blocked) {
      return {
        code: "BLOCKED_CONNECTION",
        message: blocked.reason,
      };
    }

    const allowed = CONNECTION_RULES[source] ?? [];
    if (!allowed.includes(target)) {
      return {
        code: "INVALID_CONNECTION",
        message: `Invalid connection: ${source} cannot connect to ${target}.`,
      };
    }

    return null;
  }

  private detectCycles(): GraphValidationError[] {
    const errors: GraphValidationError[] = [];
    const adjList = new Map<string, string[]>();

    for (const node of this.graph.nodes) {
      adjList.set(node.id, []);
    }

    for (const edge of this.graph.edges) {
      const neighbors = adjList.get(edge.source);
      if (neighbors) {
        neighbors.push(edge.target);
      }
    }

    const visited = new Map<string, number>();

    const dfs = (nodeId: string, path: string[]): boolean => {
      visited.set(nodeId, 1);

      const neighbors = adjList.get(nodeId) ?? [];
      for (const neighbor of neighbors) {
        const state = visited.get(neighbor) ?? 0;
        if (state === 1) {
          errors.push({
            code: "CYCLE_DETECTED",
            message: `Critical architecture failure: Infinite cycle detected from node ${nodeId} to ${neighbor}.`,
            nodeId: neighbor,
          });
          return true;
        }
        if (state === 0) {
          if (dfs(neighbor, [...path, neighbor])) {
            return true;
          }
        }
      }

      visited.set(nodeId, 2);
      return false;
    };

    for (const node of this.graph.nodes) {
      if ((visited.get(node.id) ?? 0) === 0) {
        dfs(node.id, [node.id]);
      }
    }

    return errors;
  }

  private validateConnectionRules(): GraphValidationError[] {
    const errors: GraphValidationError[] = [];
    const nodeMap = new Map<string, GraphNode>();

    for (const node of this.graph.nodes) {
      nodeMap.set(node.id, node);
    }

    for (const edge of this.graph.edges) {
      const sourceNode = nodeMap.get(edge.source);
      const targetNode = nodeMap.get(edge.target);

      if (!sourceNode) {
        errors.push({
          code: "MISSING_SOURCE_NODE",
          message: `Edge ${edge.id} references non-existent source node ${edge.source}.`,
          edgeId: edge.id,
        });
        continue;
      }

      if (!targetNode) {
        errors.push({
          code: "MISSING_TARGET_NODE",
          message: `Edge ${edge.id} references non-existent target node ${edge.target}.`,
          edgeId: edge.id,
        });
        continue;
      }

      const error = this.validateEdge(sourceNode.type, targetNode.type);
      if (error) {
        errors.push({
          ...error,
          edgeId: edge.id,
        });
      }
    }

    return errors;
  }

  private validateOrphanNodes(): GraphValidationError[] {
    const errors: GraphValidationError[] = [];
    const connectedNodes = new Set<string>();

    for (const edge of this.graph.edges) {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    }

    for (const node of this.graph.nodes) {
      if (!connectedNodes.has(node.id) && this.graph.nodes.length > 1) {
        errors.push({
          code: "ORPHAN_NODE",
          message: `Node "${node.data.label}" (${node.id}) is not connected to any other node.`,
          nodeId: node.id,
        });
      }
    }

    return errors;
  }

  private validateDuplicateIds(): GraphValidationError[] {
    const errors: GraphValidationError[] = [];
    const seen = new Set<string>();

    for (const node of this.graph.nodes) {
      if (seen.has(node.id)) {
        errors.push({
          code: "DUPLICATE_NODE_ID",
          message: `Duplicate node ID: ${node.id}.`,
          nodeId: node.id,
        });
      }
      seen.add(node.id);
    }

    return errors;
  }
}
