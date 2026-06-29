import { describe, it, expect, vi } from 'vitest';
import { RateLimiter } from './RateLimiter.js';

describe('RateLimiter', () => {
  it('should allow requests within limit', () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 3 });
    expect(limiter.allow('user1')).toBe(true);
    expect(limiter.allow('user1')).toBe(true);
    expect(limiter.allow('user1')).toBe(true);
  });

  it('should block requests over limit', () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 2 });
    limiter.allow('user1');
    limiter.allow('user1');
    expect(limiter.allow('user1')).toBe(false);
  });

  it('should reset after window', () => {
    vi.useFakeTimers();
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 1 });
    limiter.allow('user1');
    expect(limiter.allow('user1')).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(limiter.allow('user1')).toBe(true);
    vi.useRealTimers();
  });

  it('should track different keys independently', () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 1 });
    expect(limiter.allow('a')).toBe(true);
    expect(limiter.allow('b')).toBe(true);
  });
});
