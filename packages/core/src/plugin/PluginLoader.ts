import type { Plugin, PluginManifest } from './PluginManifest.js';
import type { CloudKV } from '../cloud/CloudKV.js';

export class PluginLoader {
  /**
   * Load plugins from a CloudKV registry.
   * Each plugin manifest is stored as JSON in CloudKV under key `plugin:<name>`.
   * The manifest's `entry` field is an npm package name or URL to dynamically import.
   */
  async loadFromCloud(kv: CloudKV, prefix = 'plugin:'): Promise<Plugin[]> {
    const plugins: Plugin[] = [];

    try {
      const registryRaw = await kv.get(`${prefix}registry`);
      if (!registryRaw) return [];

      const registry = JSON.parse(registryRaw) as string[];
      for (const name of registry) {
        try {
          const manifestRaw = await kv.get(`${prefix}${name}`);
          if (!manifestRaw) continue;
          const manifest = JSON.parse(manifestRaw) as PluginManifest;
          const module = await this.loadModule(manifest.entry);
          plugins.push({ manifest, module });
        } catch (err) {
          console.warn(`Failed to load plugin ${name}:`, (err as Error).message);
        }
      }
    } catch (err) {
      console.warn('Failed to load plugin registry from cloud:', (err as Error).message);
    }

    return plugins;
  }

  /**
   * Load a single plugin by npm package name or URL.
   * Works in serverless environments where dynamic import of npm packages is supported.
   */
  async loadModule(entry: string): Promise<unknown> {
    const mod = await import(entry);
    return mod.default ?? mod;
  }

  /**
   * Register a plugin manifest in CloudKV.
   */
  async registerInCloud(kv: CloudKV, manifest: PluginManifest, prefix = 'plugin:'): Promise<void> {
    const key = `${prefix}${manifest.name}`;
    await kv.set(key, JSON.stringify(manifest), 0);

    const registryRaw = await kv.get(`${prefix}registry`);
    const registry = registryRaw ? (JSON.parse(registryRaw) as string[]) : [];
    if (!registry.includes(manifest.name)) {
      registry.push(manifest.name);
      await kv.set(`${prefix}registry`, JSON.stringify(registry), 0);
    }
  }
}
