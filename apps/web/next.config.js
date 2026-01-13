/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@bhms/api",
    "@bhms/auth",
    "@bhms/database",
    "@bhms/shared",
    "@bhms/ui",
    "@bhms/validation",
  ],
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

module.exports = nextConfig;
