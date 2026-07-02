import { describe, it, expect } from "vitest";
import {
  autoFixProjectName,
  computeDiff,
  validateGeneratedTypeScript,
  getErrorGuide,
  CURRENT_SCHEMA_VERSION,
} from "./cliUtils.js";

describe("autoFixProjectName", () => {
  it("converts spaces to hyphens", () => {
    expect(autoFixProjectName("my project")).toBe("my-project");
  });
  it("removes special characters", () => {
    expect(autoFixProjectName("My@Project!!!")).toBe("my-project");
  });
  it("trims leading/trailing hyphens", () => {
    expect(autoFixProjectName("---project---")).toBe("project");
  });
  it("lowercases", () => {
    expect(autoFixProjectName("MyProject")).toBe("myproject");
  });
});

describe("computeDiff", () => {
  const mockStorage = {
    upload: async () => {},
    uploadMany: async () => {},
    download: async (path: string) => {
      if (path.endsWith("same.ts")) return "same";
      if (path.endsWith("mod.ts")) return "old";
      return null;
    },
    delete: async () => {},
    deleteMany: async () => {},
    list: async () => [],
    exists: async () => false,
  };

  it("marks new files as added", async () => {
    const diffs = await computeDiff("prefix", [{ path: "new.ts", content: "x" }], mockStorage as any);
    expect(diffs).toEqual([{ path: "new.ts", status: "added" }]);
  });

  it("marks unchanged files", async () => {
    const diffs = await computeDiff("prefix", [{ path: "same.ts", content: "same" }], mockStorage as any);
    expect(diffs).toEqual([{ path: "same.ts", status: "unchanged" }]);
  });

  it("marks modified files", async () => {
    const diffs = await computeDiff("prefix", [{ path: "mod.ts", content: "new" }], mockStorage as any);
    expect(diffs).toEqual([{ path: "mod.ts", status: "modified" }]);
  });

  it("marks all as added when no storage provided", async () => {
    const diffs = await computeDiff("prefix", [{ path: "new.ts", content: "x" }]);
    expect(diffs).toEqual([{ path: "new.ts", status: "added" }]);
  });
});

describe("validateGeneratedTypeScript", () => {
  it("returns valid for no TS files", async () => {
    const result = await validateGeneratedTypeScript([{ path: "readme.md", content: "# Hello" }]);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("processes TS files without crashing", async () => {
    try {
      await import("typescript");
    } catch {
      return;
    }
    const result = await validateGeneratedTypeScript([
      { path: "test.ts", content: "const x: number = 1;" },
    ]);
    expect(result.errors).toBeDefined();
    expect(Array.isArray(result.errors)).toBe(true);
  });
});

describe("getErrorGuide", () => {
  it("returns guide for exact match", () => {
    expect(getErrorGuide("PROJECT_NAME_REQUIRED")).toContain("project name");
  });

  it("returns generic guide for unknown code", () => {
    expect(getErrorGuide("GENERATOR_TIMEOUT")).toContain("time limit");
  });

  it("returns undefined for unmapped code", () => {
    expect(getErrorGuide("UNKNOWN_CODE")).toBeUndefined();
  });
});

describe("CURRENT_SCHEMA_VERSION", () => {
  it("is defined", () => {
    expect(CURRENT_SCHEMA_VERSION).toBe("1.0");
  });
});
