import { Project, Entity, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class NextJSGenerator implements Generator {
  readonly name = 'nextjs';
  readonly version = '1.0.0';
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

    return artifacts;
  }

  private generatePages(project: Project): GeneratedArtifact[] {
    const artifacts: GeneratedArtifact[] = [];

    for (const entity of project.options.entities) {
      const page = this.generateListPage(entity);
      artifacts.push({
        path: `src/app/${entity.name.toLowerCase()}s/page.tsx`,
        content: page,
        language: 'typescript',
      });

      const detailPage = this.generateDetailPage(entity);
      artifacts.push({
        path: `src/app/${entity.name.toLowerCase()}s/[id]/page.tsx`,
        content: detailPage,
        language: 'typescript',
      });
    }

    return artifacts;
  }

  private generateListPage(entity: Entity): string {
    return `'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function ${entity.name}ListPage() {
  const [search, setSearch] = useState('');
  const { data: items, isLoading } = api.${this.camelCase(entity.name)}.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">${entity.name}s</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <div className="grid gap-4">
        {items?.map((item) => (
          <Link
            key={item.id}
            href={\`/${entity.name.toLowerCase()}s/\${item.id}\`}
            className="border p-4 rounded hover:bg-gray-50"
          >
            <h2 className="font-semibold">{item.name || item.id}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
`;
  }

  private generateDetailPage(entity: Entity): string {
    return `'use client';

import { useParams } from 'next/navigation';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function ${entity.name}DetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: item, isLoading } = api.${this.camelCase(entity.name)}.getById.useQuery({ id });

  if (isLoading) return <div>Loading...</div>;
  if (!item) return <div>Not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Link href="/${entity.name.toLowerCase()}s" className="text-blue-500 hover:underline">
        ← Back to ${entity.name}s
      </Link>
      <h1 className="text-2xl font-bold mt-4">{item.name || item.id}</h1>
      <div className="mt-4 space-y-2">
${entity.fields.filter((f) => !f.isRelation()).map((f) => `        <p><strong>${f.name}:</strong> {String(item.${f.name})}</p>`).join('\n')}
      </div>
    </div>
  );
}
`;
  }

  private generateComponents(): GeneratedArtifact[] {
    return [{
      path: 'src/trpc/react.tsx',
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
      language: 'typescript',
    }, {
      path: 'src/trpc/client.ts',
      content: `import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/api/root';

export const api = createTRPCReact<AppRouter>();
`,
      language: 'typescript',
    }];
  }

  private camelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
