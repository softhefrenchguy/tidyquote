import { ArrowIcon, CheckIcon, ClockIcon, SparkleIcon } from './Icons'

interface OnboardingProps { onStart: () => void }

export function Onboarding({ onStart }: OnboardingProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-sage-50 px-5 py-8 sm:grid sm:place-items-center">
      <div className="onboarding-blob onboarding-blob-one" /><div className="onboarding-blob onboarding-blob-two" />
      <div className="relative mx-auto max-w-lg">
        <div className="mb-10 flex items-center gap-3 sm:justify-center">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sage-600 text-white shadow-lift"><SparkleIcon className="h-6 w-6" /></span>
          <span className="font-display text-2xl font-semibold text-ink">TidyQuote</span>
        </div>
        <div className="rounded-[2rem] border border-white bg-white/90 p-6 shadow-card backdrop-blur sm:p-10">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-sage-100 text-sage-700"><ClockIcon className="h-8 w-8" /></div>
          <p className="text-center text-xs font-bold uppercase tracking-[.18em] text-sage-600">Welcome</p>
          <h1 className="mt-3 text-center font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">Clear quotes.<br />Less guesswork.</h1>
          <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-6 text-slate-500">Set your rate and usual cleaning times once, then create professional quotes in under a minute.</p>
          <ul className="my-8 space-y-3 text-sm font-medium text-slate-600">
            {['No account or sign-up', 'Your pricing stays on this device', 'Change your settings anytime'].map((item) => <li key={item} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-sage-100 text-sage-700"><CheckIcon className="h-4 w-4" /></span>{item}</li>)}
          </ul>
          <button type="button" className="button-primary w-full" onClick={onStart}>Set up my pricing <ArrowIcon className="h-5 w-5" /></button>
          <p className="mt-4 text-center text-xs text-slate-400">Takes about 2 minutes</p>
        </div>
      </div>
    </main>
  )
}
