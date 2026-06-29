import { describe, it, expect } from 'vitest';
import { Organization } from '@/server/entities/organization';

describe('Organization', () => {
  it('should create a valid organization', () => {
    const item = new Organization({
      id: 'test-id',
      name: 'Test',
    });
    expect(item).toBeDefined();
    expect(item.name).toBe('Test');
  });

  it('should validate required fields', () => {
    expect(() => new Organization({})).toThrow();
  });
});
