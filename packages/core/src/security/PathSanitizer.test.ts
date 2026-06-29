import { describe, it, expect } from 'vitest';
import { PathSanitizer } from './PathSanitizer.js';
import { resolve } from 'path';

describe('PathSanitizer', () => {
  it('should allow valid paths', () => {
    const base = 'C:\\Users\\Tay\\projects';
    expect(PathSanitizer.sanitize('generated/app', base)).toBe(resolve(base, 'generated/app'));
  });

  it('should block path traversal', () => {
    expect(() => PathSanitizer.sanitize('../../../etc/passwd', 'C:\\Users\\Tay\\projects')).toThrow('Path traversal blocked');
  });

  it('should block absolute path outside base', () => {
    expect(() => PathSanitizer.sanitize('C:/windows/system32', 'C:\\Users\\Tay\\projects')).toThrow('Path traversal blocked');
  });

  it('should validate project names', () => {
    expect(PathSanitizer.isValidName('my-app')).toBe(true);
    expect(PathSanitizer.isValidName('my_app')).toBe(true);
    expect(PathSanitizer.isValidName('MyApp')).toBe(false);
    expect(PathSanitizer.isValidName('my app')).toBe(false);
    expect(PathSanitizer.isValidName('')).toBe(false);
  });
});
