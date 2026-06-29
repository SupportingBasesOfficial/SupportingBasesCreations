import { describe, it, expect } from 'vitest';
import { ResilientGenerator } from './ResilientGenerator.js';
import type { Generator } from '../registry/GeneratorRegistry.js';
import type { GenerationContext } from '../engine/GenerationEngine.js';
import type { GeneratedArtifact } from '@sbc/shared';

const mockGenerator = (
  name: string,
  behavior: 'success' | 'fail' | 'timeout' | 'fail-then-success'
): Generator => ({
  name,
  version: '1.0.0',
  supportedFeatures: [],
  supportedArchitectures: [],
  async generate(_ctx: GenerationContext): Promise<GeneratedArtifact[]> {
    if (behavior === 'success') return [{ path: 'test.txt', content: 'ok', language: 'text' }];
    if (behavior === 'timeout') {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('timed out')), 100000);
      });
    }
    if (behavior === 'fail-then-success') {
      // handled by test manually wrapping
      throw new Error('fail');
    }
    throw new Error('fail');
  },
});

describe('ResilientGenerator', () => {
  it('should return artifacts on success', async () => {
    const gen = new ResilientGenerator(mockGenerator('ok', 'success'), { timeoutMs: 1000, maxRetries: 0 });
    const result = await gen.generate({ project: {} as any, outputDir: '/tmp' });
    expect(result).toHaveLength(1);
    expect(result[0].content).toBe('ok');
  });

  it('should retry on failure then succeed', async () => {
    let calls = 0;
    const inner: Generator = {
      name: 'flaky',
      version: '1.0.0',
      supportedFeatures: [],
      supportedArchitectures: [],
      async generate() {
        calls++;
        if (calls < 2) throw new Error('network error');
        return [{ path: 'ok.txt', content: 'yes', language: 'text' }];
      },
    };
    const gen = new ResilientGenerator(inner, { timeoutMs: 1000, maxRetries: 2, retryDelayMs: 10 });
    const result = await gen.generate({ project: {} as any, outputDir: '/tmp' });
    expect(result).toHaveLength(1);
    expect(calls).toBe(2);
  });

  it('should timeout and report timeout', async () => {
    const gen = new ResilientGenerator(mockGenerator('slow', 'timeout'), {
      timeoutMs: 50,
      maxRetries: 0,
      failFast: true,
    });
    await expect(gen.generate({ project: {} as any, outputDir: '/tmp' })).rejects.toThrow('timed out');
  });

  it('should open circuit after threshold', async () => {
    const inner = mockGenerator('always-fail', 'fail');
    const gen = new ResilientGenerator(inner, {
      timeoutMs: 1000,
      maxRetries: 0,
      circuitBreakerThreshold: 2,
      circuitBreakerResetMs: 60000,
      failFast: true,
    });

    await expect(gen.generate({ project: {} as any, outputDir: '/tmp' })).rejects.toThrow('fail');
    await expect(gen.generate({ project: {} as any, outputDir: '/tmp' })).rejects.toThrow('fail');
    // circuit open now
    await expect(gen.generate({ project: {} as any, outputDir: '/tmp' })).rejects.toThrow('Circuit breaker OPEN');
  });

  it('should degrade gracefully when failFast is false', async () => {
    const inner = mockGenerator('degrade', 'fail');
    const gen = new ResilientGenerator(inner, {
      timeoutMs: 1000,
      maxRetries: 0,
      failFast: false,
    });
    const result = await gen.generate({ project: {} as any, outputDir: '/tmp' });
    expect(result).toEqual([]);
  });

  it('should propagate error when failFast is true', async () => {
    const inner = mockGenerator('explode', 'fail');
    const gen = new ResilientGenerator(inner, {
      timeoutMs: 1000,
      maxRetries: 0,
      failFast: true,
    });
    await expect(gen.generate({ project: {} as any, outputDir: '/tmp' })).rejects.toThrow('fail');
  });
});
