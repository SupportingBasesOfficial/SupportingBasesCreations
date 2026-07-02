import type { CloudKV } from "../cloud/CloudKV.js";

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export class RateLimiter {
  private kv: CloudKV | null = null;

  constructor(private config: RateLimitConfig, kv?: CloudKV) {
    if (kv) this.kv = kv;
  }

  async allow(key: string): Promise<boolean> {
    if (!this.kv) {
      // No cloud KV — fail open (cloud-only mode assumes API gateway handles rate limiting)
      return true;
    }

    const kvKey = `ratelimit:${key}`;
    const windowSec = Math.ceil(this.config.windowMs / 1000);
    const now = Date.now();

    const existing = await this.kv.get(kvKey);
    if (existing !== null) {
      const data = JSON.parse(existing) as { count: number; resetAt: number };
      if (now > data.resetAt) {
        await this.kv.set(kvKey, JSON.stringify({ count: 1, resetAt: now + this.config.windowMs }), windowSec);
        return true;
      }
      if (data.count >= this.config.maxRequests) {
        return false;
      }
      data.count++;
      await this.kv.set(kvKey, JSON.stringify(data), windowSec);
      return true;
    }

    await this.kv.set(kvKey, JSON.stringify({ count: 1, resetAt: now + this.config.windowMs }), windowSec);
    return true;
  }

  async reset(key: string): Promise<void> {
    if (this.kv) {
      await this.kv.delete(`ratelimit:${key}`);
    }
  }

  async resetAll(): Promise<void> {
    // Cloud KV doesn't support listing/deleting by prefix in all implementations
    // This is a no-op in cloud mode — keys expire via TTL
  }
}
