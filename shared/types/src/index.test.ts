import { describe, it, expect } from "vitest";
import type {
  UUID,
  Identifiable,
  Named,
  Described,
  Timestamped,
  Validatable,
  ValidationResult,
  ValidationError,
  Configurable,
  Generatable,
  GeneratedArtifact,
  DependencyAware,
  DeepPartial,
} from "./index.js";
import { NodeType } from "./graph.js";
import type {
  GraphNode,
  GraphEdge,
  ArchitectureGraph,
  GraphValidationResult,
  ProjectConfig,
  DeployResult,
  DeployStep,
  DeployProgress,
  CloudConfig,
  OAuthToken,
  PKCEChallenge,
  CloudMutation,
} from "./index.js";

// Type-only usage to exercise all exported types
const _validatable: Validatable<string> = {
  validate: () => ({ valid: true, errors: [], data: "ok" }),
};
const _configurable: Configurable = { toConfig: () => ({}) };
const _generatable: Generatable = { generate: async () => [] };
const _dependencyAware: DependencyAware = { dependencies: () => [] };
const _graphValidation: GraphValidationResult = { valid: true, errors: [] };

void _validatable;
void _configurable;
void _generatable;
void _dependencyAware;
void _graphValidation;

describe("shared types — type exports", () => {
  it("UUID is string alias", () => {
    const id: UUID = "abc-123";
    expect(id).toBe("abc-123");
  });

  it("Identifiable has id", () => {
    const obj: Identifiable = { id: "123" };
    expect(obj.id).toBe("123");
  });

  it("Named has name", () => {
    const obj: Named = { name: "test" };
    expect(obj.name).toBe("test");
  });

  it("Described has optional description", () => {
    const obj: Described = {};
    expect(obj.description).toBeUndefined();
  });

  it("Timestamped has createdAt and updatedAt", () => {
    const now = new Date();
    const obj: Timestamped = { createdAt: now, updatedAt: now };
    expect(obj.createdAt).toBe(now);
  });

  it("ValidationResult has valid and errors", () => {
    const result: ValidationResult<string> = { valid: true, errors: [] };
    expect(result.valid).toBe(true);
  });

  it("ValidationError has path, message, code", () => {
    const err: ValidationError = { path: "name", message: "required", code: "REQUIRED" };
    expect(err.code).toBe("REQUIRED");
  });

  it("GeneratedArtifact has path, content, language", () => {
    const artifact: GeneratedArtifact = { path: "test.ts", content: "x", language: "typescript" };
    expect(artifact.path).toBe("test.ts");
  });

  it("DeepPartial makes all fields optional", () => {
    type Foo = { a: number; b: string };
    const partial: DeepPartial<Foo> = { a: 1 };
    expect(partial.a).toBe(1);
  });

  it("Validatable interface works", () => {
    const v: Validatable<string> = {
      validate: () => ({ valid: true, errors: [], data: "ok" }),
    };
    const result = v.validate();
    expect(result.valid).toBe(true);
    expect(result.data).toBe("ok");
  });

  it("Configurable interface works", () => {
    const c: Configurable = { toConfig: () => ({ key: "val" }) };
    expect(c.toConfig()).toEqual({ key: "val" });
  });

  it("Generatable interface works", async () => {
    const g: Generatable = { generate: async () => [{ path: "a.ts", content: "x", language: "typescript" }] };
    const artifacts = await g.generate();
    expect(artifacts).toHaveLength(1);
  });

  it("DependencyAware interface works", () => {
    const d: DependencyAware = { dependencies: () => ["a", "b"] };
    expect(d.dependencies()).toEqual(["a", "b"]);
  });
});

describe("shared types — graph exports", () => {
  it("NodeType enum has expected values", () => {
    expect(NodeType.FRONTEND_COMPONENT).toBe("FrontendComponent");
    expect(NodeType.API_ROUTE).toBe("ApiRoute");
    expect(NodeType.CLOUD_DATABASE).toBe("CloudDatabase");
    expect(NodeType.AUTH_SERVICE).toBe("AuthService");
    expect(NodeType.CACHE_LAYER).toBe("CacheLayer");
    expect(NodeType.QUEUE_SERVICE).toBe("QueueService");
    expect(NodeType.CDN_EDGE).toBe("CdnEdge");
    expect(NodeType.WEBHOOK_HANDLER).toBe("WebhookHandler");
  });

  it("GraphNode has required fields", () => {
    const node: GraphNode = {
      id: "n1",
      type: NodeType.API_ROUTE,
      position: { x: 0, y: 0 },
      data: { label: "Test" },
    };
    expect(node.id).toBe("n1");
  });

  it("GraphEdge has source and target", () => {
    const edge: GraphEdge = { id: "e1", source: "n1", target: "n2" };
    expect(edge.source).toBe("n1");
  });

  it("ArchitectureGraph has nodes and edges", () => {
    const graph: ArchitectureGraph = { nodes: [], edges: [] };
    expect(graph.nodes).toEqual([]);
  });

  it("ProjectConfig has name and optional fields", () => {
    const config: ProjectConfig = { name: "my-project" };
    expect(config.name).toBe("my-project");
  });

  it("GraphValidationResult has valid and errors", () => {
    const result: GraphValidationResult = {
      valid: false,
      errors: [{ code: "INVALID_EDGE", message: "Missing target", edgeId: "e1" }],
    };
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
  });
});

describe("shared types — cloud exports", () => {
  it("DeployResult has success boolean", () => {
    const result: DeployResult = { success: true };
    expect(result.success).toBe(true);
  });

  it("DeployStep has all expected values", () => {
    const steps: DeployStep[] = [
      "idle", "generating", "creating-repo", "pushing-files",
      "linking-vercel", "deploying-vercel", "provisioning-supabase",
      "configuring-env", "complete", "failed",
    ];
    expect(steps).toHaveLength(10);
  });

  it("DeployProgress has step, message, percentage", () => {
    const progress: DeployProgress = { step: "generating", message: "test", percentage: 10 };
    expect(progress.percentage).toBe(10);
  });

  it("CloudConfig has github, vercel, supabase", () => {
    const config: CloudConfig = {
      github: { token: "gh", owner: "me" },
      vercel: { token: "vk" },
      supabase: { token: "sk", organizationId: "org" },
    };
    expect(config.github.owner).toBe("me");
  });

  it("OAuthToken has accessToken and provider", () => {
    const token: OAuthToken = {
      accessToken: "abc",
      expiresAt: Date.now(),
      provider: "github",
    };
    expect(token.provider).toBe("github");
  });

  it("PKCEChallenge has codeVerifier and codeChallenge", () => {
    const challenge: PKCEChallenge = {
      codeVerifier: "v",
      codeChallenge: "c",
      method: "S256",
    };
    expect(challenge.method).toBe("S256");
  });

  it("CloudMutation has projectId, nodeId, action", () => {
    const mutation: CloudMutation = {
      projectId: "p1",
      nodeId: "n1",
      action: "CREATE",
      payload: {},
      timestamp: Date.now(),
    };
    expect(mutation.action).toBe("CREATE");
  });
});
