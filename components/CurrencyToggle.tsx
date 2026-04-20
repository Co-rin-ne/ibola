'use client'

import { useTranslations } from 'next-intl'
import { useCurrency } from '@/hooks/useCurrency'

export function CurrencyToggle() {
  const t = useTranslations('product')
  const { currency, toggleCurrency } = useCurrency()

  return (
    <button
      onClick={toggleCurrency}
      className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
    >
      {t('convertFCFA')} ({currency === 'EUR' ? 'FCFA' : 'EUR'})
    </button>
  )
}
