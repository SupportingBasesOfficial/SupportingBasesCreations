export const FLAGS = {
  NEW_DASHBOARD: 'new-dashboard',
  BETA_FEATURES: 'beta-features',
  DARK_MODE: 'dark-mode',
  ADVANCED_ANALYTICS: 'advanced-analytics',
  MULTI_TENANT_V2: 'multi-tenant-v2',
} as const;

export type FlagKey = (typeof FLAGS)[keyof typeof FLAGS];
