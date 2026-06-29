import { readFile, mkdir, writeFile, appendFile, readdir } from "fs/promises";
import { existsSync } from "fs";
import { resolve, join } from "path";
import https from "https";
import * as yaml from "js-yaml";
import { projectOptionsSchema } from "@sbc/core";
import { Project, Entity, Field } from "@sbc/core";

export const SUPPORTED_CONFIG_NAMES = [
  "sbc.config.json",
  "sbc.config.yaml",
  "sbc.config.yml",
  ".sbcrc",
];
export const CURRENT_SCHEMA_VERSION = "1.0";

export function autoFixProjectName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function findConfigFile(cwd: string): Promise<string | undefined> {
  for (const name of SUPPORTED_CONFIG_NAMES) {
    const candidate = join(cwd, name);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
}

export async function computeDiff(
  outputDir: string,
  artifacts: Array<{ path: string; content: string }>,
): Promise<
  Array<{ path: string; status: "added" | "modified" | "unchanged" }>
> {
  const diffs: Array<{
    path: string;
    status: "added" | "modified" | "unchanged";
  }> = [];
  for (const artifact of artifacts) {
    const existingPath = join(outputDir, artifact.path);
    if (!existsSync(existingPath)) {
      diffs.push({ path: artifact.path, status: "added" });
      continue;
    }
    const existing = await readFile(existingPath, "utf-8").catch(() => null);
    if (existing === artifact.content) {
      diffs.push({ path: artifact.path, status: "unchanged" });
    } else {
      diffs.push({ path: artifact.path, status: "modified" });
    }
  }
  return diffs;
}

export async function writeAuditLog(
  outputDir: string,
  entry: Record<string, unknown>,
): Promise<void> {
  try {
    const auditDir = join(outputDir, ".sbc");
    await mkdir(auditDir, { recursive: true });
    const line =
      JSON.stringify({ ...entry, timestamp: new Date().toISOString() }) + "\n";
    await appendFile(join(auditDir, "audit.log"), line, "utf-8");
  } catch {
    // ignore audit write errors
  }
}

export async function validateGeneratedTypeScript(
  outputDir: string,
): Promise<{ valid: boolean; errors: string[] }> {
  const { execFile } = await import("child_process");
  const { promisify } = await import("util");
  const execFileAsync = promisify(execFile);

  const tsFiles: string[] = [];
  async function collect(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await collect(p);
      else if (e.name.endsWith(".ts")) tsFiles.push(p);
    }
  }
  await collect(outputDir);

  if (tsFiles.length === 0) return { valid: true, errors: [] };

  try {
    await execFileAsync(
      "npx",
      ["tsc", "--noEmit", "--skipLibCheck", ...tsFiles],
      { cwd: outputDir },
    );
    return { valid: true, errors: [] };
  } catch (err: any) {
    const stderr = err.stderr ?? "";
    const lines = stderr
      .split("\n")
      .filter((l: string) => l.includes("error TS"));
    return { valid: false, errors: lines.slice(0, 5) };
  }
}

export async function loadConfigFile(
  configPath: string,
): Promise<Record<string, unknown>> {
  const absolutePath = resolve(configPath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Config file not found: ${absolutePath}`);
  }
  const content = await readFile(absolutePath, "utf-8");
  if (configPath.endsWith(".yaml") || configPath.endsWith(".yml")) {
    return yaml.load(content) as Record<string, unknown>;
  }
  return JSON.parse(content);
}

export function buildProjectFromConfig(raw: unknown): Project {
  const parsed = projectOptionsSchema.parse(raw);
  const entities = parsed.entities.map((e) => {
    const fields = e.fields.map(
      (f) => new Field(f.name, f.type as any, f.options as any),
    );
    return new Entity(e.name, fields, {
      description: e.options.description,
      tableName: e.options.tableName,
      features: e.options.features as any,
      audited: e.options.audited,
      softDelete: e.options.softDelete,
    });
  });

  return new Project((raw as any).name ?? "my-project", {
    description: parsed.description,
    architecture: parsed.architecture as any,
    regions: parsed.regions,
    entities,
    services: parsed.services as any,
    providers: parsed.providers as any,
    frontend: parsed.frontend as any,
    infrastructure: parsed.infrastructure as any,
    quality: parsed.quality as any,
    version: parsed.version,
    author: parsed.author,
    license: parsed.license,
  });
}

export async function runPreflightChecks(
  outputDir: string,
  force: boolean,
): Promise<void> {
  const protectedDirs = ["/", "/usr", "/usr/local", "/opt", "/var"].filter(
    Boolean,
  );
  const resolved = resolve(outputDir);

  for (const pd of protectedDirs) {
    if (
      resolved === resolve(pd) ||
      resolved.startsWith(resolve(pd) + "\\") ||
      resolved.startsWith(resolve(pd) + "/")
    ) {
      throw new Error(
        `Refusing to write to protected directory: ${outputDir}. Use a project-specific path.`,
      );
    }
  }

  // Block writing directly to HOME, but allow subdirectories
  const home = process.env.HOME ?? process.env.USERPROFILE ?? "";
  if (home) {
    const homeResolved = resolve(home);
    if (resolved === homeResolved) {
      throw new Error(
        `Refusing to write directly to home directory: ${outputDir}. Use a project-specific path.`,
      );
    }
  }

  if (existsSync(outputDir)) {
    const entries = await readdir(outputDir).catch(() => [] as string[]);
    if (entries.length > 0 && !force) {
      throw new Error(
        `Output directory already exists and is not empty: ${outputDir}. ` +
          `Pass --force to overwrite, or choose a different directory.`,
      );
    }

    const gitDir = join(outputDir, ".git");
    if (existsSync(gitDir)) {
      // This warning is caller responsibility via logger
    }
  }
}

export async function ensureGitignoreEnv(outputDir: string): Promise<boolean> {
  const gitignorePath = join(outputDir, ".gitignore");
  const envPattern = ".env*";
  try {
    const content = await readFile(gitignorePath, "utf-8");
    if (content.includes(envPattern)) return false;
    await appendFile(
      gitignorePath,
      `\n# SBC: protect secrets\n${envPattern}\n`,
      "utf-8",
    );
    return true;
  } catch {
    await writeFile(
      gitignorePath,
      `# SBC: protect secrets\n${envPattern}\n`,
      "utf-8",
    );
    return true;
  }
}

export const ERROR_GUIDE: Record<string, string> = {
  PROJECT_NAME_REQUIRED: "Provide a project name with -n <name>",
  PROJECT_NAME_INVALID:
    "Use kebab-case (e.g. my-app) or camelCase (e.g. myApp). No spaces or special characters.",
  PROJECT_NO_ENTITIES: "Add at least one entity to your project configuration.",
  PROJECT_MICROSERVICES_NO_SERVICES:
    "Microservices architecture requires at least one service definition.",
  PROJECT_NO_REGIONS:
    "Specify at least one deployment region in your configuration.",
  ENTITY_NAME_REQUIRED: "Every entity must have a non-empty name.",
  ENTITY_NAME_INVALID:
    "Entity names must be PascalCase (e.g. User, OrderItem).",
  ENTITY_NO_FIELDS: "Add at least one field to each entity.",
  ENTITY_DUPLICATE_FIELD: "Field names must be unique within an entity.",
  ENTITY_SOFT_DELETE_MISSING_FIELD:
    "Add a deletedAt field to enable soft delete.",
  FIELD_NAME_REQUIRED: "Every field must have a non-empty name.",
  FIELD_NAME_INVALID:
    "Field names must be valid identifiers (e.g. email, firstName).",
  ENUM_VALUES_REQUIRED: "Provide at least one value for enum fields.",
  TARGET_ENTITY_REQUIRED: "Relation fields must specify a target entity.",
  RELATION_TYPE_REQUIRED:
    "Relation fields must specify a relation type (ONE_TO_ONE, ONE_TO_MANY, etc).",
  GENERATOR_FAILED:
    "The generator encountered an error. Set SBC_GENERATOR_FAIL_FAST=0 to skip failing generators.",
  GENERATOR_TIMEOUT:
    "Generator exceeded the time limit. Increase SBC_GENERATOR_TIMEOUT_MS.",
  GENERATOR_DEGRADED:
    "Generator failed but was skipped. Set SBC_GENERATOR_FAIL_FAST=1 to abort instead.",
  GENERATOR_DISABLED: "Generator was disabled via environment variable.",
  MERGE_JSON_FALLBACK:
    "Could not merge JSON artifacts for the same path. Last artifact was used.",
  ARTIFACT_OVERWRITTEN:
    "Two generators produced the same file path. Review generator configuration.",
  ENGINE_FATAL: "Critical engine failure. Check logs and disk space.",
  PATH_TRAVERSAL_BLOCKED:
    "Output path contained unsafe segments. Use a relative path.",
  RATE_LIMIT_EXCEEDED: "Too many requests. Wait 60 seconds and try again.",
  CONFIG_FILE_NOT_FOUND:
    "Verify the config file path and that the file exists.",
  CONFIG_PARSE_ERROR:
    "The config file contains invalid JSON or unexpected structure.",
  VALIDATION_FAILED: "Fix the validation errors listed above and retry.",
  WRITE_FAILED:
    "Could not write to output directory. Check permissions and disk space.",
  HEALTH_CHECK_FAILED:
    "System is unhealthy. Check disk space, memory, and permissions.",
};

export function getErrorGuide(code: string): string | undefined {
  return (
    ERROR_GUIDE[code] ??
    ERROR_GUIDE[code.split("_").slice(0, -1).join("_") + "_FAILED"]
  );
}

export async function checkForUpdates(
  currentVersion: string,
): Promise<{ hasUpdate: boolean; latest?: string }> {
  const cacheKey = "SBC_UPDATE_CHECK";
  const cacheTtl = 24 * 60 * 60 * 1000; // 24 hours

  const cached = process.env[cacheKey];
  if (cached) {
    try {
      const { checkedAt, latest } = JSON.parse(cached);
      if (Date.now() - checkedAt < cacheTtl) {
        return { hasUpdate: latest !== currentVersion, latest };
      }
    } catch {
      // ignore cache parse errors
    }
  }

  try {
    const latest = await new Promise<string | undefined>((resolve, reject) => {
      const req = https.get(
        "https://registry.npmjs.org/@sbc/cli/latest",
        { timeout: 3000 },
        (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            try {
              const parsed = JSON.parse(data);
              resolve(parsed.version as string);
            } catch {
              resolve(undefined);
            }
          });
        },
      );
      req.on("error", reject);
      req.on("timeout", () => {
        req.destroy();
        reject(new Error("timeout"));
      });
    });

    if (latest) {
      process.env[cacheKey] = JSON.stringify({ checkedAt: Date.now(), latest });
      return { hasUpdate: latest !== currentVersion, latest };
    }
  } catch {
    // ignore network errors
  }

  return { hasUpdate: false };
}
