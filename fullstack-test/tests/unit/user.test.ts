import { describe, it, expect } from 'vitest';
import { User } from '@/server/entities/user';

describe('User', () => {
  it('should create a valid user', () => {
    const item = new User({
      id: 'test-id',
      name: 'Test',
    });
    expect(item).toBeDefined();
    expect(item.name).toBe('Test');
  });

  it('should validate required fields', () => {
    expect(() => new User({})).toThrow();
  });
});
