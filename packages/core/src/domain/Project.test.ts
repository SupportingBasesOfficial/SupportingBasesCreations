import { describe, it, expect } from 'vitest';
import { Project } from './Project.js';
import { Entity } from './Entity.js';
import { Field } from './Field.js';
import { FeatureFlag, ArchitectureType } from './enums.js';
import { ProviderConfig } from './ProviderConfig.js';

describe('Project', () => {
  it('should create a project with defaults', () => {
    const project = new Project('test-app');
    expect(project.name).toBe('test-app');
    expect(project.options.architecture).toBe(ArchitectureType.MODULAR_MONOLITH);
    expect(project.options.entities).toHaveLength(0);
  });

  it('should validate name is required', () => {
    const project = new Project('');
    const result = project.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'PROJECT_NAME_REQUIRED')).toBe(true);
  });

  it('should validate name format', () => {
    const project = new Project('Test-App');
    const result = project.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'PROJECT_NAME_INVALID')).toBe(true);
  });

  it('should require at least one entity', () => {
    const project = new Project('test-app');
    const result = project.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'PROJECT_NO_ENTITIES')).toBe(true);
  });

  it('should validate entity errors', () => {
    const project = new Project('test-app', {
      entities: [new Entity('')],
    });
    const result = project.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.path.startsWith('entities.'))).toBe(true);
  });

  it('should require services for microservices', () => {
    const project = new Project('test-app', {
      architecture: ArchitectureType.MICROSERVICES,
      entities: [new Entity('User', [Field.uuid('id')])],
    });
    const result = project.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'PROJECT_MICROSERVICES_NO_SERVICES')).toBe(true);
  });

  it('should require at least one region', () => {
    const project = new Project('test-app', {
      entities: [new Entity('User', [Field.uuid('id')])],
      infrastructure: {
        cloud: 'VERCEL',
        containerization: 'NONE',
        orchestration: 'NONE',
        database: 'POSTGRESQL',
        cache: 'REDIS',
        queue: 'NONE',
        cdn: true,
        regions: [],
      } as any,
    });
    const result = project.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'PROJECT_NO_REGIONS')).toBe(true);
  });

  it('should pass validation for valid project', () => {
    const project = new Project('test-app', {
      entities: [
        new Entity('User', [
          Field.uuid('id').primary(),
          Field.string('email').unique().required(),
        ]),
      ],
    });
    const result = project.validate();
    expect(result.valid).toBe(true);
    expect(result.data).toBe(project);
  });

  it('should add and remove entities immutably', () => {
    const project = new Project('test-app');
    const updated = project.addEntity(new Entity('Org', [Field.uuid('id')]));
    expect(updated.options.entities).toHaveLength(1);
    expect(project.options.entities).toHaveLength(0);

    const removed = updated.removeEntity('Org');
    expect(removed.options.entities).toHaveLength(0);
  });

  it('should get entity by name', () => {
    const project = new Project('test-app', {
      entities: [new Entity('User', [Field.uuid('id')])],
    });
    expect(project.getEntity('User')).toBeDefined();
    expect(project.getEntity('Missing')).toBeUndefined();
  });

  it('should compute dependencies', () => {
    const project = new Project('test-app', {
      entities: [
        new Entity('User', [Field.uuid('id')], { features: [FeatureFlag.AUTH] }),
      ],
      infrastructure: {
        cloud: 'VERCEL',
        containerization: 'NONE',
        orchestration: 'NONE',
        database: 'POSTGRESQL',
        cache: 'REDIS',
        queue: 'RABBITMQ',
        cdn: true,
        regions: ['us-east-1'],
      } as any,
    });
    const deps = project.dependencies();
    expect(deps).toContain('postgresql');
    expect(deps).toContain('redis');
    expect(deps).toContain('rabbitmq');
    expect(deps).toContain('auth-provider');
  });

  it('should enable feature on entities', () => {
    const project = new Project('test-app', {
      entities: [new Entity('User', [Field.uuid('id')])],
    });
    const updated = project.enableFeature(FeatureFlag.AUDIT_LOG);
    expect(updated.hasFeature(FeatureFlag.AUDIT_LOG)).toBe(true);
  });

  it('should export to config', () => {
    const project = new Project('test-app', {
      version: '2.0.0',
      entities: [new Entity('User', [Field.uuid('id')])],
    });
    const config = project.toConfig();
    expect(config.name).toBe('test-app');
    expect(config.version).toBe('2.0.0');
    expect(config.dependencies).toEqual(expect.arrayContaining(['postgresql']));
  });

  it('should handle providers in options', () => {
    const project = new Project('test-app', {
      entities: [new Entity('User', [Field.uuid('id')])],
      providers: [ProviderConfig.oauthGoogle()],
    });
    expect(project.options.providers).toHaveLength(1);
    expect(project.options.providers[0].type).toBe('oauth-google');
  });
});
