import { Project } from '../domain/Project.js';
import { FeatureFlag, ArchitectureType } from '../domain/enums.js';
import type { GeneratedArtifact } from '@sbc/shared';
import type { GenerationContext } from '../engine/GenerationEngine.js';

export interface Generator {
  readonly name: string;
  readonly version: string;
  readonly supportedFeatures: readonly FeatureFlag[];
  readonly supportedArchitectures: readonly ArchitectureType[];
  generate(context: GenerationContext): Promise<GeneratedArtifact[]>;
}

export class GeneratorRegistry {
  private generators: Map<string, Generator> = new Map();

  register(generator: Generator): void {
    this.generators.set(generator.name, generator);
  }

  unregister(name: string): void {
    this.generators.delete(name);
  }

  get(name: string): Generator | undefined {
    return this.generators.get(name);
  }

  list(): Generator[] {
    return Array.from(this.generators.values());
  }

  resolveGenerators(project: Project): Generator[] {
    const resolved: Generator[] = [];
    const features = new Set<FeatureFlag>();

    for (const entity of project.options.entities) {
      for (const feature of entity.options.features) {
        features.add(feature);
      }
    }

    for (const generator of this.generators.values()) {
      const supportsArchitecture = generator.supportedArchitectures.length === 0 ||
        generator.supportedArchitectures.includes(project.options.architecture);
      const supportsFeatures = generator.supportedFeatures.length === 0 ||
        generator.supportedFeatures.some((f) => features.has(f));

      if (supportsArchitecture && supportsFeatures) {
        resolved.push(generator);
      }
    }

    return resolved.sort((a, b) => {
      // Foundation generators (no features, no architectures) always run first
      const aIsFoundation = a.supportedFeatures.length === 0 && a.supportedArchitectures.length === 0;
      const bIsFoundation = b.supportedFeatures.length === 0 && b.supportedArchitectures.length === 0;
      if (aIsFoundation && !bIsFoundation) return -1;
      if (!aIsFoundation && bIsFoundation) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  resolveByFeature(feature: FeatureFlag): Generator[] {
    return Array.from(this.generators.values()).filter((g) =>
      g.supportedFeatures.includes(feature)
    );
  }

  clear(): void {
    this.generators.clear();
  }
}
