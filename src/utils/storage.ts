import { cloneDefaultSettings } from '../data/defaultSettings'
import type { CleaningQuoteSettings, CurrencyCode } from '../types/settings'

export const SETTINGS_STORAGE_KEY = 'cleaningQuoteSettings'
const currencies: CurrencyCode[] = ['GBP', 'USD', 'EUR']

const validNumber = (value: unknown, minimum = 0): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= minimum

export function isValidSettings(value: unknown): value is CleaningQuoteSettings {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<CleaningQuoteSettings>
  const validRooms = Array.isArray(candidate.rooms) && candidate.rooms.length > 0 && candidate.rooms.every(
    (room) => room && typeof room.id === 'string' && typeof room.name === 'string' && validNumber(room.minutes),
  )
  const validMultipliers = (items: unknown) => Array.isArray(items) && items.length > 0 && items.every(
    (item) => item && typeof item.id === 'string' && typeof item.name === 'string' && validNumber(item.multiplier, 0.01),
  )
  const validExtras = Array.isArray(candidate.extras) && candidate.extras.every(
    (extra) => extra && typeof extra.id === 'string' && typeof extra.name === 'string' &&
      typeof extra.quantityBased === 'boolean' && validNumber(extra.minutes),
  )

  return currencies.includes(candidate.currency as CurrencyCode) &&
    validNumber(candidate.hourlyRate) && validNumber(candidate.bufferPercentage) &&
    validNumber(candidate.travelCharge) && validNumber(candidate.supplyCost) &&
    validRooms && validMultipliers(candidate.cleaningTypes) && validMultipliers(candidate.conditions) && validExtras
}

export function loadSettings(): CleaningQuoteSettings {
  if (typeof window === 'undefined') return cloneDefaultSettings()
  try {
    const saved = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!saved) return cloneDefaultSettings()
    const parsed: unknown = JSON.parse(saved)
    return isValidSettings(parsed) ? parsed : cloneDefaultSettings()
  } catch {
    return cloneDefaultSettings()
  }
}

export function hasSavedSettings(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const saved = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    return saved !== null && isValidSettings(JSON.parse(saved))
  } catch {
    return false
  }
}

export function saveSettings(settings: CleaningQuoteSettings): void {
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
}
