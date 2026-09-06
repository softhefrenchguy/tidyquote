import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const defaults = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const SparkleIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="M12 3c.5 4.4 2.6 6.5 7 7-4.4.5-6.5 2.6-7 7-.5-4.4-2.6-6.5-7-7 4.4-.5 6.5-2.6 7-7Z"/><path d="M19 16c.2 1.8 1.2 2.8 3 3-1.8.2-2.8 1.2-3 3-.2-1.8-1.2-2.8-3-3 1.8-.2 2.8-1.2 3-3Z"/></svg>
export const QuoteIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="M8 6h11v12H8a3 3 0 0 1-3-3V5"/><path d="M8 6a3 3 0 1 0 0 6h11"/><path d="M12 9h4"/></svg>
export const SettingsIcon = (props: IconProps) => <svg {...defaults} {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>
export const UserIcon = (props: IconProps) => <svg {...defaults} {...props}><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>
export const HomeIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></svg>
export const LayersIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="m12 3-9 5 9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>
export const PlusIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="M12 5v14M5 12h14"/></svg>
export const MinusIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="M5 12h14"/></svg>
export const CheckIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="m5 12 4 4L19 6"/></svg>
export const ClockIcon = (props: IconProps) => <svg {...defaults} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
export const CopyIcon = (props: IconProps) => <svg {...defaults} {...props}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
export const MessageIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/></svg>
export const ChevronIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="m6 9 6 6 6-6"/></svg>
export const InfoIcon = (props: IconProps) => <svg {...defaults} {...props}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>
export const ArrowIcon = (props: IconProps) => <svg {...defaults} {...props}><path d="M5 12h14M14 7l5 5-5 5"/></svg>
