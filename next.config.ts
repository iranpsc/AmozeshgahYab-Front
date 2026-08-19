import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "amozeshgahyab.ir",
      },
    ],
  },
};

export default nextConfig;