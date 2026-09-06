import type { QuoteInput, QuoteResult } from '../types/quote'
import type { CleaningQuoteSettings } from '../types/settings'

const nonNegative = (value: number) => (Number.isFinite(value) ? Math.max(0, value) : 0)

export function calculateQuote(settings: CleaningQuoteSettings, input: QuoteInput): QuoteResult {
  const roomMinutes = settings.rooms.reduce((total, room) => {
    const quantity = Math.floor(nonNegative(input.roomQuantities[room.id] ?? 0))
    return total + quantity * nonNegative(room.minutes)
  }, 0)

  const extrasMinutes = settings.extras.reduce((total, extra) => {
    const selection = input.extras[extra.id]
    if (!selection?.selected) return total
    const quantity = extra.quantityBased ? Math.max(1, Math.floor(nonNegative(selection.quantity))) : 1
    return total + quantity * nonNegative(extra.minutes)
  }, 0)

  const cleaningType = settings.cleaningTypes.find((item) => item.id === input.cleaningTypeId)
  const condition = settings.conditions.find((item) => item.id === input.conditionId)
  const cleaningMultiplier = cleaningType && cleaningType.multiplier > 0 ? cleaningType.multiplier : 1
  const conditionMultiplier = condition && condition.multiplier > 0 ? condition.multiplier : 1
  const totalBaseMinutes = roomMinutes + extrasMinutes
  const totalMinutes = totalBaseMinutes * cleaningMultiplier * conditionMultiplier
  const hours = totalMinutes / 60
  const labourPrice = hours * nonNegative(settings.hourlyRate)
  const travelCharge = nonNegative(settings.travelCharge)
  const supplyCost = nonNegative(settings.supplyCost)
  const subtotal = labourPrice + travelCharge + supplyCost
  const bufferAmount = subtotal * (nonNegative(settings.bufferPercentage) / 100)
  const finalPrice = subtotal + bufferAmount

  return {
    roomMinutes,
    extrasMinutes,
    totalBaseMinutes,
    totalMinutes,
    hours,
    labourPrice,
    travelCharge,
    supplyCost,
    subtotal,
    bufferAmount,
    finalPrice,
    roundedPrice: Math.round(finalPrice),
  }
}

export function formatDuration(totalMinutes: number): string {
  const roundedMinutes = Math.max(0, Math.round(totalMinutes))
  const hours = Math.floor(roundedMinutes / 60)
  const minutes = roundedMinutes % 60
  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}
