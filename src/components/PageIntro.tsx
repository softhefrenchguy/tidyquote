import type { ReactNode } from 'react'

interface PageIntroProps {
  eyebrow: string
  title: string
  subtitle: string
  action?: ReactNode
}

export function PageIntro({ eyebrow, title, subtitle, action }: PageIntroProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4 md:mb-9">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-600">{eyebrow}</p>
        <h1 className="font-display text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}
