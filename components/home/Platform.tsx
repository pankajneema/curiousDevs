
const cards = [
  {
    col: 'lg:col-span-2 lg:row-span-2',
    tag: 'Core',
    title: 'Token-level cost attribution',
    desc: 'Every single LLM call — attributed to the exact feature, user, team, and model that generated it. No more guessing from a flat API invoice.',
    accent: 'from-teal/20 to-teal/5 border-teal/30',
    labelColor: 'text-teal',
    mock: (
      <div className="mt-4 bg-[#0E0E1C] rounded-xl p-4 font-mono text-xs space-y-1.5">
        <div className="flex justify-between text-white/40 border-b border-white/10 pb-2 mb-2">
          <span>Feature</span><span>Team</span><span>Model</span><span>Cost</span>
        </div>
        {[
          ['search-v2', 'ml-infra', 'gpt-4o', '$0.0041'],
          ['summarize', 'product', 'claude-3-5', '$0.0018'],
          ['chat-bot', 'support', 'gpt-4o-mini', '$0.0003'],
          ['embeddings', 'data', 'text-emb-3', '$0.0001'],
        ].map(([f,t,m,c]) => (
          <div key={f} className="flex justify-between text-white/70 hover:bg-white/5 rounded px-1 py-0.5 transition-colors">
            <span className="text-teal">{f}</span>
            <span>{t}</span>
            <span className="text-[#F59E0B]">{m}</span>
            <span className="text-white">{c}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    col: 'lg:col-span-1',
    tag: 'Real-time',
    title: 'Live spend alerts',
    desc: 'Burn-rate alerts fire before your bill does. Set team-level and feature-level thresholds.',
    accent: 'from-coral/20 to-coral/5 border-coral/30',
    labelColor: 'text-coral',
    mock: (
      <div className="mt-4 flex flex-col gap-2">
        {[
          { label: 'ml-infra/search', pct: 78, over: false },
          { label: 'product/summarize', pct: 94, over: true },
          { label: 'support/chat', pct: 41, over: false },
        ].map(b => (
          <div key={b.label}>
            <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
              <span>{b.label}</span>
              <span className={b.over ? 'text-coral' : 'text-white/40'}>{b.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div className={`h-1.5 rounded-full transition-all ${b.over ? 'bg-coral' : 'bg-teal'}`}
                style={{ width: `${b.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    col: 'lg:col-span-1',
    tag: 'Governance',
    title: 'Budget guardrails',
    desc: 'Hard caps and soft warnings per team or feature. Never get a surprise bill again.',
    accent: 'from-[#8B5CF6]/20 to-[#8B5CF6]/5 border-[#8B5CF6]/30',
    labelColor: 'text-[#8B5CF6]',
    mock: null,
  },
  {
    col: 'lg:col-span-1',
    tag: 'Compliance',
    title: 'Audit-ready logs',
    desc: 'Every call, every decision, every policy event — searchable and export-ready for your audit team.',
    accent: 'from-coral/20 to-coral/5 border-coral/30',
    labelColor: 'text-coral',
    mock: null,
  },
  {
    col: 'lg:col-span-2',
    tag: 'Analytics',
    title: 'Model benchmarks on your real workloads',
    desc: 'Stop relying on provider leaderboards. Compare GPT-4o, Claude 3.5 Sonnet, Mistral Large, and Gemini 1.5 Pro on your actual prompts — cost-per-token, latency p95, and quality scores side-by-side.',
    accent: 'from-teal/20 to-teal/5 border-teal/30',
    labelColor: 'text-teal',
    mock: (
      <div className="mt-4 grid grid-cols-4 gap-2 font-mono text-[10px]">
        {[
          ['gpt-4o', '$0.041/1K', '820ms', '9.1/10'],
          ['claude-3-5', '$0.027/1K', '640ms', '9.3/10'],
          ['mistral-lg', '$0.018/1K', '480ms', '8.6/10'],
          ['gemini-1.5', '$0.021/1K', '590ms', '8.8/10'],
        ].map(([m,c,l,q]) => (
          <div key={m} className="bg-white/5 rounded-lg p-2 flex flex-col gap-1">
            <span className="text-teal font-semibold">{m}</span>
            <span className="text-white/50">Cost {c}</span>
            <span className="text-white/50">p95 {l}</span>
            <span className="text-white/70">Quality {q}</span>
          </div>
        ))}
      </div>
    ),
  },
]

export default function Platform() {
  return (
    <section className="py-24 bg-midnight" id="platform">
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-teal uppercase tracking-widest mb-3">Platform</p>
          <h2 className="font-head font-bold text-4xl lg:text-5xl text-white leading-tight">
            Full-stack AI cost intelligence.<br/>
            <span className="text-teal">Nothing left in the dark.</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-lg">
            From raw token counts to board-level ROI — TokenFin connects every dollar to the decision that spent it.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 auto-rows-auto">
          {cards.map(c => (
            <div key={c.title}
              className={`${c.col} rounded-2xl border bg-gradient-to-br ${c.accent} p-7 flex flex-col`}>
              <span className={`font-mono text-[10px] uppercase tracking-widest ${c.labelColor} mb-2`}>{c.tag}</span>
              <h3 className="font-head font-bold text-xl text-white leading-snug">{c.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mt-2">{c.desc}</p>
              {c.mock}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
