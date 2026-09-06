import { useMemo, useState, type ReactNode } from 'react'
import { CustomerMessage } from '../components/CustomerMessage'
import { HomeIcon, LayersIcon, PlusIcon, UserIcon } from '../components/Icons'
import { NumberStepper } from '../components/NumberStepper'
import { PageIntro } from '../components/PageIntro'
import { QuoteSummary } from '../components/QuoteSummary'
import type { QuoteInput } from '../types/quote'
import type { CleaningQuoteSettings } from '../types/settings'
import { calculateQuote } from '../utils/calculateQuote'
import { generateCustomerMessage } from '../utils/generateCustomerMessage'
import { createEmptyQuote } from '../utils/quoteDefaults'

interface QuotePageProps {
  settings: CleaningQuoteSettings
  onOpenSettings: () => void
}

export function QuotePage({ settings, onOpenSettings }: QuotePageProps) {
  const [input, setInput] = useState<QuoteInput>(() => createEmptyQuote(settings))
  const result = useMemo(() => calculateQuote(settings, input), [settings, input])
  const message = useMemo(() => generateCustomerMessage(settings, input, result), [settings, input, result])

  const updateRoom = (id: string, quantity: number) => {
    setInput((current) => ({ ...current, roomQuantities: { ...current.roomQuantities, [id]: Math.max(0, quantity) } }))
  }

  const updateCustomer = (field: 'name' | 'address' | 'phone', value: string) => {
    setInput((current) => ({ ...current, customer: { ...current.customer, [field]: value } }))
  }

  const toggleExtra = (id: string) => {
    setInput((current) => ({
      ...current,
      extras: {
        ...current.extras,
        [id]: { ...current.extras[id], selected: !current.extras[id]?.selected, quantity: current.extras[id]?.quantity || 1 },
      },
    }))
  }

  const updateExtraQuantity = (id: string, quantity: number) => {
    setInput((current) => ({
      ...current,
      extras: { ...current.extras, [id]: { ...current.extras[id], selected: true, quantity: Math.max(1, quantity) } },
    }))
  }

  const resetQuote = () => {
    const hasDetails = input.customer.name || input.customer.address || input.customer.phone || result.totalBaseMinutes > 45
    if (!hasDetails || window.confirm('Start a new quote? Your pricing settings will stay saved.')) {
      setInput(createEmptyQuote(settings))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <main className="page-shell">
      <PageIntro
        eyebrow="Quick quote"
        title="Create a cleaning quote"
        subtitle="Choose the rooms and job details. Your estimate updates instantly."
        action={<button type="button" onClick={resetQuote} className="button-quiet hidden shrink-0 sm:flex"><PlusIcon className="h-5 w-5" /> New quote</button>}
      />

      {settings.hourlyRate <= 0 && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="alert">
          <span>Set an hourly rate before sharing this quote.</span>
          <button type="button" className="font-bold underline" onClick={onOpenSettings}>Open settings</button>
        </div>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
        <div className="space-y-5">
          <section className="card p-5 md:p-6">
            <SectionHeading icon={<UserIcon />} kicker="Optional" title="Customer details" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field-label sm:col-span-2">Customer name<input className="text-input" value={input.customer.name} onChange={(event) => updateCustomer('name', event.target.value)} placeholder="e.g. Sarah" autoComplete="name" /></label>
              <label className="field-label">Phone number<input className="text-input" value={input.customer.phone} onChange={(event) => updateCustomer('phone', event.target.value)} placeholder="e.g. 07700 900123" type="tel" autoComplete="tel" /></label>
              <label className="field-label">Address<input className="text-input" value={input.customer.address} onChange={(event) => updateCustomer('address', event.target.value)} placeholder="Property address" autoComplete="street-address" /></label>
            </div>
          </section>

          <section className="card p-5 md:p-6">
            <SectionHeading icon={<HomeIcon />} kicker="Step 1" title="Rooms" />
            <div className="divide-y divide-slate-100">
              {settings.rooms.map((room) => (
                <div key={room.id} className="flex min-h-[68px] items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div><p className="font-semibold text-ink">{room.name}</p><p className="mt-0.5 text-xs text-slate-400">{room.minutes} min each</p></div>
                  <NumberStepper value={input.roomQuantities[room.id] ?? 0} onChange={(value) => updateRoom(room.id, value)} label={room.name} />
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5 md:p-6">
            <SectionHeading icon={<LayersIcon />} kicker="Step 2" title="Cleaning type" />
            <div className="grid gap-3 sm:grid-cols-3">
              {settings.cleaningTypes.map((type) => (
                <ChoiceCard key={type.id} name="cleaning-type" label={type.name} detail={type.multiplier === 1 ? 'Your standard timing' : `${type.multiplier}× standard time`} selected={input.cleaningTypeId === type.id} onSelect={() => setInput((current) => ({ ...current, cleaningTypeId: type.id }))} />
              ))}
            </div>
          </section>

          <section className="card p-5 md:p-6">
            <SectionHeading kicker="Step 3" title="Property condition" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {settings.conditions.map((condition) => (
                <ChoiceCard key={condition.id} name="condition" label={condition.name.replace(' / Well Maintained', '')} detail={`${condition.multiplier}× time`} selected={input.conditionId === condition.id} onSelect={() => setInput((current) => ({ ...current, conditionId: condition.id }))} compact />
              ))}
            </div>
          </section>

          <section className="card p-5 md:p-6">
            <SectionHeading kicker="Step 4" title="Add extras" />
            <div className="space-y-3">
              {settings.extras.map((extra) => {
                const selection = input.extras[extra.id] ?? { selected: false, quantity: 1 }
                return (
                  <div key={extra.id} className={`rounded-xl border p-4 transition-colors ${selection.selected ? 'border-sage-400 bg-sage-50/60' : 'border-slate-200 bg-white'}`}>
                    <div className="flex min-h-8 items-center justify-between gap-3">
                      <label className="flex min-w-0 cursor-pointer items-center gap-3">
                        <input type="checkbox" className="check-input" checked={selection.selected} onChange={() => toggleExtra(extra.id)} />
                        <span><span className="block font-semibold text-ink">{extra.name}</span><span className="mt-0.5 block text-xs text-slate-400">{extra.minutes} min{extra.quantityBased ? ` per ${extra.unitLabel ?? 'item'}` : ''}</span></span>
                      </label>
                      {selection.selected && extra.quantityBased && <NumberStepper value={selection.quantity} onChange={(value) => updateExtraQuantity(extra.id, value)} label={extra.name} minimum={1} />}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <div className="lg:hidden"><QuoteSummary result={result} settings={settings} /></div>
          <CustomerMessage message={message} phone={input.customer.phone} />
          <button type="button" onClick={resetQuote} className="button-quiet w-full sm:hidden"><PlusIcon className="h-5 w-5" /> New quote</button>
        </div>

        <aside className="sticky top-6 hidden lg:block"><QuoteSummary result={result} settings={settings} /></aside>
      </div>
    </main>
  )
}

function SectionHeading({ icon, kicker, title }: { icon?: ReactNode; kicker: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      {icon && <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-50 text-sage-700 [&>svg]:h-5 [&>svg]:w-5">{icon}</span>}
      <div><p className="section-kicker">{kicker}</p><h2 className="section-title">{title}</h2></div>
    </div>
  )
}

interface ChoiceCardProps { name: string; label: string; detail: string; selected: boolean; onSelect: () => void; compact?: boolean }

function ChoiceCard({ name, label, detail, selected, onSelect, compact = false }: ChoiceCardProps) {
  return (
    <label className={`choice-card ${selected ? 'choice-card-selected' : ''} ${compact ? 'min-h-[92px]' : 'min-h-[112px]'}`}>
      <input className="sr-only" type="radio" name={name} checked={selected} onChange={onSelect} />
      <span className={`choice-dot ${selected ? 'choice-dot-selected' : ''}`}>{selected && <span />}</span>
      <span className="block pr-5 text-sm font-bold leading-5 text-ink">{label}</span>
      <span className="mt-1 block text-xs leading-4 text-slate-400">{detail}</span>
    </label>
  )
}
