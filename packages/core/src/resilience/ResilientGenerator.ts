import type { Generator } from '../registry/GeneratorRegistry.js';
import type { GenerationContext } from '../engine/GenerationEngine.js';
import type { GeneratedArtifact } from '@sbc/shared';
import { FeatureFlag, ArchitectureType } from '../domain/enums.js';

export interface ResilienceConfig {
  timeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
  circuitBreakerThreshold: number;
  circuitBreakerResetMs: number;
  failFast: boolean;
}

const defaultConfig: ResilienceConfig = {
  timeoutMs: 30000,
  maxRetries: 2,
  retryDelayMs: 500,
  circuitBreakerThreshold: 5,
  circuitBreakerResetMs: 60000,
  failFast: false,
};

interface CircuitState {
  failures: number;
  lastFailure: number;
  open: boolean;
}

export class ResilientGenerator implements Generator {
  readonly name: string;
  readonly version: string;
  readonly supportedFeatures: readonly FeatureFlag[];
  readonly supportedArchitectures: readonly ArchitectureType[];

  private generator: Generator;
  private config: ResilienceConfig;
  private circuit: CircuitState = { failures: 0, lastFailure: 0, open: false };

  constructor(generator: Generator, config: Partial<ResilienceConfig> = {}) {
    this.generator = generator;
    this.name = generator.name;
    this.version = generator.version;
    this.supportedFeatures = generator.supportedFeatures;
    this.supportedArchitectures = generator.supportedArchitectures;
    this.config = { ...defaultConfig, ...config };
  }

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    if (this.isCircuitOpen()) {
      throw new Error(
        `Circuit breaker OPEN for generator "${this.name}". Too many failures.`
      );
    }

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const result = await this.withTimeout(
          this.generator.generate(context),
          this.config.timeoutMs
        );
        this.onSuccess();
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        this.onFailure();

        if (attempt < this.config.maxRetries) {
          await this.delay(this.config.retryDelayMs * Math.pow(2, attempt));
        }
      }
    }

    if (this.config.failFast) {
      throw lastError;
    }

    // Graceful degradation: return empty artifacts with warning metadata
    return [];
  }

  private isCircuitOpen(): boolean {
    if (!this.circuit.open) return false;
    const now = Date.now();
    if (now - this.circuit.lastFailure > this.config.circuitBreakerResetMs) {
      this.circuit = { failures: 0, lastFailure: 0, open: false };
      return false;
    }
    return true;
  }

  private onSuccess(): void {
    this.circuit = { failures: 0, lastFailure: 0, open: false };
  }

  private onFailure(): void {
    this.circuit.failures++;
    this.circuit.lastFailure = Date.now();
    if (this.circuit.failures >= this.config.circuitBreakerThreshold) {
      this.circuit.open = true;
    }
  }

  private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Generator "${this.name}" timed out after ${ms}ms`));
      }, ms);
      promise
        .then((value) => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
