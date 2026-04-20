export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '@/globals.css'

export const metadata: Metadata = {
  title: 'IBOLA - Gabon Inspired Fashion',
  description: 'Discover the vibrant colors and spirit of Gabon through our fashion collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
