import type { CloudStorage, CloudStorageItem, CloudStorageResult } from "./CloudStorage.js";

export class VercelBlobStorage implements CloudStorage {
  private token: string;
  private storeId?: string;

  constructor(options: { token: string; storeId?: string }) {
    this.token = options.token;
    this.storeId = options.storeId;
  }

  private get headers(): Record<string, string> {
    const h: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
    if (this.storeId) h["x-vercel-blob-store-id"] = this.storeId;
    return h;
  }

  async upload(item: CloudStorageItem): Promise<CloudStorageResult> {
    const body = {
      pathname: item.key,
      contentType: item.contentType ?? "text/plain",
      addRandomSuffix: false,
    };

    const res = await fetch("https://blob.vercel.com/v1", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Vercel Blob upload failed: ${await res.text()}`);

    const { uploadUrl } = (await res.json()) as { uploadUrl: string };

    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": item.contentType ?? "text/plain" },
      body:
        typeof item.content === "string"
          ? item.content
          : new Blob([new Uint8Array(item.content).buffer]),
    });

    if (!uploadRes.ok) throw new Error(`Vercel Blob PUT failed: ${await uploadRes.text()}`);

    const finalRes = await fetch("https://blob.vercel.com/v1", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ pathname: item.key, addRandomSuffix: false }),
    });

    const data = (await finalRes.json()) as { url: string; size: number; pathname: string };

    return {
      key: data.pathname,
      url: data.url,
      size: data.size,
    };
  }

  async uploadMany(items: CloudStorageItem[]): Promise<CloudStorageResult[]> {
    return Promise.all(items.map((item) => this.upload(item)));
  }

  async download(key: string): Promise<string | Uint8Array | null> {
    const res = await fetch(`https://blob.vercel.com/${encodeURIComponent(key)}`, {
      headers: this.headers,
    });
    if (!res.ok) return null;
    return res.text();
  }

  async delete(key: string): Promise<void> {
    await fetch("https://blob.vercel.com/v1", {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({ pathname: key }),
    });
  }

  async deleteMany(keys: string[]): Promise<void> {
    await Promise.all(keys.map((key) => this.delete(key)));
  }

  async list(prefix: string): Promise<string[]> {
    const res = await fetch(`https://blob.vercel.com?v2=1&prefix=${encodeURIComponent(prefix)}`, {
      headers: this.headers,
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { blobs: { pathname: string }[] };
    return data.blobs.map((b) => b.pathname);
  }

  async exists(key: string): Promise<boolean> {
    const items = await this.list(key);
    return items.length > 0;
  }
}
