import { LRUCache } from 'lru-cache';

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
