/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@bhms/api",
    "@bhms/auth",
    "@bhms/database",
    "@bhms/shared",
    "@bhms/ui",
    "@bhms/validation",
  ],
  serverExternalPackages: ["@prisma/client"],
};

module.exports = nextConfig;
