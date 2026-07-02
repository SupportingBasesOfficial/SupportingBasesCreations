import { describe, it, expect, vi, beforeEach } from "vitest";

type MockResponse = {
  json: () => Promise<Record<string, unknown>>;
  status: number;
  ok: boolean;
};

vi.mock("@sbc/core", () => ({
  UpstashRedisKV: vi.fn().mockImplementation(() => ({
    set: vi.fn().mockResolvedValue("OK"),
    get: vi.fn().mockResolvedValue("123"),
  })),
}));

vi.mock("next/server", () => ({
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

import { GET } from "./route";

const originalEnv = { ...process.env };

beforeEach(() => {
  vi.clearAllMocks();
  process.env = { ...originalEnv };
});

describe("GET /api/health", () => {
  it("returns healthy status with KV configured", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";

    const res = (await GET()) as MockResponse;
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe("healthy");
    expect(data.checks).toBeInstanceOf(Array);
  });

  it("returns degraded status without KV configured", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const res = (await GET()) as MockResponse;
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe("degraded");
  });

  it("includes memory and uptime checks", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;

    const res = (await GET()) as MockResponse;
    const data = await res.json();
    const checks = data.checks as Array<Record<string, unknown>>;

    const names = checks.map((c) => c.name);
    expect(names).toContain("memory");
    expect(names).toContain("uptime");
  });
});
