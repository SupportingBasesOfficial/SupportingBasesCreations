import { NextResponse } from 'next/server';
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
