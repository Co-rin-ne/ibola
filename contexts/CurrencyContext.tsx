'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Currency = 'EUR' | 'FCFA'

interface CurrencyContextType {
  currency: Currency
  toggleCurrency: () => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('EUR')

  useEffect(() => {
    const saved = localStorage.getItem('currency') as Currency | null
    if (saved) {
      setCurrency(saved)
    }
  }, [])

  const toggleCurrency = () => {
    setCurrency((prev) => {
      const newCurrency = prev === 'EUR' ? 'FCFA' : 'EUR'
      localStorage.setItem('currency', newCurrency)
      return newCurrency
    })
  }

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return context
}
