import { QuoteIcon, SettingsIcon, SparkleIcon } from './Icons'

export type Page = 'quote' | 'settings'

interface NavigationProps {
  page: Page
  onNavigate: (page: Page) => void
}

const navItems = [
  { id: 'quote' as const, label: 'Quote', icon: QuoteIcon },
  { id: 'settings' as const, label: 'Settings', icon: SettingsIcon },
]

export function Navigation({ page, onNavigate }: NavigationProps) {
  return (
    <>
      <header className="hidden border-b border-slate-200/80 bg-white/90 backdrop-blur md:block">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <button type="button" onClick={() => onNavigate('quote')} className="flex items-center gap-3" aria-label="TidyQuote home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-600 text-white"><SparkleIcon className="h-6 w-6" /></span>
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">TidyQuote</span>
          </button>
          <nav className="flex rounded-xl bg-slate-100 p-1" aria-label="Main navigation">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => onNavigate(id)} className={`nav-desktop ${page === id ? 'nav-desktop-active' : ''}`} aria-current={page === id ? 'page' : undefined}>
                <Icon className="h-5 w-5" />{label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" aria-label="Main navigation">
        <div className="mx-auto grid max-w-sm grid-cols-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => onNavigate(id)} className={`mobile-nav-item ${page === id ? 'text-sage-700' : 'text-slate-500'}`} aria-current={page === id ? 'page' : undefined}>
              <span className={`grid h-8 w-14 place-items-center rounded-full ${page === id ? 'bg-sage-100' : ''}`}><Icon className="h-5 w-5" /></span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
