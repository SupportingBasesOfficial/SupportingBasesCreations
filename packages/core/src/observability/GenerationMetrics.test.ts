import { describe, it, expect } from 'vitest';
import { GenerationMetrics } from './GenerationMetrics.js';

describe('GenerationMetrics', () => {
  it('should track successes', () => {
    const m = new GenerationMetrics();
    m.recordStart('prisma');
    m.recordSuccess('prisma', 100, 5);
    const g = m.getGeneratorMetrics('prisma');
    expect(g).toBeDefined();
    expect(g!.calls).toBe(1);
    expect(g!.successes).toBe(1);
    expect(g!.artifactsGenerated).toBe(5);
    expect(g!.avgDurationMs).toBe(100);
  });

  it('should track failures', () => {
    const m = new GenerationMetrics();
    m.recordStart('trpc');
    m.recordFailure('trpc', 50, 'error');
    const g = m.getGeneratorMetrics('trpc');
    expect(g!.failures).toBe(1);
    expect(g!.timeouts).toBe(0);
  });

  it('should track timeouts separately', () => {
    const m = new GenerationMetrics();
    m.recordStart('nextjs');
    m.recordFailure('nextjs', 30000, 'timeout');
    const g = m.getGeneratorMetrics('nextjs');
    expect(g!.timeouts).toBe(1);
    expect(g!.failures).toBe(0);
  });

  it('should compute summary', () => {
    const m = new GenerationMetrics();
    m.recordStart('a');
    m.recordSuccess('a', 100, 2);
    m.recordStart('b');
    m.recordFailure('b', 200, 'error');
    const summary = m.getSummary();
    expect(summary.totalRuns).toBe(2);
    expect(summary.totalFailures).toBe(1);
    expect(summary.successRate).toBe(50);
    expect(summary.avgDurationMs).toBe(150);
  });

  it('should reset', () => {
    const m = new GenerationMetrics();
    m.recordStart('a');
    m.recordSuccess('a', 10, 1);
    m.reset();
    expect(m.getAllMetrics()).toHaveLength(0);
  });
});
