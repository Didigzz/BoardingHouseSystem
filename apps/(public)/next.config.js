/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@havenspace/shared/ui", "@havenspace/shared", "@havenspace/validation"],
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  // Bun runtime optimization for Vercel deployment
  experimental: {
    outputFileTracingRoot: '../../',
  },
};

module.exports = nextConfig;
