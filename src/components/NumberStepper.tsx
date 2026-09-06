import { MinusIcon, PlusIcon } from './Icons'

interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  label: string
  minimum?: number
}

export function NumberStepper({ value, onChange, label, minimum = 0 }: NumberStepperProps) {
  const safeValue = Number.isFinite(value) ? Math.max(minimum, Math.floor(value)) : minimum
  return (
    <div className="stepper" role="group" aria-label={`${label} quantity`}>
      <button
        type="button"
        className="stepper-button"
        onClick={() => onChange(Math.max(minimum, safeValue - 1))}
        disabled={safeValue <= minimum}
        aria-label={`Decrease ${label}`}
      >
        <MinusIcon className="h-5 w-5" />
      </button>
      <span className="min-w-8 text-center text-base font-bold text-ink" aria-live="polite">{safeValue}</span>
      <button
        type="button"
        className="stepper-button"
        onClick={() => onChange(safeValue + 1)}
        aria-label={`Increase ${label}`}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
