import type { OAuthToken } from "@sbc/shared";

const SESSION_TTL_MS = 60 * 60 * 1000;
const SALT_BYTES = 16;
const KEY_BITS = 256;
const IV_BYTES = 12;

export class SecureMemoryVault {
  private masterKey: CryptoKey | null = null;
  private salt: Uint8Array | null = null;
  private vault = new Map<
    string,
    { iv: Uint8Array; ciphertext: ArrayBuffer }
  >();
  private createdAt = 0;

  async init(passphrase: string): Promise<void> {
    this.salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
    this.masterKey = await this.deriveKey(passphrase, this.salt);
    this.createdAt = Date.now();
    this.vault.clear();
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

    this.vault.set(key, { iv, ciphertext });
  }

  async get(key: string): Promise<string | null> {
    this.ensureInitialized();
    this.ensureNotExpired();

    const entry = this.vault.get(key);
    if (!entry) return null;

    try {
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: entry.iv as BufferSource },
        this.masterKey!,
        entry.ciphertext,
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
        this.vault.delete(`token:${provider}`);
        return null;
      }
      return token;
    } catch {
      return null;
    }
  }

  clear(): void {
    this.vault.clear();
    this.masterKey = null;
    this.salt = null;
    this.createdAt = 0;
  }

  isExpired(): boolean {
    return Date.now() - this.createdAt > SESSION_TTL_MS;
  }

  has(key: string): boolean {
    return this.vault.has(key);
  }

  keys(): string[] {
    return Array.from(this.vault.keys());
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

  private ensureInitialized(): void {
    if (!this.masterKey) {
      throw new Error("SecureMemoryVault not initialized. Call init() first.");
    }
  }

  private ensureNotExpired(): void {
    if (this.isExpired()) {
      this.clear();
      throw new Error(
        "SecureMemoryVault session expired. Re-initialize with init().",
      );
    }
  }
}
