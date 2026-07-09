import { Project, Entity, FeatureFlag, ArchitectureType } from "@sbc/core";
import type { Generator, GenerationContext } from "@sbc/core";
import type { GeneratedArtifact } from "@sbc/shared";

export class NextJSGenerator implements Generator {
  readonly name = "nextjs";
  readonly version = "1.0.0";
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    const pages = this.generatePages(project);
    for (const page of pages) {
      artifacts.push(page);
    }

    const components = this.generateComponents();
    for (const component of components) {
      artifacts.push(component);
    }

    artifacts.push({
      path: "src/app/layout.tsx",
      content: this.generateRootLayout(project),
      language: "typescript",
    });

    artifacts.push({
      path: "src/app/globals.css",
      content: this.generateGlobalCSS(),
      language: "css",
    });

    return artifacts;
  }

  private generatePages(project: Project): GeneratedArtifact[] {
    const artifacts: GeneratedArtifact[] = [];

    for (const entity of project.options.entities) {
      const page = this.generateListPage(entity);
      artifacts.push({
        path: `src/app/${entity.name.toLowerCase()}s/page.tsx`,
        content: page,
        language: "typescript",
      });

      const detailPage = this.generateDetailPage(entity);
      artifacts.push({
        path: `src/app/${entity.name.toLowerCase()}s/[id]/page.tsx`,
        content: detailPage,
        language: "typescript",
      });
    }

    return artifacts;
  }

  private generateListPage(entity: Entity): string {
    const lowerName = entity.name.toLowerCase();
    const camelName = this.camelCase(entity.name);

    return `'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function ${entity.name}ListPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, error } = api.${camelName}.getAll.useQuery();
  const items = data?.items ?? [];
  const filtered = items.filter((item: Record<string, unknown>) =>
    Object.values(item).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">${entity.name}s</h1>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border p-4 dark:border-gray-800">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="mt-2 h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">${entity.name}s</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <p className="text-red-700 dark:text-red-400" role="alert">
            Erro ao carregar: {error?.message ?? 'Erro desconhecido'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">${entity.name}s</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        aria-label="Buscar ${entity.name}s"
      />
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Nenhum ${entity.name.toLowerCase()} encontrado.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((item: Record<string, unknown>) => (
            <Link
              key={String(item.id)}
              href={\`/${lowerName}s/\${item.id}\`}
              className="border p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors dark:border-gray-800"
            >
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                {String(item.name ?? item.id)}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
`;
  }

  private generateDetailPage(entity: Entity): string {
    const lowerName = entity.name.toLowerCase();
    const camelName = this.camelCase(entity.name);
    const fieldLines = entity.fields
      .filter((f) => !f.isRelation())
      .map(
        (f) => `        <div>
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">${f.name}</dt>
          <dd className="mt-1 text-gray-900 dark:text-gray-100">{String(item.${f.name} ?? '—')}</dd>
        </div>`,
      )
      .join("\n");

    return `'use client';

import { useParams } from 'next/navigation';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function ${entity.name}DetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: item, isLoading, isError } = api.${camelName}.getById.useQuery({ id });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
          <p className="text-red-700 dark:text-red-400" role="alert">
            ${entity.name} não encontrado.
          </p>
        </div>
        <Link href="/${lowerName}s" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
          ← Voltar para ${entity.name}s
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Link href="/${lowerName}s" className="text-blue-600 dark:text-blue-400 hover:underline">
        ← Voltar para ${entity.name}s
      </Link>
      <h1 className="text-2xl font-bold mt-4 mb-6 text-gray-900 dark:text-gray-100">
        {String(item.name ?? item.id)}
      </h1>
      <dl className="space-y-4">
${fieldLines}
      </dl>
    </div>
  );
}
`;
  }

  private generateRootLayout(project: Project): string {
    return `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TRPCProvider } from '@/trpc/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: '${project.name}',
    template: \`%s | ${project.name}\`,
  },
  description: 'Aplicação gerada com SupportingBasesCreations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={\`\${inter.className} bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100\`}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
`;
  }

  private generateGlobalCSS(): string {
    return `@import 'tailwindcss';

@layer base {
  :root {
    color-scheme: light dark;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply antialiased;
  }
}
`;
  }

  private generateComponents(): GeneratedArtifact[] {
    return [
      {
        path: "src/trpc/react.tsx",
        content: `'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { api } from './client';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [httpBatchLink({ url: '/api/trpc' })],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </api.Provider>
  );
}
`,
        language: "typescript",
      },
      {
        path: "src/trpc/client.ts",
        content: `import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/api/root';

export const api = createTRPCReact<AppRouter>();
`,
        language: "typescript",
      },
    ];
  }

  private camelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
