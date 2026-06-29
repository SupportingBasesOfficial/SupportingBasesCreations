import { z } from 'zod';
import {
  ArchitectureType,
  FrontendFramework,
  StylingSystem,
  ComponentSystem,
  CloudProvider,
  Containerization,
  Orchestration,
  DatabaseType,
  CacheType,
  QueueType,
  TestType,
  LinterType,
  SecurityTool,
  DocType,
} from '../domain/enums.js';

const architectures = Object.values(ArchitectureType).filter((v) => typeof v === 'string') as string[];
const frontendFrameworks = Object.values(FrontendFramework).filter((v) => typeof v === 'string') as string[];
const stylingSystems = Object.values(StylingSystem).filter((v) => typeof v === 'string') as string[];
const componentSystems = Object.values(ComponentSystem).filter((v) => typeof v === 'string') as string[];
const cloudProviders = Object.values(CloudProvider).filter((v) => typeof v === 'string') as string[];
const containerizations = Object.values(Containerization).filter((v) => typeof v === 'string') as string[];
const orchestrations = Object.values(Orchestration).filter((v) => typeof v === 'string') as string[];
const databases = Object.values(DatabaseType).filter((v) => typeof v === 'string') as string[];
const caches = Object.values(CacheType).filter((v) => typeof v === 'string') as string[];
const queues = Object.values(QueueType).filter((v) => typeof v === 'string') as string[];
const testTypes = Object.values(TestType).filter((v) => typeof v === 'string') as string[];
const linterTypes = Object.values(LinterType).filter((v) => typeof v === 'string') as string[];
const securityTools = Object.values(SecurityTool).filter((v) => typeof v === 'string') as string[];
const docTypes = Object.values(DocType).filter((v) => typeof v === 'string') as string[];

export const providerConfigSchema = z.object({
  name: z.string().min(1),
  displayName: z.string().min(1),
  category: z.enum(['auth', 'payment', 'email', 'monitoring', 'ai', 'communication', 'analytics', 'storage']),
  envKeys: z.array(z.string().min(1)),
  description: z.string(),
  setupGuide: z.string(),
});

export const fieldSchema = z.object({
  name: z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Field name must be a valid identifier'),
  type: z.enum([
    'UUID', 'STRING', 'TEXT', 'INTEGER', 'BIGINT', 'DECIMAL', 'BOOLEAN',
    'DATE', 'DATETIME', 'JSON', 'ENUM', 'RELATION',
  ]),
  options: z.object({
    nullable: z.boolean().default(false),
    unique: z.boolean().default(false),
    indexed: z.boolean().default(false),
    default: z.unknown().optional(),
    enumValues: z.array(z.string()).optional(),
    relationType: z.enum(['ONE_TO_ONE', 'ONE_TO_MANY', 'MANY_TO_ONE', 'MANY_TO_MANY']).optional(),
    targetEntity: z.string().optional(),
  }).passthrough().default({}),
});

export const entitySchema = z.object({
  name: z.string().regex(/^[A-Z][a-zA-Z0-9]*$/, 'Entity name must be PascalCase'),
  fields: z.array(fieldSchema).min(1, 'Entity must have at least one field'),
  options: z.object({
    description: z.string().optional(),
    tableName: z.string().optional(),
    features: z.array(z.string()).default([]),
    audited: z.boolean().default(false),
    softDelete: z.boolean().default(false),
  }).default({}),
});

export const serviceSchema = z.object({
  name: z.string().min(1),
  path: z.string().min(1),
  template: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
});

export const frontendConfigSchema = z.object({
  framework: z.enum(frontendFrameworks as [string, ...string[]]).default('NEXTJS'),
  styling: z.enum(stylingSystems as [string, ...string[]]).default('TAILWIND'),
  components: z.enum(componentSystems as [string, ...string[]]).default('SHADCN'),
  features: z.array(z.string()).default([]),
  pages: z.array(z.string()).default([]),
});

export const infrastructureConfigSchema = z.object({
  cloud: z.enum(cloudProviders as [string, ...string[]]).default('VERCEL'),
  containerization: z.enum(containerizations as [string, ...string[]]).default('NONE'),
  orchestration: z.enum(orchestrations as [string, ...string[]]).default('NONE'),
  database: z.enum(databases as [string, ...string[]]).default('POSTGRESQL'),
  cache: z.enum(caches as [string, ...string[]]).default('REDIS'),
  queue: z.enum(queues as [string, ...string[]]).default('NONE'),
  cdn: z.boolean().default(true),
  regions: z.array(z.string()).default(['us-east-1']),
});

export const qualityConfigSchema = z.object({
  testing: z.array(z.enum(testTypes as [string, ...string[]])).default(['UNIT', 'INTEGRATION']),
  linting: z.array(z.enum(linterTypes as [string, ...string[]])).default(['ESLINT', 'PRETTIER']),
  security: z.array(z.enum(securityTools as [string, ...string[]])).default(['DEPENDABOT']),
  documentation: z.array(z.enum(docTypes as [string, ...string[]])).default(['README', 'API']),
});

export const projectOptionsSchema = z.object({
  description: z.string().default(''),
  architecture: z.enum(architectures as [string, ...string[]]).default('MODULAR_MONOLITH'),
  regions: z.array(z.string()).default(['us-east-1']),
  entities: z.array(entitySchema).default([]),
  services: z.array(serviceSchema).default([]),
  providers: z.array(providerConfigSchema).default([]),
  frontend: frontendConfigSchema.default({}),
  infrastructure: infrastructureConfigSchema.default({}),
  quality: qualityConfigSchema.default({}),
  version: z.string().default('1.0.0'),
  author: z.string().default(''),
  license: z.string().default('MIT'),
});

export const projectNameSchema = z
  .string()
  .min(1, 'Project name is required')
  .regex(/^[a-z][a-zA-Z0-9_-]*$/, 'Project name must be kebab-case or camelCase');

export const cliConfigSchema = z.object({
  name: projectNameSchema,
  output: z.string().min(1).default('./generated'),
  dryRun: z.boolean().default(false),
  config: z.string().optional(),
});

export const pluginManifestSchema = z.object({
  name: z.string().min(1).max(64),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  entry: z.string().min(1),
  hooks: z.array(z.enum(['before:generate', 'after:generate', 'before:write', 'after:write'])).default([]),
  supportedFeatures: z.array(z.string()).default([]),
  supportedArchitectures: z.array(z.string()).default([]),
});
