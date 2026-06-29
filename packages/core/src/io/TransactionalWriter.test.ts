import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TransactionalWriter } from './TransactionalWriter.js';
import { mkdtempSync, existsSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('TransactionalWriter', () => {
  let baseDir: string;

  beforeEach(() => {
    baseDir = mkdtempSync(join(tmpdir(), 'sbc-tx-test-'));
  });

  afterEach(() => {
    rmSync(baseDir, { recursive: true, force: true });
  });

  it('should write to tmp and commit atomically', async () => {
    const writer = new TransactionalWriter(baseDir);
    await writer.initialize();
    await writer.write({ path: 'src/index.ts', content: 'console.log(1)' });
    await writer.commit();

    expect(existsSync(join(baseDir, 'src', 'index.ts'))).toBe(true);
    expect(readFileSync(join(baseDir, 'src', 'index.ts'), 'utf-8')).toBe('console.log(1)');
  });

  it('should rollback and not write anything', async () => {
    const writer = new TransactionalWriter(baseDir);
    await writer.initialize();
    await writer.write({ path: 'a.ts', content: 'a' });
    await writer.rollback();

    expect(existsSync(join(baseDir, 'a.ts'))).toBe(false);
  });

  it('should block path traversal', async () => {
    const writer = new TransactionalWriter(baseDir);
    await writer.initialize();
    await expect(writer.write({ path: '../../../etc/passwd', content: 'x' })).rejects.toThrow('Path traversal');
  });

  it('should prevent writes after commit', async () => {
    const writer = new TransactionalWriter(baseDir);
    await writer.initialize();
    await writer.write({ path: 'a.ts', content: 'a' });
    await writer.commit();
    await expect(writer.write({ path: 'b.ts', content: 'b' })).rejects.toThrow('committed');
  });
});
