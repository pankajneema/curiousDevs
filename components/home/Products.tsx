import Link from 'next/link'

export default function Products() {
  return (
    <section className="py-24 bg-surface" id="products">
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Our Products</p>
          <h2 className="font-head font-bold text-4xl lg:text-5xl text-midnight">Two products.<br/>One clear mission.</h2>
          <p className="mt-4 text-sub max-w-xl mx-auto">We build the AI infrastructure that should already exist. TokenFin solves the LLM cost problem. AgentOS solves the agent governance problem.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* TokenFin */}
          <article className="bg-white rounded-2xl border border-border p-8 flex flex-col gap-5 hover:shadow-lg transition-shadow group">
            <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="1.8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <path d="M12 6v2m0 8v2M9.5 9.5c.83-1.17 2.17-1.5 3-1.5a2.5 2.5 0 0 1 0 5c-1.5 0-2.5 1-2.5 2.5"/>
              </svg>
            </div>
            <div>
              <p className="font-mono text-xs text-teal uppercase tracking-wider mb-2">TokenFin · Private Beta</p>
              <h3 className="font-head font-semibold text-xl text-midnight">Know exactly where every AI dollar goes.</h3>
            </div>
            <p className="text-sub text-sm leading-relaxed flex-1">LLM cost attribution and FinOps for teams spending $10K+/month on AI APIs. Attribute spend by team, feature, and user. Catch waste before the CFO does — and prove ROI before budget reviews.</p>
            <div className="flex flex-wrap gap-2">
              {['Cost Attribution','Multi-provider','Anomaly Alerts','Budget Caps','ClickHouse OLAP'].map(t => (
                <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border text-sub uppercase tracking-wide">{t}</span>
              ))}
            </div>
            <Link href="/products/tokenfin" className="flex items-center gap-2 text-teal font-semibold text-sm group-hover:gap-3 transition-all">
              Open TokenFin dashboard <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </article>

          {/* AgentOS */}
          <article className="bg-midnight rounded-2xl p-8 flex flex-col gap-5 hover:shadow-xl transition-shadow group">
            <div className="w-11 h-11 rounded-xl bg-coral/20 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8533A" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="10" rx="2"/>
                <path d="M9 11V7a3 3 0 0 1 6 0v4"/>
                <circle cx="12" cy="16" r="1" fill="#E8533A"/>
              </svg>
            </div>
            <div>
              <p className="font-mono text-xs text-coral uppercase tracking-wider mb-2">AgentOS · Coming 2026</p>
              <h3 className="font-head font-semibold text-xl text-white">The control layer for enterprise AI agents.</h3>
            </div>
            <p className="text-white/55 text-sm leading-relaxed flex-1">Identity, permissions, observability, governance, and security for AI agents — unified in one platform. Because 79% of enterprises have deployed agents, but only 11% trust them enough for production.</p>
            <div className="flex flex-wrap gap-2">
              {['Agent Identity','OAuth2 / OIDC','Governance Engine','EU AI Act Ready','Audit Trails'].map(t => (
                <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 uppercase tracking-wide">{t}</span>
              ))}
            </div>
            <Link href="/products/agentos" className="flex items-center gap-2 text-coral font-semibold text-sm group-hover:gap-3 transition-all">
              Join the waitlist <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </article>

          {/* CuriousLabs */}
          <article className="bg-white rounded-2xl border border-border p-8 flex flex-col gap-5 hover:shadow-lg transition-shadow group">
            <div className="w-11 h-11 rounded-xl bg-midnight/10 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.8">
                <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <div>
              <p className="font-mono text-xs text-sub uppercase tracking-wider mb-2">CuriousLabs · Open Source</p>
              <h3 className="font-head font-semibold text-xl text-midnight">Tools for curious AI builders, shipped in public.</h3>
            </div>
            <p className="text-sub text-sm leading-relaxed flex-1">SDKs, frameworks, and experiments — open sourced for the AI engineering community. MIT licensed. No strings. Because the best way to build trust is to build in public.</p>
            <div className="flex flex-wrap gap-2">
              {['Open Source','MIT License','SDKs','Research','Community'].map(t => (
                <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border text-sub uppercase tracking-wide">{t}</span>
              ))}
            </div>
            <a href="https://github.com/curiousdevs" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-midnight font-semibold text-sm group-hover:gap-3 transition-all">
              View on GitHub <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
