import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "components/theme/provider";
import NextAuthProvider from "components/SessionProvider";
import Dock from "../components/dock/Dock";
import Header from "@/components/header/Header";
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
  icons: {
    apple: [
      {
        url: "/favicons/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/favicons/apple-touch-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicons/apple-touch-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicons/apple-touch-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicons/apple-touch-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicons/apple-touch-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/favicons/apple-touch-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "webmention",
        url: "https://webmention.io/heykapil.in/webmention",
      },
      {
        rel: "icon",
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16",
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
      {/* <script
        src='https://uptime.betterstack.com/widgets/announcement.js'
        data-id='169384'
        async
        type='text/javascript'
      ></script> */}
      <body className='max-w-[100%] mb-20 flex flex-col md:flex-row mt-0 lg:mx-auto'>
        <Providers>
          <NextAuthProvider>
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
