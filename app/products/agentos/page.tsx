"use client"
import { useState } from 'react'
import AgentOSModal from '@/components/ui/AgentOSModal'

const pillars = [
  { icon: '📋', title: 'EU AI Act Compliance', desc: 'Auto-generate conformity documentation, risk registers, and audit trails. Ship compliant from day one.' },
  { icon: '🛡️', title: 'Policy Enforcement', desc: 'Define what agents can and cannot do — enforce those guardrails at runtime, not in post-mortems.' },
  { icon: '🔍', title: 'Full Audit Trail', desc: 'Every agent decision, every tool call, every output — logged, searchable, and export-ready for regulators.' },
  { icon: '⚡', title: 'Real-time Monitoring', desc: 'Watch your AI agents operate in production. Intervene, pause, or rollback in seconds.' },
]

export default function AgentOSPage() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <main>
      <AgentOSModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <section className="bg-midnight pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-coral/20 text-coral font-mono text-xs px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-coral" />
            Coming 2026 — Join the waitlist
          </div>
          <h1 className="font-head font-black text-5xl lg:text-6xl text-white mb-6 leading-tight">
            AgentOS<br/>
            <span className="text-coral">Enterprise AI Governance.</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl">
            The governance platform for AI agents in regulated industries. Policy enforcement, EU AI Act compliance, audit trails, and real-time monitoring — built for 2026 and beyond.
          </p>
          <button onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-coral hover:bg-coral/90 text-white font-bold rounded-xl transition-all text-lg">
            Request early access →
          </button>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Four pillars</p>
            <h2 className="font-head font-bold text-3xl text-midnight">Govern your AI agents with confidence.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map(p => (
              <div key={p.title} className="bg-white rounded-2xl border border-border p-7 flex gap-5">
                <span className="text-3xl shrink-0">{p.icon}</span>
                <div>
                  <h3 className="font-head font-bold text-lg text-midnight mb-2">{p.title}</h3>
                  <p className="text-sub text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-midnight text-center px-6">
        <h2 className="font-head font-bold text-3xl text-white mb-4">Be first when we launch.</h2>
        <p className="text-white/60 mb-8">We&apos;re building AgentOS with design partners. Limited early access spots available.</p>
        <button onClick={() => setModalOpen(true)}
          className="inline-block px-8 py-4 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all text-lg">
          Join the waitlist →
        </button>
      </section>
    </main>
  )
}
