import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: { unoptimized: true },
    serverRuntimeConfig: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
};

export default nextConfig;
