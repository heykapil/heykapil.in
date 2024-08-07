import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import { IpLogger } from './IpLogger';
import { Suspense } from 'react';
export const metadata: Metadata = {
  metadataBase: new URL('https://kapil.app'),
  title: {
    default: 'Kapil Chaudhary',
    template: '%s | Kapil Chaudhary',
  },
  description: 'Developer, writer, and creator.',
  openGraph: {
    title: 'Kapil Chaudhary',
    description: 'Developer, writer, and creator.',
    url: 'https://kapil.app',
    siteName: 'Kapil Chaudhary',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `https://og.kapil.app/api/og?title=Kapil Chaudhary&subtitle=Research scholar&bg=https://cdn.kapil.app/images/kapiljch-20220503-0001.jpg`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Kapil Chaudhary',
    card: 'summary_large_image',
  },
  icons: {
    apple: [
      {
        url: 'https://cdn.kapil.app/images/website/favicons/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/apple-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/applce-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/apple-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/apple-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        url: 'https://cdn.kapil.app/images/website/favicons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'icon',
        url: 'https://cdn.kapil.app/images/website/favicons/favicon.ico',
      },
      {
        rel: 'icon',
        url: 'https://cdn.kapil.app/images/website/favicons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: 'https://cdn.kapil.app/images/website/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'manifest',
        url: 'https://cdn.kapil.app/images/website/favicons/manifest.json',
      },
    ],
    icon: 'https://cdn.kapil.app/images/website/favicons/favicon-16x16.png',
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-[#111010]',
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {/* <svg
            className="pointer-events-none fixed top-0 left-0 isolate z-50 opacity-15 dark:opacity-[0.1] mix-blend-normal"
            width="100%"
            height="100%"
          >
            <filter id="pedroduarteisalegend">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.80"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter="url(#pedroduarteisalegend)"
            ></rect>
          </svg> */}
          {/* <Spotlight
            className="top-0 left-0 lg:left-60 md:-top-20"
            fill="#F7CD5D"
            // fill="white"
          /> */}
          <Navbar />
          {children}
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
          <Suspense fallback={<span>.</span>}>
            <IpLogger />
          </Suspense>
        </main>
      </body>
    </html>
  );
}
