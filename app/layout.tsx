import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "components/theme/provider";
import Dock from "../components/dock/Dock";
import Head from "next/head";
export const metadata: Metadata = {
  title: "Kapil Chaudhary",
  description: "heykapil.in",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <Head>
        <link
          rel='webmention'
          href='https://webmention.io/heykapil.in/webmention'
        />
        <link rel='pingback' href='https://webmention.io/heykapil.in/xmlrpc' />
        <meta
          name='theme-color'
          content='#333333'
          media='(prefers-color-scheme: dark)'
        />
        <meta
          name='theme-color'
          content='#cccccc'
          media='(prefers-color-scheme: light)'
        />
      </Head>
      <body className='max-w-[100%] mb-40 flex flex-col md:flex-row mt-0 lg:mx-auto'>
        <Providers>
          <main className='flex-auto min-w-0 mt-0 flex flex-col md:px-0'>
            {children}
          </main>
          <Dock />
        </Providers>
      </body>
    </html>
  );
}
