import { resolve, normalize, sep } from 'path';

export class PathSanitizer {
  static sanitize(input: string, baseDir: string): string {
    const resolved = resolve(baseDir, normalize(input));
    const baseResolved = resolve(baseDir);

    if (!resolved.startsWith(baseResolved + sep) && resolved !== baseResolved) {
      throw new Error(`Path traversal blocked: ${input}`);
    }

    return resolved;
  }

  static isValidName(name: string): boolean {
    return /^[a-z][a-zA-Z0-9_-]*$/.test(name);
  }
}
