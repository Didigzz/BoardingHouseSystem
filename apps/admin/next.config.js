/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@havenspace/shared/ui", "@havenspace/shared", "@havenspace/validation", "@havenspace/database"],
  output: 'standalone',
  // Bun runtime optimization for Vercel deployment
  outputFileTracingRoot: '../../',
  experimental: {
    optimizePackageImports: ["@havenspace/shared/ui", "lucide-react"],
  },
};

module.exports = nextConfig;
