import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import { Providers } from "components/theme/provider";
import NextAuthProvider from "components/SessionProvider";
import Dock from "../components/dock/Dock";
import Header from "@/components/header/Header";
import siteMetadata from "@/siteMetadata";
// @ts-ignore
import { Analytics, AnalyticsConfig } from "pliny/analytics";
export const metadata: Metadata = {
  title: "Kapil Chaudhary",
  description: "heykapil.in",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: "heykapil.in",
    description: "Kapil Chaudhary",
    url: "https://heykapil.in",
    siteName: "heykapil.in",
    images: [
      {
        url: "https://heykapil.in/og?title=Kapil Chaudhary",
        width: 1920,
        height: 1080,
        alt: "",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ccc" },
    { media: "(prefers-color-scheme: dark)", color: "#333" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Kapil Chaudhary",
    card: "summary_large_image",
  },
  icons: {
    apple: [
      {
        url: "/favicons/favicon180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/favicons/favicon152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicons/favicon144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicons/favicon120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicons/favicon114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicons/favicon60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/favicons/favicon72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicons/favicon96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicons/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        url: "/favicons/favicon.ico",
      },
      // {
      //   rel: "icon",
      //   url: "/favicon.png",
      //   type: "image/png",
      // },
      // {
      //   rel: "icon",
      //   url: "/favicons/ms-icon-310x310.png",
      //   type: "image/png",
      //   sizes: "310x310",
      // },
      {
        rel: "icon",
        url: "/favicons/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/favicons/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
      {
        rel: "manifest",
        url: "/favicons/site.webmanifest",
      },
      {
        rel: "webmention",
        url: "https://webmention.io/heykapil.in/webmention",
      },
      {
        rel: "pingback",
        url: "https://webmention.io/heykapil.in/xmlrpc",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <Head>
        {/* <Script
          async
          src='https://analytics.umami.is/script.js'
          data-website-id='83be4a29-01a9-4435-9e68-2d09093afc56'
        /> */}
      </Head>
      <body className='max-w-[100%] mb-20 flex flex-col md:flex-row mt-0 lg:mx-auto'>
        <Providers>
          <NextAuthProvider>
            <Analytics
              analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
            />
            <main className='flex-auto min-w-0 flex flex-col md:px-0'>
              <section className=''>
                <Header />
                {children}
              </section>
            </main>
            <Dock />
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
