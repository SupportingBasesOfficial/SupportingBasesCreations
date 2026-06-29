import { access } from 'fs/promises';
import { statfs } from 'fs/promises';

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: Array<{ name: string; status: 'pass' | 'fail' | 'warn'; message?: string }>;
}

export class HealthChecker {
  async check(): Promise<HealthCheckResult> {
    const checks: HealthCheckResult['checks'] = [];

    // Disk space check (require 100MB free)
    try {
      const stats = await statfs(process.cwd());
      const freeBytes = stats.bfree * stats.bsize;
      const freeMB = freeBytes / 1024 / 1024;
      if (freeMB < 100) {
        checks.push({ name: 'disk', status: 'warn', message: `Only ${Math.round(freeMB)}MB free` });
      } else {
        checks.push({ name: 'disk', status: 'pass' });
      }
    } catch {
      checks.push({ name: 'disk', status: 'fail', message: 'Cannot check disk space' });
    }

    // Write permissions check
    try {
      await access(process.cwd());
      checks.push({ name: 'permissions', status: 'pass' });
    } catch {
      checks.push({ name: 'permissions', status: 'fail', message: 'No write access to cwd' });
    }

    // Memory check
    const memUsage = process.memoryUsage();
    const usedMB = memUsage.heapUsed / 1024 / 1024;
    if (usedMB > 1024) {
      checks.push({ name: 'memory', status: 'warn', message: `${Math.round(usedMB)}MB heap used` });
    } else {
      checks.push({ name: 'memory', status: 'pass' });
    }

    const hasFailure = checks.some((c) => c.status === 'fail');
    const hasWarning = checks.some((c) => c.status === 'warn');
    const status: HealthCheckResult['status'] = hasFailure ? 'unhealthy' : hasWarning ? 'degraded' : 'healthy';

    return { status, checks };
  }
}
