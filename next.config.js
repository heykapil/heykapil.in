const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = { 
    reactStrictMode: true, 
    swcMinify: true ,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'heykapil.in',
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