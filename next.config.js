const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "heykapil.in",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "source.unsplash.com",
    ],
  },
  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withContentlayer(nextConfig);
