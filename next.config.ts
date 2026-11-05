import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Both caches occasionally served old CSS after an edit, which would deploy outdated
    // styles or hide a change in development. Startup and builds take a few seconds longer.
    turbopackFileSystemCacheForBuild: false,
    turbopackFileSystemCacheForDev: false,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
