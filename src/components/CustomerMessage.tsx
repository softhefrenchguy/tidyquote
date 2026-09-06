import { useEffect, useState } from 'react'
import { CopyIcon, MessageIcon } from './Icons'

interface CustomerMessageProps {
  message: string
  phone: string
}

export function CustomerMessage({ message, phone }: CustomerMessageProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = message
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }
    setCopied(true)
  }

  const phoneDigits = phone.replace(/[^\d]/g, '')
  const whatsappUrl = phoneDigits ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}` : ''

  return (
    <section className="card p-5 md:p-6" aria-labelledby="customer-message-heading">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Ready to send</p>
          <h2 id="customer-message-heading" className="section-title">Customer message</h2>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-50 text-sage-700"><MessageIcon className="h-5 w-5" /></span>
      </div>
      <div className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">{message}</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={copyMessage} className="button-secondary">
          {copied ? <><span className="grid h-5 w-5 place-items-center rounded-full bg-sage-600 text-white">✓</span> Copied!</> : <><CopyIcon className="h-5 w-5" /> Copy message</>}
        </button>
        {whatsappUrl ? (
          <a className="button-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageIcon className="h-5 w-5" /> Open in WhatsApp</a>
        ) : (
          <button type="button" className="button-secondary cursor-not-allowed opacity-50" disabled title="Add a customer phone number first"><MessageIcon className="h-5 w-5" /> Add phone for WhatsApp</button>
        )}
      </div>
    </section>
  )
}
