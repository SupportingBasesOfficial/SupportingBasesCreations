/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts"],
      ".mjs": [".mjs", ".mts"],
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        "fs/promises": false,
      };
    }
    return config;
  },
};

export default nextConfig;
