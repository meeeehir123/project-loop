import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AI library ke liye zaroori config
  experimental: {
    serverComponentsExternalPackages: ['@xenova/transformers'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

export default nextConfig;