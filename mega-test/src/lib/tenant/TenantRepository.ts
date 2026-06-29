import { prisma } from '../db';
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
