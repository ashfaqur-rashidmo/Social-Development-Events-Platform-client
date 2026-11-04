

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
   domains: ["res.cloudinary.com", "images.unsplash.com","CLoudinary.com"],
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
