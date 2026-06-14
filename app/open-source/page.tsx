import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Source — CuriousDevs',
  alternates: { canonical: 'https://curiousdevs.com/open-source' },
}

export default function Page() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-head font-black text-5xl text-white mb-4">Open Source</h1>
          <p className="text-white/60 text-lg">We believe in giving back to the community that built the tools we use every day.</p>
        </div>
      </section>
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-5">
              <div key={"TokenFin SDK"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">TokenFin SDK</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">The core TokenFin instrumentation SDK is open source under MIT. Instrument your LLM calls and contribute to the community.</p>
                <a href="https://github.com/curiousdevs/tokenfin-sdk" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"Provider Adapters"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🔌</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Provider Adapters</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Official adapters for OpenAI, Anthropic, Bedrock, Mistral, Groq, LangChain, and LlamaIndex — all open source.</p>
                <a href="https://github.com/curiousdevs" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"Documentation"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">📖</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Documentation</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Our full documentation site is open source. Found a typo or want to add an example? PRs welcome.</p>
                <a href="https://github.com/curiousdevs/docs" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"Contributing"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Contributing</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">We welcome contributions of all kinds — code, docs, bug reports, and feature requests. See our contributing guide on GitHub.</p>
                <a href="https://github.com/curiousdevs" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
        </div>
      </section>
    </main>
  )
}
