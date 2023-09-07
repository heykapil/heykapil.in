const { withContentlayer } = require("next-contentlayer");

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// You might need to insert additional domains in script-src if you are using external services


/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [
    withContentlayer,
    //  withBundleAnalyzer
  ];
  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      serverActions: true,
    },
    images: {
      domains: [
        "heykapil.in",
        "avatars.githubusercontent.com",
        "raw.githubusercontent.com",
        "lh3.googleusercontent.com",
      ],
    },
    eslint: {
      // ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    // webpack: (config, options) => {
    //   config.module.rules.push({
    //     test: /\.svg$/,
    //     use: ["@svgr/webpack"],
    //   });

    //   return config;
    // },
  });
};
