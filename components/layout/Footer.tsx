import Link from 'next/link'

const cols = [
  {
    title: 'Products',
    links: [
      { label: 'TokenFin', href: '/products/tokenfin' },
      { label: 'AgentOS', href: '/products/agentos' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Open Source', href: '/open-source' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs#api' },
      { label: 'SDK Reference', href: '/docs#sdk' },
      { label: 'Integrations', href: '/#integrations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/security' },
      { label: 'Cookie Settings', href: '/privacy#cookies' },
      { label: 'Grievance Officer', href: '/privacy#grievance' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0E0E1C] text-white/55 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-head font-bold text-lg text-white">
              <svg width="28" height="28" viewBox="0 0 44 44">
                <g transform="translate(22,22) scale(0.72)">
                  <path d="M 27.9,-2.4 A 28,28 0 1,1 2.4,-27.9 L 1.5,-17.9 A 18,18 0 1,0 17.9,-1.5 Z" fill="#F4F2EC"/>
                  <circle cx="19.8" cy="-19.8" r="5.5" fill="#E8533A"/>
                </g>
              </svg>
              CuriousDevs
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-widest text-coral">We Don&apos;t Know Yet.</p>
            <p className="text-sm leading-relaxed max-w-[26ch]">
              AI infrastructure for the production era. Building TokenFin and AgentOS — the tools the AI era is missing.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="https://github.com/curiousdevs" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
              </a>
              <a href="https://twitter.com/curiousdevs" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com/company/curiousdevs" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <p className="font-head font-semibold text-sm text-white mb-4">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-white/25 tracking-wider">
            © {new Date().getFullYear()} CuriousDevs. All rights reserved. · Made with ❤️ in India
          </p>
          <div className="flex gap-5">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Security', href: '/security' },
              { label: 'Contact', href: '/contact' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="font-mono text-[11px] text-white/30 hover:text-white/70 tracking-wider transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
