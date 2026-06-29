export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface Bucket {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private buckets = new Map<string, Bucket>();

  constructor(private config: RateLimitConfig) {}

  allow(key: string): boolean {
    const now = Date.now();
    const bucket = this.buckets.get(key);

    if (!bucket || now > bucket.resetAt) {
      this.buckets.set(key, { count: 1, resetAt: now + this.config.windowMs });
      return true;
    }

    if (bucket.count >= this.config.maxRequests) {
      return false;
    }

    bucket.count++;
    return true;
  }

  reset(key: string): void {
    this.buckets.delete(key);
  }

  resetAll(): void {
    this.buckets.clear();
  }
}
