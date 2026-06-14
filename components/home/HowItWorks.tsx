const steps = [
  {
    n: '01',
    title: 'Install the SDK',
    desc: 'One npm install. Works in Node, Python (pip), or any runtime. No infrastructure changes required.',
    code: 'npm install @tokenfin/sdk',
    color: 'text-teal',
  },
  {
    n: '02',
    title: 'Wrap your LLM calls',
    desc: 'Add a single track() wrapper around any OpenAI, Anthropic, or Bedrock call. That\'s it.',
    code: 'tf.track("chat-feature", () => openai.chat(...))',
    color: 'text-coral',
  },
  {
    n: '03',
    title: 'View your dashboard',
    desc: 'Log in to tokenfin.curiousdevs.com and see real-time attribution data, model comparisons, and cost trends.',
    code: 'tokenfin.curiousdevs.com/dashboard',
    color: 'text-[#8B5CF6]',
  },
  {
    n: '04',
    title: 'Optimize & save',
    desc: 'Set alerts, apply budget guardrails, swap models with confidence, and cut your AI bill by 20–40%.',
    code: 'avg_savings = "20-40% in week one"',
    color: 'text-teal',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface" id="how-it-works">
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">How it works</p>
          <h2 className="font-head font-bold text-4xl lg:text-5xl text-midnight">
            From install to insight<br/>
            <span className="text-coral">in under 15 minutes.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-border z-0" />
              )}
              <div className="bg-white rounded-2xl border border-border p-6 relative z-10 h-full flex flex-col gap-4">
                <span className={`font-head font-black text-4xl ${s.color} opacity-30`}>{s.n}</span>
                <h3 className="font-head font-bold text-lg text-midnight">{s.title}</h3>
                <p className="text-sub text-sm leading-relaxed flex-1">{s.desc}</p>
                <code className="font-mono text-[11px] bg-midnight text-teal rounded-lg px-3 py-2 block truncate">
                  {s.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
