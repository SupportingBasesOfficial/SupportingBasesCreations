export interface GeneratorMetrics {
  name: string;
  calls: number;
  successes: number;
  failures: number;
  timeouts: number;
  totalDurationMs: number;
  avgDurationMs: number;
  artifactsGenerated: number;
  lastRunAt?: number;
}

export class GenerationMetrics {
  private generators = new Map<string, GeneratorMetrics>();
  private overall = {
    totalRuns: 0,
    totalFailures: 0,
    totalArtifacts: 0,
    totalDurationMs: 0,
  };

  recordStart(generatorName: string): void {
    const existing = this.generators.get(generatorName);
    if (!existing) {
      this.generators.set(generatorName, {
        name: generatorName,
        calls: 0,
        successes: 0,
        failures: 0,
        timeouts: 0,
        totalDurationMs: 0,
        avgDurationMs: 0,
        artifactsGenerated: 0,
      });
    }
  }

  recordSuccess(generatorName: string, durationMs: number, artifacts: number): void {
    const m = this.generators.get(generatorName)!;
    m.calls++;
    m.successes++;
    m.totalDurationMs += durationMs;
    m.artifactsGenerated += artifacts;
    m.avgDurationMs = Math.round(m.totalDurationMs / m.calls);
    m.lastRunAt = Date.now();

    this.overall.totalRuns++;
    this.overall.totalArtifacts += artifacts;
    this.overall.totalDurationMs += durationMs;
  }

  recordFailure(generatorName: string, durationMs: number, reason: 'error' | 'timeout'): void {
    const m = this.generators.get(generatorName)!;
    m.calls++;
    if (reason === 'timeout') m.timeouts++;
    else m.failures++;
    m.totalDurationMs += durationMs;
    m.avgDurationMs = Math.round(m.totalDurationMs / m.calls);
    m.lastRunAt = Date.now();

    this.overall.totalRuns++;
    this.overall.totalFailures++;
    this.overall.totalDurationMs += durationMs;
  }

  getGeneratorMetrics(name: string): GeneratorMetrics | undefined {
    return this.generators.get(name);
  }

  getAllMetrics(): GeneratorMetrics[] {
    return Array.from(this.generators.values());
  }

  getSummary() {
    return {
      ...this.overall,
      successRate: this.overall.totalRuns
        ? Math.round(((this.overall.totalRuns - this.overall.totalFailures) / this.overall.totalRuns) * 100)
        : 100,
      avgDurationMs: this.overall.totalRuns
        ? Math.round(this.overall.totalDurationMs / this.overall.totalRuns)
        : 0,
      generators: this.getAllMetrics(),
    };
  }

  reset(): void {
    this.generators.clear();
    this.overall.totalRuns = 0;
    this.overall.totalFailures = 0;
    this.overall.totalArtifacts = 0;
    this.overall.totalDurationMs = 0;
  }

  toJSON(): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: this.getSummary(),
      generators: this.getAllMetrics(),
    }, null, 2);
  }
}
