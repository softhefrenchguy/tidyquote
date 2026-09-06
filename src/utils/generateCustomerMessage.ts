import type { QuoteInput, QuoteResult } from '../types/quote'
import type { CleaningQuoteSettings } from '../types/settings'
import { formatDuration } from './calculateQuote'
import { formatCurrency } from './currency'

const pluralise = (name: string, quantity: number) => {
  if (quantity === 1) return name.toLowerCase()
  if (name.endsWith('y')) return `${name.slice(0, -1).toLowerCase()}ies`
  if (name.endsWith('s')) return name.toLowerCase()
  return `${name.toLowerCase()}s`
}

export function generateCustomerMessage(
  settings: CleaningQuoteSettings,
  input: QuoteInput,
  result: QuoteResult,
): string {
  const included: string[] = []
  settings.rooms.forEach((room) => {
    const quantity = input.roomQuantities[room.id] ?? 0
    if (quantity > 0) included.push(`${quantity} ${pluralise(room.name, quantity)}`)
  })

  const cleaningType = settings.cleaningTypes.find((item) => item.id === input.cleaningTypeId)
  if (cleaningType) included.push(cleaningType.name)

  settings.extras.forEach((extra) => {
    const selection = input.extras[extra.id]
    if (!selection?.selected) return
    included.push(extra.quantityBased ? `${selection.quantity} × ${extra.name.toLowerCase()}` : extra.name)
  })

  const greeting = input.customer.name.trim() ? `Hi ${input.customer.name.trim()},` : 'Hi,'
  const itemLines = included.map((item) => `• ${item}`).join('\n')

  return `${greeting}

Thanks for your enquiry.

Based on the information provided, the estimated price for your cleaning is ${formatCurrency(result.roundedPrice, settings.currency)}.

This includes:
${itemLines || '• Cleaning service'}

Estimated cleaning time: approximately ${formatDuration(result.totalMinutes)}.

This is an estimate and may change if the condition of the property differs significantly from the information provided.

Thanks.`
}
