#!/usr/bin/env node

import { Command } from "commander";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import ora from "ora";
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
import { projectNameSchema, projectOptionsSchema } from "@sbc/core";
import {
  PrismaGenerator,
  TRPCGenerator,
  NextJSGenerator,
  DockerGenerator,
  EnvGenerator,
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
} from "@sbc/generators";
import {
  autoFixProjectName,
  findConfigFile,
  computeDiff,
  writeAuditLog,
  validateGeneratedTypeScript,
  loadConfigFile,
  buildProjectFromConfig,
  runPreflightChecks,
  ensureGitignoreEnv,
  getErrorGuide,
  CURRENT_SCHEMA_VERSION,
  checkForUpdates,
} from "./cliUtils.js";

const program = new Command();
const rateLimiter = new RateLimiter({ windowMs: 60_000, maxRequests: 10 });
const health = new HealthChecker();
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
  .option("-c, --config <path>", "Configuration file path")
  .option("-o, --output <dir>", "Output directory", "./generated")
  .option("-n, --name <name>", "Project name")
  .option("--dry-run", "Run without writing files")
  .option("--force", "Overwrite existing output directory")
  .action(
    async (options: {
      name?: string;
      output: string;
      config?: string;
      dryRun?: boolean;
      force?: boolean;
    }) => {
      const clientKey = `cli-${process.pid}`;
      if (!rateLimiter.allow(clientKey)) {
        logger.error("Rate limit exceeded. Try again in a minute.");
        process.exit(1);
      }

      logger.info("SBC Enterprise Generator v1.0.0");
      logger.info("=================================");

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
      let resolvedConfigPath: string | undefined = options.config;

      // Auto-detect config file if not explicitly provided
      if (!resolvedConfigPath && !options.name) {
        resolvedConfigPath = await findConfigFile(process.cwd());
        if (resolvedConfigPath) {
          logger.info(`Auto-detected config: ${resolvedConfigPath}`);
        }
      }

      if (resolvedConfigPath) {
        try {
          const rawConfig = await loadConfigFile(resolvedConfigPath);

          // Schema version check
          const configVersion =
            (rawConfig as any).schemaVersion ??
            (rawConfig as any).version ??
            "1.0";
          if (configVersion !== CURRENT_SCHEMA_VERSION) {
            logger.warn(
              `Config schema version mismatch: ${configVersion} (expected ${CURRENT_SCHEMA_VERSION}). May need migration.`,
            );
          }

          const merged = {
            ...rawConfig,
            ...(options.name ? { name: options.name } : {}),
          };
          project = buildProjectFromConfig(merged);
        } catch (err) {
          logger.error(
            `Failed to load config: ${err instanceof Error ? err.message : String(err)}`,
          );
          process.exit(1);
        }
      } else {
        if (!options.name) {
          logger.error(
            "Project name is required. Use -n <name> or -c <config>, or create sbc.config.json",
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

      // Sanitize output path
      let outputDir: string;
      try {
        outputDir = PathSanitizer.sanitize(options.output, process.cwd());
      } catch (err) {
        logger.error(
          `Invalid output path: ${err instanceof Error ? err.message : String(err)}`,
        );
        process.exit(1);
      }

      try {
        await runPreflightChecks(outputDir, options.force ?? false);
      } catch (preflightErr) {
        logger.error(
          `Preflight check failed: ${preflightErr instanceof Error ? preflightErr.message : String(preflightErr)}`,
        );
        process.exit(1);
      }

      logger.info(`Project: ${project.name}`);
      logger.info(`Architecture: ${project.options.architecture}`);
      logger.info(`Entities: ${project.options.entities.length}`);
      logger.info(`Services: ${project.options.services.length}`);
      logger.info(`Dependencies: ${project.dependencies().join(", ")}`);
      logger.info(`Output: ${outputDir}`);
      logger.info(`Dry run: ${options.dryRun ?? false}`);

      const registry = new GeneratorRegistry();
      const generators = [
        new PrismaGenerator(),
        new TRPCGenerator(),
        new NextJSGenerator(),
        new DockerGenerator(),
        new EnvGenerator(),
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
        new SecurityAuditGenerator(),
      ];

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

      const lock = new LockFile(outputDir);
      try {
        await lock.acquire();
      } catch (lockErr) {
        logger.error(
          `\nLock failed: ${lockErr instanceof Error ? lockErr.message : String(lockErr)}`,
        );
        process.exit(1);
      }

      const spinner = ora("Generating project...").start();
      let result;
      try {
        result = await engine.generate({
          project,
          outputDir,
        });
        spinner.succeed("Generation complete");
      } catch (fatalErr) {
        spinner.fail("Generation failed");
        throw fatalErr;
      } finally {
        await lock.release();
      }

      if (result.success) {
        if (options.dryRun) {
          const diffs = await computeDiff(outputDir, result.artifacts);
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
          const writeSpinner = ora("Writing files...").start();
          activeWriter = new TransactionalWriter(outputDir);
          await activeWriter.initialize();
          try {
            for (const artifact of result.artifacts) {
              await activeWriter.write({
                path: artifact.path,
                content: artifact.content,
              });
            }
            await activeWriter.commit();
            writeSpinner.succeed("Files written");
          } catch (writeErr) {
            writeSpinner.fail("Write failed");
            await activeWriter.rollback();
            logger.error(
              `\nWrite failed: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`,
            );
            process.exit(1);
          } finally {
            activeWriter = undefined;
          }

          // Protect secrets: ensure .env is in .gitignore
          const hasEnvFiles = result.artifacts.some((a) =>
            a.path.startsWith(".env"),
          );
          if (hasEnvFiles) {
            const added = await ensureGitignoreEnv(outputDir);
            if (added) {
              logger.warn(
                "\n[SECURITY] .env files detected. Added .env* to .gitignore to prevent secret leakage.",
              );
            }
          }

          // Post-generation validation
          const validateSpinner = ora("Validating generated code...").start();
          const validation = await validateGeneratedTypeScript(outputDir);
          if (validation.valid) {
            validateSpinner.succeed("Generated code is valid");
          } else {
            validateSpinner.warn("Generated code has TypeScript errors");
            validation.errors.forEach((err) => logger.warn(`  ${err}`));
          }

          // Audit log
          await writeAuditLog(outputDir, {
            projectName: project.name,
            architecture: project.options.architecture,
            entities: project.options.entities.length,
            artifactsGenerated: result.metadata.artifactsGenerated,
            durationMs: result.metadata.duration,
            generators: result.metadata.phases,
            dryRun: false,
          });
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

        if (!options.dryRun) {
          // Persist metrics
          try {
            const metricsDir = join(outputDir, ".sbc");
            await mkdir(metricsDir, { recursive: true });
            await writeFile(
              join(metricsDir, "metrics.json"),
              engine.metrics.toJSON(),
              "utf-8",
            );
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
  .option("-c, --config <path>", "Configuration file path", "sbc.config.json")
  .action(async (options: { config: string }) => {
    logger.info("Validating project configuration...");

    try {
      const rawConfig = await loadConfigFile(options.config);
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
  .description("Check system health")
  .action(async () => {
    const result = await health.check();
    logger.info(`Status: ${result.status}`);
    result.checks.forEach((c) => {
      const icon = c.status === "pass" ? "✓" : c.status === "warn" ? "⚠" : "✗";
      logger.info(`  ${icon} ${c.name}: ${c.message ?? c.status}`);
    });
    if (result.status === "unhealthy") process.exit(1);
  });

program.parse();
