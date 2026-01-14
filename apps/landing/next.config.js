/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@bhms/ui"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;
