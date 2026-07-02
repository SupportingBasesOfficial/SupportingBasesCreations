import { describe, it, expect, vi } from 'vitest';
import { RateLimiter } from './RateLimiter.js';
import type { CloudKV } from '../cloud/CloudKV.js';

function createMockKV(): CloudKV {
  const store = new Map<string, string>();
  return {
    get: async <T = string>(key: string): Promise<T | null> => (store.get(key) as T) ?? null,
    set: async <T = string>(key: string, value: T, _ttl?: number): Promise<void> => {
      store.set(key, typeof value === 'string' ? value : JSON.stringify(value));
    },
    delete: async (key: string) => { store.delete(key); },
    exists: async (key: string) => store.has(key),
    incr: async (key: string, _ttl?: number) => {
      const v = (parseInt(store.get(key) ?? '0', 10) + 1);
      store.set(key, v.toString());
      return v;
    },
    rpush: async (key: string, value: string) => {
      const list = JSON.parse(store.get(key) ?? '[]') as string[];
      list.push(value);
      store.set(key, JSON.stringify(list));
      return list.length;
    },
    lrange: async (key: string, start: number, stop: number) => {
      const list = JSON.parse(store.get(key) ?? '[]') as string[];
      if (stop < 0) stop = list.length + stop + 1;
      return list.slice(start, stop);
    },
    acquireLock: async (_key: string, _owner: string, _ttl: number) => null,
    releaseLock: async (_key: string, _owner: string) => {},
  };
}

describe('RateLimiter', () => {
  it('should allow requests within limit', async () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 3 }, createMockKV());
    expect(await limiter.allow('user1')).toBe(true);
    expect(await limiter.allow('user1')).toBe(true);
    expect(await limiter.allow('user1')).toBe(true);
  });

  it('should block requests over limit', async () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 2 }, createMockKV());
    await limiter.allow('user1');
    await limiter.allow('user1');
    expect(await limiter.allow('user1')).toBe(false);
  });

  it('should reset after window', async () => {
    vi.useFakeTimers();
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 1 }, createMockKV());
    await limiter.allow('user1');
    expect(await limiter.allow('user1')).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(await limiter.allow('user1')).toBe(true);
    vi.useRealTimers();
  });

  it('should track different keys independently', async () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 1 }, createMockKV());
    expect(await limiter.allow('a')).toBe(true);
    expect(await limiter.allow('b')).toBe(true);
  });
});
