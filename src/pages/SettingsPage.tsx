import { useEffect, useState } from 'react'
import { CheckIcon, InfoIcon } from '../components/Icons'
import { PageIntro } from '../components/PageIntro'
import { SettingsSection } from '../components/SettingsSection'
import type { CleaningQuoteSettings, CurrencyCode, ExtraSetting, MultiplierSetting, RoomSetting } from '../types/settings'
import { currencySymbols } from '../utils/currency'

interface SettingsPageProps {
  settings: CleaningQuoteSettings
  onSave: (settings: CleaningQuoteSettings) => void
}

const toNumber = (value: string) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0
}

export function SettingsPage({ settings, onSave }: SettingsPageProps) {
  const [draft, setDraft] = useState<CleaningQuoteSettings>(() => structuredClone(settings))
  const [saved, setSaved] = useState(false)

  useEffect(() => setDraft(structuredClone(settings)), [settings])
  useEffect(() => {
    if (!saved) return
    const timeout = window.setTimeout(() => setSaved(false), 2200)
    return () => window.clearTimeout(timeout)
  }, [saved])

  const updateRoom = (id: string, changes: Partial<RoomSetting>) => setDraft((current) => ({ ...current, rooms: current.rooms.map((room) => room.id === id ? { ...room, ...changes } : room) }))
  const updateType = (id: string, changes: Partial<MultiplierSetting>) => setDraft((current) => ({ ...current, cleaningTypes: current.cleaningTypes.map((item) => item.id === id ? { ...item, ...changes } : item) }))
  const updateCondition = (id: string, changes: Partial<MultiplierSetting>) => setDraft((current) => ({ ...current, conditions: current.conditions.map((item) => item.id === id ? { ...item, ...changes } : item) }))
  const updateExtra = (id: string, changes: Partial<ExtraSetting>) => setDraft((current) => ({ ...current, extras: current.extras.map((extra) => extra.id === id ? { ...extra, ...changes } : extra) }))

  const save = () => {
    const cleaned: CleaningQuoteSettings = {
      ...draft,
      rooms: draft.rooms.map((item) => ({ ...item, name: item.name.trim() || 'Room', minutes: Math.max(0, item.minutes) })),
      cleaningTypes: draft.cleaningTypes.map((item) => ({ ...item, name: item.name.trim() || 'Cleaning type', multiplier: Math.max(0.01, item.multiplier) })),
      conditions: draft.conditions.map((item) => ({ ...item, name: item.name.trim() || 'Condition', multiplier: Math.max(0.01, item.multiplier) })),
      extras: draft.extras.map((item) => ({ ...item, name: item.name.trim() || 'Extra', minutes: Math.max(0, item.minutes) })),
    }
    setDraft(cleaned)
    onSave(cleaned)
    setSaved(true)
  }

  return (
    <main className="page-shell max-w-4xl">
      <PageIntro eyebrow="Your pricing" title="Set up your cleaning prices" subtitle="Tell us roughly how long your normal jobs take. You can change these anytime." />

      <div className="space-y-5">
        <SettingsSection number="1" title="Your rate" description="Set the amount you want to earn for each hour of cleaning.">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-label">Currency<select className="text-input" value={draft.currency} onChange={(event) => setDraft({ ...draft, currency: event.target.value as CurrencyCode })}><option value="GBP">GBP — British pound</option><option value="USD">USD — US dollar</option><option value="EUR">EUR — Euro</option></select></label>
            <label className="field-label">Target hourly rate<div className="input-with-affixes"><span>{currencySymbols[draft.currency]}</span><input value={draft.hourlyRate} onChange={(event) => setDraft({ ...draft, hourlyRate: toNumber(event.target.value) })} type="number" inputMode="decimal" min="0" step="1" aria-label="Target hourly rate" /><span>/ hour</span></div>{draft.hourlyRate <= 0 && <span className="mt-1 block text-xs font-medium text-red-600">Add an hourly rate to calculate a quote.</span>}</label>
          </div>
        </SettingsSection>

        <SettingsSection number="2" title="Standard room times" description="How many minutes does each room normally take on a standard clean?">
          <div className="space-y-3">
            {draft.rooms.map((room) => <EditableTimeRow key={room.id} name={room.name} minutes={room.minutes} onName={(name) => updateRoom(room.id, { name })} onMinutes={(minutes) => updateRoom(room.id, { minutes })} />)}
          </div>
        </SettingsSection>

        <SettingsSection number="3" title="Cleaning types" description="Adjust how much longer each type takes compared with a standard clean.">
          <div className="space-y-3">
            {draft.cleaningTypes.map((type) => <MultiplierRow key={type.id} item={type} onName={(name) => updateType(type.id, { name })} onMultiplier={(multiplier) => updateType(type.id, { multiplier })} />)}
          </div>
        </SettingsSection>

        <SettingsSection number="4" title="Property condition" description="Allow extra time when a property needs more attention.">
          <div className="space-y-3">
            {draft.conditions.map((condition) => <MultiplierRow key={condition.id} item={condition} onName={(name) => updateCondition(condition.id, { name })} onMultiplier={(multiplier) => updateCondition(condition.id, { multiplier })} />)}
          </div>
        </SettingsSection>

        <SettingsSection number="5" title="Optional extras" description="Edit the time each add-on usually takes. Mark items that need a quantity.">
          <div className="space-y-3">
            {draft.extras.map((extra) => (
              <div key={extra.id} className="settings-row flex-col items-stretch sm:flex-row sm:items-center">
                <input className="editable-name" value={extra.name} onChange={(event) => updateExtra(extra.id, { name: event.target.value })} aria-label={`${extra.name} name`} />
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-xs font-semibold text-slate-500"><input className="check-input" type="checkbox" checked={extra.quantityBased} onChange={(event) => updateExtra(extra.id, { quantityBased: event.target.checked })} /> Per item</label>
                  <MinuteInput value={extra.minutes} onChange={(minutes) => updateExtra(extra.id, { minutes })} label={`${extra.name} minutes`} />
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection number="6" title="Costs & buffer" description="These are applied automatically to every quote.">
          <div className="grid gap-4 sm:grid-cols-3">
            <MoneyInput label="Travel charge" value={draft.travelCharge} currency={draft.currency} onChange={(travelCharge) => setDraft({ ...draft, travelCharge })} />
            <MoneyInput label="Supplies per job" value={draft.supplyCost} currency={draft.currency} onChange={(supplyCost) => setDraft({ ...draft, supplyCost })} />
            <label className="field-label">Extra buffer / profit<div className="input-with-affixes"><input className="pl-4" value={draft.bufferPercentage} onChange={(event) => setDraft({ ...draft, bufferPercentage: toNumber(event.target.value) })} type="number" inputMode="decimal" min="0" step="1" aria-label="Extra buffer percentage" /><span>%</span></div></label>
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-sage-50 p-3 text-xs leading-5 text-sage-800"><InfoIcon className="mt-0.5 h-4 w-4 shrink-0" /> Adds a safety margin for jobs that take longer than expected.</p>
        </SettingsSection>

        <div className="sticky bottom-[73px] z-20 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-card backdrop-blur md:bottom-4">
          <button type="button" className="button-primary w-full" onClick={save}>{saved ? <><CheckIcon className="h-5 w-5" /> Pricing saved</> : 'Save my pricing'}</button>
        </div>
      </div>
    </main>
  )
}

function EditableTimeRow({ name, minutes, onName, onMinutes }: { name: string; minutes: number; onName: (value: string) => void; onMinutes: (value: number) => void }) {
  return <div className="settings-row"><input className="editable-name" value={name} onChange={(event) => onName(event.target.value)} aria-label={`${name} name`} /><MinuteInput value={minutes} onChange={onMinutes} label={`${name} minutes`} /></div>
}

function MinuteInput({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) {
  return <div className="number-suffix"><input value={value} onChange={(event) => onChange(toNumber(event.target.value))} type="number" inputMode="numeric" min="0" step="5" aria-label={label} /><span>min</span></div>
}

function MultiplierRow({ item, onName, onMultiplier }: { item: MultiplierSetting; onName: (value: string) => void; onMultiplier: (value: number) => void }) {
  return (
    <div className="settings-row">
      <div className="min-w-0 flex-1"><input className="editable-name" value={item.name} onChange={(event) => onName(event.target.value)} aria-label={`${item.name} name`} /><p className="mt-1 text-xs text-slate-400">Takes around {item.multiplier}× standard time</p></div>
      <div className="number-suffix"><input value={item.multiplier} onChange={(event) => onMultiplier(Math.max(0.01, toNumber(event.target.value)))} type="number" inputMode="decimal" min="0.01" step="0.1" aria-label={`${item.name} multiplier`} /><span>×</span></div>
    </div>
  )
}

function MoneyInput({ label, value, currency, onChange }: { label: string; value: number; currency: CurrencyCode; onChange: (value: number) => void }) {
  return <label className="field-label">{label}<div className="input-with-affixes"><span>{currencySymbols[currency]}</span><input value={value} onChange={(event) => onChange(toNumber(event.target.value))} type="number" inputMode="decimal" min="0" step="1" aria-label={label} /></div></label>
}
