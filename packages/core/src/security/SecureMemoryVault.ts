import type { OAuthToken } from "@sbc/shared";
import type { CloudKV } from "../cloud/CloudKV.js";

const SESSION_TTL_S = 60 * 60;
const SALT_BYTES = 16;
const KEY_BITS = 256;
const IV_BYTES = 12;

export class SecureMemoryVault {
  private masterKey: CryptoKey | null = null;
  private salt: Uint8Array | null = null;
  private kv: CloudKV | null = null;
  private fallbackStore = new Map<string, string>();
  private keyPrefix = "vault:";
  private createdAt = 0;
  private usingFallback = false;

  /**
   * Initialize the vault with a passphrase and optional CloudKV backend.
   * If CloudKV is not provided, falls back to in-memory storage (dev mode).
   * In production, always provide a CloudKV instance.
   */
  async init(passphrase: string, kv?: CloudKV): Promise<void> {
    this.salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
    this.masterKey = await this.deriveKey(passphrase, this.salt);
    this.createdAt = Date.now();

    if (kv) {
      this.kv = kv;
      this.usingFallback = false;
      await kv.set(
        `${this.keyPrefix}salt`,
        this.toBase64(this.salt),
        SESSION_TTL_S,
      );
    } else {
      this.kv = null;
      this.usingFallback = true;
      this.fallbackStore.set(`${this.keyPrefix}salt`, this.toBase64(this.salt));
      console.warn(
        "[SecureMemoryVault] CloudKV not provided — using in-memory fallback. " +
          "This is NOT suitable for production. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
      );
    }
  }

  async set(key: string, value: string): Promise<void> {
    this.ensureInitialized();
    this.ensureNotExpired();

    const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
    const encoded = new TextEncoder().encode(value);
    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv as BufferSource },
      this.masterKey!,
      encoded as BufferSource,
    );

    const stored = JSON.stringify({
      iv: this.toBase64(iv),
      ct: this.toBase64(new Uint8Array(ciphertext)),
    });
    await this.store(`${this.keyPrefix}${key}`, stored);
  }

  async get(key: string): Promise<string | null> {
    this.ensureInitialized();
    this.ensureNotExpired();

    const raw = await this.retrieve(`${this.keyPrefix}${key}`);
    if (!raw) return null;

    try {
      const { iv, ct } = JSON.parse(raw) as { iv: string; ct: string };
      const ivBytes = this.fromBase64(iv);
      const ctBytes = this.fromBase64(ct);

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: ivBytes as BufferSource },
        this.masterKey!,
        ctBytes as BufferSource,
      );
      return new TextDecoder().decode(decrypted);
    } catch {
      return null;
    }
  }

  async setToken(token: OAuthToken): Promise<void> {
    await this.set(`token:${token.provider}`, JSON.stringify(token));
  }

  async getToken(
    provider: "github" | "vercel" | "supabase",
  ): Promise<OAuthToken | null> {
    const raw = await this.get(`token:${provider}`);
    if (!raw) return null;
    try {
      const token = JSON.parse(raw) as OAuthToken;
      if (Date.now() > token.expiresAt) {
        await this.remove(`${this.keyPrefix}token:${provider}`);
        return null;
      }
      return token;
    } catch {
      return null;
    }
  }

  async clear(): Promise<void> {
    if (this.kv) {
      await this.kv.delete(`${this.keyPrefix}salt`).catch(() => {});
    }
    this.fallbackStore.clear();
    this.masterKey = null;
    this.salt = null;
    this.kv = null;
    this.usingFallback = false;
    this.createdAt = 0;
  }

  isExpired(): boolean {
    return Date.now() - this.createdAt > SESSION_TTL_S * 1000;
  }

  async has(key: string): Promise<boolean> {
    if (this.usingFallback) {
      return this.fallbackStore.has(`${this.keyPrefix}${key}`);
    }
    if (!this.kv) return false;
    return (await this.kv.get(`${this.keyPrefix}${key}`)) !== null;
  }

  private async deriveKey(
    passphrase: string,
    salt: Uint8Array,
  ): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(passphrase) as BufferSource,
      "PBKDF2",
      false,
      ["deriveKey"],
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt as BufferSource,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: KEY_BITS },
      false,
      ["encrypt", "decrypt"],
    );
  }

  private toBase64(bytes: Uint8Array): string {
    return btoa(String.fromCharCode(...bytes));
  }

  private fromBase64(b64: string): Uint8Array {
    const binary = atob(b64);
    return new Uint8Array([...binary].map((c) => c.charCodeAt(0)));
  }

  private ensureInitialized(): void {
    if (!this.masterKey || (!this.kv && !this.usingFallback)) {
      throw new Error("SecureVault not initialized. Call init() first.");
    }
  }

  private ensureNotExpired(): void {
    if (this.isExpired()) {
      this.clear();
      throw new Error("SecureVault session expired. Re-initialize with init().");
    }
  }

  private async store(key: string, value: string): Promise<void> {
    if (this.usingFallback) {
      this.fallbackStore.set(key, value);
    } else {
      await this.kv!.set(key, value, SESSION_TTL_S);
    }
  }

  private async retrieve(key: string): Promise<string | null> {
    if (this.usingFallback) {
      return this.fallbackStore.get(key) ?? null;
    }
    return this.kv!.get(key);
  }

  private async remove(key: string): Promise<void> {
    if (this.usingFallback) {
      this.fallbackStore.delete(key);
    } else {
      await this.kv!.delete(key);
    }
  }
}
