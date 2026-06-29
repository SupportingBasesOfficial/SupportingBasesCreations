import { AsyncLocalStorage } from 'async_hooks';

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
