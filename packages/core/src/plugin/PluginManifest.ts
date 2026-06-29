import type { FeatureFlag, ArchitectureType } from '../domain/enums.js';

export interface PluginManifest {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly author: string;
  readonly entry: string;
  readonly supportedFeatures: readonly FeatureFlag[];
  readonly supportedArchitectures: readonly ArchitectureType[];
  readonly dependencies?: readonly string[];
  readonly hooks?: readonly PluginHook[];
}

export type PluginHook =
  | 'before:generate'
  | 'after:generate'
  | 'before:validate'
  | 'after:validate'
  | 'before:write'
  | 'after:write';

export interface Plugin {
  readonly manifest: PluginManifest;
  readonly module: unknown;
}
