import { NextResponse } from 'next/server';
import { UpstashRedisKV } from '@sbc/core';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const checks: Array<{ name: string; status: 'pass' | 'fail' | 'warn'; message?: string }> = [];

  // Cloud KV connectivity check
  const kvUrl = process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (kvUrl && kvToken) {
    try {
      const kv = new UpstashRedisKV({ url: kvUrl, token: kvToken });
      await kv.set('health:ping', Date.now().toString(), 10);
      const val = await kv.get('health:ping');
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

  // Memory check
  const memUsage = process.memoryUsage();
  const usedMB = memUsage.heapUsed / 1024 / 1024;
  checks.push({
    name: 'memory',
    status: usedMB > 512 ? 'warn' : 'pass',
    message: usedMB > 512 ? `${Math.round(usedMB)}MB heap used` : undefined,
  });

  // Uptime
  const uptimeSec = process.uptime();
  checks.push({
    name: 'uptime',
    status: 'pass',
    message: `${Math.round(uptimeSec)}s`,
  });

  const hasFailure = checks.some((c) => c.status === 'fail');
  const hasWarning = checks.some((c) => c.status === 'warn');
  const status = hasFailure ? 'unhealthy' : hasWarning ? 'degraded' : 'healthy';
  const httpStatus = hasFailure ? 503 : 200;

  return NextResponse.json({ status, checks }, { status: httpStatus });
}
