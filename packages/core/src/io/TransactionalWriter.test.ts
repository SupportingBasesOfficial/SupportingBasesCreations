import { describe, it, expect } from 'vitest';
import { TransactionalWriter } from './TransactionalWriter.js';
import type { CloudStorage, CloudKV, CloudStorageItem } from '../cloud/index.js';

function createMockStorage(): CloudStorage {
  const store = new Map<string, string>();
  return {
    upload: async (item: CloudStorageItem) => {
      store.set(item.key, typeof item.content === 'string' ? item.content : '');
      return { key: item.key, url: `mock://${item.key}`, size: 0 };
    },
    uploadMany: async (items: CloudStorageItem[]) => {
      for (const item of items) {
        store.set(item.key, typeof item.content === 'string' ? item.content : '');
      }
      return items.map(item => ({ key: item.key, url: `mock://${item.key}`, size: 0 }));
    },
    download: async (key: string) => store.get(key) ?? null,
    delete: async (key: string) => { store.delete(key); },
    deleteMany: async (keys: string[]) => { for (const k of keys) store.delete(k); },
    list: async (prefix: string) => {
      return Array.from(store.keys()).filter(k => k.startsWith(prefix));
    },
    exists: async (key: string) => store.has(key),
  };
}

function createMockKV(): CloudKV {
  const store = new Map<string, string>();
  return {
    get: async <T = string>(key: string): Promise<T | null> => (store.get(key) as T) ?? null,
    set: async <T = string>(key: string, value: T, _ttl?: number): Promise<void> => {
      store.set(key, typeof value === 'string' ? value : JSON.stringify(value));
    },
    delete: async (key: string) => { store.delete(key); },
    exists: async (key: string) => store.has(key),
    incr: async (key: string, _ttl?: number) => {
      const v = (parseInt(store.get(key) ?? '0', 10) + 1);
      store.set(key, v.toString());
      return v;
    },
    rpush: async (key: string, value: string) => {
      const list = JSON.parse(store.get(key) ?? '[]') as string[];
      list.push(value);
      store.set(key, JSON.stringify(list));
      return list.length;
    },
    lrange: async (key: string, start: number, stop: number) => {
      const list = JSON.parse(store.get(key) ?? '[]') as string[];
      if (stop < 0) stop = list.length + stop + 1;
      return list.slice(start, stop);
    },
    acquireLock: async (_key: string, _owner: string, _ttl: number) => null,
    releaseLock: async (_key: string, _owner: string) => {},
  };
}

describe('TransactionalWriter', () => {
  it('should write to cloud storage and commit atomically', async () => {
    const storage = createMockStorage();
    const kv = createMockKV();
    const writer = new TransactionalWriter('prefix', 500, storage, kv);
    await writer.initialize();
    await writer.write({ path: 'src/index.ts', content: 'console.log(1)' });
    await writer.commit();

    expect(await storage.exists('prefix/src/index.ts')).toBe(true);
    expect(await storage.download('prefix/src/index.ts')).toBe('console.log(1)');
  });

  it('should rollback and not write anything', async () => {
    const storage = createMockStorage();
    const kv = createMockKV();
    const writer = new TransactionalWriter('prefix', 500, storage, kv);
    await writer.initialize();
    await writer.write({ path: 'a.ts', content: 'a' });
    await writer.rollback();

    expect(await storage.exists('prefix/a.ts')).toBe(false);
  });

  it('should block path traversal', async () => {
    const storage = createMockStorage();
    const kv = createMockKV();
    const writer = new TransactionalWriter('prefix', 500, storage, kv);
    await writer.initialize();
    await expect(writer.write({ path: '../../../etc/passwd', content: 'x' })).rejects.toThrow('Path traversal');
  });

  it('should prevent writes after commit', async () => {
    const storage = createMockStorage();
    const kv = createMockKV();
    const writer = new TransactionalWriter('prefix', 500, storage, kv);
    await writer.initialize();
    await writer.write({ path: 'a.ts', content: 'a' });
    await writer.commit();
    await expect(writer.write({ path: 'b.ts', content: 'b' })).rejects.toThrow('committed');
  });
});
