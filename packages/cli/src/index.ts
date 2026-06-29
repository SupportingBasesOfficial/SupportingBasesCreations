#!/usr/bin/env node

import { Command } from 'commander';
import { readFile, mkdir, writeFile, appendFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, join } from 'path';
import { Project, Entity, Field, GenerationEngine, GeneratorRegistry } from '@sbc/core';
import { FeatureFlag, ArchitectureType, RelationType, ProviderConfig } from '@sbc/core';
import { PathSanitizer, RateLimiter, TransactionalWriter, HealthChecker, LockFile, StructuredLogger } from '@sbc/core';
import { projectNameSchema, projectOptionsSchema } from '@sbc/core';
import {
  PrismaGenerator, TRPCGenerator, NextJSGenerator, DockerGenerator, EnvGenerator,
  AuthGenerator, FeatureFlagGenerator, TestGenerator, PactGenerator, K6Generator,
  GitHubActionsGenerator, DocsGenerator, ObservabilityStackGenerator,
  EventDrivenGenerator, MultiTenancyGenerator, SecurityAuditGenerator,
} from '@sbc/generators';

const program = new Command();
const rateLimiter = new RateLimiter({ windowMs: 60_000, maxRequests: 10 });
const health = new HealthChecker();
const logger = new StructuredLogger('cli');

let activeWriter: TransactionalWriter | undefined;

function registerShutdownHandlers(): void {
  const shutdown = async (signal: string) => {
    logger.error(`\nReceived ${signal}. Cleaning up...`);
    if (activeWriter) {
      await activeWriter.rollback();
    }
    process.exit(1);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

registerShutdownHandlers();

program
  .name('sbc')
  .description('SupportingBasesCreations - Enterprise Project Generator')
  .version('1.0.0');

function isGeneratorEnabled(name: string): boolean {
  const envKey = `SBC_DISABLE_${name.replace(/-/g, '_').toUpperCase()}`;
  return process.env[envKey] !== '1' && process.env[envKey] !== 'true';
}

const ERROR_GUIDE: Record<string, string> = {
  PROJECT_NAME_REQUIRED: 'Provide a project name with -n <name>',
  PROJECT_NAME_INVALID: 'Use kebab-case (e.g. my-app) or camelCase (e.g. myApp). No spaces or special characters.',
  PROJECT_NO_ENTITIES: 'Add at least one entity to your project configuration.',
  PROJECT_MICROSERVICES_NO_SERVICES: 'Microservices architecture requires at least one service definition.',
  PROJECT_NO_REGIONS: 'Specify at least one deployment region in your configuration.',
  ENTITY_NAME_REQUIRED: 'Every entity must have a non-empty name.',
  ENTITY_NAME_INVALID: 'Entity names must be PascalCase (e.g. User, OrderItem).',
  ENTITY_NO_FIELDS: 'Add at least one field to each entity.',
  ENTITY_DUPLICATE_FIELD: 'Field names must be unique within an entity.',
  ENTITY_SOFT_DELETE_MISSING_FIELD: 'Add a deletedAt field to enable soft delete.',
  FIELD_NAME_REQUIRED: 'Every field must have a non-empty name.',
  FIELD_NAME_INVALID: 'Field names must be valid identifiers (e.g. email, firstName).',
  ENUM_VALUES_REQUIRED: 'Provide at least one value for enum fields.',
  TARGET_ENTITY_REQUIRED: 'Relation fields must specify a target entity.',
  RELATION_TYPE_REQUIRED: 'Relation fields must specify a relation type (ONE_TO_ONE, ONE_TO_MANY, etc).',
  GENERATOR_FAILED: 'The generator encountered an error. Set SBC_GENERATOR_FAIL_FAST=0 to skip failing generators.',
  GENERATOR_TIMEOUT: 'Generator exceeded the time limit. Increase SBC_GENERATOR_TIMEOUT_MS.',
  GENERATOR_DEGRADED: 'Generator failed but was skipped. Set SBC_GENERATOR_FAIL_FAST=1 to abort instead.',
  GENERATOR_DISABLED: 'Generator was disabled via environment variable.',
  MERGE_JSON_FALLBACK: 'Could not merge JSON artifacts for the same path. Last artifact was used.',
  ARTIFACT_OVERWRITTEN: 'Two generators produced the same file path. Review generator configuration.',
  ENGINE_FATAL: 'Critical engine failure. Check logs and disk space.',
  PATH_TRAVERSAL_BLOCKED: 'Output path contained unsafe segments. Use a relative path.',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Wait 60 seconds and try again.',
  CONFIG_FILE_NOT_FOUND: 'Verify the config file path and that the file exists.',
  CONFIG_PARSE_ERROR: 'The config file contains invalid JSON or unexpected structure.',
  VALIDATION_FAILED: 'Fix the validation errors listed above and retry.',
  WRITE_FAILED: 'Could not write to output directory. Check permissions and disk space.',
  HEALTH_CHECK_FAILED: 'System is unhealthy. Check disk space, memory, and permissions.',
};

function getErrorGuide(code: string): string | undefined {
  return ERROR_GUIDE[code] ?? ERROR_GUIDE[code.split('_').slice(0, -1).join('_') + '_FAILED'];
}

async function runPreflightChecks(outputDir: string, force: boolean): Promise<void> {
  const protectedDirs = ['/', '/usr', '/usr/local', '/opt', '/var', process.env.HOME ?? ''].filter(Boolean);
  const resolved = resolve(outputDir);

  for (const pd of protectedDirs) {
    if (resolved === resolve(pd) || resolved.startsWith(resolve(pd) + '\\') || resolved.startsWith(resolve(pd) + '/')) {
      throw new Error(`Refusing to write to protected directory: ${outputDir}. Use a project-specific path.`);
    }
  }

  if (existsSync(outputDir)) {
    const entries = await readdir(outputDir).catch(() => [] as string[]);
    if (entries.length > 0 && !force) {
      throw new Error(
        `Output directory already exists and is not empty: ${outputDir}. ` +
        `Pass --force to overwrite, or choose a different directory.`
      );
    }

    const gitDir = join(outputDir, '.git');
    if (existsSync(gitDir)) {
      logger.warn(`Output directory is a git repository. Ensure you have committed changes before overwriting.`);
    }
  }
}

async function ensureGitignoreEnv(outputDir: string): Promise<boolean> {
  const gitignorePath = join(outputDir, '.gitignore');
  const envPattern = '.env*';
  try {
    const content = await readFile(gitignorePath, 'utf-8');
    if (content.includes(envPattern)) return false;
    await appendFile(gitignorePath, `\n# SBC: protect secrets\n${envPattern}\n`, 'utf-8');
    return true;
  } catch {
    await writeFile(gitignorePath, `# SBC: protect secrets\n${envPattern}\n`, 'utf-8');
    return true;
  }
}

async function loadConfigFile(configPath: string): Promise<Record<string, unknown>> {
  const absolutePath = resolve(configPath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Config file not found: ${absolutePath}`);
  }
  const content = await readFile(absolutePath, 'utf-8');
  return JSON.parse(content);
}

function buildProjectFromConfig(raw: unknown): Project {
  const parsed = projectOptionsSchema.parse(raw);
  const entities = parsed.entities.map((e) => {
    const fields = e.fields.map((f) => new Field(f.name, f.type as any, f.options as any));
    return new Entity(e.name, fields, {
      description: e.options.description,
      tableName: e.options.tableName,
      features: e.options.features as any,
      audited: e.options.audited,
      softDelete: e.options.softDelete,
    });
  });

  return new Project((raw as any).name ?? 'my-project', {
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

program
  .command('generate')
  .description('Generate a project from configuration')
  .option('-c, --config <path>', 'Configuration file path')
  .option('-o, --output <dir>', 'Output directory', './generated')
  .option('-n, --name <name>', 'Project name')
  .option('--dry-run', 'Run without writing files')
  .option('--force', 'Overwrite existing output directory')
  .action(async (options: { name?: string; output: string; config?: string; dryRun?: boolean; force?: boolean }) => {
    const clientKey = `cli-${process.pid}`;
    if (!rateLimiter.allow(clientKey)) {
      logger.error('Rate limit exceeded. Try again in a minute.');
      process.exit(1);
    }

    logger.info('SBC Enterprise Generator v1.0.0');
    logger.info('=================================');

    // Health check
    const healthResult = await health.check();
    if (healthResult.status === 'unhealthy') {
      logger.error('System health check failed:');
      healthResult.checks.filter((c) => c.status === 'fail').forEach((c) => {
        logger.error(`  [${c.name}] ${c.message}`);
      });
      process.exit(1);
    }

    let project: Project;

    if (options.config) {
      try {
        const rawConfig = await loadConfigFile(options.config);
        const merged = {
          ...rawConfig,
          ...(options.name ? { name: options.name } : {}),
        };
        project = buildProjectFromConfig(merged);
      } catch (err) {
        logger.error(`Failed to load config: ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
      }
    } else {
      if (!options.name) {
        logger.error('Project name is required. Use -n <name> or -c <config>');
        process.exit(1);
      }
      const nameValidation = projectNameSchema.safeParse(options.name);
      if (!nameValidation.success) {
        logger.error(`Invalid project name: ${nameValidation.error.errors[0].message}`);
        process.exit(1);
      }

      project = new Project(options.name, {
        architecture: ArchitectureType.MODULAR_MONOLITH,
        providers: [
          ProviderConfig.oauthGoogle(),
          ProviderConfig.stripe(),
          ProviderConfig.sentry(),
        ],
        entities: [
          new Entity('User', [
            Field.uuid('id').primary(),
            Field.string('email').unique().required(),
            Field.string('name').required(),
            Field.enum('role', ['ADMIN', 'USER', 'GUEST']).default('USER'),
            Field.datetime('createdAt').required(),
            Field.datetime('updatedAt').required(),
          ], { features: [FeatureFlag.AUTH, FeatureFlag.AUDIT_LOG] }),
          new Entity('Organization', [
            Field.uuid('id').primary(),
            Field.string('name').required(),
            Field.json('settings').nullable(),
            Field.relation('owner', 'User', RelationType.MANY_TO_ONE).required(),
            Field.datetime('createdAt').required(),
            Field.datetime('updatedAt').required(),
          ], { features: [FeatureFlag.MULTI_TENANT] }),
        ],
      });
    }

    const validation = project.validate();
    if (!validation.valid) {
      logger.error('Validation failed:');
      validation.errors.forEach((err: { path: string; message: string; code: string }) => {
        logger.error(`  [${err.code}] ${err.path}: ${err.message}`);
      });
      process.exit(1);
    }

    // Sanitize output path
    let outputDir: string;
    try {
      outputDir = PathSanitizer.sanitize(options.output, process.cwd());
    } catch (err) {
      logger.error(`Invalid output path: ${err instanceof Error ? err.message : String(err)}`);
      process.exit(1);
    }

    try {
      await runPreflightChecks(outputDir, options.force ?? false);
    } catch (preflightErr) {
      logger.error(`Preflight check failed: ${preflightErr instanceof Error ? preflightErr.message : String(preflightErr)}`);
      process.exit(1);
    }

    logger.info(`Project: ${project.name}`);
    logger.info(`Architecture: ${project.options.architecture}`);
    logger.info(`Entities: ${project.options.entities.length}`);
    logger.info(`Services: ${project.options.services.length}`);
    logger.info(`Dependencies: ${project.dependencies().join(', ')}`);
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
      failFast: process.env.SBC_GENERATOR_FAIL_FAST === '1',
    });

    const lock = new LockFile(outputDir);
    try {
      await lock.acquire();
    } catch (lockErr) {
      logger.error(`\nLock failed: ${lockErr instanceof Error ? lockErr.message : String(lockErr)}`);
      process.exit(1);
    }

    let result;
    try {
      result = await engine.generate({
        project,
        outputDir,
      });
    } finally {
      await lock.release();
    }

    if (result.success) {
      if (!options.dryRun) {
        activeWriter = new TransactionalWriter(outputDir);
        await activeWriter.initialize();
        try {
          for (const artifact of result.artifacts) {
            await activeWriter.write({ path: artifact.path, content: artifact.content });
          }
          await activeWriter.commit();
        } catch (writeErr) {
          await activeWriter.rollback();
          logger.error(`\nWrite failed: ${writeErr instanceof Error ? writeErr.message : String(writeErr)}`);
          process.exit(1);
        } finally {
          activeWriter = undefined;
        }

        // Protect secrets: ensure .env is in .gitignore
        const hasEnvFiles = result.artifacts.some((a) => a.path.startsWith('.env'));
        if (hasEnvFiles) {
          const added = await ensureGitignoreEnv(outputDir);
          if (added) {
            logger.warn('\n[SECURITY] .env files detected. Added .env* to .gitignore to prevent secret leakage.');
          }
        }
      }

      logger.info(`\nGenerated ${result.metadata.artifactsGenerated} artifacts in ${result.metadata.duration}ms`);
      logger.info(`Phases: ${result.metadata.phases.join(' -> ')}`);

      const summary = engine.metrics.getSummary();
      if (summary.generators.length > 0) {
        logger.info(`\nGenerator Metrics:`);
        summary.generators.forEach((g) => {
          const status = g.failures > 0 ? `⚠ ${g.failures} failures` : `✓ ${g.artifactsGenerated} artifacts`;
          logger.info(`  ${g.name}: ${status} (${g.avgDurationMs}ms avg)`);
        });
      }
      // Persist metrics
      try {
        const metricsDir = join(outputDir, '.sbc');
        await mkdir(metricsDir, { recursive: true });
        await writeFile(join(metricsDir, 'metrics.json'), engine.metrics.toJSON(), 'utf-8');
      } catch {
        // ignore metrics write errors
      }

      if (result.warnings.length > 0) {
        logger.warn(`\nWarnings (${result.warnings.length}):`);
        result.warnings.forEach((w: { code: string; phase: string; message: string }) => {
          logger.warn(`  [${w.code}] ${w.phase}: ${w.message}`);
        });
      }
    } else {
      logger.error('\nGeneration failed:');
      result.errors.forEach((err: { code: string; phase: string; message: string }) => {
        logger.error(`  [${err.code}] ${err.phase}: ${err.message}`);
        const guide = getErrorGuide(err.code);
        if (guide) logger.error(`    → ${guide}`);
      });

      const summary = engine.metrics.getSummary();
      if (summary.generators.length > 0) {
        logger.error(`\nMetrics at failure:`);
        summary.generators.forEach((g) => {
          if (g.failures > 0 || g.timeouts > 0) {
            logger.error(`  ${g.name}: ${g.failures} failures, ${g.timeouts} timeouts`);
          }
        });
      }

      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate a project configuration')
  .option('-c, --config <path>', 'Configuration file path', 'sbc.config.json')
  .action(async (options: { config: string }) => {
    logger.info('Validating project configuration...');

    try {
      const rawConfig = await loadConfigFile(options.config);
      const nameValidation = projectNameSchema.safeParse((rawConfig as any).name ?? '');
      if (!nameValidation.success) {
        logger.error(`Invalid name: ${nameValidation.error.errors[0].message}`);
        process.exit(1);
      }

      const parsed = projectOptionsSchema.parse(rawConfig);
      logger.info('Configuration is valid');
      logger.info(`  Name: ${(rawConfig as any).name}`);
      logger.info(`  Architecture: ${parsed.architecture}`);
      logger.info(`  Entities: ${parsed.entities.length}`);
      logger.info(`  Providers: ${parsed.providers.length}`);
    } catch (err) {
      logger.error(`Validation failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exit(1);
    }
  });

program
  .command('health')
  .description('Check system health')
  .action(async () => {
    const result = await health.check();
    logger.info(`Status: ${result.status}`);
    result.checks.forEach((c) => {
      const icon = c.status === 'pass' ? '✓' : c.status === 'warn' ? '⚠' : '✗';
      logger.info(`  ${icon} ${c.name}: ${c.message ?? c.status}`);
    });
    if (result.status === 'unhealthy') process.exit(1);
  });

program.parse();
