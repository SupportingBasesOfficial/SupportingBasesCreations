import {
  Project,
  Entity,
  Field,
  FeatureFlag,
  ArchitectureType,
  FieldType,
} from "@sbc/core";
import type { Generator, GenerationContext } from "@sbc/core";
import type { GeneratedArtifact } from "@sbc/shared";

export class TRPCGenerator implements Generator {
  readonly name = "trpc";
  readonly version = "1.0.0";
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    const contextFile = this.generateContext();
    artifacts.push({
      path: "src/server/api/trpc.ts",
      content: contextFile,
      language: "typescript",
    });

    const dbClient = this.generateDbClient();
    artifacts.push({
      path: "src/server/db.ts",
      content: dbClient,
      language: "typescript",
    });

    for (const entity of project.options.entities) {
      const router = this.generateEntityRouter(entity);
      artifacts.push({
        path: `src/server/api/routers/${entity.name.toLowerCase()}.ts`,
        content: router,
        language: "typescript",
      });
    }

    const appRouter = this.generateAppRouter(project);
    artifacts.push({
      path: "src/server/api/root.ts",
      content: appRouter,
      language: "typescript",
    });

    const trpcRoute = this.generateTrpcRoute();
    artifacts.push({
      path: "src/app/api/trpc/[trpc]/route.ts",
      content: trpcRoute,
      language: "typescript",
    });

    return artifacts;
  }

  private generateAppRouter(project: Project): string {
    const imports = project.options.entities
      .map(
        (e) =>
          `import { ${this.camelCase(e.name)}Router } from './routers/${e.name.toLowerCase()}';`,
      )
      .join("\n");
    const routers = project.options.entities
      .map(
        (e) => `  ${this.camelCase(e.name)}: ${this.camelCase(e.name)}Router,`,
      )
      .join("\n");

    return `import { createTRPCRouter } from './trpc';
${imports}

export const appRouter = createTRPCRouter({
${routers}
});

export type AppRouter = typeof appRouter;
`;
  }

  private generateTrpcRoute(): string {
    return `import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: req.headers }),
  });

export { handler as GET, handler as POST };
`;
  }

  private generateDbClient(): string {
    return `import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
`;
  }

  private generateEntityRouter(entity: Entity): string {
    const entityName = entity.name;
    const camelName = this.camelCase(entityName);
    const lowerName = entityName.toLowerCase();

    return `import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from '../../db';

export const ${camelName}Router = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { limit, cursor } = input;
      const items = await prisma.${lowerName}.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        orderBy: { createdAt: 'desc' },
      });
      const nextCursor = items.length > limit ? items[items.length - 1].id : undefined;
      return { items: items.slice(0, limit), nextCursor };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.${lowerName}.findUnique({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .input(z.object({
${this.generateZodSchema(entity)}
    }))
    .mutation(async ({ input }) => {
      return prisma.${lowerName}.create({ data: input });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
${this.generateZodSchema(entity, true)}
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.${lowerName}.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.${lowerName}.delete({ where: { id: input.id } });
    }),
});
`;
  }

  private generateZodSchema(entity: Entity, optional = false): string {
    const fields = entity.fields
      .filter((f) => f.name !== "id" && !f.isRelation())
      .map((f) => {
        const zodType = this.mapFieldToZod(f);
        const suffix = optional || f.options.nullable ? `.optional()` : "";
        return `      ${f.name}: ${zodType}${suffix},`;
      })
      .join("\n");
    return fields;
  }

  private mapFieldToZod(field: Field): string {
    switch (field.type) {
      case FieldType.STRING:
      case FieldType.TEXT:
        return "z.string()";
      case FieldType.INTEGER:
        return "z.number().int()";
      case FieldType.BIGINT:
        return "z.bigint()";
      case FieldType.DECIMAL:
      case FieldType.FLOAT:
        return "z.number()";
      case FieldType.BOOLEAN:
        return "z.boolean()";
      case FieldType.DATE:
      case FieldType.DATETIME:
      case FieldType.TIMESTAMP:
        return "z.date()";
      case FieldType.JSON:
      case FieldType.JSONB:
        return "z.record(z.unknown())";
      case FieldType.ENUM:
        const values = (field.options as Record<string, unknown>)
          .enumValues as string[];
        return values
          ? `z.enum([${values.map((v) => `'${v}'`).join(", ")}])`
          : "z.string()";
      default:
        return "z.string()";
    }
  }

  private generateContext(): string {
    return `import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { getServerAuthSession } from '../auth';

export async function createTRPCContext(opts: { headers: Headers }) {
  const session = await getServerAuthSession();
  return {
    session,
    headers: opts.headers,
  };
};

const t = initTRPC.context(createTRPCContext).create({
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

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
`;
  }

  private camelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
