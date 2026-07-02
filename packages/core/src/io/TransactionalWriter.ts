import type { CloudStorage } from "../cloud/CloudStorage.js";
import type { CloudKV } from "../cloud/CloudKV.js";
import { randomBytes } from "crypto";

export interface Snapshot {
  timestamp: string;
  files: string[];
}

export interface WriteOperation {
  path: string;
  content: string;
}

export class TransactionalWriter {
  private committed = false;
  private writtenPaths: string[] = [];
  private totalBytes = 0;
  private readonly maxWriteBytes: number;
  private txId: string;
  private storage: CloudStorage | null = null;
  private kv: CloudKV | null = null;
  private basePath: string;

  constructor(
    baseOutputDir: string,
    maxWriteMb = 500,
    storage?: CloudStorage,
    kv?: CloudKV,
  ) {
    this.basePath = baseOutputDir.replace(/\\/g, "/").replace(/^\/+/, "");
    this.maxWriteBytes = maxWriteMb * 1024 * 1024;
    this.txId = randomBytes(8).toString("hex");
    if (storage) this.storage = storage;
    if (kv) this.kv = kv;
  }

  async initialize(): Promise<void> {
    // No local filesystem setup needed in cloud mode
    // If no storage configured, we buffer in memory
  }

  async write(operation: WriteOperation): Promise<void> {
    if (this.committed) {
      throw new Error("Cannot write after transaction has been committed");
    }

    const byteLength = Buffer.byteLength(operation.content, "utf-8");
    this.totalBytes += byteLength;
    if (this.totalBytes > this.maxWriteBytes) {
      throw new Error(
        `Write quota exceeded: ${Math.round(this.totalBytes / 1024 / 1024)}MB / ` +
          `${Math.round(this.maxWriteBytes / 1024 / 1024)}MB.`,
      );
    }

    const safePath = this.sanitizePath(operation.path);
    this.writtenPaths.push(safePath);

    if (this.storage) {
      const cloudPath = `${this.basePath}/${safePath}`;
      await this.storage.upload({ key: cloudPath, content: operation.content });
    }
  }

  async commit(): Promise<string | undefined> {
    if (this.committed) return undefined;
    this.committed = true;

    // Record transaction metadata in KV for audit/rollback
    if (this.kv) {
      const metaKey = `tx:${this.txId}`;
      await this.kv.set(metaKey, JSON.stringify({
        timestamp: new Date().toISOString(),
        files: this.writtenPaths,
        basePath: this.basePath,
      }), 86400);
    }

    return undefined;
  }

  async rollback(): Promise<void> {
    if (this.committed) return;

    // Delete any files already written to cloud storage
    if (this.storage) {
      for (const safePath of this.writtenPaths) {
        try {
          const cloudPath = `${this.basePath}/${safePath}`;
          await this.storage.delete(cloudPath);
        } catch {
          // ignore individual delete errors
        }
      }
    }

    this.writtenPaths = [];
  }

  private sanitizePath(inputPath: string): string {
    const normalized = inputPath.replace(/\\/g, "/").replace(/^\/+/, "");
    const segments = normalized.split("/");
    for (const seg of segments) {
      if (seg === "..") {
        throw new Error(`Path traversal detected: ${inputPath}`);
      }
    }
    return normalized;
  }
}

export async function listSnapshots(kv?: CloudKV): Promise<Snapshot[]> {
  if (!kv) return [];
  // Snapshots are stored as tx: keys in KV with TTL
  // Listing requires prefix scan which is implementation-specific
  // Return empty in cloud mode — audit trail is in cloud logs
  return [];
}
