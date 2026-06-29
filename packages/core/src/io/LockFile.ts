import { mkdir, writeFile, readFile, rm } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class LockFile {
  private lockPath: string;
  private acquired = false;

  constructor(outputDir: string) {
    this.lockPath = join(outputDir, '.sbc', '.lock');
  }

  async acquire(): Promise<void> {
    if (existsSync(this.lockPath)) {
      try {
        const content = await readFile(this.lockPath, 'utf-8');
        const timestamp = Number(content.trim());
        const ageMs = Date.now() - timestamp;
        if (!Number.isNaN(timestamp) && ageMs < 5 * 60 * 1000) {
          throw new Error(
            `Another generation is in progress (lock age: ${Math.round(ageMs / 1000)}s). ` +
            `Wait or remove ${this.lockPath}`
          );
        }
      } catch {
        // If read fails, treat as stale lock
      }
    }

    await mkdir(join(this.lockPath, '..'), { recursive: true });
    await writeFile(this.lockPath, String(Date.now()), 'utf-8');
    this.acquired = true;
  }

  async release(): Promise<void> {
    if (!this.acquired) return;
    try {
      await rm(this.lockPath, { force: true });
    } catch {
      // ignore
    }
    this.acquired = false;
  }
}
