import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const products = [
  {
    name: 'AgentGuard', tone: 'p1', chip: 'In development · first',
    cat: 'AI Agent Security · open-source · global market',
    desc: 'A firewall for AI agents. Every action gets an identity, a policy check and an immutable audit trail — so a single prompt injection can never turn autonomy into a breach. Our technology moat.',
    icon: <><path d="M16 4l10 3.3v7.2c0 6.4-4.2 10.7-10 12.8C10.2 25.2 6 20.9 6 14.5V7.3L16 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M11.6 15l3 3.2 5.8-6.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>,
  },
  {
    name: 'CurioComply', tone: 'p2', chip: 'Next · deadline-driven',
    cat: 'DPDP Compliance Automation · India-first',
    desc: "DPDP compliance on autopilot — data discovery, consent in 22 languages, data-principal rights, and breach filings for every Indian regulator on their own clock. Our cash-flow engine.",
    icon: <><path d="M9 12l2 2 4-4" /><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" strokeLinejoin="round" /></>,
  },
  {
    name: 'AeroOS', tone: 'p3', chip: '2027 · moonshot',
    cat: 'Autonomous Fleet Operating System · hardware-agnostic',
    desc: "The universal control tower for drones and robots — one operator, hundreds of machines, any brand. It inherits AgentGuard's security and CurioComply's compliance engine from day one.",
    icon: <><rect x="5" y="8" width="14" height="10" rx="2.5" /><path d="M12 8V4.5M12 4.5a1.6 1.6 0 100-.01" strokeLinecap="round" /><path d="M9.5 12.5h.01M14.5 12.5h.01M3 12v3M21 12v3" strokeLinecap="round" /></>,
  },
]

const toneMap: Record<string, { bar: string; ico: string; chip: string }> = {
  p1: { bar: 'bg-p1', ico: 'text-p1 bg-p1/10', chip: 'text-p1 border-p1/40 bg-p1/10' },
  p2: { bar: 'bg-p2', ico: 'text-p2 bg-p2/10', chip: 'text-p2 border-p2/40 bg-p2/10' },
  p3: { bar: 'bg-p3', ico: 'text-p3 bg-p3/10', chip: 'text-p3 border-p3/40 bg-p3/10' },
}

export default function Products() {
  return (
    <section id="products" className="max-w-content mx-auto px-6 py-24">
      <Reveal className="max-w-[680px] mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">The portfolio</span>
        <h2 className="font-head font-bold text-3xl md:text-4xl mt-4 tracking-tight">Three products. One mission: make autonomy accountable.</h2>
        <p className="text-muted mt-4 text-base">Each product carries its own colour and its own market — but shares a single security core, built once and reused across all three.</p>
      </Reveal>

      <div className="flex flex-col gap-4">
        {products.map((p, i) => {
          const t = toneMap[p.tone]
          return (
            <Reveal key={p.name} delay={(i + 1) as 1 | 2 | 3}>
              <Link href="/contact" className="card-grad group relative grid grid-cols-[60px_1fr_auto] gap-6 items-center rounded-[18px] p-7 md:p-8 overflow-hidden hover:translate-x-1">
                <span className={`absolute left-0 top-0 bottom-0 w-[3px] ${t.bar}`} />
                <div className={`w-[60px] h-[60px] rounded-2xl grid place-items-center ${t.ico}`}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{p.icon}</svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-head font-bold text-xl md:text-2xl tracking-tight">{p.name}</h3>
                    <span className={`font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${t.chip}`}>{p.chip}</span>
                  </div>
                  <div className="font-mono text-xs text-faint mt-1">{p.cat}</div>
                  <p className="text-muted text-sm md:text-[14.5px] mt-2.5 max-w-[62ch]">{p.desc}</p>
                </div>
                <svg className="hidden md:block text-muted group-hover:text-tx group-hover:translate-x-1 transition-all" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
