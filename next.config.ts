import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/ByMykel/counter-strike-image-tracker/**",
      },
      {
        protocol: "https",
        hostname: "www.csgodatabase.com",
        pathname: "/images/**",
      }
    ],
  },
};

export default nextConfig;