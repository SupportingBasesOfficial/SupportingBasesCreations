import { describe, it, expect } from "vitest";
import {
  GitHubApi,
  VercelApi,
  SupabaseApi,
  OAuthPKCE,
  GITHUB_OAUTH,
  VERCEL_OAUTH,
  SUPABASE_OAUTH,
} from "./index.js";

describe("cloud package exports", () => {
  it("exports GitHubApi class", () => {
    expect(GitHubApi).toBeDefined();
    expect(typeof GitHubApi).toBe("function");
  });

  it("exports VercelApi class", () => {
    expect(VercelApi).toBeDefined();
    expect(typeof VercelApi).toBe("function");
  });

  it("exports SupabaseApi class", () => {
    expect(SupabaseApi).toBeDefined();
    expect(typeof SupabaseApi).toBe("function");
  });

  it("exports OAuthPKCE class", () => {
    expect(OAuthPKCE).toBeDefined();
    expect(typeof OAuthPKCE).toBe("function");
  });

  it("exports OAuth provider configs", () => {
    expect(GITHUB_OAUTH).toBeDefined();
    expect(VERCEL_OAUTH).toBeDefined();
    expect(SUPABASE_OAUTH).toBeDefined();
  });
});
