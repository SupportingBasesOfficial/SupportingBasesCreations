import type { Plugin, PluginManifest, PluginHook } from './PluginManifest.js';
import type { Generator } from '../registry/GeneratorRegistry.js';

export interface PluginGenerator extends Generator {
  readonly manifest: PluginManifest;
}

export class PluginRegistry {
  private plugins: Map<string, Plugin> = new Map();
  private hooks: Map<PluginHook, Plugin[]> = new Map();

  register(plugin: Plugin): void {
    const name = plugin.manifest.name;
    if (this.plugins.has(name)) {
      throw new Error(`Plugin '${name}' is already registered`);
    }
    this.plugins.set(name, plugin);

    for (const hook of plugin.manifest.hooks ?? []) {
      const existing = this.hooks.get(hook) ?? [];
      existing.push(plugin);
      this.hooks.set(hook, existing);
    }
  }

  unregister(name: string): void {
    const plugin = this.plugins.get(name);
    if (!plugin) return;

    for (const hook of plugin.manifest.hooks ?? []) {
      const list = this.hooks.get(hook) ?? [];
      this.hooks.set(
        hook,
        list.filter((p) => p.manifest.name !== name)
      );
    }

    this.plugins.delete(name);
  }

  get(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  list(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getHooks(hook: PluginHook): Plugin[] {
    return this.hooks.get(hook) ?? [];
  }

  async executeHook(hook: PluginHook, context: unknown): Promise<void> {
    const plugins = this.getHooks(hook);
    for (const plugin of plugins) {
      const mod = plugin.module as Record<string, unknown>;
      const handler = mod[hook];
      if (typeof handler === 'function') {
        await handler(context);
      }
    }
  }

  clear(): void {
    this.plugins.clear();
    this.hooks.clear();
  }
}
