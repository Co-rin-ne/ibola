export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import '@/globals.css'

export const metadata: Metadata = {
  title: 'IBOLA - Gabon Inspired Fashion',
  description: 'Discover the vibrant colors and spirit of Gabon through our fashion collection',
}

// This root layout only owns <html>/<body>. The Header, Footer, and
// translations provider live in app/[locale]/layout.tsx so they always
// have access to the selected language.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  )
}
