import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { EUR_TO_FCFA } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: 'EUR' | 'FCFA' = 'EUR'): string {
  if (currency === 'EUR') {
    return `€${amount.toFixed(2)}`
  }
  return `${Math.round(amount).toLocaleString('fr-FR')} FCFA`
}

export function convertEURtoFCFA(eur: number): number {
  return eur * EUR_TO_FCFA
}

export function calculateLoyaltyPoints(total_eur: number): number {
  return Math.floor(total_eur)
}

export function applyLoyaltyPoints(loyaltyPoints: number): number {
  return Math.floor(loyaltyPoints / 100) * 10
}
