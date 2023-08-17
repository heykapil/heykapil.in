import './globals.css'
import type { Metadata } from 'next'
import  { Providers } from '@/components/theme/provider'
import Dock from '../components/dock/Dock'
export const metadata: Metadata = {
  title: 'Kapil Chaudhary',
  description: 'heykapil.in',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <link href="https://fonts.googleapis.com" rel="preconnect" /> */}
      {/* <link href="https://fonts.gstatic.com" rel="preconnect" /> */}
        <body className="antialiased max-w-[100%] mb-40 flex flex-col md:flex-row mx-4 mt-0 lg:mx-auto">
        <Providers>
          <main className="flex-auto min-w-0 mt-0 flex flex-col px-2 md:px-0">
            {children}
          </main>
          <Dock />
        </Providers>
       </body>
    </html>
  )
}
