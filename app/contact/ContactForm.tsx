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

  const base = 'w-full px-4 py-3 rounded-xl border border-border bg-white text-midnight placeholder-sub focus:outline-none focus:border-midnight focus:ring-2 focus:ring-midnight/10 transition-all text-sm'

  if (status === 'done') return (
    <div className="bg-white rounded-2xl border border-border h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 gap-4">
      <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-3xl">✅</div>
      <h3 className="font-head font-bold text-2xl text-midnight">Message sent!</h3>
      <p className="text-sub max-w-xs">We&apos;ll get back to you within 24 hours at <strong>{form.email}</strong>.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', subject: '', message: '' }) }}
        className="mt-2 text-sm text-coral font-semibold hover:underline">
        Send another message
      </button>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl border border-border p-8">
      <div className="mb-6">
        <h2 className="font-head font-bold text-2xl text-midnight">Send us a message.</h2>
        <p className="text-sub text-sm mt-1">All fields marked * are required. We never share your data.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-[10px] text-sub uppercase tracking-widest block mb-1.5">Full name *</label>
            <input required type="text" placeholder="Ravi Kumar" value={form.name} onChange={set('name')} className={base}/>
          </div>
          <div>
            <label className="font-mono text-[10px] text-sub uppercase tracking-widest block mb-1.5">Work email *</label>
            <input required type="email" placeholder="ravi@company.com" value={form.email} onChange={set('email')} className={base}/>
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] text-sub uppercase tracking-widest block mb-1.5">Company (optional)</label>
          <input type="text" placeholder="Acme AI Pvt Ltd" value={form.company} onChange={set('company')} className={base}/>
        </div>

        <div>
          <label className="font-mono text-[10px] text-sub uppercase tracking-widest block mb-1.5">Topic *</label>
          <select required value={form.subject} onChange={set('subject')} className={base}>
            <option value="">Select a topic…</option>
            <option value="TokenFin Demo">TokenFin demo or trial</option>
            <option value="AgentOS Waitlist">AgentOS early access</option>
            <option value="Enterprise Pricing">Enterprise pricing</option>
            <option value="Partnership">Partnership or integration</option>
            <option value="Investor">Investor inquiry</option>
            <option value="Support">Technical support</option>
            <option value="Other">Something else</option>
          </select>
        </div>

        <div>
          <label className="font-mono text-[10px] text-sub uppercase tracking-widest block mb-1.5">Message *</label>
          <textarea required placeholder="Tell us what you're working on and how we can help…"
            value={form.message} onChange={set('message')} rows={5}
            className={base + ' resize-none'} maxLength={5000}/>
          <p className="text-right text-[10px] text-sub mt-1">{form.message.length}/5000</p>
        </div>

        <button type="submit" disabled={status === 'loading'}
          className="py-3.5 px-6 bg-coral hover:bg-coral/90 text-white font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2">
          {status === 'loading' ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Sending…</>
          ) : 'Send message →'}
        </button>

        {status === 'error' && (
          <p className="text-coral text-sm text-center bg-coral/5 border border-coral/20 rounded-xl py-3 px-4">
            Something went wrong. Please email <a href="mailto:hello@curiousdevs.com" className="font-semibold underline">hello@curiousdevs.com</a> directly.
          </p>
        )}

        <p className="text-sub text-xs text-center">
          By submitting this form you agree to our{' '}
          <a href="/privacy" className="underline hover:text-midnight">Privacy Policy</a>.
          We respond within 24 hours on business days.
        </p>
      </form>
    </div>
  )
}
