import Reveal from '@/components/ui/Reveal'

const modules = [
  { k: 'Module A', h: 'Agent IAM', p: 'A unique, cryptographic identity for every agent. Least-privilege policies and short-lived scoped credentials — with a live inventory of exactly what each agent can do.',
    icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" strokeLinecap="round" /></> },
  { k: 'Module B', h: 'Policy Engine', p: 'Guardrails as code in plain YAML, versioned in git. Argument limits, spend caps, rate limits and human-in-the-loop approvals — with dry-run against real traffic before you enforce.',
    icon: <><path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" /><circle cx="19" cy="18" r="2" fill="currentColor" stroke="none" /></> },
  { k: 'Module C', h: 'Threat Detection', p: 'Millisecond classifiers catch prompt injection, goal drift and sequence anomalies, and redact PII, secrets and API keys before they ever leave the boundary.',
    icon: <><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" strokeLinejoin="round" /><path d="M12 8v4M12 15h.01" strokeLinecap="round" /></> },
  { k: 'Module D', h: 'Flight Recorder', p: 'A tamper-evident, append-only log of every prompt, call, verdict and response. Replay any incident step-by-step and export as SOC 2, ISO 27001 or DPDP evidence.',
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" /></> },
  { k: 'Module E', h: 'MCP & Tool Supply-Chain Security', p: 'Scan every MCP server and tool definition before it connects — hidden instructions, permission overreach, suspicious endpoints. A curated trusted-tools registry the MCP ecosystem is missing today.', wide: true,
    icon: <><path d="M4 7l8-4 8 4-8 4-8-4z" strokeLinejoin="round" /><path d="M4 7v6l8 4 8-4V7" strokeLinejoin="round" /><path d="M9 13.5l2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" /></> },
]

export default function Platform() {
  return (
    <section id="platform" className="max-w-content mx-auto px-6 py-24 border-t border-brd">
      <Reveal className="max-w-[680px] mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">One platform, five modules</span>
        <h2 className="font-head font-bold text-3xl md:text-4xl mt-4 tracking-tight">Everything an agent needs to be trusted in production.</h2>
        <p className="text-muted mt-4 text-base">The AgentGuard platform — the security core reused across every CuriosDevs product.</p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((m, i) => (
          <Reveal key={m.h} delay={((i % 2) + 1) as 1 | 2} className={m.wide ? 'md:col-span-2' : ''}>
            <div className="card-grad rounded-[18px] p-6 md:p-7 flex gap-5 h-full">
              <div className="w-11 h-11 shrink-0 rounded-xl grid place-items-center bg-accent/10 text-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{m.icon}</svg>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-faint">{m.k}</div>
                <h3 className="font-head font-semibold text-lg mt-1.5 mb-2 tracking-tight">{m.h}</h3>
                <p className="text-muted text-sm leading-relaxed">{m.p}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
