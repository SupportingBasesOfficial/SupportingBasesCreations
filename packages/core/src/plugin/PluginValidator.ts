import type { PluginManifest } from './PluginManifest.js';
import type { ValidationResult } from '@sbc/shared';

export class PluginValidator {
  validate(manifest: unknown): ValidationResult<PluginManifest> {
    const errors: { path: string; message: string; code: string }[] = [];

    if (!manifest || typeof manifest !== 'object') {
      return { valid: false, errors: [{ path: '', message: 'Manifest must be an object', code: 'INVALID_TYPE' }] };
    }

    const m = manifest as Record<string, unknown>;

    const requiredString = (key: string) => {
      if (typeof m[key] !== 'string' || !m[key]) {
        errors.push({ path: key, message: `${key} is required and must be a non-empty string`, code: 'REQUIRED' });
      }
    };

    requiredString('name');
    requiredString('version');
    requiredString('description');
    requiredString('author');
    requiredString('entry');

    if (!Array.isArray(m.supportedFeatures)) {
      errors.push({ path: 'supportedFeatures', message: 'supportedFeatures must be an array', code: 'INVALID_TYPE' });
    }

    if (!Array.isArray(m.supportedArchitectures)) {
      errors.push({ path: 'supportedArchitectures', message: 'supportedArchitectures must be an array', code: 'INVALID_TYPE' });
    }

    if (m.dependencies !== undefined && !Array.isArray(m.dependencies)) {
      errors.push({ path: 'dependencies', message: 'dependencies must be an array', code: 'INVALID_TYPE' });
    }

    if (m.hooks !== undefined && !Array.isArray(m.hooks)) {
      errors.push({ path: 'hooks', message: 'hooks must be an array', code: 'INVALID_TYPE' });
    }

    const valid = errors.length === 0;
    return { valid, errors, data: valid ? (m as unknown as PluginManifest) : undefined };
  }
}
