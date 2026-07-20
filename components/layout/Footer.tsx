import Link from 'next/link'

const cols = [
  {
    title: 'Products',
    links: [
      { label: 'AgentGuard', href: '/#products' },
      { label: 'CurioComply', href: '/#products' },
      { label: 'AeroOS', href: '/#products' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'How we build', href: '/#platform' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Security research', href: '/#how-it-works' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/security' },
    ],
  },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/curiosdevs', d: 'M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z' },
  { label: 'X', href: 'https://x.com/curiosdevs', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/curiosdevs', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-2 text-muted pt-16 pb-8 border-t border-brd">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 font-head font-bold text-lg text-tx">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <polygon points="16,3 27.26,9.5 27.26,22.5 16,29 4.74,22.5 4.74,9.5" stroke="#38BDF8" strokeWidth="1.7" strokeLinejoin="round" fill="rgba(56,189,248,0.1)" />
                <path d="M20 11 A6 6 0 1 0 20 21" stroke="#EEF1F7" strokeWidth="2.1" strokeLinecap="round" fill="none" />
                <circle cx="16" cy="16" r="2" fill="#38BDF8" />
              </svg>
              <span>Curios<span className="text-accent">Devs</span></span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[30ch]">
              The accountability layer for autonomous systems — from AI agents to physical machines.
            </p>
            <div className="flex gap-3 mt-2">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-brd bg-ink-3 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors" aria-label={s.label}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint mb-4">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted hover:text-tx transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brd pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-faint tracking-wider">
            © {new Date().getFullYear()} CuriosDevs Technologies Pvt Ltd. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-faint tracking-wider">Securing the Autonomous Future</p>
        </div>
      </div>
    </footer>
  )
}
