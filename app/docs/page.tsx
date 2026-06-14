import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation — CuriousDevs',
  alternates: { canonical: 'https://curiousdevs.com/docs' },
}

export default function Page() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-head font-black text-5xl text-white mb-4">Documentation</h1>
          <p className="text-white/60 text-lg">Guides, API reference, and SDK docs for TokenFin and AgentOS.</p>
        </div>
      </section>
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-5">
              <div key={"Quick Start"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Quick Start</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Get TokenFin running in under 15 minutes. Covers npm/pip install, SDK setup, and first dashboard view.</p>
                <a href="/docs#quickstart" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"SDK Reference"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">SDK Reference</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Full API reference for the TokenFin SDK — track(), configure(), exportReport() and all options.</p>
                <a href="/docs#sdk" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"Integrations"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🔌</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Integrations</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Step-by-step guides for OpenAI, Anthropic, AWS Bedrock, Mistral, LangChain, LlamaIndex, and Groq.</p>
                <a href="/docs#integrations" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"Dashboard Guide"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Dashboard Guide</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">How to read attribution reports, set budget alerts, and export chargeback data for finance teams.</p>
                <a href="/docs#dashboard" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"AgentOS Docs"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">AgentOS Docs</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Early preview documentation for AgentOS policy configuration and compliance reporting (2026).</p>
                <a href="/docs#agentos" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
        </div>
      </section>
    </main>
  )
}
