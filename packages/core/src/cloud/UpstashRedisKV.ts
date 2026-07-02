import type { CloudKV, CloudKVLock } from "./CloudKV.js";

export class UpstashRedisKV implements CloudKV {
  private url: string;
  private token: string;

  constructor(options: { url: string; token: string }) {
    this.url = options.url.replace(/\/$/, "");
    this.token = options.token;
  }

  private get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  private async command<T>(...args: (string | number)[]): Promise<T> {
    const res = await fetch(`${this.url}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(args),
    });
    if (!res.ok) throw new Error(`Upstash command failed: ${await res.text()}`);
    const data = (await res.json()) as { result: T };
    return data.result;
  }

  async get<T = string>(key: string): Promise<T | null> {
    const result = await this.command<string | null>("GET", key);
    if (result === null) return null;
    try {
      return JSON.parse(result) as T;
    } catch {
      return result as unknown as T;
    }
  }

  async set<T = string>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    if (ttlSeconds) {
      await this.command("SET", key, serialized, "EX", ttlSeconds);
    } else {
      await this.command("SET", key, serialized);
    }
  }

  async delete(key: string): Promise<void> {
    await this.command("DEL", key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.command<number>("EXISTS", key);
    return result === 1;
  }

  async incr(key: string, ttlSeconds?: number): Promise<number> {
    const result = await this.command<number>("INCR", key);
    if (ttlSeconds && result === 1) {
      await this.command("EXPIRE", key, ttlSeconds);
    }
    return result;
  }

  async rpush(key: string, value: string): Promise<number> {
    return this.command<number>("RPUSH", key, value);
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    return this.command<string[]>("LRANGE", key, start, stop);
  }

  async acquireLock(key: string, owner: string, ttlSeconds: number): Promise<CloudKVLock | null> {
    const lockKey = `lock:${key}`;
    const result = await this.command<string | null>("SET", lockKey, owner, "NX", "EX", ttlSeconds);
    if (result === null) return null;

    return {
      key: lockKey,
      owner,
      expiresAt: Date.now() + ttlSeconds * 1000,
      release: async () => {
        const script = `if redis.call("GET", KEYS[1]) == ARGV[1] then return redis.call("DEL", KEYS[1]) else return 0 end`;
        await fetch(`${this.url}/eval`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify([script, 1, lockKey, owner]),
        });
      },
    };
  }

  async releaseLock(key: string, owner: string): Promise<void> {
    const lockKey = `lock:${key}`;
    const script = `if redis.call("GET", KEYS[1]) == ARGV[1] then return redis.call("DEL", KEYS[1]) else return 0 end`;
    await fetch(`${this.url}/eval`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify([script, 1, lockKey, owner]),
    });
  }
}
