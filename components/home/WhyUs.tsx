const results = [
  {
    icon: '💰',
    stat: '20–40%',
    title: 'Cut AI costs without cutting features',
    desc: 'Teams using TokenFin find and eliminate LLM waste within the first week. Real attribution reveals which features drive cost — so you optimize what matters, not what\'s visible.',
    color: 'border-t-teal',
  },
  {
    icon: '⚡',
    stat: '< 15 min',
    title: 'First insight before your next standup',
    desc: 'One npm install. One SDK call. Your dashboard starts populating immediately — no data pipeline, no schema changes, no DevOps ticket. You have signal before the meeting starts.',
    color: 'border-t-coral',
  },
  {
    icon: '🔮',
    stat: '1 line',
    title: 'Fits perfectly into your existing code',
    desc: 'Wrap any LLM call — OpenAI, Anthropic, Bedrock, Mistral — with a single track() call. No refactoring. No vendor lock-in. Works with whatever you\'re already running.',
    color: 'border-t-[#8B5CF6]',
  },
  {
    icon: '📊',
    stat: 'Real-time',
    title: 'Prove AI ROI to your CFO — finally',
    desc: 'Stop guessing at spreadsheets. TokenFin gives you chargeback reports by team, feature, and model — in seconds. Your CFO gets the data they need. You get budget approval.',
    color: 'border-t-teal',
  },
  {
    icon: '🛡️',
    stat: 'Aug 2026',
    title: 'EU AI Act compliance, built in from day one',
    desc: 'AgentOS generates conformity documentation, risk registers, and audit trails automatically. Don\'t scramble in Q4 — ship compliant from the start.',
    color: 'border-t-coral',
  },
  {
    icon: '🚀',
    stat: '$200K+',
    title: 'Recover the LLM budget your team is burning',
    desc: 'The average AI team wastes over $200K/year in unattributed, un-optimized LLM spend. TokenFin makes that visible. Once visible, it gets fixed — fast.',
    color: 'border-t-[#8B5CF6]',
  },
]

export default function WhyUs() {
  return (
    <section className="py-24 bg-white" id="why-us">
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Why teams choose us</p>
          <h2 className="font-head font-bold text-4xl lg:text-5xl text-midnight">
            What your team unlocks<br/>
            <span className="text-coral">in week one.</span>
          </h2>
          <p className="mt-4 text-sub max-w-xl mx-auto">
            Not someday. Not after a six-week implementation. TokenFin delivers signal on day one — or we haven&apos;t done our job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map(r => (
            <div key={r.title} className={`bg-surface rounded-2xl border-t-4 ${r.color} border border-border p-7 flex flex-col gap-3 hover:shadow-md transition-shadow`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <span className="font-head font-bold text-2xl text-midnight">{r.stat}</span>
              </div>
              <h3 className="font-head font-semibold text-lg text-midnight leading-snug">{r.title}</h3>
              <p className="text-sub text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
