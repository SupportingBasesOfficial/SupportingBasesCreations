import { ReactNode } from 'react';
import { featureFlags } from '../features/FeatureFlagService';

interface FeatureGateProps {
  flag: string;
  children: ReactNode;
  fallback?: ReactNode;
  userId?: string;
  segment?: string;
}

export function FeatureGate({ flag, children, fallback, userId, segment }: FeatureGateProps) {
  const enabled = featureFlags.isEnabled(flag, { userId, segment });

  if (!enabled) {
    return fallback ?? null;
  }

  return <>{children}</>;
}
