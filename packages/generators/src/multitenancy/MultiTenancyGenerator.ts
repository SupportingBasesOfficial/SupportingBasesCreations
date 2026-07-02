import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class MultiTenancyGenerator implements Generator {
  readonly name = 'multi-tenancy';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [FeatureFlag.MULTI_TENANT];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'src/lib/tenant/TenantContext.ts',
      content: this.generateTenantContext(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/tenant/TenantMiddleware.ts',
      content: this.generateTenantMiddleware(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/tenant/TenantRepository.ts',
      content: this.generateTenantRepository(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'prisma/migrations/000_add_tenant_rls.sql',
      content: this.generateRLSPolicies(project),
      language: 'sql',
    });

    artifacts.push({
      path: 'src/lib/tenant/TenantResolver.ts',
      content: this.generateTenantResolver(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/app/api/tenant/switch/route.ts',
      content: this.generateTenantSwitchRoute(),
      language: 'typescript',
    });

    return artifacts;
  }

  private generateTenantContext(): string {
    return `import { AsyncLocalStorage } from 'async_hooks';

export interface TenantContext {
  tenantId: string;
  tenantName: string;
  plan: 'free' | 'pro' | 'enterprise';
  features: string[];
  settings: Record<string, unknown>;
}

const tenantStorage = new AsyncLocalStorage<TenantContext>();

export function getTenantContext(): TenantContext | undefined {
  return tenantStorage.getStore();
}

export function runWithTenant<T>(tenant: TenantContext, fn: () => Promise<T>): Promise<T> {
  return tenantStorage.run(tenant, fn);
}

export function requireTenantContext(): TenantContext {
  const tenant = getTenantContext();
  if (!tenant) {
    throw new Error('Tenant context is required but not found');
  }
  return tenant;
}
`;
  }

  private generateTenantMiddleware(): string {
    return `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { runWithTenant, type TenantContext } from '../tenant/TenantContext';
import { TenantResolver } from './TenantResolver';

const resolver = new TenantResolver();

export async function tenantMiddleware(req: NextRequest) {
  const tenant = await resolver.resolve(req);

  if (!tenant) {
    return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
  }

  if (tenant.plan === 'free' && req.nextUrl.pathname.startsWith('/api/admin')) {
    return NextResponse.json({ error: 'Feature not available on free plan' }, { status: 403 });
  }

  return runWithTenant(tenant, async () => {
    const res = NextResponse.next();
    res.headers.set('x-tenant-id', tenant.tenantId);
    return res;
  });
}

export const config = {
  matcher: ['/api/:path*'],
};
`;
  }

  private generateTenantRepository(): string {
    return `import { prisma } from '../db';
import type { TenantContext } from './TenantContext';

export class TenantRepository {
  async findById(id: string): Promise<TenantContext | null> {
    const row = await prisma.tenant.findUnique({ where: { id } });
    if (!row) return null;
    return this.toContext(row);
  }

  async findByDomain(domain: string): Promise<TenantContext | null> {
    const row = await prisma.tenant.findUnique({ where: { domain } });
    if (!row) return null;
    return this.toContext(row);
  }

  async findBySlug(slug: string): Promise<TenantContext | null> {
    const row = await prisma.tenant.findUnique({ where: { slug } });
    if (!row) return null;
    return this.toContext(row);
  }

  async create(data: { name: string; slug: string; domain?: string; plan?: string }): Promise<TenantContext> {
    const row = await prisma.tenant.create({
      data: {
        ...data,
        plan: data.plan || 'free',
        features: [],
        settings: {},
      },
    });
    return this.toContext(row);
  }

  async updateFeatures(tenantId: string, features: string[]): Promise<void> {
    await prisma.tenant.update({
      where: { id: tenantId },
      data: { features },
    });
  }

  private toContext(row: unknown): TenantContext {
    const r = row as Record<string, unknown>;
    return {
      tenantId: r.id as string,
      tenantName: r.name as string,
      plan: r.plan as 'free' | 'pro' | 'enterprise',
      features: (r.features as string[]) ?? [],
      settings: (r.settings as Record<string, unknown>) ?? {},
    };
  }
}

export const tenantRepository = new TenantRepository();
`;
  }

  private generateRLSPolicies(project: Project): string {
    const entities = project.options.entities.map((e) => e.name.toLowerCase());

    const policies = entities.map((entity) => `
-- RLS for ${entity}
ALTER TABLE "${entity}" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "${entity}_tenant_isolation" ON "${entity}"
  USING ("tenantId" = current_setting('app.current_tenant', true));

CREATE POLICY "${entity}_tenant_insert" ON "${entity}"
  WITH CHECK ("tenantId" = current_setting('app.current_tenant', true));
`).join('\n');

    return `-- Multi-tenancy RLS Policies for ${project.name}
-- Apply after running prisma migrate dev

${policies}
`;
  }

  private generateTenantResolver(): string {
    return `import type { NextRequest } from 'next/server';
import { tenantRepository } from './TenantRepository';
import type { TenantContext } from './TenantContext';

export class TenantResolver {
  async resolve(req: NextRequest): Promise<TenantContext | null> {
    const slug = req.headers.get('x-tenant-slug');
    if (slug) {
      return tenantRepository.findBySlug(slug);
    }

    const domain = req.headers.get('host')?.split(':')[0];
    if (domain) {
      return tenantRepository.findByDomain(domain);
    }

    const tenantId = req.headers.get('x-tenant-id');
    if (tenantId) {
      return tenantRepository.findById(tenantId);
    }

    const subdomains = domain?.split('.');
    if (subdomains && subdomains.length > 2) {
      return tenantRepository.findBySlug(subdomains[0]);
    }

    return null;
  }
}
`;
  }

  private generateTenantSwitchRoute(): string {
    return `import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { tenantRepository } from '../../../lib/tenant/TenantRepository';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: Request) {
  const { tenantId } = await req.json();

  const tenant = await tenantRepository.findById(tenantId);
  if (!tenant) {
    return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
  }

  const token = await generateTenantToken(tenant);

  return NextResponse.json({
    tenant: {
      id: tenant.tenantId,
      name: tenant.tenantName,
      plan: tenant.plan,
    },
    token,
  });
}

/**
 * Generate a tenant-scoped JWT using Supabase service role.
 * The token includes tenant claims in app_metadata for RLS policies.
 */
async function generateTenantToken(tenant: {
  tenantId: string;
  tenantName: string;
  plan: string;
}): Promise<string> {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Set tenant context in the user's app_metadata for RLS
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: \`tenant-\${tenant.tenantId}@app.local\`,
    options: {
      data: {
        tenantId: tenant.tenantId,
        tenantName: tenant.tenantName,
        plan: tenant.plan,
      },
    },
  });

  if (error || !data) {
    throw new Error(\`Failed to generate tenant token: \${error?.message ?? 'unknown'}\`);
  }

  // Return the properties.action_link which contains the token
  const url = new URL((data.properties as Record<string, string>)?.action_link ?? '');
  const token = url.searchParams.get('access_token');

  if (!token) {
    throw new Error('No access_token in generated link');
  }

  return token;
}
`;
  }
}
