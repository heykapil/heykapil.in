export const dynamic = 'force-static'; // <--- Add this line
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://kapil.app/sitemap.xml',
    host: 'https://kapil.app',
  };
}
