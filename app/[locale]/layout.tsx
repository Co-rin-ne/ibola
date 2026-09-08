export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'

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
    <Providers messages={messages} locale={locale}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </Providers>
  )
}
