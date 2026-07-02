import type { CloudKV } from "../cloud/CloudKV.js";

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: Array<{ name: string; status: 'pass' | 'fail' | 'warn'; message?: string }>;
}

export class HealthChecker {
  private kv: CloudKV | null = null;

  constructor(options?: { kv?: CloudKV }) {
    if (options?.kv) this.kv = options.kv;
  }

  async check(): Promise<HealthCheckResult> {
    const checks: HealthCheckResult['checks'] = [];

    // Cloud KV connectivity check (replaces disk space check)
    if (this.kv) {
      try {
        await this.kv.set('health:ping', Date.now().toString(), 10);
        const val = await this.kv.get('health:ping');
        checks.push({
          name: 'cloud-kv',
          status: val !== null ? 'pass' : 'fail',
          message: val !== null ? undefined : 'KV read returned null',
        });
      } catch {
        checks.push({ name: 'cloud-kv', status: 'fail', message: 'Cannot connect to cloud KV' });
      }
    } else {
      checks.push({ name: 'cloud-kv', status: 'warn', message: 'No cloud KV configured' });
    }

    // Memory check (still relevant in serverless)
    const memUsage = process.memoryUsage();
    const usedMB = memUsage.heapUsed / 1024 / 1024;
    if (usedMB > 1024) {
      checks.push({ name: 'memory', status: 'warn', message: `${Math.round(usedMB)}MB heap used` });
    } else {
      checks.push({ name: 'memory', status: 'pass' });
    }

    // Cold start check
    const uptimeSec = process.uptime();
    if (uptimeSec < 2) {
      checks.push({ name: 'cold-start', status: 'pass', message: `Uptime: ${Math.round(uptimeSec)}s` });
    } else {
      checks.push({ name: 'cold-start', status: 'pass' });
    }

    const hasFailure = checks.some((c) => c.status === 'fail');
    const hasWarning = checks.some((c) => c.status === 'warn');
    const status: HealthCheckResult['status'] = hasFailure ? 'unhealthy' : hasWarning ? 'degraded' : 'healthy';

    return { status, checks };
  }
}
