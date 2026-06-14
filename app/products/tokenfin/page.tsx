import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TokenFin — LLM Cost Attribution & FinOps | CuriousDevs',
  description: 'TokenFin gives AI teams token-level cost attribution, real-time spend dashboards, and budget guardrails. Cut LLM costs 20–40% in week one.',
  alternates: { canonical: 'https://tokenfin.curiousdevs.com' },
}

const features = [
  { icon: '🧾', title: 'Token-level attribution', desc: 'Every LLM call attributed to the exact feature, user, and team that generated it.' },
  { icon: '📡', title: 'Real-time dashboards', desc: 'Live spend monitoring with configurable burn-rate alerts before surprises happen.' },
  { icon: '⚖️', title: 'Model comparison', desc: 'Compare GPT-4o vs Claude vs Mistral on cost, latency, and quality for your real workloads.' },
  { icon: '🛡️', title: 'Budget guardrails', desc: 'Hard and soft limits per team or feature. Ship fast without cost overruns.' },
  { icon: '📊', title: 'Chargeback reports', desc: 'CFO-ready reports showing AI ROI by department — in seconds, not spreadsheets.' },
  { icon: '🔌', title: 'Multi-provider support', desc: 'OpenAI, Anthropic, AWS Bedrock, Mistral, Groq, LangChain, LlamaIndex and more.' },
]

export default function TokenFinPage() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-teal/20 text-teal font-mono text-xs px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            Private Beta — Apply for access
          </div>
          <h1 className="font-head font-black text-5xl lg:text-6xl text-white mb-6 leading-tight">
            TokenFin<br/>
            <span className="text-teal">LLM Cost Intelligence.</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl">
            Token-level cost attribution for every LLM call. Real-time dashboards, budget guardrails, and model analytics — built for AI teams that want to scale without surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://tokenfin.curiousdevs.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal hover:bg-teal/90 text-midnight font-bold rounded-xl transition-all">
              Start free — no credit card →
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all">
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Features</p>
            <h2 className="font-head font-bold text-3xl text-midnight">Everything you need to master AI costs.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">{f.title}</h3>
                <p className="text-sub text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-midnight text-center px-6">
        <h2 className="font-head font-bold text-3xl text-white mb-4">Ready to cut your AI costs?</h2>
        <p className="text-white/60 mb-8">Free plan available. Setup in under 15 minutes.</p>
        <a href="https://tokenfin.curiousdevs.com" className="inline-block px-8 py-4 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all text-lg">
          Get started free →
        </a>
      </section>
    </main>
  )
}
