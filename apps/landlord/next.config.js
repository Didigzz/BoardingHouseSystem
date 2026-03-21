/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@havenspace/shared/ui", "@havenspace/shared", "@havenspace/validation"],
  output: 'standalone',
  // Bun runtime optimization for Vercel deployment
  experimental: {
    outputFileTracingRoot: '../../',
    optimizePackageImports: ["@havenspace/shared/ui", "lucide-react", "recharts"],
  },
};

module.exports = nextConfig;
