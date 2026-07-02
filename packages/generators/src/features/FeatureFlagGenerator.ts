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
    return `export interface FeatureFlagDefinition {
  key: string;
  enabled: boolean;
  rolloutPercentage?: number;
  targetUsers?: string[];
  targetSegments?: string[];
}

class FeatureFlagService {
  private edgeConfigUrl: string | undefined;

  constructor() {
    this.edgeConfigUrl = process.env.EDGE_CONFIG;
  }

  register(_flag: FeatureFlagDefinition): void {
    // In serverless, flags are managed via Vercel Edge Config dashboard or API
    // No in-memory registration needed
  }

  async isEnabled(key: string, context?: { userId?: string; segment?: string }): Promise<boolean> {
    const flag = await this.getFlag(key);
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

  async getFlag(key: string): Promise<FeatureFlagDefinition | undefined> {
    if (!this.edgeConfigUrl) return undefined;
    try {
      const res = await fetch(\`\${this.edgeConfigUrl}/items/\${key}\`);
      if (!res.ok) return undefined;
      return await res.json() as FeatureFlagDefinition;
    } catch {
      return undefined;
    }
  }

  async getAllFlags(): Promise<FeatureFlagDefinition[]> {
    if (!this.edgeConfigUrl) return [];
    try {
      const res = await fetch(\`\${this.edgeConfigUrl}/items\`);
      if (!res.ok) return [];
      const items = await res.json() as Record<string, FeatureFlagDefinition>;
      return Object.values(items);
    } catch {
      return [];
    }
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
`;
  }

  private generateFeatureGateComponent(): string {
    return `import { ReactNode, useState, useEffect } from 'react';
import { featureFlags } from '../features/FeatureFlagService';

interface FeatureGateProps {
  flag: string;
  children: ReactNode;
  fallback?: ReactNode;
  userId?: string;
  segment?: string;
}

export function FeatureGate({ flag, children, fallback, userId, segment }: FeatureGateProps) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    featureFlags.isEnabled(flag, { userId, segment }).then((result) => {
      setEnabled(result);
      setLoading(false);
    });
  }, [flag, userId, segment]);

  if (loading || !enabled) {
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

  const flags = await featureFlags.getAllFlags();
  const result = await Promise.all(
    flags.map(async (flag) => ({
      key: flag.key,
      enabled: await featureFlags.isEnabled(flag.key, { userId, segment }),
    }))
  );

  return NextResponse.json({ flags: result });
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
