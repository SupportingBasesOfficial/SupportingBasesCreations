import type { NextRequest } from 'next/server';
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
