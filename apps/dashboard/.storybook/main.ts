import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    // Fix DefinePlugin "compilation must be instance of Compilation" error
    // caused by Next.js bundling its own webpack version
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin) => {
        if (plugin && typeof plugin === "object" && "constructor" in plugin) {
          const name = plugin.constructor.name;
          // Remove duplicate DefinePlugin instances that cause the conflict
          if (name === "DefinePlugin") return false;
        }
        return true;
      });
    }
    return config;
  },
};

export default config;
