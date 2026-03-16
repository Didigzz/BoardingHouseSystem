/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@havenspace/shared/ui", "@havenspace/shared", "@havenspace/validation"],
  output: 'standalone',
  experimental: {
    optimizePackageImports: ["@havenspace/shared/ui", "lucide-react", "recharts"],
  },
};

module.exports = nextConfig;
