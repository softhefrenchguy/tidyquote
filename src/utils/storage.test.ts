import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { defaultSettings } from '../data/defaultSettings'
import { hasSavedSettings, loadSettings, saveSettings, SETTINGS_STORAGE_KEY } from './storage'

describe('settings storage', () => {
  beforeAll(() => {
    const values = new Map<string, string>()
    const storage = {
      get length() { return values.size },
      clear: () => values.clear(),
      getItem: (key: string) => values.get(key) ?? null,
      key: (index: number) => [...values.keys()][index] ?? null,
      removeItem: (key: string) => { values.delete(key) },
      setItem: (key: string, value: string) => { values.set(key, String(value)) },
    }
    vi.stubGlobal('localStorage', storage)
    vi.stubGlobal('window', { localStorage: storage })
  })

  beforeEach(() => localStorage.clear())

  it('round trips valid settings', () => {
    saveSettings(defaultSettings)
    expect(hasSavedSettings()).toBe(true)
    expect(loadSettings()).toEqual(defaultSettings)
  })

  it('falls back safely when saved JSON is broken', () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, '{not-json')
    expect(hasSavedSettings()).toBe(false)
    expect(loadSettings()).toEqual(defaultSettings)
  })

  it('rejects incomplete settings', () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ hourlyRate: 99 }))
    expect(loadSettings()).toEqual(defaultSettings)
  })
})
