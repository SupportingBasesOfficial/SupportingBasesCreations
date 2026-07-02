import https from "https";
import { projectOptionsSchema } from "@sbc/core";
import { Project, Entity, Field } from "@sbc/core";

export const CURRENT_SCHEMA_VERSION = "1.0";

export function autoFixProjectName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function computeDiff(
  outputPrefix: string,
  artifacts: Array<{ path: string; content: string }>,
  storage?: import("@sbc/core").CloudStorage,
): Promise<
  Array<{ path: string; status: "added" | "modified" | "unchanged" }>
> {
  const diffs: Array<{
    path: string;
    status: "added" | "modified" | "unchanged";
  }> = [];
  for (const artifact of artifacts) {
    if (!storage) {
      diffs.push({ path: artifact.path, status: "added" });
      continue;
    }
    const cloudPath = `${outputPrefix}/${artifact.path}`;
    const existing = await storage.download(cloudPath).catch(() => null);
    if (existing === null) {
      diffs.push({ path: artifact.path, status: "added" });
    } else if (existing === artifact.content) {
      diffs.push({ path: artifact.path, status: "unchanged" });
    } else {
      diffs.push({ path: artifact.path, status: "modified" });
    }
  }
  return diffs;
}

export async function validateGeneratedTypeScript(
  artifacts: Array<{ path: string; content: string }>,
): Promise<{ valid: boolean; errors: string[] }> {
  const tsFiles = artifacts.filter((a) => a.path.endsWith(".ts") || a.path.endsWith(".tsx"));
  if (tsFiles.length === 0) return { valid: true, errors: [] };

  try {
    const ts = await import("typescript");

    const sourceFiles: Record<string, string> = {};
    for (const f of tsFiles) {
      sourceFiles[f.path] = f.content;
    }

    const compilerOptions = {
      noEmit: true,
      skipLibCheck: true,
      strict: false,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.React,
      lib: ["ES2022", "DOM", "DOM.Iterable"],
    };

    const host = ts.createCompilerHost(compilerOptions);
    const originalGetSourceFile = host.getSourceFile.bind(host);

    host.getSourceFile = (
      fileName: string,
      languageVersion: number,
      onError?: (msg: string) => void,
      shouldCreateNewSourceFile?: boolean,
    ) => {
      if (sourceFiles[fileName]) {
        return ts.createSourceFile(
          fileName,
          sourceFiles[fileName],
          languageVersion,
          true,
          fileName.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
        );
      }
      return originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
    };

    const program = ts.createProgram(
      Object.keys(sourceFiles),
      compilerOptions,
      host,
    );

    const diagnostics = ts.getPreEmitDiagnostics(program);
    const errors = diagnostics
      .filter((d: any) => d.category === ts.DiagnosticCategory.Error)
      .map((d: any) => {
        const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
        if (d.file && d.start !== undefined) {
          const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
          return `${d.file.fileName}:${line + 1}:${character + 1} - ${msg}`;
        }
        return msg;
      })
      .slice(0, 10);

    return { valid: errors.length === 0, errors };
  } catch {
    return { valid: true, errors: [] };
  }
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
  ENGINE_FATAL: "Critical engine failure. Check logs and retry.",
  PATH_TRAVERSAL_BLOCKED:
    "Output path contained unsafe segments. Use a relative path.",
  RATE_LIMIT_EXCEEDED: "Too many requests. Wait 60 seconds and try again.",
  CONFIG_PARSE_ERROR:
    "The config JSON contains invalid structure.",
  VALIDATION_FAILED: "Fix the validation errors listed above and retry.",
  WRITE_FAILED:
    "Could not write to cloud storage. Check BLOB_READ_WRITE_TOKEN.",
  HEALTH_CHECK_FAILED:
    "System is unhealthy. Check cloud KV connectivity.",
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
  const cacheTtl = 24 * 60 * 60 * 1000;

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
