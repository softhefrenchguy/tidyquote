export type CurrencyCode = 'GBP' | 'USD' | 'EUR'

export interface RoomSetting {
  id: string
  name: string
  minutes: number
}

export interface MultiplierSetting {
  id: string
  name: string
  multiplier: number
}

export interface ExtraSetting {
  id: string
  name: string
  minutes: number
  quantityBased: boolean
  unitLabel?: string
}

export interface CleaningQuoteSettings {
  currency: CurrencyCode
  hourlyRate: number
  bufferPercentage: number
  travelCharge: number
  supplyCost: number
  rooms: RoomSetting[]
  cleaningTypes: MultiplierSetting[]
  conditions: MultiplierSetting[]
  extras: ExtraSetting[]
}
