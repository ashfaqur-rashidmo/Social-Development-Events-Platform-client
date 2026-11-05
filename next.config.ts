

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // `images.domains` is deprecated in Next 16 — remotePatterns is the supported form
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "res.cloudinary.com" },
      { protocol: "http", hostname: "cloudinary.com" },
      { protocol: "http", hostname: "images.unsplash.com" },
      {protocol: "https", hostname: "www.pexels.com" },
    ],
  },

  experimental: {
    agentFeedback: true,
  },

  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,

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
