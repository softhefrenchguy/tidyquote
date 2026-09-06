import { useEffect, useState } from 'react'
import { CheckIcon } from './components/Icons'
import { Navigation, type Page } from './components/Navigation'
import { Onboarding } from './components/Onboarding'
import { QuotePage } from './pages/QuotePage'
import { SettingsPage } from './pages/SettingsPage'
import type { CleaningQuoteSettings } from './types/settings'
import { hasSavedSettings, loadSettings, saveSettings } from './utils/storage'

export default function App() {
  const [configured, setConfigured] = useState(hasSavedSettings)
  const [settings, setSettings] = useState<CleaningQuoteSettings>(loadSettings)
  const [page, setPage] = useState<Page>(() => configured ? 'quote' : 'settings')
  const [onboarding, setOnboarding] = useState(() => !configured)
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    if (!showSaved) return
    const timeout = window.setTimeout(() => setShowSaved(false), 2200)
    return () => window.clearTimeout(timeout)
  }, [showSaved])

  const navigate = (nextPage: Page) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = (nextSettings: CleaningQuoteSettings) => {
    saveSettings(nextSettings)
    setSettings(nextSettings)
    setConfigured(true)
    setShowSaved(true)
    setPage('quote')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (onboarding) return <Onboarding onStart={() => { setOnboarding(false); setPage('settings') }} />

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <Navigation page={page} onNavigate={navigate} />
      {showSaved && <div className="fixed left-1/2 top-4 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white shadow-lift" role="status"><CheckIcon className="h-4 w-4" /> Pricing saved.</div>}
      {page === 'quote'
        ? <QuotePage settings={settings} onOpenSettings={() => navigate('settings')} />
        : <SettingsPage settings={settings} onSave={handleSave} />}
    </div>
  )
}
