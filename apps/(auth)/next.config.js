/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bhms/ui", "@bhms/shared", "@bhms/validation", "@bhms/auth", "@bhms/database"],
  experimental: {
    optimizePackageImports: ["@bhms/ui", "lucide-react"],
  },
};

module.exports = nextConfig;
