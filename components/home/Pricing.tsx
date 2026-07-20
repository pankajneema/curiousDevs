import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const tiers = [
  {
    name: 'Open Source', price: 'Free', unit: 'forever', feat: false,
    desc: 'The full gateway, self-hosted. No seat limits.',
    items: ['SDK + self-hosted proxy', 'YAML policy engine', 'Local audit logging', 'Community support'],
    cta: 'View on GitHub', href: 'https://github.com/curiosdevs',
  },
  {
    name: 'Pro', price: '$99', unit: '– 299 / mo', feat: true,
    desc: 'The managed brain for teams shipping agents.',
    items: ['Everything in Open Source', 'Cloud dashboard + alerts', 'Runtime threat detection', '5–20 agents, session replay'],
    cta: 'Start free trial', href: '/contact',
  },
  {
    name: 'Enterprise', price: 'Custom', unit: '/ yr', feat: false,
    desc: 'For regulated teams running agents at scale.',
    items: ['SSO / SAML, on-prem or VPC', 'MCP registry + custom policies', 'Compliance / audit exports', 'SLA + dedicated support'],
    cta: 'Talk to founders', href: '/contact',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-content mx-auto px-6 py-24 border-t border-brd">
      <Reveal className="max-w-[680px] mb-12 mx-auto text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Open-core</span>
        <h2 className="font-head font-bold text-3xl md:text-4xl mt-4 tracking-tight">Free to run yourself. Priced when you need the cloud.</h2>
        <p className="text-muted mt-4 text-base">Start on the open-source core with zero limits on your own infra. Upgrade only for the managed brain, the registry and the audit exports.</p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4.5" style={{ gap: '18px' }}>
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={(i + 1) as 1 | 2 | 3}>
            <div className={`relative rounded-[18px] p-8 h-full flex flex-col ${t.feat ? 'border border-accent bg-ink-3' : 'card-grad'}`}>
              {t.feat && (
                <span className="absolute -top-3 left-8 font-mono text-[10px] tracking-widest text-ink bg-accent px-2.5 py-1 rounded-full font-bold">MOST ADOPTED</span>
              )}
              <div className="font-mono text-[13px] uppercase tracking-wider text-muted">{t.name}</div>
              <div className="font-head font-bold text-3xl tracking-tight mt-4 mb-1">
                {t.price} <span className="text-sm text-faint font-mono font-normal">{t.unit}</span>
              </div>
              <p className="text-muted text-[13.5px] min-h-[38px]">{t.desc}</p>
              <ul className="flex flex-col gap-3 my-6">
                {t.items.map(it => (
                  <li key={it} className="flex gap-2.5 text-[13.8px] text-tx">
                    <svg className="shrink-0 mt-1 text-p2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
              <Link href={t.href}
                className={`mt-auto text-center py-3 rounded-xl text-sm font-semibold transition-all ${t.feat ? 'bg-gradient-to-br from-accent to-accent-deep text-ink hover:brightness-110' : 'bg-white/[0.04] border border-brd-2 text-tx hover:border-accent hover:text-accent'}`}>
                {t.cta}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
