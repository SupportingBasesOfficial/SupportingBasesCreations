import { resolve, normalize, sep, isAbsolute } from "path";

export class PathSanitizer {
  static sanitize(input: string, baseDir: string): string {
    const normalized = normalize(input);
    const resolved = resolve(baseDir, normalized);
    const baseResolved = resolve(baseDir);

    // Allow absolute paths that don't contain traversal segments
    if (isAbsolute(input)) {
      if (!input.split(/[\\/]/).includes("..")) {
        return resolved;
      }
      throw new Error(`Path traversal blocked: ${input}`);
    }

    if (!resolved.startsWith(baseResolved + sep) && resolved !== baseResolved) {
      throw new Error(`Path traversal blocked: ${input}`);
    }

    return resolved;
  }

  static isValidName(name: string): boolean {
    return /^[a-z][a-zA-Z0-9_-]*$/.test(name);
  }
}
