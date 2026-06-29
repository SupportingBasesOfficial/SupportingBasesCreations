import { Project } from '../domain/Project.js';
import { GeneratorRegistry } from '../registry/GeneratorRegistry.js';
import { ResilientGenerator } from '../resilience/ResilientGenerator.js';
import { GenerationMetrics } from '../observability/GenerationMetrics.js';
import type { GeneratedArtifact, ValidationResult } from '@sbc/shared';

export interface GenerationContext {
  project: Project;
  outputDir: string;
  templateOverrides?: Record<string, string>;
  featureFlags?: Record<string, boolean>;
}

export interface GenerationResult {
  success: boolean;
  artifacts: GeneratedArtifact[];
  errors: GenerationError[];
  warnings: GenerationWarning[];
  metadata: GenerationMetadata;
}

export interface GenerationError {
  phase: string;
  path: string;
  message: string;
  code: string;
  stack?: string;
}

export interface GenerationWarning {
  phase: string;
  path: string;
  message: string;
  code: string;
}

export interface GenerationMetadata {
  duration: number;
  artifactsGenerated: number;
  dependencies: string[];
  phases: string[];
}

export class GenerationEngine {
  private registry: GeneratorRegistry;
  readonly metrics = new GenerationMetrics();
  private resilienceConfig?: ConstructorParameters<typeof ResilientGenerator>[1];

  constructor(registry?: GeneratorRegistry, resilienceConfig?: ConstructorParameters<typeof ResilientGenerator>[1]) {
    this.registry = registry ?? new GeneratorRegistry();
    this.resilienceConfig = resilienceConfig;
  }

  async generate(context: GenerationContext): Promise<GenerationResult> {
    const startTime = Date.now();
    const errors: GenerationError[] = [];
    const warnings: GenerationWarning[] = [];
    const artifacts: GeneratedArtifact[] = [];
    const phases: string[] = [];

    try {
      phases.push('validation');
      const validation = this.validateProject(context.project);
      if (!validation.valid) {
        return {
          success: false,
          artifacts: [],
          errors: validation.errors.map((e: { path: string; message: string; code: string }) => ({
            phase: 'validation',
            path: e.path,
            message: e.message,
            code: e.code,
          })),
          warnings: [],
          metadata: {
            duration: Date.now() - startTime,
            artifactsGenerated: 0,
            dependencies: [],
            phases,
          },
        };
      }

      phases.push('dependency-resolution');
      const dependencies = context.project.dependencies();

      phases.push('generation');
      const generators = this.registry.resolveGenerators(context.project);
      const concurrency = Number(process.env.SBC_GENERATOR_CONCURRENCY ?? 5);

      for (let i = 0; i < generators.length; i += concurrency) {
        const batch = generators.slice(i, i + concurrency);
        const batchResults = await Promise.all(
          batch.map(async (generator) => {
            const genStart = Date.now();
            this.metrics.recordStart(generator.name);

            const wrapped = this.resilienceConfig
              ? new ResilientGenerator(generator, this.resilienceConfig)
              : generator;

            try {
              const generatorArtifacts = await wrapped.generate(context);
              this.metrics.recordSuccess(generator.name, Date.now() - genStart, generatorArtifacts.length);
              return { artifacts: generatorArtifacts, error: undefined as Error | undefined };
            } catch (error) {
              const duration = Date.now() - genStart;
              const err = error instanceof Error ? error : new Error(String(error));
              const isTimeout = err.message.includes('timed out');
              this.metrics.recordFailure(generator.name, duration, isTimeout ? 'timeout' : 'error');

              errors.push({
                phase: 'generation',
                path: generator.name,
                message: err.message,
                code: isTimeout ? 'GENERATOR_TIMEOUT' : 'GENERATOR_FAILED',
                stack: err.stack,
              });

              if (this.resilienceConfig?.failFast) {
                return { artifacts: [] as GeneratedArtifact[], error: err };
              }

              warnings.push({
                phase: 'generation',
                path: generator.name,
                message: `Generator "${generator.name}" failed and was skipped (graceful degradation). Set failFast=true to abort.`,
                code: 'GENERATOR_DEGRADED',
              });

              return { artifacts: [] as GeneratedArtifact[], error: undefined };
            }
          })
        );

        for (const result of batchResults) {
          if (result.error && this.resilienceConfig?.failFast) {
            throw result.error;
          }
          artifacts.push(...result.artifacts);
        }
      }

      phases.push('merge');
      const mergedArtifacts = this.mergeArtifacts(artifacts, warnings);

      phases.push('post-process');
      const processedArtifacts = await this.postProcess(mergedArtifacts, context);

      return {
        success: errors.length === 0,
        artifacts: processedArtifacts,
        errors,
        warnings,
        metadata: {
          duration: Date.now() - startTime,
          artifactsGenerated: processedArtifacts.length,
          dependencies,
          phases,
        },
      };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errors.push({
        phase: 'engine',
        path: 'GenerationEngine',
        message: err.message,
        code: 'ENGINE_FATAL',
        stack: err.stack,
      });

      return {
        success: false,
        artifacts,
        errors,
        warnings,
        metadata: {
          duration: Date.now() - startTime,
          artifactsGenerated: artifacts.length,
          dependencies: [],
          phases,
        },
      };
    }
  }

  private validateProject(project: Project): ValidationResult<Project> {
    return project.validate();
  }

  private mergeArtifacts(artifacts: GeneratedArtifact[], warnings: GenerationWarning[]): GeneratedArtifact[] {
    const byPath = new Map<string, GeneratedArtifact[]>();

    for (const artifact of artifacts) {
      const existing = byPath.get(artifact.path) ?? [];
      existing.push(artifact);
      byPath.set(artifact.path, existing);
    }

    const merged: GeneratedArtifact[] = [];
    for (const [path, pathArtifacts] of byPath) {
      if (pathArtifacts.length === 1) {
        merged.push(pathArtifacts[0]);
        continue;
      }

      const first = pathArtifacts[0];
      let mergedContent = first.content;
      const mergedFrom = pathArtifacts.map((a) => a.metadata?.generator ?? 'unknown');

      for (let i = 1; i < pathArtifacts.length; i++) {
        const next = pathArtifacts[i];
        const strategy = this.detectMergeStrategy(mergedContent, next.content);

        if (strategy === 'json') {
          try {
            const obj1 = JSON.parse(mergedContent);
            const obj2 = JSON.parse(next.content);
            mergedContent = JSON.stringify(this.deepMerge(obj1, obj2), null, 2);
          } catch {
            mergedContent = next.content;
            warnings.push({
              phase: 'merge',
              path,
              message: `JSON merge failed for ${path}, used last content`,
              code: 'MERGE_JSON_FALLBACK',
            });
          }
        } else if (strategy === 'append') {
          mergedContent = mergedContent + '\n' + next.content;
        } else {
          mergedContent = next.content;
          warnings.push({
            phase: 'merge',
            path,
            message: `Path collision: ${path} overwritten by ${next.metadata?.generator ?? 'unknown'}`,
            code: 'ARTIFACT_OVERWRITTEN',
          });
        }
      }

      merged.push({
        path,
        content: mergedContent,
        language: first.language,
        metadata: {
          ...first.metadata,
          mergedFrom: pathArtifacts.length,
          mergedBy: mergedFrom,
        },
      });
    }

    return merged;
  }

  private detectMergeStrategy(a: string, b: string): 'json' | 'append' | 'overwrite' {
    const trimmedA = a.trim();
    const trimmedB = b.trim();
    if ((trimmedA.startsWith('{') && trimmedA.endsWith('}')) || (trimmedA.startsWith('[') && trimmedA.endsWith(']'))) {
      if ((trimmedB.startsWith('{') && trimmedB.endsWith('}')) || (trimmedB.startsWith('[') && trimmedB.endsWith(']'))) {
        return 'json';
      }
    }
    if (trimmedA.includes('\n') && trimmedB.includes('\n') && !trimmedA.startsWith('{')) {
      return 'append';
    }
    return 'overwrite';
  }

  private deepMerge(target: unknown, source: unknown): unknown {
    if (typeof target !== 'object' || target === null) return source;
    if (typeof source !== 'object' || source === null) return source;
    if (Array.isArray(target) && Array.isArray(source)) {
      return [...new Set([...target, ...source])];
    }
    if (Array.isArray(target) || Array.isArray(source)) {
      return source;
    }
    const result: Record<string, unknown> = { ...target as Record<string, unknown> };
    for (const [key, value] of Object.entries(source as Record<string, unknown>)) {
      if (key in result) {
        result[key] = this.deepMerge(result[key], value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  private async postProcess(artifacts: GeneratedArtifact[], context: GenerationContext): Promise<GeneratedArtifact[]> {
    return artifacts.map((artifact) => ({
      ...artifact,
      content: this.applyTemplateOverrides(artifact.content, context.templateOverrides),
    }));
  }

  private applyTemplateOverrides(content: string, overrides?: Record<string, string>): string {
    if (!overrides) return content;

    let result = content;
    for (const [key, value] of Object.entries(overrides)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
  }
}
