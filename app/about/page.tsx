import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — CuriousDevs',
  description: 'CuriousDevs builds AI infrastructure for the next era. Learn about our mission, products, and the team behind TokenFin and AgentOS.',
  alternates: { canonical: 'https://curiousdevs.com/about' },
}

const values = [
  { icon: '🔬', title: 'Curiosity-first', desc: 'We ask why before we ask how. The best infrastructure is born from deep curiosity about the problem, not the solution.' },
  { icon: '⚡', title: 'Ship fast, fix fast', desc: 'We believe in getting signal from real usage. We ship early, learn quickly, and iterate relentlessly.' },
  { icon: '🛡️', title: 'Security is non-negotiable', desc: 'Every product we ship is designed with security and privacy as first-class constraints — never afterthoughts.' },
  { icon: '🌍', title: 'Open by default', desc: 'We contribute back. We document in public. We believe the AI ecosystem grows stronger when knowledge flows freely.' },
]

const timeline = [
  { year: '2024', event: 'CuriousDevs founded in India with a mission to build AI infrastructure for the enterprise era.' },
  { year: 'Early 2025', event: 'TokenFin concept validated — discovered that AI teams were flying blind on LLM costs.' },
  { year: 'Mid 2025', event: 'TokenFin private beta launched. First customers see 20–40% reduction in LLM spend in week one.' },
  { year: 'Late 2025', event: 'AgentOS concept announced. EU AI Act compliance demand emerges as the defining enterprise concern.' },
  { year: '2026', event: 'AgentOS GA planned. CuriousDevs becomes the go-to AI governance platform for the EU AI Act era.' },
]

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-midnight pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs text-teal uppercase tracking-widest mb-4">About CuriousDevs</p>
          <h1 className="font-head font-black text-5xl lg:text-6xl text-white mb-6 leading-tight">
            We build what<br/>
            <span className="text-coral">the AI era is missing.</span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed">
            CuriousDevs is an AI infrastructure company building the foundational layer for how enterprises understand, govern, and optimize their AI spend. We started in India. We&apos;re building for the world.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Our mission</p>
              <h2 className="font-head font-bold text-3xl text-midnight mb-4">Make AI economics transparent and governable — for every team.</h2>
              <p className="text-sub leading-relaxed mb-4">
                AI spend is the new cloud spend. In 2019, companies were shocked by unexpected AWS bills. Today, they&apos;re shocked by OpenAI invoices — and they have zero visibility into which features, which models, or which teams are responsible.
              </p>
              <p className="text-sub leading-relaxed">
                We&apos;re building the FinOps and governance layer that makes AI costs as attributable, predictable, and manageable as any other infrastructure spend. Starting with TokenFin, expanding to full enterprise governance with AgentOS.
              </p>
            </div>
            <div className="bg-midnight rounded-2xl p-8 text-white">
              <div className="font-mono text-xs text-teal mb-6 uppercase tracking-widest">By the numbers</div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { v: '$10.8B', l: 'LLM market by 2025' },
                  { v: '79%', l: 'Teams lack cost attribution' },
                  { v: '20–40%', l: 'Avg cost saved with TokenFin' },
                  { v: 'India', l: 'Built & operated from' },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-head font-black text-2xl text-teal">{s.v}</div>
                    <div className="text-white/50 text-xs mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Our values</p>
          <h2 className="font-head font-bold text-3xl text-midnight mb-10">What drives us.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-surface rounded-2xl border border-border p-7">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">{v.title}</h3>
                <p className="text-sub text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Journey</p>
          <h2 className="font-head font-bold text-3xl text-midnight mb-10">Where we&apos;ve been. Where we&apos;re going.</h2>
          <div className="flex flex-col gap-0">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-coral mt-1.5 shrink-0" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-8">
                  <p className="font-mono text-xs text-coral uppercase tracking-widest mb-1">{t.year}</p>
                  <p className="text-midnight leading-relaxed">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-midnight text-center px-6">
        <h2 className="font-head font-bold text-3xl text-white mb-4">Want to build with us?</h2>
        <p className="text-white/60 mb-8">We&apos;re always looking for curious, driven people who want to shape AI infrastructure.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/careers" className="px-8 py-3 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all">See open roles</a>
          <a href="/contact" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20">Get in touch</a>
        </div>
      </section>
    </main>
  )
}
