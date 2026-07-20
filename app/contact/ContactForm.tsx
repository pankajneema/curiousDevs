"use client"
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'done' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  const base = 'w-full px-4 py-3 rounded-xl border border-brd-2 bg-ink text-tx placeholder-faint focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all text-sm'
  const label = 'font-mono text-[10px] text-muted uppercase tracking-widest block mb-1.5'

  if (status === 'done') return (
    <div className="card-grad rounded-2xl h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 gap-4">
      <div className="w-16 h-16 rounded-full bg-p2/10 text-p2 grid place-items-center">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <h3 className="font-head font-bold text-2xl">Message sent!</h3>
      <p className="text-muted max-w-xs">We&apos;ll get back to you within 24 hours at <strong className="text-tx">{form.email}</strong>.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', subject: '', message: '' }) }}
        className="mt-2 text-sm text-accent font-semibold hover:underline">
        Send another message
      </button>
    </div>
  )

  return (
    <div className="card-grad rounded-2xl p-8">
      <div className="mb-6">
        <h2 className="font-head font-bold text-2xl">Send us a message.</h2>
        <p className="text-muted text-sm mt-1">All fields marked * are required. We never share your data.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Full name *</label>
            <input required type="text" placeholder="Your name" value={form.name} onChange={set('name')} className={base} />
          </div>
          <div>
            <label className={label}>Work email *</label>
            <input required type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} className={base} />
          </div>
        </div>

        <div>
          <label className={label}>Company (optional)</label>
          <input type="text" placeholder="Acme Pvt Ltd" value={form.company} onChange={set('company')} className={base} />
        </div>

        <div>
          <label className={label}>Topic *</label>
          <select required value={form.subject} onChange={set('subject')} className={base}>
            <option value="">Select a topic…</option>
            <option value="AgentGuard early access">AgentGuard early access</option>
            <option value="CurioComply / DPDP compliance">CurioComply / DPDP compliance</option>
            <option value="AeroOS / fleet operations">AeroOS / fleet operations</option>
            <option value="Partnership">Partnership or integration</option>
            <option value="Investment">Investment inquiry</option>
            <option value="Careers">Careers</option>
            <option value="Other">Something else</option>
          </select>
        </div>

        <div>
          <label className={label}>Message *</label>
          <textarea required placeholder="Tell us what you're working on and how we can help…"
            value={form.message} onChange={set('message')} rows={5}
            className={base + ' resize-none'} maxLength={5000} />
          <p className="text-right text-[10px] text-faint mt-1">{form.message.length}/5000</p>
        </div>

        <button type="submit" disabled={status === 'loading'}
          className="py-3.5 px-6 bg-gradient-to-br from-accent to-accent-deep text-ink font-semibold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 hover:brightness-110">
          {status === 'loading' ? (
            <><span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" /> Sending…</>
          ) : 'Send message →'}
        </button>

        {status === 'error' && (
          <p className="text-p3 text-sm text-center bg-p3/5 border border-p3/20 rounded-xl py-3 px-4">
            Something went wrong. Please email <a href="mailto:hello@curiousdevs.com" className="font-semibold underline">hello@curiousdevs.com</a> directly.
          </p>
        )}

        <p className="text-muted text-xs text-center">
          By submitting this form you agree to our{' '}
          <a href="/privacy" className="underline hover:text-tx">Privacy Policy</a>.
          We respond within 24 hours on business days.
        </p>
      </form>
    </div>
  )
}
