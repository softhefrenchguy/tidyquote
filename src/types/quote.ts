export interface CustomerDetails {
  name: string
  address: string
  phone: string
}

export interface SelectedExtra {
  selected: boolean
  quantity: number
}

export interface QuoteInput {
  customer: CustomerDetails
  roomQuantities: Record<string, number>
  cleaningTypeId: string
  conditionId: string
  extras: Record<string, SelectedExtra>
}

export interface QuoteResult {
  roomMinutes: number
  extrasMinutes: number
  totalBaseMinutes: number
  totalMinutes: number
  hours: number
  labourPrice: number
  travelCharge: number
  supplyCost: number
  subtotal: number
  bufferAmount: number
  finalPrice: number
  roundedPrice: number
}
