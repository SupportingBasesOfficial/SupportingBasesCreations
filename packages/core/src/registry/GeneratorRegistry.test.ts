import { describe, it, expect } from 'vitest';
import { GeneratorRegistry } from './GeneratorRegistry.js';
import { Project } from '../domain/Project.js';
import { Entity } from '../domain/Entity.js';
import { Field } from '../domain/Field.js';
import { ArchitectureType } from '../domain/enums.js';
import type { Generator } from './GeneratorRegistry.js';
import type { GenerationContext } from '../engine/GenerationEngine.js';

const mockGenerator = (name: string, features: string[] = [], architectures: string[] = []): Generator => ({
  name,
  version: '1.0.0',
  supportedFeatures: features as any,
  supportedArchitectures: architectures as any,
  async generate(_ctx: GenerationContext) {
    return [];
  },
});

describe('GeneratorRegistry', () => {
  it('should register and retrieve generators', () => {
    const registry = new GeneratorRegistry();
    const gen = mockGenerator('test');
    registry.register(gen);
    expect(registry.get('test')).toBe(gen);
  });

  it('should resolve all generators for empty constraints', () => {
    const registry = new GeneratorRegistry();
    registry.register(mockGenerator('a'));
    registry.register(mockGenerator('b'));

    const project = new Project('test', {
      entities: [new Entity('User', [Field.uuid('id')])],
    });
    const resolved = registry.resolveGenerators(project);
    expect(resolved).toHaveLength(2);
  });

  it('should filter by architecture', () => {
    const registry = new GeneratorRegistry();
    registry.register(mockGenerator('all', [], []));
    registry.register(mockGenerator('mono', [], [ArchitectureType.MODULAR_MONOLITH]));
    registry.register(mockGenerator('micro', [], [ArchitectureType.MICROSERVICES]));

    const project = new Project('test', {
      architecture: ArchitectureType.MODULAR_MONOLITH,
      entities: [new Entity('User', [Field.uuid('id')])],
    });
    const resolved = registry.resolveGenerators(project);
    expect(resolved.map((g) => g.name)).toEqual(['all', 'mono']);
  });

  it('should filter by features', () => {
    const registry = new GeneratorRegistry();
    registry.register(mockGenerator('auth-gen', ['AUTH']));
    registry.register(mockGenerator('billing-gen', ['BILLING']));

    const project = new Project('test', {
      entities: [new Entity('User', [Field.uuid('id')], { features: ['AUTH'] as any })],
    });
    const resolved = registry.resolveGenerators(project);
    expect(resolved.map((g) => g.name)).toEqual(['auth-gen']);
  });

  it('should unregister generators', () => {
    const registry = new GeneratorRegistry();
    registry.register(mockGenerator('a'));
    registry.unregister('a');
    expect(registry.get('a')).toBeUndefined();
  });
});
