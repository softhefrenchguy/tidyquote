import type { CurrencyCode } from '../types/settings'

export const currencySymbols: Record<CurrencyCode, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
}

export function formatCurrency(value: number, currency: CurrencyCode, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0)
}
