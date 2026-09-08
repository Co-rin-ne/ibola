'use client'

import { useTranslations } from 'next-intl'
import { useCurrency } from '@/hooks/useCurrency'

export function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency()

  return (
    <button
      onClick={toggleCurrency}
      className="px-4 py-2 border-2 border-brand-green text-brand-green rounded-lg font-semibold hover:bg-brand-green hover:text-white transition"
    >
      {currency === 'EUR' ? 'FCFA' : 'EUR'}
    </button>
  )
}
