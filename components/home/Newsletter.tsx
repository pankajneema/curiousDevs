'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('error'); setMsg('Please enter a valid email.'); return }
    setState('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'newsletter' }),
      })
      if (!res.ok) throw new Error()
      setState('ok'); setMsg("You're on the list — welcome aboard.")
    } catch { setState('error'); setMsg('Something went wrong. Please try again.') }
  }

  return (
    <section className="max-w-content mx-auto px-6 py-24 border-t border-brd">
      <div className="relative overflow-hidden rounded-3xl border border-brd-2 bg-gradient-to-br from-ink-3 to-ink-2 px-8 md:px-11 py-13 md:py-14 text-center">
        <div className="absolute -top-24 -right-16 w-[340px] h-[340px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--glow), transparent 65%)' }} aria-hidden="true" />
        <div className="relative z-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">The Autonomous Brief</span>
          <h2 className="font-head font-bold text-2xl md:text-4xl mt-3.5 tracking-tight">Security research, product updates, in your inbox.</h2>
          <p className="text-muted max-w-[52ch] mx-auto mt-3.5 text-[15.5px]">Deep-dives on agent security, DPDP readiness and the autonomous frontier — roughly twice a month, no noise.</p>

          {state === 'ok' ? (
            <p className="text-p2 font-mono text-sm mt-7">✓ {msg}</p>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 max-w-[480px] mx-auto mt-7" noValidate>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com" aria-label="Email address"
                className="flex-1 bg-ink border border-brd-2 rounded-xl px-4 py-3.5 text-sm text-tx outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition" />
              <button type="submit" disabled={state === 'loading'}
                className="px-6 py-3.5 bg-gradient-to-br from-accent to-accent-deep text-ink text-sm font-semibold rounded-xl hover:brightness-110 transition disabled:opacity-60">
                {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
          {state === 'error' && <p className="text-p3 font-mono text-xs mt-3">{msg}</p>}
          <p className="text-faint text-xs mt-3.5">No spam. Unsubscribe anytime. We respect your data — it&apos;s literally our business.</p>
        </div>
      </div>
    </section>
  )
}
