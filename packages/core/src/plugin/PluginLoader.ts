import { readdir, readFile, access } from 'fs/promises';
import { join, resolve } from 'path';
import { pathToFileURL } from 'url';
import type { Plugin, PluginManifest } from './PluginManifest.js';

export class PluginLoader {
  async loadFromDirectory(dir: string): Promise<Plugin[]> {
    const plugins: Plugin[] = [];
    const resolved = resolve(dir);

    try {
      await access(resolved);
    } catch {
      return [];
    }

    const entries = await readdir(resolved, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const pluginDir = join(resolved, entry.name);
      const manifestPath = join(pluginDir, 'sbc-plugin.json');

      try {
        const manifest = await this.loadManifest(manifestPath);
        const module = await this.loadModule(join(pluginDir, manifest.entry));
        plugins.push({ manifest, module });
      } catch (err) {
        console.warn(`Failed to load plugin from ${pluginDir}:`, (err as Error).message);
      }
    }

    return plugins;
  }

  async loadManifest(path: string): Promise<PluginManifest> {
    const raw = await readFile(path, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed as PluginManifest;
  }

  async loadModule(entryPath: string): Promise<unknown> {
    const url = pathToFileURL(resolve(entryPath)).href;
    const mod = await import(url);
    return mod.default ?? mod;
  }
}
