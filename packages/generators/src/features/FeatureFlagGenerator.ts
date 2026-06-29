import { FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class FeatureFlagGenerator implements Generator {
  readonly name = 'feature-flags';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(_context: GenerationContext): Promise<GeneratedArtifact[]> {
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'src/lib/features/FeatureFlagService.ts',
      content: this.generateFeatureFlagService(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/features/FeatureGate.tsx',
      content: this.generateFeatureGateComponent(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/features/flags.ts',
      content: this.generateFlags(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/app/api/features/route.ts',
      content: this.generateFeaturesAPI(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/hooks/useFeatureFlag.ts',
      content: this.generateUseFeatureFlagHook(),
      language: 'typescript',
    });

    return artifacts;
  }

  private generateFeatureFlagService(): string {
    return `import { LRUCache } from 'lru-cache';

export interface FeatureFlagDefinition {
  key: string;
  enabled: boolean;
  rolloutPercentage?: number;
  targetUsers?: string[];
  targetSegments?: string[];
}

class FeatureFlagService {
  private cache = new LRUCache<string, FeatureFlagDefinition>({
    max: 500,
    ttl: 30000,
  });

  private flags: Map<string, FeatureFlagDefinition> = new Map();

  register(flag: FeatureFlagDefinition): void {
    this.flags.set(flag.key, flag);
    this.cache.set(flag.key, flag);
  }

  isEnabled(key: string, context?: { userId?: string; segment?: string }): boolean {
    const flag = this.getFlag(key);
    if (!flag) return false;
    if (!flag.enabled) return false;

    if (flag.targetUsers && context?.userId) {
      return flag.targetUsers.includes(context.userId);
    }

    if (flag.targetSegments && context?.segment) {
      return flag.targetSegments.includes(context.segment);
    }

    if (flag.rolloutPercentage !== undefined && context?.userId) {
      const hash = this.hashString(context.userId + key);
      return (hash % 100) < flag.rolloutPercentage;
    }

    return flag.enabled;
  }

  getFlag(key: string): FeatureFlagDefinition | undefined {
    const cached = this.cache.get(key);
    if (cached) return cached;

    const flag = this.flags.get(key);
    if (flag) {
      this.cache.set(key, flag);
    }
    return flag;
  }

  getAllFlags(): FeatureFlagDefinition[] {
    return Array.from(this.flags.values());
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }
}

export const featureFlags = new FeatureFlagService();

// LaunchDarkly adapter (optional)
export class LaunchDarklyAdapter {
  constructor(private sdkKey: string) {}

  async init(): Promise<void> {
    // TODO: Initialize LD client
  }

  async isEnabled(key: string, context?: { userId?: string }): Promise<boolean> {
    // TODO: Call LD client
    return featureFlags.isEnabled(key, context);
  }
}
`;
  }

  private generateFeatureGateComponent(): string {
    return `import { ReactNode } from 'react';
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
`;
  }

  private generateFlags(): string {
    return `export const FLAGS = {
  NEW_DASHBOARD: 'new-dashboard',
  BETA_FEATURES: 'beta-features',
  DARK_MODE: 'dark-mode',
  ADVANCED_ANALYTICS: 'advanced-analytics',
  MULTI_TENANT_V2: 'multi-tenant-v2',
} as const;

export type FlagKey = (typeof FLAGS)[keyof typeof FLAGS];
`;
  }

  private generateFeaturesAPI(): string {
    return `import { NextResponse } from 'next/server';
import { featureFlags } from '../../../lib/features/FeatureFlagService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId') || undefined;
  const segment = searchParams.get('segment') || undefined;

  const flags = featureFlags.getAllFlags().map((flag) => ({
    key: flag.key,
    enabled: featureFlags.isEnabled(flag.key, { userId, segment }),
  }));

  return NextResponse.json({ flags });
}

export async function POST(req: Request) {
  const body = await req.json();
  featureFlags.register(body);
  return NextResponse.json({ success: true });
}
`;
  }

  private generateUseFeatureFlagHook(): string {
    return `import { useState, useEffect } from 'react';

export function useFeatureFlag(flag: string, context?: { userId?: string; segment?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFlag() {
      try {
        const params = new URLSearchParams();
        if (context?.userId) params.set('userId', context.userId);
        if (context?.segment) params.set('segment', context.segment);

        const res = await fetch(\`/api/features?\${params.toString()}\`);
        const data = await res.json();
        const flagData = data.flags.find((f: { key: string }) => f.key === flag);
        setEnabled(flagData?.enabled ?? false);
      } catch {
        setEnabled(false);
      } finally {
        setLoading(false);
      }
    }

    checkFlag();
  }, [flag, context?.userId, context?.segment]);

  return { enabled, loading };
}
`;
  }
}
