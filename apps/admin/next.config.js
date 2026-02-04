/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@bhms/ui", "@bhms/shared", "@bhms/validation", "@bhms/database"],
  experimental: {
    optimizePackageImports: ["@bhms/ui", "lucide-react"],
  },
};

module.exports = nextConfig;
