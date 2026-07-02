import type { CloudKV } from "../cloud/CloudKV.js";

export class LockFile {
  private acquired = false;
  private lockKey: string;
  private kv: CloudKV | null = null;

  constructor(outputDir: string, kv?: CloudKV) {
    this.lockKey = `lock:${outputDir.replace(/[^a-zA-Z0-9]/g, ':')}`;
    if (kv) this.kv = kv;
  }

  async acquire(): Promise<void> {
    if (!this.kv) {
      // No cloud KV configured — skip locking (cloud-only mode assumes single-invocation)
      this.acquired = true;
      return;
    }

    const existing = await this.kv.get(this.lockKey);
    if (existing !== null) {
      const timestamp = Number(existing);
      const ageMs = Date.now() - timestamp;
      if (!Number.isNaN(timestamp) && ageMs < 5 * 60 * 1000) {
        throw new Error(
          `Another generation is in progress (lock age: ${Math.round(ageMs / 1000)}s).`
        );
      }
    }

    await this.kv.set(this.lockKey, String(Date.now()), 300);
    this.acquired = true;
  }

  async release(): Promise<void> {
    if (!this.acquired) return;
    if (this.kv) {
      try {
        await this.kv.delete(this.lockKey);
      } catch {
        // ignore
      }
    }
    this.acquired = false;
  }
}
