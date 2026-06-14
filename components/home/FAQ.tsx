"use client"
import { useState } from 'react'

const faqs = [
  {
    q: "How much overhead does the SDK add to my LLM calls?",
    a: "Sub-millisecond. The SDK wraps your call and pushes telemetry asynchronously in a non-blocking background queue. Your p50 and p95 latencies will not change. We benchmark this on every release — if we ever see >0.5ms overhead in production, we ship a fix before the next sprint."
  },
  {
    q: "Do you send my prompts or model outputs to your servers?",
    a: "No — by default, never. TokenFin only captures metadata: token counts, model name, latency, your custom attribution tags, and timestamps. Prompt/response logging is a separate, explicit opt-in feature. Even when enabled, logs are encrypted at rest with AES-256 and isolated per-organization. You own your data."
  },
  {
    q: "I use multiple providers — OpenAI for chat, Bedrock for embeddings, Mistral for summarization. Can TokenFin track all of them in one dashboard?",
    a: "Yes, that's exactly the use case TokenFin was built for. You get a single unified dashboard across all providers, with cost breakdowns by provider, model, feature, and team. You can compare $spend and quality side-by-side even across providers."
  },
  {
    q: "We track dev, staging, and prod separately. How does TokenFin handle multiple environments?",
    a: "You pass an environment tag when initializing the SDK — `{ env: 'production' }`. Each environment gets its own cost view in the dashboard. You can set separate budget thresholds per environment (e.g., strict limits in prod, looser in dev). Data is always isolated between environments."
  },
  {
    q: "Our finance team needs chargeback reports by department. Can we export those?",
    a: "Yes. Pro and Enterprise plans include chargeback reports exportable as CSV or PDF — broken down by team, feature, model, and time period. You can also pull this data via the API and pipe it directly into your BI tool (Grafana, Metabase, Tableau, etc.)."
  },
  {
    q: "What happens if OpenAI changes their API or pricing?",
    a: "Nothing breaks. The SDK calls their API exactly as you do today — we instrument the wrapper, not the provider. When providers change pricing, we update our cost calculation engine within 24 hours of the announcement. You don't need to change any code."
  },
  {
    q: "We're a Series A startup on a tight budget. Is $5/month really all it costs?",
    a: "Yes. TokenFin Pro is $5/month because we want the product in the hands of every AI team, not just enterprises. If you're pre-revenue or in an accelerator, email us — we have an extra discount for early-stage startups and open-source projects."
  },
  {
    q: "What is AgentOS and how is it different from TokenFin?",
    a: "TokenFin is about cost visibility and FinOps — tracking what your LLM stack spends and why. AgentOS is about governance and compliance — controlling what your AI agents are allowed to do, logging every decision, and generating EU AI Act audit documentation automatically. They're complementary. TokenFin ships today; AgentOS goes GA in 2026."
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-surface" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-head font-bold text-4xl text-midnight">Real questions.<br/>Straight answers.</h2>
          <p className="mt-3 text-sub">These are actual questions from developers and engineering managers evaluating TokenFin.</p>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between px-7 py-5 text-left gap-6 hover:bg-surface/50 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-head font-semibold text-midnight leading-snug">{f.q}</span>
                <span className={`text-coral font-bold text-2xl leading-none shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-7 pb-6">
                  <p className="text-sub leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sub mb-4">Have a question not listed here?</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-midnight text-midnight font-semibold rounded-xl hover:bg-midnight hover:text-white transition-all">
            Ask us directly →
          </a>
        </div>
      </div>
    </section>
  )
}
