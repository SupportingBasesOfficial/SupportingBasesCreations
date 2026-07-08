import { describe, it, expect, vi, beforeEach } from "vitest";

type MockResponse = {
  json: () => Promise<Record<string, unknown>>;
  status: number;
  ok: boolean;
};

// Mock @upstash/redis before importing the route
const mockRedis = {
  set: vi.fn(),
  get: vi.fn(),
  del: vi.fn(),
  scan: vi.fn(),
};

vi.mock("@upstash/redis", () => ({
  Redis: vi.fn(() => mockRedis),
}));

// Mock supabase-server to bypass auth
vi.mock("../../../lib/supabase-server", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: "test-user-id", email: "test@test.com" } },
      }),
    },
  }),
}));

// Mock NextRequest/NextResponse
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

import { POST, GET, DELETE } from "./route";

type RouteHandler = (req?: unknown) => Promise<MockResponse>;
const asHandler = (fn: unknown) => fn as RouteHandler;

const originalEnv = { ...process.env };

beforeEach(() => {
  vi.clearAllMocks();
  process.env = { ...originalEnv };
  process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
});

describe("POST /api/plugins", () => {
  it("registers a plugin successfully", async () => {
    mockRedis.set.mockResolvedValue("OK");

    const req = new Request("http://localhost/api/plugins", {
      method: "POST",
      body: JSON.stringify({
        name: "my-plugin",
        version: "1.0.0",
        entry: "@sbc/my-plugin",
        config: { enabled: true },
      }),
    });

    const res = await asHandler(POST)(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect((data.plugin as Record<string, unknown>).name).toBe("my-plugin");
    expect(mockRedis.set).toHaveBeenCalledWith(
      "plugin:my-plugin",
      expect.stringContaining("my-plugin"),
    );
  });

  it("returns 400 when name is missing", async () => {
    const req = new Request("http://localhost/api/plugins", {
      method: "POST",
      body: JSON.stringify({ entry: "@sbc/plugin" }),
    });

    const res = await asHandler(POST)(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toContain("name and entry are required");
  });

  it("returns 400 when entry is missing", async () => {
    const req = new Request("http://localhost/api/plugins", {
      method: "POST",
      body: JSON.stringify({ name: "test-plugin" }),
    });

    const res = await asHandler(POST)(req);
    expect(res.status).toBe(400);
  });

  it("returns 500 when Upstash is not configured", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;

    const req = new Request("http://localhost/api/plugins", {
      method: "POST",
      body: JSON.stringify({ name: "test", entry: "@sbc/test" }),
    });

    const res = await asHandler(POST)(req);
    expect(res.status).toBe(500);
  });
});

describe("GET /api/plugins", () => {
  it("lists registered plugins", async () => {
    mockRedis.scan.mockResolvedValue([0, ["plugin:foo", "plugin:bar"]]);
    mockRedis.get
      .mockResolvedValueOnce(JSON.stringify({ name: "foo", entry: "@sbc/foo" }))
      .mockResolvedValueOnce(
        JSON.stringify({ name: "bar", entry: "@sbc/bar" }),
      );

    const res = (await GET()) as MockResponse;
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.plugins).toHaveLength(2);
    expect((data.plugins as Array<Record<string, unknown>>)[0].name).toBe(
      "foo",
    );
  });

  it("returns empty list when no plugins", async () => {
    mockRedis.scan.mockResolvedValue([0, []]);

    const res = (await GET()) as MockResponse;
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.plugins).toEqual([]);
  });

  it("returns 500 when Upstash is not configured", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;

    const res = await GET();
    expect(res.status).toBe(500);
  });
});

describe("DELETE /api/plugins", () => {
  it("deletes a plugin by name", async () => {
    mockRedis.del.mockResolvedValue(1);

    const req = new Request("http://localhost/api/plugins?name=my-plugin", {
      method: "DELETE",
    });

    const res = await asHandler(DELETE)(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.deleted).toBe("my-plugin");
    expect(mockRedis.del).toHaveBeenCalledWith("plugin:my-plugin");
  });

  it("returns 400 when name query param is missing", async () => {
    const req = new Request("http://localhost/api/plugins", {
      method: "DELETE",
    });

    const res = await asHandler(DELETE)(req);
    expect(res.status).toBe(400);
  });

  it("returns 500 when Upstash is not configured", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;

    const req = new Request("http://localhost/api/plugins?name=test", {
      method: "DELETE",
    });

    const res = await asHandler(DELETE)(req);
    expect(res.status).toBe(500);
  });
});
