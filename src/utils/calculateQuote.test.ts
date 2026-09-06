import { describe, expect, it } from 'vitest'
import { defaultSettings } from '../data/defaultSettings'
import { calculateQuote, formatDuration } from './calculateQuote'
import { createEmptyQuote } from './quoteDefaults'

describe('calculateQuote', () => {
  it('calculates rooms, extras, multipliers, fixed costs and buffer', () => {
    const input = createEmptyQuote(defaultSettings)
    input.roomQuantities = { kitchen: 1, bathroom: 2, bedroom: 3 }
    input.cleaningTypeId = 'deep'
    input.conditionId = 'heavy'
    input.extras.oven = { selected: true, quantity: 1 }

    const result = calculateQuote({ ...defaultSettings, travelCharge: 10, supplyCost: 8 }, input)

    expect(result.roomMinutes).toBe(165)
    expect(result.extrasMinutes).toBe(45)
    expect(result.totalMinutes).toBe(409.5)
    expect(result.labourPrice).toBeCloseTo(238.875)
    expect(result.finalPrice).toBeCloseTo(282.5625)
    expect(result.roundedPrice).toBe(283)
  })

  it('uses quantity for quantity-based extras', () => {
    const input = createEmptyQuote(defaultSettings)
    input.roomQuantities = {}
    input.extras.windows = { selected: true, quantity: 8 }
    const result = calculateQuote(defaultSettings, input)
    expect(result.extrasMinutes).toBe(80)
  })

  it('guards against negative and invalid quantities', () => {
    const input = createEmptyQuote(defaultSettings)
    input.roomQuantities = { kitchen: -10, bathroom: Number.NaN }
    const result = calculateQuote(defaultSettings, input)
    expect(result.roomMinutes).toBe(0)
    expect(result.finalPrice).toBe(0)
  })

  it('formats durations for customer-friendly display', () => {
    expect(formatDuration(275)).toBe('4h 35m')
    expect(formatDuration(60)).toBe('1h')
    expect(formatDuration(25)).toBe('25m')
  })
})
