'use client'

import { useState, useEffect } from 'react'

export function useCurrency() {
  const [currency, setCurrency] = useState<'EUR' | 'FCFA'>('EUR')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('currency') as 'EUR' | 'FCFA' | null
    if (saved) {
      setCurrency(saved)
    }
    setIsLoaded(true)
  }, [])

  const toggleCurrency = () => {
    const newCurrency = currency === 'EUR' ? 'FCFA' : 'EUR'
    setCurrency(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  return { currency, toggleCurrency, isLoaded }
}
