import { NextRequest, NextResponse } from "next/server";
import { UpstashRedisKV } from "@sbc/core";

function getKV(): UpstashRedisKV | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new UpstashRedisKV({ url, token });
}

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export async function checkRateLimit(
  namespace: string,
  identifier: string,
  max: number,
  ttlSeconds: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const kv = getKV();
  if (!kv) return { allowed: true, remaining: max };

  const key = `ratelimit:${namespace}:${identifier}`;
  const count = await kv.incr(key, ttlSeconds);
  return {
    allowed: count <= max,
    remaining: Math.max(0, max - count),
  };
}

export function rateLimitResponse(namespace: string, max: number, ttl: number) {
  return NextResponse.json(
    {
      error: `Rate limit exceeded. Maximum ${max} requests per ${ttl}s for ${namespace}.`,
    },
    {
      status: 429,
      headers: { "Retry-After": String(ttl) },
    },
  );
}
