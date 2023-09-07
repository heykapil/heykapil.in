import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "components/theme/provider";
import NextAuthProvider from "components/SessionProvider";
import Dock from "../components/dock/Dock";
import Link from "next/link";
import Header from "@/components/header/Header";
import styles from "styles/Hero.module.css";
import { cn } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Kapil Chaudhary",
  description: "heykapil.in",
  openGraph: {
    title: "HeyKapil.in",
    description: "Kapil Chaudhary",
    url: "https://heykapil.in",
    siteName: "HeyKapil.in",
    images: [
      {
        url: "https://heykapil.in/og?title=Kapil Chaudhary",
        width: 800,
        height: 600,
      },
      {
        url: "https://heykapil.in/og?title=Kapil Chaudhary",
        width: 1800,
        height: 1600,
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
  icons: {
    other: [
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
      <body className='max-w-[100%] mb-40 flex flex-col md:flex-row mt-0 lg:mx-auto'>
        <Providers>
          <NextAuthProvider>
            <main className='flex-auto min-w-0 flex flex-col md:px-0'>
              <section className={cn(styles.wavecontainer)}>
                <Header />
                {children}
                <div className='mt-20 flex-row-reverse flex'>
                  .{/* <Link href='./sitemap.xml'>2023</Link> */}
                </div>
              </section>
            </main>
            <Dock />
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
