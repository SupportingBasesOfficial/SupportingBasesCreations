import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  resolve: {
    alias: {
      "@sbc/shared": resolve(__dirname, "../../shared/types/src/index.ts"),
      "@sbc/core": resolve(__dirname, "../../packages/core/dist/index.js"),
      "@sbc/cloud": resolve(__dirname, "../../packages/cloud/dist/index.js"),
      "@sbc/generators": resolve(__dirname, "../../packages/generators/src/index.ts"),
      "y-webrtc": resolve(__dirname, "src/test/mocks/y-webrtc.ts"),
      "y-indexeddb": resolve(__dirname, "src/test/mocks/y-indexeddb.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    server: {
      deps: {
        inline: ["@sbc/core", "@sbc/shared", "@sbc/cloud", "@sbc/generators"],
      },
    },
  },
});
