import {
  mkdir,
  rename,
  rm,
  writeFile,
  stat,
  statfs,
  readdir,
  readFile,
  copyFile,
} from "fs/promises";
import { dirname, join, basename } from "path";
import { tmpdir } from "os";
import { randomBytes } from "crypto";

const BACKUP_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const BACKUP_PREFIX = "sbc-backup-";
const SNAPSHOT_PREFIX = "sbc-snapshot-";

export interface Snapshot {
  timestamp: string;
  dir: string;
  files: string[];
}

export async function listSnapshots(): Promise<Snapshot[]> {
  const tmp = tmpdir();
  const snapshots: Snapshot[] = [];
  try {
    const entries = await readdir(tmp);
    for (const entry of entries) {
      if (!entry.startsWith(SNAPSHOT_PREFIX)) continue;
      const dir = join(tmp, entry);
      try {
        const s = await stat(dir);
        if (!s.isDirectory()) continue;
        const manifestPath = join(dir, ".snapshot.json");
        const manifestRaw = await readFile(manifestPath, "utf-8");
        const manifest = JSON.parse(manifestRaw);
        snapshots.push({
          timestamp: manifest.timestamp,
          dir,
          files: manifest.files || [],
        });
      } catch {
        // ignore invalid snapshots
      }
    }
  } catch {
    // ignore errors
  }
  return snapshots.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export async function restoreSnapshot(
  snapshotDir: string,
  outputDir: string,
): Promise<void> {
  const manifestPath = join(snapshotDir, ".snapshot.json");
  const manifestRaw = await readFile(manifestPath, "utf-8");
  const manifest = JSON.parse(manifestRaw);
  for (const file of manifest.files as string[]) {
    const src = join(snapshotDir, file);
    const dest = join(outputDir, file);
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(src, dest);
  }
}

async function cleanupOldBackups(): Promise<void> {
  const tmp = tmpdir();
  try {
    const entries = await readdir(tmp);
    const now = Date.now();
    for (const entry of entries) {
      if (!entry.startsWith(BACKUP_PREFIX)) continue;
      const entryPath = join(tmp, entry);
      try {
        const s = await stat(entryPath);
        if (s.isDirectory() && now - s.mtime.getTime() > BACKUP_TTL_MS) {
          await rm(entryPath, { recursive: true, force: true });
        }
      } catch {
        // ignore per-entry errors
      }
    }
  } catch {
    // ignore cleanup errors
  }
}

export interface WriteOperation {
  path: string;
  content: string;
}

async function checkAvailableSpace(
  path: string,
  minBytes: number,
): Promise<void> {
  try {
    const info = await statfs(path);
    const available = info.bavail * info.bsize;
    if (available < minBytes) {
      throw new Error(
        `Insufficient disk space at ${path}: ${Math.round(available / 1024 / 1024)}MB available, ` +
          `${Math.round(minBytes / 1024 / 1024)}MB required`,
      );
    }
  } catch {
    // statfs may not be available on all platforms; skip check
  }
}

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 100,
): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries) {
        await new Promise((r) => setTimeout(r, baseDelay * 2 ** i));
      }
    }
  }
  throw lastErr;
}

export class TransactionalWriter {
  private tmpDir: string;
  private committed = false;
  private writtenPaths: string[] = [];
  private totalBytes = 0;
  private readonly maxWriteBytes: number;

  constructor(
    private baseOutputDir: string,
    maxWriteMb = 500,
  ) {
    const nonce = randomBytes(8).toString("hex");
    this.tmpDir = join(tmpdir(), `sbc-gen-${nonce}`);
    this.maxWriteBytes = maxWriteMb * 1024 * 1024;
  }

  async initialize(): Promise<void> {
    await checkAvailableSpace(tmpdir(), 100 * 1024 * 1024);
    await cleanupOldBackups();
    await mkdir(this.tmpDir, { recursive: true });
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
          `${Math.round(this.maxWriteBytes / 1024 / 1024)}MB. ` +
          `Increase limit or reduce generated artifacts.`,
      );
    }

    const safePath = this.sanitizePath(operation.path);
    const tmpPath = join(this.tmpDir, safePath);
    await mkdir(dirname(tmpPath), { recursive: true });
    await writeFile(tmpPath, operation.content, "utf-8");
    this.writtenPaths.push(safePath);
  }

  async commit(): Promise<string | undefined> {
    if (this.committed) return undefined;

    let backupDir: string | undefined;

    // Snapshot existing files that will be overwritten
    const snapshotFiles: string[] = [];
    const snapshotDir = join(
      tmpdir(),
      `${SNAPSHOT_PREFIX}${Date.now()}-${randomBytes(4).toString("hex")}`,
    );
    for (const safePath of this.writtenPaths) {
      const existingPath = join(this.baseOutputDir, safePath);
      try {
        const s = await stat(existingPath);
        if (s.isFile()) {
          const dest = join(snapshotDir, safePath);
          await mkdir(dirname(dest), { recursive: true });
          await copyFile(existingPath, dest);
          snapshotFiles.push(safePath);
        }
      } catch {
        // file does not exist, nothing to snapshot
      }
    }
    if (snapshotFiles.length > 0) {
      await writeFile(
        join(snapshotDir, ".snapshot.json"),
        JSON.stringify({
          timestamp: new Date().toISOString(),
          files: snapshotFiles,
        }),
        "utf-8",
      );
    }

    // Backup existing directory if it has content
    try {
      const dirStat = await stat(this.baseOutputDir);
      if (dirStat.isDirectory()) {
        const nonce = randomBytes(4).toString("hex");
        backupDir = join(
          tmpdir(),
          `sbc-backup-${basename(this.baseOutputDir)}-${nonce}`,
        );
        await withRetry(() => rename(this.baseOutputDir, backupDir!));
      }
    } catch {
      // Directory does not exist, no backup needed
    }

    await mkdir(this.baseOutputDir, { recursive: true });

    for (const safePath of this.writtenPaths) {
      const tmpPath = join(this.tmpDir, safePath);
      const finalPath = join(this.baseOutputDir, safePath);
      await mkdir(dirname(finalPath), { recursive: true });
      await withRetry(() => rename(tmpPath, finalPath));
    }

    this.committed = true;
    await this.cleanup();
    return backupDir;
  }

  async rollback(): Promise<void> {
    if (this.committed) return;
    await this.cleanup();
  }

  private sanitizePath(inputPath: string): string {
    // Normalize and remove leading slashes/backslashes
    const normalized = inputPath.replace(/\\/g, "/").replace(/^\/+/, "");
    // Block any .. segments
    const segments = normalized.split("/");
    for (const seg of segments) {
      if (seg === "..") {
        throw new Error(`Path traversal detected: ${inputPath}`);
      }
    }
    return normalized;
  }

  private async cleanup(): Promise<void> {
    try {
      await rm(this.tmpDir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
}
