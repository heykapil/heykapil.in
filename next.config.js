const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { 
    reactStrictMode: true, 
    swcMinify: true ,
    experimental: {
    serverActions: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'heykapil.in',
          },
          {
            protocol: 'https',
            hostname: 'tailwind.besoeasy.com',
          },
        ],
      },
    eslint: {
        // ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = withContentlayer(nextConfig)