export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '@/globals.css'

export const metadata: Metadata = {
  title: 'IBOLA - Gabon Inspired Fashion',
  description: 'Discover the vibrant colors and spirit of Gabon through our fashion collection',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function LocalizedLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages: any
  try {
    messages = await getMessages()
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
