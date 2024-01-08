const nextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      { hostname: "s3.tebi.io" },
      { hostname: "heykapil.in" },
      { hostname: "cdn.heykapil.in" },
      { hostname: "cdn.kapil.app" },
      { hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/api/spotify/:slug*",
        destination: "https://api.kapil.app/api/spotify/:slug*", // Matched parameters can be used in the destination
        permanent: false,
      },
      {
        source: "/og/:slug*",
        destination: "https://og.kapil.app/api/og/:slug*", // Matched parameters can be used in the destination
        permanent: false,
      },
    ];
  },
  headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

// const ContentSecurityPolicy = `
//     default-src 'self';
//     script-src 'self' 'unsafe-eval' 'unsafe-inline';
//     style-src 'self' 'unsafe-inline';
//     img-src * cdn.kapil.app blob: data:;
//     media-src 'none';
//     connect-src *;
//     font-src 'self' data:;
// `;
const securityHeaders = [
  // {
  //   key: "Content-Security-Policy",
  //   value: ContentSecurityPolicy.replace(/\n/g, ""),
  // },
  { key: "Access-Control-Allow-Credentials", value: "true" },

  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  {
    key: "Access-Control-Allow-Headers",
    value:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

export default nextConfig;
