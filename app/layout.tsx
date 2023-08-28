import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "components/theme/provider";
import NextAuthProvider from "components/SessionProvider";
import Dock from "../components/dock/Dock";

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
      <body className='antialiased max-w-[100%] mb-40 flex flex-col md:flex-row mt-0 lg:mx-auto'>
        <Providers>
          <NextAuthProvider>
            <main className='flex-auto min-w-0 mt-0 flex flex-col md:px-0'>
              {children}
            </main>
            <Dock />
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
