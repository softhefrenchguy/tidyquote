import type { ReactNode } from 'react'

interface SettingsSectionProps {
  number: string
  title: string
  description: string
  children: ReactNode
}

export function SettingsSection({ number, title, description, children }: SettingsSectionProps) {
  return (
    <section className="card overflow-hidden">
      <div className="flex gap-4 border-b border-slate-100 p-5 md:p-6">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage-100 text-sm font-bold text-sage-700">{number}</span>
        <div>
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
        </div>
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </section>
  )
}
