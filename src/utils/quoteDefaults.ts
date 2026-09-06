import type { QuoteInput } from '../types/quote'
import type { CleaningQuoteSettings } from '../types/settings'

export function createEmptyQuote(settings: CleaningQuoteSettings): QuoteInput {
  return {
    customer: { name: '', address: '', phone: '' },
    roomQuantities: Object.fromEntries(settings.rooms.map((room) => [room.id, room.id === 'kitchen' ? 1 : 0])),
    cleaningTypeId: settings.cleaningTypes.find((item) => item.id === 'standard')?.id ?? settings.cleaningTypes[0]?.id ?? '',
    conditionId: settings.conditions.find((item) => item.id === 'normal')?.id ?? settings.conditions[0]?.id ?? '',
    extras: Object.fromEntries(settings.extras.map((extra) => [extra.id, { selected: false, quantity: 1 }])),
  }
}
