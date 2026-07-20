'use client'
import { useState } from 'react'

const faqs = [
  { q: 'Is AgentGuard available today?', a: "AgentGuard is in active development and entering early access. Join the waitlist through any product card or the contact form, and we'll bring you in as we onboard the first developer cohort." },
  { q: "What's the difference between your three products?", a: 'AgentGuard secures AI agents (software), CurioComply automates India’s DPDP data-protection compliance (data), and AeroOS orchestrates drone and robot fleets (physical machines). They share one security core — so each one makes the next stronger.' },
  { q: 'Is AgentGuard really open-source?', a: 'Yes. The core gateway, SDK and policy engine are open-source and free to self-host with no seat limits. We monetise the managed cloud, threat detection, MCP registry and compliance exports — the classic open-core model.' },
  { q: 'Who is CurioComply for?', a: 'Any Indian business that handles personal data and must comply with the DPDP Act before the 13 May 2027 deadline — from ten-person D2C brands to banks. Pricing scales from affordable SMB tiers to enterprise.' },
  { q: 'Are you hiring / raising?', a: 'We’re building the founding team (see Careers) and are open to conversations with aligned angels and deep-tech funds. Reach out via the contact form and pick the relevant topic.' },
  { q: 'How do you handle my data?', a: 'Security and privacy are the whole company. We collect the minimum needed to reply to you, never sell data, and build every product privacy-first by design.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="max-w-content mx-auto px-6 py-24 border-t border-brd">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Questions</span>
          <h2 className="font-head font-bold text-3xl md:text-4xl mt-4 tracking-tight">Frequently asked.</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i} className={`rounded-2xl px-6 transition-colors ${isOpen ? 'border border-brd-2 bg-ink-3' : 'card-grad'}`}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center gap-4 py-5 text-left"
                  aria-expanded={isOpen}>
                  <span className="font-head font-semibold text-[15.5px]">{f.q}</span>
                  <span className={`text-accent text-xl shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                {isOpen && <p className="text-muted text-sm leading-relaxed pb-5">{f.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
