import { describe, it, expect, vi, beforeEach } from "vitest";

type MockResponse = {
  json: () => Promise<Record<string, unknown>>;
  status: number;
  ok: boolean;
};

// Mock @sbc/core to avoid loading real cloud adapters
const mockIncr = vi.fn().mockResolvedValue(1);
const mockSet = vi.fn();
const mockGet = vi.fn();

vi.mock("@sbc/core", () => ({
  CloudDeployPipeline: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockResolvedValue({ success: true, vercelUrl: "https://test.vercel.app" }),
  })),
  GenerationEngine: vi.fn().mockImplementation(() => ({
    generate: vi.fn().mockResolvedValue({
      success: true,
      artifacts: [{ path: "test.ts", content: "x", language: "typescript" }],
      errors: [],
    }),
  })),
  GeneratorRegistry: vi.fn().mockImplementation(() => ({
    register: vi.fn(),
  })),
  Project: vi.fn(),
  Entity: vi.fn(),
  Field: vi.fn(),
  UpstashRedisKV: vi.fn().mockImplementation(() => ({
    incr: mockIncr,
    set: mockSet,
    get: mockGet,
  })),
}));

// Mock next/server
vi.mock("next/server", () => ({
  NextRequest: class MockNextRequest extends Request {
    constructor(url: string, init?: RequestInit) {
      super(url, init);
    }
  },
  NextResponse: {
    json: vi.fn((data: unknown, init?: { status?: number }) => {
      const status = init?.status ?? 200;
      return {
        json: async () => data as Record<string, unknown>,
        status,
        ok: status < 400,
      };
    }),
  },
}));

import { POST } from "./route";

type RouteHandler = (req?: unknown) => Promise<MockResponse | Response>;
const asHandler = (fn: unknown) => fn as RouteHandler;

const originalEnv = { ...process.env };

beforeEach(() => {
  vi.clearAllMocks();
  process.env = { ...originalEnv };
  process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
});

describe("POST /api/deploy", () => {
  it("returns 400 when required fields are missing", async () => {
    const req = new Request("http://localhost/api/deploy", {
      method: "POST",
      body: JSON.stringify({ projectName: "test" }),
    });

    const res = (await asHandler(POST)(req)) as MockResponse;
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("Missing required fields");
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockIncr.mockResolvedValueOnce(10);

    const req = new Request("http://localhost/api/deploy", {
      method: "POST",
      headers: { "x-forwarded-for": "1.2.3.4" },
      body: JSON.stringify({
        projectName: "test-project",
        config: {
          github: { token: "gh", owner: "me" },
          vercel: { token: "vk" },
          supabase: { token: "sk", organizationId: "org" },
        },
        graph: { nodes: [], edges: [] },
      }),
    });

    const res = (await asHandler(POST)(req)) as MockResponse;
    const data = await res.json();

    expect(res.status).toBe(429);
    expect(data.error).toContain("Rate limit exceeded");
  });

  it("returns a streaming response for valid deploy request", async () => {
    const req = new Request("http://localhost/api/deploy", {
      method: "POST",
      headers: { "x-forwarded-for": "1.2.3.4" },
      body: JSON.stringify({
        projectName: "test-project",
        config: {
          github: { token: "gh", owner: "me" },
          vercel: { token: "vk" },
          supabase: { token: "sk", organizationId: "org" },
        },
        graph: {
          nodes: [
            {
              type: "entity",
              name: "User",
              fields: [{ name: "email", type: "string" }],
              features: [],
            },
          ],
          edges: [],
        },
      }),
    });

    const res = (await asHandler(POST)(req)) as Response;

    expect(res).toBeInstanceOf(Response);
    expect(res.headers.get("Content-Type")).toBe("text/event-stream");
  });
});
