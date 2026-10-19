import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vlevo dole je cookies kolečko, vývojový indikátor Next.js proto vpravo.
  devIndicators: { position: "bottom-right" },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-32c9b24c8e42465eb3608a2e395531b5.r2.dev",
      },
    ],
  },
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
