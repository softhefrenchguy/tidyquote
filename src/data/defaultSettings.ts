import type { CleaningQuoteSettings } from '../types/settings'

export const defaultSettings: CleaningQuoteSettings = {
  currency: 'GBP',
  hourlyRate: 35,
  bufferPercentage: 10,
  travelCharge: 0,
  supplyCost: 0,
  rooms: [
    { id: 'kitchen', name: 'Kitchen', minutes: 45 },
    { id: 'bathroom', name: 'Bathroom', minutes: 30 },
    { id: 'bedroom', name: 'Bedroom', minutes: 20 },
    { id: 'living-room', name: 'Living Room', minutes: 30 },
    { id: 'dining-room', name: 'Dining Room', minutes: 20 },
    { id: 'hallway', name: 'Hallway / Landing', minutes: 15 },
  ],
  cleaningTypes: [
    { id: 'standard', name: 'Standard Clean', multiplier: 1 },
    { id: 'deep', name: 'Deep Clean', multiplier: 1.5 },
    { id: 'move-out', name: 'Move-Out / End of Tenancy', multiplier: 1.8 },
  ],
  conditions: [
    { id: 'light', name: 'Light / Well Maintained', multiplier: 0.9 },
    { id: 'normal', name: 'Normal', multiplier: 1 },
    { id: 'heavy', name: 'Heavy', multiplier: 1.3 },
    { id: 'very-heavy', name: 'Very Heavy', multiplier: 1.6 },
  ],
  extras: [
    { id: 'oven', name: 'Oven Cleaning', minutes: 45, quantityBased: false },
    { id: 'fridge', name: 'Inside Fridge', minutes: 30, quantityBased: false },
    { id: 'windows', name: 'Inside Windows', minutes: 10, quantityBased: true, unitLabel: 'window' },
    { id: 'cabinets', name: 'Inside Kitchen Cabinets', minutes: 45, quantityBased: false },
    { id: 'laundry', name: 'Laundry', minutes: 30, quantityBased: false },
    { id: 'linen', name: 'Bed Linen Change', minutes: 10, quantityBased: true, unitLabel: 'bed' },
  ],
}

export function cloneDefaultSettings(): CleaningQuoteSettings {
  return JSON.parse(JSON.stringify(defaultSettings)) as CleaningQuoteSettings
}
