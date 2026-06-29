import { describe, it, expect } from "vitest";
import { PathSanitizer } from "./PathSanitizer.js";
import { resolve } from "path";

describe("PathSanitizer", () => {
  const base = resolve("/home/user/projects");

  it("should allow valid paths", () => {
    expect(PathSanitizer.sanitize("generated/app", base)).toBe(
      resolve(base, "generated/app"),
    );
  });

  it("should block path traversal", () => {
    expect(() => PathSanitizer.sanitize("../../../etc/passwd", base)).toThrow(
      "Path traversal blocked",
    );
  });

  it("should allow absolute path without traversal", () => {
    expect(PathSanitizer.sanitize("/safe/path", base)).toBe(
      resolve("/safe/path"),
    );
  });

  it("should block absolute path with traversal", () => {
    expect(() => PathSanitizer.sanitize("/safe/../etc/passwd", base)).toThrow(
      "Path traversal blocked",
    );
  });

  it("should validate project names", () => {
    expect(PathSanitizer.isValidName("my-app")).toBe(true);
    expect(PathSanitizer.isValidName("my_app")).toBe(true);
    expect(PathSanitizer.isValidName("MyApp")).toBe(false);
    expect(PathSanitizer.isValidName("my app")).toBe(false);
    expect(PathSanitizer.isValidName("")).toBe(false);
  });
});
