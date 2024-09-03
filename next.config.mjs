const nextConfig = {
  experimental: {
    // ppr: true,
    serverActions: {
      allowedOrigins: ["api.kapil.app", "api2.kapil.app"],
    },
    transpilePackages: ['next-mdx-remote'],
    logging: {
       fetches: {
         fullUrl: true,
       },
     },
  },
  images: {
    loader: 'custom',
    loaderFile: './app/components/helpers/gumlet.ts',
    remotePatterns: [
      {hostname: 'kapil.gumlet.io'},
      { hostname: "s3.tebi.io" },
      { hostname: "s3.kapil.app" },
      { hostname: "bkpl5hem.dev.cdn.imgeng.in" },
      { hostname: "cdn2.kapil.app" },
      { hostname: "cf.kapil.app" },
      { hostname: "i.scdn.co" },
      { hostname: "fastly.kapil.app" },
      { hostname: "images.unsplash.com" },
      { hostname: "cdn.kapil.app" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kapil.app" }],
        destination: "https://kapil.app/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.heykapil.in" }],
        destination: "https://kapil.app/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "heykapil.in" }],
        destination: "https://kapil.app/:path*",
        permanent: true,
      },
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
      {
        source: "/login",
        destination: "/signin",
        permanent: true,
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
