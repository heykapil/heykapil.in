import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import { PreloadResources } from "./preload";

export const metadata: Metadata = {
  metadataBase: new URL("https://kapil.app"),
  title: {
    default: "Kapil Chaudhary",
    template: "%s | Kapil Chaudhary",
  },
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "Kapil Chaudhary",
    description: "Developer, writer, and creator.",
    url: "https://kapil.app",
    siteName: "Kapil Chaudhary",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
        url: "https://cdn.kapil.app/images/website/favicons/favicon180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "https://cdn.kapil.app/images/website/favicons/favicon152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "https://cdn.kapil.app/images/website/favicons/favicon144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "https://cdn.kapil.app/images/website/favicons/favicon120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "https://cdn.kapil.app/images/website/favicons/favicon114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "https://cdn.kapil.app/images/website/favicons/favicon60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "https://cdn.kapil.app/images/website/favicons/favicon72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "https://cdn.kapil.app/images/website/favicons/favicon96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "https://cdn.kapil.app/images/website/favicons/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        url: "https://cdn.kapil.app/images/website/favicons/favicon.ico",
      },
    ],
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
          <PreloadResources />
        </main>
      </body>
    </html>
  );
}
