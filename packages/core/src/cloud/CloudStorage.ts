export interface CloudStorageItem {
  key: string;
  content: string | Uint8Array;
  contentType?: string;
  metadata?: Record<string, string>;
}

export interface CloudStorageResult {
  key: string;
  url: string;
  size: number;
}

export interface CloudStorage {
  upload(item: CloudStorageItem): Promise<CloudStorageResult>;
  uploadMany(items: CloudStorageItem[]): Promise<CloudStorageResult[]>;
  download(key: string): Promise<string | Uint8Array | null>;
  delete(key: string): Promise<void>;
  deleteMany(keys: string[]): Promise<void>;
  list(prefix: string): Promise<string[]>;
  exists(key: string): Promise<boolean>;
}
