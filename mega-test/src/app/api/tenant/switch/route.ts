import { NextResponse } from 'next/server';
import { tenantRepository } from '../../../lib/tenant/TenantRepository';

export async function POST(req: Request) {
  const { tenantId } = await req.json();

  const tenant = await tenantRepository.findById(tenantId);
  if (!tenant) {
    return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
  }

  return NextResponse.json({
    tenant: {
      id: tenant.tenantId,
      name: tenant.tenantName,
      plan: tenant.plan,
    },
    token: await generateTenantToken(tenant),
  });
}

async function generateTenantToken(tenant: { tenantId: string }): Promise<string> {
  // TODO: Implement JWT signing with tenant claims
  return 'tenant-jwt-placeholder';
}
