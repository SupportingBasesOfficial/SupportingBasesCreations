import { describe, it, expect, vi, beforeEach } from "vitest";

type MockResponse = {
  json: () => Promise<Record<string, unknown>>;
  status: number;
  ok: boolean;
};

const mockAuthGetUser = vi.fn();
const mockFrom = vi.fn();

vi.mock("../../../lib/supabase-server", () => ({
  createServerSupabaseClient: () => ({
    auth: { getUser: mockAuthGetUser },
    from: mockFrom,
  }),
}));

vi.mock("next/server", () => ({
  NextRequest: class {
    json: () => Promise<unknown>;
    constructor() {
      this.json = async () => ({});
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

import { GET, POST } from "./route";

type RouteHandler = (req?: unknown) => Promise<MockResponse>;
const asHandler = (fn: unknown) => fn as RouteHandler;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/projects", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuthGetUser.mockResolvedValue({ data: { user: null } });

    const res = await asHandler(GET)();
    expect(res.status).toBe(401);
  });

  it("returns projects for authenticated user", async () => {
    mockAuthGetUser.mockResolvedValue({
      data: { user: { id: "user-1" } },
    });
    mockFrom.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [{ id: "p1", name: "Test" }],
            error: null,
          }),
        }),
      }),
    });

    const res = await asHandler(GET)();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.projects).toBeInstanceOf(Array);
  });
});

describe("POST /api/projects", () => {
  it("returns 401 when not authenticated", async () => {
    mockAuthGetUser.mockResolvedValue({ data: { user: null } });

    const res = await asHandler(POST)({ json: async () => ({}) });
    expect(res.status).toBe(401);
  });

  it("returns 400 when name is missing", async () => {
    mockAuthGetUser.mockResolvedValue({
      data: { user: { id: "user-1" } },
    });

    const res = await asHandler(POST)({ json: async () => ({}) });
    expect(res.status).toBe(400);
  });
});
