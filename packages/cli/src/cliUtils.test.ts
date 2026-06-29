import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import {
  autoFixProjectName,
  findConfigFile,
  computeDiff,
  writeAuditLog,
  loadConfigFile,
  runPreflightChecks,
  ensureGitignoreEnv,
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

describe("findConfigFile", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "sbc-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("finds sbc.config.json", async () => {
    writeFileSync(join(tmpDir, "sbc.config.json"), "{}");
    const found = await findConfigFile(tmpDir);
    expect(found).toBe(join(tmpDir, "sbc.config.json"));
  });

  it("finds .sbcrc", async () => {
    writeFileSync(join(tmpDir, ".sbcrc"), "{}");
    const found = await findConfigFile(tmpDir);
    expect(found).toBe(join(tmpDir, ".sbcrc"));
  });

  it("returns undefined when no config exists", async () => {
    const found = await findConfigFile(tmpDir);
    expect(found).toBeUndefined();
  });
});

describe("computeDiff", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "sbc-diff-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("marks new files as added", async () => {
    const diffs = await computeDiff(tmpDir, [{ path: "new.ts", content: "x" }]);
    expect(diffs).toEqual([{ path: "new.ts", status: "added" }]);
  });

  it("marks unchanged files", async () => {
    writeFileSync(join(tmpDir, "same.ts"), "same");
    const diffs = await computeDiff(tmpDir, [
      { path: "same.ts", content: "same" },
    ]);
    expect(diffs).toEqual([{ path: "same.ts", status: "unchanged" }]);
  });

  it("marks modified files", async () => {
    writeFileSync(join(tmpDir, "mod.ts"), "old");
    const diffs = await computeDiff(tmpDir, [
      { path: "mod.ts", content: "new" },
    ]);
    expect(diffs).toEqual([{ path: "mod.ts", status: "modified" }]);
  });
});

describe("writeAuditLog", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "sbc-audit-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("writes a JSON line to .sbc/audit.log", async () => {
    await writeAuditLog(tmpDir, { projectName: "test" });
    const content = readFileSync(join(tmpDir, ".sbc", "audit.log"), "utf-8");
    const entry = JSON.parse(content.trim());
    expect(entry.projectName).toBe("test");
    expect(entry.timestamp).toBeDefined();
  });
});

describe("loadConfigFile", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "sbc-cfg-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("loads and parses JSON config", async () => {
    writeFileSync(join(tmpDir, "test.json"), '{"name":"my-app"}');
    const cfg = await loadConfigFile(join(tmpDir, "test.json"));
    expect(cfg.name).toBe("my-app");
  });

  it("throws when file not found", async () => {
    await expect(loadConfigFile(join(tmpDir, "missing.json"))).rejects.toThrow(
      "not found",
    );
  });
});

describe("runPreflightChecks", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "sbc-pf-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("allows empty directory without force", async () => {
    await expect(runPreflightChecks(tmpDir, false)).resolves.not.toThrow();
  });

  it("throws on non-empty directory without force", async () => {
    writeFileSync(join(tmpDir, "file.txt"), "x");
    await expect(runPreflightChecks(tmpDir, false)).rejects.toThrow(
      "already exists",
    );
  });

  it("allows non-empty directory with force", async () => {
    writeFileSync(join(tmpDir, "file.txt"), "x");
    await expect(runPreflightChecks(tmpDir, true)).resolves.not.toThrow();
  });

  it("throws on protected directory", async () => {
    await expect(runPreflightChecks("/", false)).rejects.toThrow("protected");
  });
});

describe("ensureGitignoreEnv", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "sbc-git-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("creates .gitignore with .env pattern", async () => {
    const added = await ensureGitignoreEnv(tmpDir);
    expect(added).toBe(true);
    const content = readFileSync(join(tmpDir, ".gitignore"), "utf-8");
    expect(content).toContain(".env*");
  });

  it("returns false when .env already ignored", async () => {
    writeFileSync(join(tmpDir, ".gitignore"), ".env*\n");
    const added = await ensureGitignoreEnv(tmpDir);
    expect(added).toBe(false);
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
