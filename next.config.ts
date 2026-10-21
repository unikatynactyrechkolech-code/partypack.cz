import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vlevo dole je cookies kolečko, vývojový indikátor Next.js proto vpravo.
  devIndicators: { position: "bottom-right" },
  experimental: {
    // Fotky se před odesláním zmenšují v prohlížeči, limit je jen pojistka.
    serverActions: { bodySizeLimit: "8mb" },
  },
  async redirects() {
    return [
      // Stránkování galerie z původního WordPressu
      { source: "/galerie/page/:n", destination: "/galerie?strana=:n", permanent: true },
    ];
  },
  images: {
    // 75 = výchozí, 85 = velké fotky přes výřez (statistiky, galerie, karty služeb).
    qualities: [75, 85],
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
