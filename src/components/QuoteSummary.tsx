import { useState } from 'react'
import type { QuoteResult } from '../types/quote'
import type { CleaningQuoteSettings } from '../types/settings'
import { formatDuration } from '../utils/calculateQuote'
import { formatCurrency } from '../utils/currency'
import { ChevronIcon, ClockIcon, SparkleIcon } from './Icons'

interface QuoteSummaryProps {
  result: QuoteResult
  settings: CleaningQuoteSettings
}

export function QuoteSummary({ result, settings }: QuoteSummaryProps) {
  const [expanded, setExpanded] = useState(false)
  const money = (value: number) => formatCurrency(value, settings.currency)

  return (
    <section className="overflow-hidden rounded-[1.5rem] bg-ink text-white shadow-lift" aria-labelledby="quote-result-title">
      <div className="relative overflow-hidden px-6 pb-6 pt-7">
        <div className="quote-glow" />
        <div className="relative">
          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-sage-200">
              <SparkleIcon className="h-4 w-4" /> Your estimate
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80">
              <ClockIcon className="h-4 w-4" /> {formatDuration(result.totalMinutes)}
            </div>
          </div>
          <p className="text-sm text-white/60">Suggested quote</p>
          <p id="quote-result-title" className="mt-1 font-display text-6xl font-semibold tracking-tight">{money(result.roundedPrice)}</p>
          <p className="mt-3 text-sm leading-5 text-white/60">Based on your time, rate and pricing settings.</p>
        </div>
      </div>
      <button type="button" onClick={() => setExpanded((value) => !value)} className="flex min-h-14 w-full items-center justify-between border-t border-white/10 px-6 text-sm font-semibold hover:bg-white/5" aria-expanded={expanded}>
        Price breakdown
        <ChevronIcon className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="space-y-3 border-t border-white/10 bg-black/10 px-6 py-5 text-sm">
          <BreakdownRow label="Labour" value={money(result.labourPrice)} />
          <BreakdownRow label="Travel" value={money(result.travelCharge)} />
          <BreakdownRow label="Supplies" value={money(result.supplyCost)} />
          <BreakdownRow label={`Buffer (${settings.bufferPercentage}%)`} value={money(result.bufferAmount)} />
          <div className="my-2 border-t border-white/10" />
          <BreakdownRow label="Total" value={money(result.roundedPrice)} strong />
        </div>
      )}
    </section>
  )
}

function BreakdownRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className={`flex justify-between ${strong ? 'font-bold text-white' : 'text-white/70'}`}><span>{label}</span><span>{value}</span></div>
}
