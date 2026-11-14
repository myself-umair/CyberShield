import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Required by the Next.js security agent-upgrade flow (next upgrade --agent=security).
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
