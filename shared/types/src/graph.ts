export enum NodeType {
  FRONTEND_COMPONENT = "FrontendComponent",
  API_ROUTE = "ApiRoute",
  CLOUD_DATABASE = "CloudDatabase",
  AUTH_SERVICE = "AuthService",
  CACHE_LAYER = "CacheLayer",
  QUEUE_SERVICE = "QueueService",
  CDN_EDGE = "CdnEdge",
  WEBHOOK_HANDLER = "WebhookHandler",
}

export interface GraphNodeMetadata {
  label: string;
  description?: string;
  fields?: Array<{
    name: string;
    type: string;
    required?: boolean;
    unique?: boolean;
    nullable?: boolean;
  }>;
  features?: string[];
  provider?: string;
  region?: string;
  tableName?: string;
  route?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  framework?: string;
  styling?: string;
  [key: string]: unknown;
}

export interface GraphNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: GraphNodeMetadata;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface ArchitectureGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphValidationResult {
  valid: boolean;
  errors: GraphValidationError[];
}

export interface GraphValidationError {
  code: string;
  message: string;
  nodeId?: string;
  edgeId?: string;
}

export interface ProjectConfig {
  name: string;
  description?: string;
  architecture?: string;
  regions?: string[];
  entities?: Array<{
    name: string;
    fields: Array<{
      name: string;
      type: string;
      required?: boolean;
      unique?: boolean;
      nullable?: boolean;
    }>;
    features?: string[];
    tableName?: string;
  }>;
  services?: Array<{
    name: string;
    entities: string[];
    type: string;
  }>;
  providers?: string[];
  frontend?: {
    framework: string;
    styling: string;
    features: string[];
    pages?: string[];
  };
  infrastructure?: {
    cloud: string;
    database: string;
    cache: string;
    queue: string;
    cdn?: boolean;
    regions?: string[];
  };
}
