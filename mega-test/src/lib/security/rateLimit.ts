import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

const cache = new LRUCache<string, number[]>({
  max: 10000,
  ttl: 60000,
});

export function rateLimit(key: string, options: RateLimitOptions = { windowMs: 60000, maxRequests: 100 }): boolean {
  const now = Date.now();
  const windowStart = now - options.windowMs;
  const timestamps = cache.get(key) ?? [];

  const validTimestamps = timestamps.filter((t) => t > windowStart);

  if (validTimestamps.length >= options.maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  cache.set(key, validTimestamps);
  return true;
}

export function rateLimitMiddleware(
  req: Request,
  options?: RateLimitOptions
): { allowed: boolean; remaining: number; resetAt: number } {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const key = `rate-limit:${ip}`;
  const opts = { windowMs: 60000, maxRequests: 100, ...options };
  const allowed = rateLimit(key, opts);

  const timestamps = cache.get(key) ?? [];
  const now = Date.now();
  const windowStart = now - opts.windowMs;
  const validTimestamps = timestamps.filter((t) => t > windowStart);
  const remaining = Math.max(0, opts.maxRequests - validTimestamps.length);

  return {
    allowed,
    remaining,
    resetAt: validTimestamps.length > 0 ? validTimestamps[0] + opts.windowMs : now + opts.windowMs,
  };
}
