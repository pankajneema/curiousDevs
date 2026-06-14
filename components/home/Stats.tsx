
const problems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 14l-4-4 4-4"/>
        <path d="M5 10h11a4 4 0 0 1 0 8h-1"/>
      </svg>
    ),
    label: 'The Attribution Black Hole',
    desc: "Your OpenAI invoice says $12,400. It doesn't say which team spent $7,000 of that — or on which feature. Finance asks. Engineering shrugs. Someone opens a spreadsheet. Nobody wins.",
    accent: 'border-coral/40 bg-coral/5',
    iconColor: 'text-coral',
    dot: 'bg-coral',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    label: 'Latency by Surprise',
    desc: "You picked a model in week 1. Now it's month 6, your product scaled, and nobody benchmarked whether you're still on the right model. Latency crept up. Quality crept down. Costs crept sideways.",
    accent: 'border-teal/40 bg-teal/5',
    iconColor: 'text-teal',
    dot: 'bg-teal',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    label: 'Governance as an Afterthought',
    desc: "Your AI agents run in production with no policy guardrails, no decision logs, and no kill switch. That's fine — until the EU AI Act auditor arrives or a model hallucinates at scale.",
    accent: 'border-[#8B5CF6]/40 bg-[#8B5CF6]/5',
    iconColor: 'text-[#8B5CF6]',
    dot: 'bg-[#8B5CF6]',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    label: 'Compliance on a Deadline',
    desc: "The EU AI Act General-Purpose AI provisions apply from August 2025. The High-Risk AI rules kick in August 2026. Most engineering teams don't know where to start. Panic is not a compliance strategy.",
    accent: 'border-coral/40 bg-coral/5',
    iconColor: 'text-coral',
    dot: 'bg-coral',
  },
]

export default function Stats() {
  return (
    <section
      className="bg-surface pb-28"
      id="problem"
      aria-label="The problem we solve"
      style={{ marginTop: '-80px', paddingTop: '160px', position: 'relative', zIndex: 5 }}
    >
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-coral uppercase tracking-widest mb-3">The problem we&apos;re solving</p>
          <h2 className="font-head font-bold text-4xl lg:text-5xl text-midnight leading-tight">
            AI teams are flying blind<br/>
            <span className="text-coral">on cost, quality, and risk.</span>
          </h2>
          <p className="mt-4 text-sub max-w-2xl mx-auto text-lg">
            Every AI team we talk to has the same four problems. We built TokenFin and AgentOS to solve all of them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {problems.map(p => (
            <div key={p.label}
              className={`rounded-2xl border bg-white shadow-sm ${p.accent} p-7 flex gap-5 hover:shadow-md transition-shadow`}>
              <div className={`shrink-0 mt-0.5 ${p.iconColor}`}>{p.icon}</div>
              <div>
                <h3 className="font-head font-bold text-midnight text-lg mb-2">{p.label}</h3>
                <p className="text-sub text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sub/60 font-mono text-xs tracking-widest uppercase mb-5">
            Sound familiar? That&apos;s why we built this.
          </p>
          <a href="/products/tokenfin"
            className="inline-flex items-center gap-2 px-8 py-3 bg-midnight hover:bg-midnight/90 text-white font-semibold rounded-xl transition-all">
            See how TokenFin fixes this →
          </a>
        </div>
      </div>
    </section>
  )
}
