#!/usr/bin/env node

import { Command } from "commander";
import {
  Project,
  Entity,
  Field,
  GenerationEngine,
  GeneratorRegistry,
} from "@sbc/core";
import {
  FeatureFlag,
  ArchitectureType,
  RelationType,
  ProviderConfig,
} from "@sbc/core";
import {
  PathSanitizer,
  RateLimiter,
  TransactionalWriter,
  HealthChecker,
  LockFile,
  StructuredLogger,
} from "@sbc/core";
import type { CloudKV, CloudStorage } from "@sbc/core";
import { UpstashRedisKV, VercelBlobStorage } from "@sbc/core";
import { projectNameSchema, projectOptionsSchema } from "@sbc/core";
import {
  PrismaGenerator,
  TRPCGenerator,
  NextJSGenerator,
  DockerGenerator,
  EnvGenerator,
  VercelDeployGenerator,
  SupabaseSetupGenerator,
  CloudEnvGenerator,
  AuthGenerator,
  FeatureFlagGenerator,
  TestGenerator,
  PactGenerator,
  K6Generator,
  GitHubActionsGenerator,
  DocsGenerator,
  ObservabilityStackGenerator,
  EventDrivenGenerator,
  MultiTenancyGenerator,
  SecurityAuditGenerator,
  SecurityHardeningGenerator,
  EncryptionGenerator,
  SecurityChaosGenerator,
  ThreatIntelligenceGenerator,
  ConfidentialComputingGenerator,
  SIEMGenerator,
} from "@sbc/generators";
import {
  autoFixProjectName,
  computeDiff,
  validateGeneratedTypeScript,
  buildProjectFromConfig,
  getErrorGuide,
  CURRENT_SCHEMA_VERSION,
  checkForUpdates,
} from "./cliUtils.js";

const program = new Command();

let cloudKV: CloudKV | undefined;
let cloudStorage: CloudStorage | undefined;

function initCloudServices(): void {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    cloudKV = new UpstashRedisKV({ url: redisUrl, token: redisToken });
  }
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    cloudStorage = new VercelBlobStorage({ token: blobToken });
  }
}

initCloudServices();

const rateLimiter = new RateLimiter({ windowMs: 60_000, maxRequests: 10 }, cloudKV);
const health = new HealthChecker({ kv: cloudKV });
const logger = new StructuredLogger("cli");

let activeWriter: TransactionalWriter | undefined;

function registerShutdownHandlers(): void {
  const shutdown = async (signal: string) => {
    logger.error(`\nReceived ${signal}. Cleaning up...`);
    if (activeWriter) {
      await activeWriter.rollback();
    }
    process.exit(1);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

registerShutdownHandlers();

// Self-update check (non-blocking)
checkForUpdates("1.0.0").then((update) => {
  if (update.hasUpdate && update.latest) {
    logger.warn(
      `A new version is available: ${update.latest}. You are on 1.0.0. Run "npm i -g @sbc/cli" to update.`,
    );
  }
});

program
  .name("sbc")
  .description("SupportingBasesCreations - Enterprise Project Generator")
  .version("1.0.0");

function isGeneratorEnabled(name: string): boolean {
  const envKey = `SBC_DISABLE_${name.replace(/-/g, "_").toUpperCase()}`;
  return process.env[envKey] !== "1" && process.env[envKey] !== "true";
}

program
  .command("generate")
  .description("Generate a project from configuration")
  .option("-c, --config <json>", "Configuration JSON string (cloud mode)")
  .option("-o, --output <prefix>", "Output prefix for cloud storage", "generated")
  .option("-n, --name <name>", "Project name")
  .option("--dry-run", "Run without writing files")
  .action(
    async (options: {
      name?: string;
      output: string;
      config?: string;
      dryRun?: boolean;
    }) => {
      const clientKey = `cli-${process.env.SBC_CLIENT_ID ?? "default"}`;
      if (!(await rateLimiter.allow(clientKey))) {
        logger.error("Rate limit exceeded. Try again in a minute.");
        process.exit(1);
      }

      logger.info("SBC Enterprise Generator v1.0.0 (Cloud Mode)");
      logger.info("==============================================");

      // Health check
      const healthResult = await health.check();
      if (healthResult.status === "unhealthy") {
        logger.error("System health check failed:");
        healthResult.checks
          .filter((c) => c.status === "fail")
          .forEach((c) => {
            logger.error(`  [${c.name}] ${c.message}`);
          });
        process.exit(1);
      }

      let project: Project;

      if (options.config) {
        try {
          const rawConfig = JSON.parse(options.config) as Record<string, unknown>;
          const configVersion =
            (rawConfig as any).schemaVersion ??
            (rawConfig as any).version ??
            "1.0";
          if (configVersion !== CURRENT_SCHEMA_VERSION) {
            logger.warn(
              `Config schema version mismatch: ${configVersion} (expected ${CURRENT_SCHEMA_VERSION}).`,
            );
          }
          const merged = {
            ...rawConfig,
            ...(options.name ? { name: options.name } : {}),
          };
          project = buildProjectFromConfig(merged);
        } catch (err) {
          logger.error(
            `Failed to parse config: ${err instanceof Error ? err.message : String(err)}`,
          );
          process.exit(1);
        }
      } else {
        if (!options.name) {
          logger.error(
            "Project name is required. Use -n <name> or -c <json-config>.",
          );
          process.exit(1);
        }

        // Auto-fix project name
        let rawName = options.name;
        const nameValidation = projectNameSchema.safeParse(rawName);
        if (!nameValidation.success) {
          const fixed = autoFixProjectName(rawName);
          if (fixed && projectNameSchema.safeParse(fixed).success) {
            logger.warn(
              `Invalid project name "${rawName}". Auto-fixed to "${fixed}".`,
            );
            rawName = fixed;
          } else {
            logger.error(
              `Invalid project name: ${nameValidation.error.errors[0].message}`,
            );
            process.exit(1);
          }
        }

        project = new Project(rawName, {
          architecture: ArchitectureType.MODULAR_MONOLITH,
          providers: [
            ProviderConfig.oauthGoogle(),
            ProviderConfig.stripe(),
            ProviderConfig.sentry(),
          ],
          entities: [
            new Entity(
              "User",
              [
                Field.uuid("id").primary(),
                Field.string("email").unique().required(),
                Field.string("name").required(),
                Field.enum("role", ["ADMIN", "USER", "GUEST"]).default("USER"),
                Field.datetime("createdAt").required(),
                Field.datetime("updatedAt").required(),
              ],
              { features: [FeatureFlag.AUTH, FeatureFlag.AUDIT_LOG] },
            ),
            new Entity(
              "Organization",
              [
                Field.uuid("id").primary(),
                Field.string("name").required(),
                Field.json("settings").nullable(),
                Field.relation(
                  "owner",
                  "User",
                  RelationType.MANY_TO_ONE,
                ).required(),
                Field.datetime("createdAt").required(),
                Field.datetime("updatedAt").required(),
              ],
              { features: [FeatureFlag.MULTI_TENANT] },
            ),
          ],
        });
      }

      const validation = project.validate();
      if (!validation.valid) {
        logger.error("Validation failed:");
        validation.errors.forEach(
          (err: { path: string; message: string; code: string }) => {
            logger.error(`  [${err.code}] ${err.path}: ${err.message}`);
          },
        );
        process.exit(1);
      }

      // Sanitize output prefix for cloud storage
      let outputPrefix: string;
      try {
        outputPrefix = PathSanitizer.sanitize(options.output, "/");
      } catch (err) {
        logger.error(
          `Invalid output path: ${err instanceof Error ? err.message : String(err)}`,
        );
        process.exit(1);
      }

      logger.info(`Project: ${project.name}`);
      logger.info(`Architecture: ${project.options.architecture}`);
      logger.info(`Entities: ${project.options.entities.length}`);
      logger.info(`Services: ${project.options.services.length}`);
      logger.info(`Dependencies: ${project.dependencies().join(", ")}`);
      logger.info(`Output prefix: ${outputPrefix}`);
      logger.info(`Dry run: ${options.dryRun ?? false}`);
      logger.info(`Cloud storage: ${cloudStorage ? "enabled" : "disabled"}`);

      const registry = new GeneratorRegistry();

      // --- Base generators (always enabled) ---
      const baseGenerators = [
        new PrismaGenerator(),
        new TRPCGenerator(),
        new NextJSGenerator(),
        new DockerGenerator(),
        new EnvGenerator(),
        new VercelDeployGenerator(),
        new SupabaseSetupGenerator(),
        new CloudEnvGenerator(),
        new AuthGenerator(),
        new FeatureFlagGenerator(),
        new TestGenerator(),
        new PactGenerator(),
        new K6Generator(),
        new GitHubActionsGenerator(),
        new DocsGenerator(),
        new ObservabilityStackGenerator(),
        new EventDrivenGenerator(),
        new MultiTenancyGenerator(),
      ];

      // --- Security: Base tier (always on) ---
      const securityBaseGenerators = [
        new SecurityAuditGenerator(),
        new SecurityHardeningGenerator(),
      ];

      // --- Security: Pro tier (opt-in via SBC_SECURITY_TIER=pro or enterprise) ---
      const securityProGenerators = [
        new EncryptionGenerator(),
        new SIEMGenerator(),
      ];

      // --- Security: Enterprise tier (opt-in via SBC_SECURITY_TIER=enterprise) ---
      const securityEnterpriseGenerators = [
        new SecurityChaosGenerator(),
        new ThreatIntelligenceGenerator(),
        new ConfidentialComputingGenerator(),
      ];

      // Determine security tier
      const securityTier = process.env.SBC_SECURITY_TIER ?? "base";
      const isProTier = securityTier === "pro" || securityTier === "enterprise";
      const isEnterpriseTier = securityTier === "enterprise";

      const generators = [
        ...baseGenerators,
        ...securityBaseGenerators,
        ...(isProTier ? securityProGenerators : []),
        ...(isEnterpriseTier ? securityEnterpriseGenerators : []),
      ];

      // Log tier info
      logger.info(`Security tier: ${securityTier}`);
      if (!isProTier) {
        logger.info(`  [disabled] encryption, siem (set SBC_SECURITY_TIER=pro to enable)`);
      }
      if (!isEnterpriseTier) {
        logger.info(`  [disabled] security-chaos, threat-intel, confidential-computing (set SBC_SECURITY_TIER=enterprise to enable)`);
      }

      for (const gen of generators) {
        if (isGeneratorEnabled(gen.name)) {
          registry.register(gen);
        } else {
          logger.info(`  [disabled] ${gen.name}`);
        }
      }

      const engine = new GenerationEngine(registry, {
        timeoutMs: Number(process.env.SBC_GENERATOR_TIMEOUT_MS ?? 30000),
        maxRetries: Number(process.env.SBC_GENERATOR_MAX_RETRIES ?? 2),
        failFast: process.env.SBC_GENERATOR_FAIL_FAST === "1",
      });

      const lock = new LockFile(outputPrefix, cloudKV);
      try {
        await lock.acquire();
      } catch (lockErr) {
        logger.error(
          `\nLock failed: ${lockErr instanceof Error ? lockErr.message : String(lockErr)}`,
        );
        process.exit(1);
      }

      logger.info("Generating project...");
      let result;
      try {
        result = await engine.generate({
          project,
          outputDir: outputPrefix,
        });
        logger.info("Generation complete");
      } catch (fatalErr) {
        logger.error("Generation failed");
        throw fatalErr;
      } finally {
        await lock.release();
      }

      if (result.success) {
        if (options.dryRun) {
          const diffs = await computeDiff(outputPrefix, result.artifacts);
          const added = diffs.filter((d) => d.status === "added").length;
          const modified = diffs.filter((d) => d.status === "modified").length;
          const unchanged = diffs.filter(
            (d) => d.status === "unchanged",
          ).length;
          logger.info(
            `\nDry-run summary: ${added} added, ${modified} modified, ${unchanged} unchanged`,
          );
          if (added > 0 || modified > 0) {
            logger.info("Changes:");
            diffs
              .filter((d) => d.status !== "unchanged")
              .forEach((d) => {
                const icon = d.status === "added" ? "+" : "~";
                logger.info(`  ${icon} ${d.path}`);
              });
          }
        } else {
          logger.info("Writing artifacts to cloud storage...");
          activeWriter = new TransactionalWriter(outputPrefix, 500, cloudStorage, cloudKV);
          await activeWriter.initialize();
          try {
            for (const artifact of result.artifacts) {
              await activeWriter.write({
                path: artifact.path,
                content: artifact.content,
              });
            }
            await activeWriter.commit();
            logger.info("Artifacts written to cloud storage");
          } catch (writeErr) {
            logger.error("Write failed");
            await activeWriter.rollback();
            logger.error(
              `\nWrite failed: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`,
            );
            process.exit(1);
          } finally {
            activeWriter = undefined;
          }

          // Post-generation validation (in-memory TypeScript check)
          if (result.artifacts.length > 0) {
            const validateResult = await validateGeneratedTypeScript(result.artifacts);
            if (validateResult.valid) {
              logger.info("Generated code is valid");
            } else {
              logger.warn("Generated code has TypeScript errors");
              validateResult.errors.forEach((err) => logger.warn(`  ${err}`));
            }
          }

          // Audit log to cloud KV
          if (cloudKV) {
            try {
              const auditKey = `audit:${project.name}:${Date.now()}`;
              await cloudKV.set(auditKey, JSON.stringify({
                projectName: project.name,
                architecture: project.options.architecture,
                entities: project.options.entities.length,
                artifactsGenerated: result.metadata.artifactsGenerated,
                durationMs: result.metadata.duration,
                generators: result.metadata.phases,
                dryRun: false,
                timestamp: new Date().toISOString(),
              }), 86400 * 30);
            } catch {
              // ignore audit write errors
            }
          }
        }

        logger.info(
          `\nGenerated ${result.metadata.artifactsGenerated} artifacts in ${result.metadata.duration}ms`,
        );
        logger.info(`Phases: ${result.metadata.phases.join(" -> ")}`);

        const summary = engine.metrics.getSummary();
        if (summary.generators.length > 0) {
          logger.info(`\nGenerator Metrics:`);
          summary.generators.forEach((g) => {
            const status =
              g.failures > 0
                ? `⚠ ${g.failures} failures`
                : `✓ ${g.artifactsGenerated} artifacts`;
            logger.info(`  ${g.name}: ${status} (${g.avgDurationMs}ms avg)`);
          });
        }

        // Persist metrics to cloud KV instead of local filesystem
        if (!options.dryRun && cloudKV) {
          try {
            const metricsKey = `metrics:${project.name}:${Date.now()}`;
            await cloudKV.set(metricsKey, engine.metrics.toJSON(), 86400 * 7);
          } catch {
            // ignore metrics write errors
          }
        }

        if (result.warnings.length > 0) {
          logger.warn(`\nWarnings (${result.warnings.length}):`);
          result.warnings.forEach(
            (w: { code: string; phase: string; message: string }) => {
              logger.warn(`  [${w.code}] ${w.phase}: ${w.message}`);
            },
          );
        }
      } else {
        logger.error("\nGeneration failed:");
        result.errors.forEach(
          (err: { code: string; phase: string; message: string }) => {
            logger.error(`  [${err.code}] ${err.phase}: ${err.message}`);
            const guide = getErrorGuide(err.code);
            if (guide) logger.error(`    → ${guide}`);
          },
        );

        const summary = engine.metrics.getSummary();
        if (summary.generators.length > 0) {
          logger.error(`\nMetrics at failure:`);
          summary.generators.forEach((g) => {
            if (g.failures > 0 || g.timeouts > 0) {
              logger.error(
                `  ${g.name}: ${g.failures} failures, ${g.timeouts} timeouts`,
              );
            }
          });
        }

        process.exit(1);
      }
    },
  );

program
  .command("validate")
  .description("Validate a project configuration")
  .option("-c, --config <json>", "Configuration JSON string")
  .action(async (options: { config?: string }) => {
    logger.info("Validating project configuration...");

    if (!options.config) {
      logger.error("Config JSON is required. Use -c <json-config>.");
      process.exit(1);
    }

    try {
      const rawConfig = JSON.parse(options.config) as Record<string, unknown>;
      const nameValidation = projectNameSchema.safeParse(
        (rawConfig as any).name ?? "",
      );
      if (!nameValidation.success) {
        logger.error(`Invalid name: ${nameValidation.error.errors[0].message}`);
        process.exit(1);
      }

      const parsed = projectOptionsSchema.parse(rawConfig);
      logger.info("Configuration is valid");
      logger.info(`  Name: ${(rawConfig as any).name}`);
      logger.info(`  Architecture: ${parsed.architecture}`);
      logger.info(`  Entities: ${parsed.entities.length}`);
      logger.info(`  Providers: ${parsed.providers.length}`);
    } catch (err) {
      logger.error(
        `Validation failed: ${err instanceof Error ? err.message : String(err)}`,
      );
      process.exit(1);
    }
  });

program
  .command("health")
  .description("Check system health and cloud connectivity")
  .action(async () => {
    const result = await health.check();
    logger.info(`Status: ${result.status}`);
    result.checks.forEach((c) => {
      const icon = c.status === "pass" ? "✓" : c.status === "warn" ? "⚠" : "✗";
      logger.info(`  ${icon} ${c.name}: ${c.message ?? c.status}`);
    });

    // Cloud connectivity checks
    logger.info("\nCloud Services:");
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (redisUrl && redisToken) {
      try {
        const res = await fetch(`${redisUrl}/ping`, {
          headers: { Authorization: `Bearer ${redisToken}` },
          signal: AbortSignal.timeout(3000),
        });
        logger.info(`  ${res.ok ? "✓" : "✗"} Upstash Redis: ${res.ok ? "connected" : "error"}`);
      } catch {
        logger.info(`  ✗ Upstash Redis: unreachable`);
      }
    } else {
      logger.info(`  ⚠ Upstash Redis: not configured`);
    }

    const qstashToken = process.env.QSTASH_TOKEN;
    if (qstashToken) {
      try {
        const res = await fetch("https://qstash.upstash.io/v2/queues", {
          headers: { Authorization: `Bearer ${qstashToken}` },
          signal: AbortSignal.timeout(3000),
        });
        logger.info(`  ${res.ok ? "✓" : "✗"} QStash: ${res.ok ? "connected" : "error"}`);
      } catch {
        logger.info(`  ✗ QStash: unreachable`);
      }
    } else {
      logger.info(`  ⚠ QStash: not configured`);
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (blobToken) {
      logger.info(`  ✓ Vercel Blob: token configured`);
    } else {
      logger.info(`  ⚠ Vercel Blob: not configured`);
    }

    if (result.status === "unhealthy") process.exit(1);
  });

program
  .command("init")
  .description("Create a starter configuration file")
  .option("-n, --name <name>", "Project name", "my-app")
  .option("-o, --output <file>", "Output file", "sbc.config.json")
  .action((options) => {
    const config = {
      name: options.name,
      architecture: "MODULAR_MONOLITH",
      entities: [
        {
          name: "User",
          fields: [
            { name: "id", type: "UUID", options: {} },
            { name: "email", type: "STRING", options: { unique: true } },
            { name: "name", type: "STRING", options: {} },
            { name: "createdAt", type: "TIMESTAMP", options: {} },
          ],
          options: { audited: true, softDelete: true },
        },
      ],
      services: [],
      providers: [],
      infrastructure: {
        cloud: "VERCEL",
        containerization: "NONE",
        orchestration: "NONE",
        database: "POSTGRESQL",
        cache: "REDIS",
        queue: "NONE",
      },
    };

    const fs = require("fs");
    fs.writeFileSync(options.output, JSON.stringify(config, null, 2));
    logger.info(`Configuration template written to ${options.output}`);
    logger.info(`Edit it and run: sbc generate -c "$(cat ${options.output})"`);
  });

program.parse();
