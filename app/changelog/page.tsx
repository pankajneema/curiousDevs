import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog — CuriousDevs',
  alternates: { canonical: 'https://curiousdevs.com/changelog' },
}

export default function Page() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-head font-black text-5xl text-white mb-4">Changelog</h1>
          <p className="text-white/60 text-lg">What's new at CuriousDevs. We ship weekly.</p>
        </div>
      </section>
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-5">
              <div key={"v0.9 — June 2025"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🆕</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">v0.9 — June 2025</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Added Groq provider support. Improved model comparison charts. Chargeback export now includes per-user breakdowns. Fixed Bedrock token counting edge case.</p>
                <a href="#" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"v0.8 — May 2025"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🆕</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">v0.8 — May 2025</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Launched budget guardrails with email + Slack alerts. Added real-time dashboard refresh. Migrated to new token counting API for 12% more accuracy.</p>
                <a href="#" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"v0.7 — April 2025"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🆕</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">v0.7 — April 2025</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">First private beta release. Core attribution, dashboards, and OpenAI/Anthropic support. 23 teams in the beta.</p>
                <a href="#" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
        </div>
      </section>
    </main>
  )
}
