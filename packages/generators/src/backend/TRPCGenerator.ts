import { Project, Entity, Field, FeatureFlag, ArchitectureType, FieldType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class TRPCGenerator implements Generator {
  readonly name = 'trpc';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    const router = this.generateRouter(project);
    artifacts.push({
      path: 'src/server/api/routers/index.ts',
      content: router,
      language: 'typescript',
    });

    const contextFile = this.generateContext();
    artifacts.push({
      path: 'src/server/api/trpc.ts',
      content: contextFile,
      language: 'typescript',
    });

    const appRouter = this.generateAppRouter(project);
    artifacts.push({
      path: 'src/server/api/root.ts',
      content: appRouter,
      language: 'typescript',
    });

    return artifacts;
  }

  private generateAppRouter(project: Project): string {
    const imports = project.options.entities.map((e) => `import { ${this.camelCase(e.name)}Router } from './routers/${e.name.toLowerCase()}';`).join('\n');
    const routers = project.options.entities.map((e) => `  ${this.camelCase(e.name)}: ${this.camelCase(e.name)}Router,`).join('\n');

    return `import { createTRPCRouter } from './trpc';
${imports}

export const appRouter = createTRPCRouter({
${routers}
});

export type AppRouter = typeof appRouter;
`;
  }

  private generateRouter(project: Project): string {
    const lines: string[] = [];

    for (const entity of project.options.entities) {
      const router = this.generateEntityRouter(entity);
      lines.push(router);
    }

    return lines.join('\n\n');
  }

  private generateEntityRouter(entity: Entity): string {
    const entityName = entity.name;
    const camelName = this.camelCase(entityName);
    const lowerName = entityName.toLowerCase();

    return `import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { prisma } from '../../db';

export const ${camelName}Router = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return prisma.${lowerName}.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.${lowerName}.findUnique({ where: { id: input.id } });
    }),

  create: publicProcedure
    .input(z.object({
${this.generateZodSchema(entity)}
    }))
    .mutation(async ({ input }) => {
      return prisma.${lowerName}.create({ data: input });
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
${this.generateZodSchema(entity, true)}
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.${lowerName}.update({ where: { id }, data });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.${lowerName}.delete({ where: { id: input.id } });
    }),
});
`;
  }

  private generateZodSchema(entity: Entity, optional = false): string {
    const fields = entity.fields
      .filter((f) => f.name !== 'id' && !f.isRelation())
      .map((f) => {
        const zodType = this.mapFieldToZod(f);
        const suffix = optional || f.options.nullable ? `.optional()` : '';
        return `      ${f.name}: ${zodType}${suffix},`;
      })
      .join('\n');
    return fields;
  }

  private mapFieldToZod(field: Field): string {
    switch (field.type) {
      case FieldType.STRING:
      case FieldType.TEXT:
        return 'z.string()';
      case FieldType.INTEGER:
        return 'z.number().int()';
      case FieldType.BIGINT:
        return 'z.bigint()';
      case FieldType.DECIMAL:
      case FieldType.FLOAT:
        return 'z.number()';
      case FieldType.BOOLEAN:
        return 'z.boolean()';
      case FieldType.DATE:
      case FieldType.DATETIME:
      case FieldType.TIMESTAMP:
        return 'z.date()';
      case FieldType.JSON:
      case FieldType.JSONB:
        return 'z.record(z.unknown())';
      case FieldType.ENUM:
        const values = (field.options as Record<string, unknown>).enumValues as string[];
        return values ? `z.enum([${values.map((v) => `'${v}'`).join(', ')}])` : 'z.string()';
      default:
        return 'z.string()';
    }
  }

  private generateContext(): string {
    return `import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

const t = initTRPC.context().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
`;
  }

  private camelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
