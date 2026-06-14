"use client"
import { useState, useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export default function AgentOSModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, type: 'agentos-waitlist' }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-midnight/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-sub hover:text-midnight text-2xl leading-none">×</button>
        {status === 'done' ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="font-head font-bold text-2xl text-midnight mb-2">You&apos;re on the list!</h3>
            <p className="text-sub">We&apos;ll reach out with early access details as we approach the 2026 launch.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-block bg-coral/10 text-coral font-mono text-xs px-3 py-1 rounded-full mb-3">Coming 2026</span>
              <h3 className="font-head font-bold text-2xl text-midnight mb-2">Join the AgentOS waitlist</h3>
              <p className="text-sub text-sm">Enterprise AI agent governance, policy enforcement, and EU AI Act compliance — built for 2026. Get early access.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email" required placeholder="Work email" value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-midnight text-midnight placeholder-sub transition-colors"
              />
              <input
                type="text" placeholder="Company name (optional)" value={company}
                onChange={e => setCompany(e.target.value)}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-midnight text-midnight placeholder-sub transition-colors"
              />
              <button type="submit" disabled={status === 'loading'}
                className="py-3 px-6 bg-midnight hover:bg-midnight/90 text-white font-semibold rounded-xl transition-all disabled:opacity-60">
                {status === 'loading' ? 'Joining…' : 'Request early access →'}
              </button>
              {status === 'error' && <p className="text-coral text-sm text-center">Something went wrong. Try emailing hello@curiousdevs.com</p>}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
