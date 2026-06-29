import { Entity } from './Entity.js';
import { Service } from './Service.js';
import { ProviderConfig } from './ProviderConfig.js';
import { FeatureFlag, ArchitectureType, FrontendFramework, DatabaseType, CacheType, QueueType, CloudProvider, Containerization, Orchestration, StylingSystem, ComponentSystem, TestType, LinterType, SecurityTool, DocType } from './enums.js';
import type { Named, Validatable, Configurable, ValidationResult, DependencyAware } from '@sbc/shared';

export interface FrontendConfig {
  framework: FrontendFramework;
  styling: StylingSystem;
  components: ComponentSystem;
  features: string[];
  pages?: string[];
}

export interface InfrastructureConfig {
  cloud: CloudProvider;
  containerization: Containerization;
  orchestration: Orchestration;
  database: DatabaseType;
  cache: CacheType;
  queue: QueueType;
  cdn?: boolean;
  regions?: string[];
}

export interface QualityConfig {
  testing: TestType[];
  linting: LinterType[];
  security: SecurityTool[];
  documentation: DocType[];
}

export interface ProjectOptions {
  description?: string;
  architecture?: ArchitectureType;
  regions?: string[];
  entities?: Entity[];
  services?: Service[];
  providers?: ProviderConfig[];
  frontend?: FrontendConfig;
  infrastructure?: InfrastructureConfig;
  quality?: QualityConfig;
  version?: string;
  author?: string;
  license?: string;
}

export class Project implements Named, Validatable<Project>, Configurable, DependencyAware {
  readonly name: string;
  readonly options: Required<ProjectOptions>;

  constructor(name: string, options: ProjectOptions = {}) {
    this.name = name;
    this.options = {
      description: options.description ?? '',
      architecture: options.architecture ?? ArchitectureType.MODULAR_MONOLITH,
      regions: options.regions ?? ['us-east-1'],
      entities: options.entities ?? [],
      services: options.services ?? [],
      providers: options.providers ?? [],
      frontend: options.frontend ?? {
        framework: FrontendFramework.NEXTJS,
        styling: StylingSystem.TAILWIND,
        components: ComponentSystem.SHADCN,
        features: [],
        pages: [],
      },
      infrastructure: options.infrastructure ?? {
        cloud: CloudProvider.VERCEL,
        containerization: Containerization.NONE,
        orchestration: Orchestration.NONE,
        database: DatabaseType.POSTGRESQL,
        cache: CacheType.REDIS,
        queue: QueueType.NONE,
        cdn: true,
        regions: ['us-east-1'],
      },
      quality: options.quality ?? {
        testing: [TestType.UNIT, TestType.INTEGRATION],
        linting: [LinterType.ESLINT, LinterType.PRETTIER],
        security: [SecurityTool.DEPENDABOT],
        documentation: [DocType.README, DocType.API],
      },
      version: options.version ?? '1.0.0',
      author: options.author ?? '',
      license: options.license ?? 'MIT',
    };
  }

  addEntity(entity: Entity): Project {
    return new Project(this.name, {
      ...this.options,
      entities: [...this.options.entities, entity],
    });
  }

  removeEntity(entityName: string): Project {
    return new Project(this.name, {
      ...this.options,
      entities: this.options.entities.filter((e) => e.name !== entityName),
    });
  }

  getEntity(name: string): Entity | undefined {
    return this.options.entities.find((e) => e.name === name);
  }

  addService(service: Service): Project {
    return new Project(this.name, {
      ...this.options,
      services: [...this.options.services, service],
    });
  }

  removeService(serviceName: string): Project {
    return new Project(this.name, {
      ...this.options,
      services: this.options.services.filter((s) => s.name !== serviceName),
    });
  }

  getService(name: string): Service | undefined {
    return this.options.services.find((s) => s.name === name);
  }

  enableFeature(feature: FeatureFlag): Project {
    const updatedEntities = this.options.entities.map((e) =>
      e.hasFeature(feature) ? e : e.enableFeature(feature)
    );
    return new Project(this.name, {
      ...this.options,
      entities: updatedEntities,
    });
  }

  hasFeature(feature: FeatureFlag): boolean {
    return this.options.entities.some((e) => e.hasFeature(feature));
  }

  dependencies(): string[] {
    const deps: string[] = [];

    if (this.options.infrastructure.database === DatabaseType.POSTGRESQL) {
      deps.push('postgresql');
    }
    if (this.options.infrastructure.cache === CacheType.REDIS) {
      deps.push('redis');
    }
    if (this.options.infrastructure.queue === QueueType.RABBITMQ) {
      deps.push('rabbitmq');
    }

    for (const entity of this.options.entities) {
      if (entity.hasFeature(FeatureFlag.AUTH)) {
        deps.push('auth-provider');
      }
      if (entity.hasFeature(FeatureFlag.BILLING)) {
        deps.push('payment-provider');
      }
      if (entity.hasFeature(FeatureFlag.ANALYTICS)) {
        deps.push('analytics-provider');
      }
    }

    return [...new Set(deps)];
  }

  validate(): ValidationResult<Project> {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push({ path: 'name', message: 'Project name is required', code: 'PROJECT_NAME_REQUIRED' });
    }

    if (!/^[a-z][a-zA-Z0-9_-]*$/.test(this.name)) {
      errors.push({ path: 'name', message: 'Project name must be kebab-case or camelCase', code: 'PROJECT_NAME_INVALID' });
    }

    if (this.options.entities.length === 0) {
      errors.push({ path: 'entities', message: 'Project must have at least one entity', code: 'PROJECT_NO_ENTITIES' });
    }

    for (const entity of this.options.entities) {
      const entityValidation = entity.validate();
      if (!entityValidation.valid) {
        errors.push(...entityValidation.errors.map((e: { path: string; message: string; code: string }) => ({
          path: `entities.${entity.name}.${e.path}`,
          message: e.message,
          code: e.code,
        })));
      }
    }

    for (const service of this.options.services) {
      const serviceValidation = service.validate();
      if (!serviceValidation.valid) {
        errors.push(...serviceValidation.errors.map((e: { path: string; message: string; code: string }) => ({
          path: `services.${service.name}.${e.path}`,
          message: e.message,
          code: e.code,
        })));
      }
    }

    if (this.options.architecture === ArchitectureType.MICROSERVICES && this.options.services.length === 0) {
      errors.push({ path: 'services', message: 'Microservices architecture requires at least one service', code: 'PROJECT_MICROSERVICES_NO_SERVICES' });
    }

    if (!this.options.infrastructure?.regions?.length) {
      errors.push({ path: 'infrastructure.regions', message: 'At least one region must be specified', code: 'PROJECT_NO_REGIONS' });
    }

    return {
      valid: errors.length === 0,
      errors,
      data: errors.length === 0 ? this : undefined,
    };
  }

  toConfig(): Record<string, unknown> {
    return {
      name: this.name,
      version: this.options.version,
      description: this.options.description,
      architecture: this.options.architecture,
      regions: this.options.regions,
      entities: this.options.entities.map((e) => e.toConfig()),
      services: this.options.services.map((s) => s.toConfig()),
      frontend: this.options.frontend,
      infrastructure: this.options.infrastructure,
      quality: this.options.quality,
      dependencies: this.dependencies(),
    };
  }
}
