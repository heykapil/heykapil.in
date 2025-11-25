import type { Metadata } from 'next';
import { Figtree, Newsreader, Proza_Libre } from 'next/font/google';
import Script from 'next/script';
import { Navbar } from './components/nav';
import './global.css';
import Plum from './components/plum';

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['400'],
});

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
        url: `https://og.kapil.app/api/og?title=Kapil Chaudhary&subtitle=Research scholar&bg=https://cf.kapil.app/images/kapiljch-20220503-0001.jpg`,
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
        url: 'https://cf.kapil.app/images/website/favicons/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/apple-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/applce-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/apple-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/apple-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        url: 'https://cf.kapil.app/images/website/favicons/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'icon',
        url: 'https://cf.kapil.app/images/website/favicons/favicon.ico',
      },
      {
        rel: 'icon',
        url: 'https://cf.kapil.app/images/website/favicons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: 'https://cf.kapil.app/images/website/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'manifest',
        url: 'https://cf.kapil.app/images/website/favicons/manifest.json',
      },
    ],
    icon: 'https://cf.kapil.app/images/website/favicons/favicon-16x16.png',
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');
const font = Figtree({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-[#faf9f6] dark:text-white dark:bg-[#111010]',
        font.className,
      )}
    >
      <body
        className={`antialiased max-w-5xl flex flex-col md:flex-row mx-4 lg:mx-auto ${newsreader.variable}`}
      >
        <Plum />
        <Script
          defer
          src="https://analytics.kapil.app/script.js"
          data-website-id="eed82a85-bdd7-4035-8866-205c25b5fd51"
        />
        <Navbar />
        <main className="flex-auto my-10 md:mt-8 max-w-2xl min-w-0 flex flex-col px-0 md:pl-10">
          {children}
        </main>
      </body>
    </html>
  );
}
