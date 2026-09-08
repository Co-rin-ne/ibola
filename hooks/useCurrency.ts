'use client'

import { useState, useEffect, useCallback } from 'react'

export function useCurrency() {
  const [currency, setCurrency] = useState<'EUR' | 'FCFA'>('EUR')

  useEffect(() => {
    const saved = localStorage.getItem('currency') as 'EUR' | 'FCFA' | null
    if (saved) {
      setCurrency(saved)
    }
  }, [])

  const toggleCurrency = useCallback(() => {
    setCurrency((prev) => {
      const newCurrency = prev === 'EUR' ? 'FCFA' : 'EUR'
      localStorage.setItem('currency', newCurrency)
      return newCurrency
    })
  }, [])

  return { currency, toggleCurrency }
}
