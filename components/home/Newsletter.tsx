"use client"
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 bg-midnight" id="newsletter">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="font-mono text-xs text-teal uppercase tracking-widest mb-3">Newsletter</p>
        <h2 className="font-head font-bold text-3xl lg:text-4xl text-white mb-3">
          Stay ahead of AI cost trends.
        </h2>
        <p className="text-white/60 mb-8">
          Monthly deep-dives on LLM FinOps, model benchmarks, governance updates, and what we&apos;re building. No spam. Unsubscribe anytime.
        </p>
        {status === 'done' ? (
          <div className="bg-teal/20 border border-teal/30 rounded-xl px-6 py-4 text-teal font-semibold">
            ✓ You&apos;re on the list — talk soon!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-teal transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-7 py-3 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe →'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-coral/80 text-sm mt-3">Something went wrong. Try again or email hello@curiousdevs.com</p>
        )}
        <p className="text-white/30 text-xs mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}
