import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class DockerGenerator implements Generator {
  readonly name = 'docker';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'Dockerfile',
      content: this.generateDockerfile(project),
      language: 'dockerfile',
    });

    artifacts.push({
      path: 'docker-compose.yml',
      content: this.generateDockerCompose(project),
      language: 'yaml',
    });

    artifacts.push({
      path: '.env.example',
      content: this.generateEnvExample(project),
      language: 'env',
    });

    artifacts.push({
      path: 'package.json',
      content: this.generatePackageJson(project),
      language: 'json',
    });

    return artifacts;
  }

  private generateDockerfile(_project: Project): string {
    return `FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT=3000
CMD ["node", "dist/server.js"]
`;
  }

  private generateDockerCompose(project: Project): string {
    const services: Record<string, unknown> = {
      app: {
        build: '.',
        ports: ['3000:3000'],
        environment: ['NODE_ENV=production', 'DATABASE_URL=postgresql://user:pass@db:5432/${project.name}'],
        depends_on: ['db'],
      },
      db: {
        image: 'postgres:16-alpine',
        environment: {
          POSTGRES_USER: 'user',
          POSTGRES_PASSWORD: 'pass',
          POSTGRES_DB: project.name,
        },
        volumes: ['postgres_data:/var/lib/postgresql/data'],
        ports: ['5432:5432'],
      },
    };

    if (project.options.infrastructure.cache !== 'NONE') {
      services.cache = {
        image: 'redis:7-alpine',
        ports: ['6379:6379'],
        volumes: ['redis_data:/data'],
      };
      (services.app as Record<string, unknown>).depends_on = ['db', 'cache'];
    }

    return `version: '3.8'

services:
${Object.entries(services).map(([name, config]) => `  ${name}:\n${this.yamlIndent(config, 4)}`).join('\n')}

volumes:
  postgres_data:
${project.options.infrastructure.cache !== 'NONE' ? '  redis_data:' : ''}
`;
  }

  private yamlIndent(obj: unknown, indent: number): string {
    const spaces = ' '.repeat(indent);
    if (typeof obj === 'string') return `${spaces}${obj}`;
    if (typeof obj === 'number') return `${spaces}${obj}`;
    if (typeof obj === 'boolean') return `${spaces}${obj}`;
    if (Array.isArray(obj)) return obj.map((v) => `${spaces}- ${v}`).join('\n');
    if (obj && typeof obj === 'object') {
      return Object.entries(obj).map(([k, v]) => {
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
          return `${spaces}${k}: ${v}`;
        }
        return `${spaces}${k}:\n${this.yamlIndent(v, indent + 2)}`;
      }).join('\n');
    }
    return `${spaces}${obj}`;
  }

  private generateEnvExample(project: Project): string {
    const lines: string[] = [
      `# ${project.name} Environment Variables`,
      `NODE_ENV=development`,
      `DATABASE_URL=postgresql://user:pass@localhost:5432/${project.name}`,
      '',
      `# NextAuth`,
      `NEXTAUTH_URL=http://localhost:3000`,
      `NEXTAUTH_SECRET=change-me`,
    ];

    if (project.hasFeature(FeatureFlag.AUTH_SSO)) {
      lines.push(`# SSO Provider`);
      lines.push(`SSO_CLIENT_ID=`);
      lines.push(`SSO_CLIENT_SECRET=`);
    }

    if (project.options.infrastructure.cache !== 'NONE') {
      lines.push(`REDIS_URL=redis://localhost:6379`);
    }

    return lines.join('\n') + '\n';
  }

  private generatePackageJson(project: Project): string {
    const deps: Record<string, string> = {
      next: '^14.0.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      '@trpc/server': '^10.45.0',
      '@trpc/client': '^10.45.0',
      '@trpc/react-query': '^10.45.0',
      '@tanstack/react-query': '^5.0.0',
      '@prisma/client': '^5.0.0',
      superjson: '^2.0.0',
      zod: '^3.22.0',
    };

    if (project.hasFeature(FeatureFlag.AUTH)) {
      deps['next-auth'] = '^4.24.0';
    }

    const devDeps: Record<string, string> = {
      typescript: '^5.4.0',
      '@types/node': '^20.0.0',
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      tailwindcss: '^3.4.0',
      postcss: '^8.4.0',
      autoprefixer: '^10.4.0',
      prisma: '^5.0.0',
      eslint: '^8.0.0',
      prettier: '^3.2.0',
    };

    const pkg = {
      name: project.name,
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
        db: 'prisma migrate dev',
        'db:seed': 'tsx prisma/seed.ts',
      },
      dependencies: deps,
      devDependencies: devDeps,
    };

    return JSON.stringify(pkg, null, 2) + '\n';
  }
}
