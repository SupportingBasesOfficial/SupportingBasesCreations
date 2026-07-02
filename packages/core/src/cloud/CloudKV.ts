export interface CloudKVLock {
  key: string;
  owner: string;
  expiresAt: number;
  release(): Promise<void>;
}

export interface CloudKV {
  get<T = string>(key: string): Promise<T | null>;
  set<T = string>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  incr(key: string, ttlSeconds?: number): Promise<number>;
  rpush(key: string, value: string): Promise<number>;
  lrange(key: string, start: number, stop: number): Promise<string[]>;
  acquireLock(key: string, owner: string, ttlSeconds: number): Promise<CloudKVLock | null>;
  releaseLock(key: string, owner: string): Promise<void>;
}
