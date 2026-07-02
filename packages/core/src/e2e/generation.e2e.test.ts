import { describe, it, expect } from 'vitest';
import { Project, Entity, Field, GenerationEngine, GeneratorRegistry, TransactionalWriter } from '../index.js';
import { ArchitectureType, ProviderConfig } from '../index.js';
import type { Generator, GenerationContext } from '../index.js';
import type { GeneratedArtifact } from '@sbc/shared';
import type { CloudStorage, CloudKV, CloudStorageItem } from '../cloud/index.js';

const mockPrismaGenerator = {
  name: 'prisma-mock',
  version: '1.0.0',
  supportedFeatures: [] as string[],
  supportedArchitectures: [ArchitectureType.MODULAR_MONOLITH] as string[],
  generate: async (_ctx: GenerationContext): Promise<GeneratedArtifact[]> => {
    return [
      {
        path: 'prisma/schema.prisma',
        content: 'model User {\n  id String @id @default(uuid())\n  email String @unique\n  name String\n}',
        language: 'prisma',
      },
      {
        path: 'prisma/seed.ts',
        content: '// seed script',
        language: 'typescript',
      },
    ];
  },
};

function createMockStorage(): CloudStorage {
  const store = new Map<string, string>();
  return {
    upload: async (item: CloudStorageItem) => {
      store.set(item.key, typeof item.content === 'string' ? item.content : '');
      return { key: item.key, url: `mock://${item.key}`, size: 0 };
    },
    uploadMany: async (items: CloudStorageItem[]) => {
      for (const item of items) store.set(item.key, typeof item.content === 'string' ? item.content : '');
      return items.map(item => ({ key: item.key, url: `mock://${item.key}`, size: 0 }));
    },
    download: async (key: string) => store.get(key) ?? null,
    delete: async (key: string) => { store.delete(key); },
    deleteMany: async (keys: string[]) => { for (const k of keys) store.delete(k); },
    list: async (prefix: string) => Array.from(store.keys()).filter(k => k.startsWith(prefix)),
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

describe('Generation E2E', () => {
  it('should generate and write real artifacts to cloud storage', async () => {
    const storage = createMockStorage();
    const kv = createMockKV();

    const project = new Project('e2e-test', {
      architecture: ArchitectureType.MODULAR_MONOLITH,
      providers: [ProviderConfig.oauthGoogle()],
      entities: [
        new Entity('User', [
          Field.uuid('id').primary(),
          Field.string('email').unique().required(),
          Field.string('name').required(),
          Field.datetime('createdAt').required(),
          Field.datetime('updatedAt').required(),
        ]),
      ],
    });

    const registry = new GeneratorRegistry();
    registry.register(mockPrismaGenerator as Generator);

    const engine = new GenerationEngine(registry);
    const result = await engine.generate({ project, outputDir: 'e2e-test' });

    expect(result.success).toBe(true);
    expect(result.artifacts.length).toBeGreaterThan(0);

    const writer = new TransactionalWriter('e2e-test', 500, storage, kv);
    await writer.initialize();
    for (const artifact of result.artifacts) {
      await writer.write({ path: artifact.path, content: artifact.content });
    }
    await writer.commit();

    for (const artifact of result.artifacts) {
      const exists = await storage.exists(`e2e-test/${artifact.path}`);
      expect(exists).toBe(true);
      const content = await storage.download(`e2e-test/${artifact.path}`);
      expect(content).not.toBeNull();
      expect((content as string).length).toBeGreaterThan(0);
    }

    const schemaContent = await storage.download('e2e-test/prisma/schema.prisma');
    expect(schemaContent).toContain('model User');
  });

  it('should rollback on write failure and leave no partial state', async () => {
    const storage = createMockStorage();
    const kv = createMockKV();

    const writer = new TransactionalWriter('e2e-rollback', 500, storage, kv);
    await writer.initialize();
    await writer.write({ path: 'test.txt', content: 'hello' });
    await writer.rollback();

    const exists = await storage.exists('e2e-rollback/test.txt');
    expect(exists).toBe(false);
  });
});
