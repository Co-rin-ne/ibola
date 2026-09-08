'use client'

import { NextIntlClientProvider } from 'next-intl'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
  messages: any
  locale: string
}

export function Providers({ children, messages, locale }: ProvidersProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CurrencyProvider>
        {children}
      </CurrencyProvider>
    </NextIntlClientProvider>
  )
}
