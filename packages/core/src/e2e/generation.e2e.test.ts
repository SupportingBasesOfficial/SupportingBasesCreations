import { describe, it, expect } from 'vitest';
import { Project, Entity, Field, GenerationEngine, GeneratorRegistry, TransactionalWriter } from '../index.js';
import { ArchitectureType, ProviderConfig } from '../index.js';
import type { Generator, GenerationContext } from '../index.js';
import type { GeneratedArtifact } from '@sbc/shared';
import { rm, stat, readFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';

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

describe('Generation E2E', () => {
  async function createTempDir(): Promise<string> {
    const nonce = randomBytes(8).toString('hex');
    return join(tmpdir(), `sbc-e2e-${nonce}`);
  }

  async function cleanup(dir: string): Promise<void> {
    try {
      await rm(dir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }

  it('should generate and write real artifacts to disk', async () => {
    const outputDir = await createTempDir();
    try {
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
      const result = await engine.generate({ project, outputDir });

      expect(result.success).toBe(true);
      expect(result.artifacts.length).toBeGreaterThan(0);

      const writer = new TransactionalWriter(outputDir);
      await writer.initialize();
      for (const artifact of result.artifacts) {
        await writer.write({ path: artifact.path, content: artifact.content });
      }
      await writer.commit();

      for (const artifact of result.artifacts) {
        const filePath = join(outputDir, artifact.path);
        const s = await stat(filePath);
        expect(s.isFile()).toBe(true);
        const content = await readFile(filePath, 'utf-8');
        expect(content.length).toBeGreaterThan(0);
      }

      const schemaPath = join(outputDir, 'prisma/schema.prisma');
      const schemaContent = await readFile(schemaPath, 'utf-8');
      expect(schemaContent).toContain('model User');
    } finally {
      await cleanup(outputDir);
    }
  });

  it('should rollback on write failure and leave no partial state', async () => {
    const outputDir = await createTempDir();
    try {
      const writer = new TransactionalWriter(outputDir);
      await writer.initialize();
      await writer.write({ path: 'test.txt', content: 'hello' });
      await writer.rollback();

      const files = await readFile(join(outputDir, 'test.txt'), 'utf-8').catch(() => null);
      expect(files).toBeNull();
    } finally {
      await cleanup(outputDir);
    }
  });
});
