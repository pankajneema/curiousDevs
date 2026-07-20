'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const products = [
  { name: 'AgentGuard', badge: 'Early access', badgeColor: 'bg-p1/10 text-p1', desc: 'AI Agent Security · open-source', href: '/#products' },
  { name: 'CurioComply', badge: 'Soon', badgeColor: 'bg-p2/10 text-p2', desc: 'DPDP Compliance Automation', href: '/#products' },
  { name: 'AeroOS', badge: '2027', badgeColor: 'bg-p3/10 text-p3', desc: 'Autonomous Fleet OS', href: '/#products' },
]

const navLinks = [
  { label: 'Platform', href: '/#platform' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="16,3 27.26,9.5 27.26,22.5 16,29 4.74,22.5 4.74,9.5" stroke="#38BDF8" strokeWidth="1.7" strokeLinejoin="round" fill="rgba(56,189,248,0.1)" />
      <path d="M20 11 A6 6 0 1 0 20 21" stroke="#EEF1F7" strokeWidth="2.1" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="16" r="2" fill="#38BDF8" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const ddRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => { setMobileOpen(false); setDdOpen(false) }, [pathname])
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : '' }, [mobileOpen])

  return (
    <>
      <div className="bg-gradient-to-r from-p1/10 to-p2/10 border-b border-brd text-center py-2 px-4 text-xs font-mono tracking-wide text-tx">
        <span className="inline-block bg-accent text-ink text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-2">NEW</span>
        AgentGuard is entering early access —&nbsp;
        <Link href="/#products" className="text-accent hover:underline underline-offset-2">join the waitlist →</Link>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-brd' : 'bg-transparent'}`}>
        <nav className="max-w-content mx-auto px-6 h-16 flex items-center gap-6" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2.5 font-head font-bold text-lg text-tx shrink-0">
            <Logo />
            <span>Curios<span className="text-accent">Devs</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-1">
            <div className="relative" ref={ddRef}>
              <button
                onClick={() => setDdOpen(v => !v)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-tx hover:bg-ink-3 transition-colors"
                aria-expanded={ddOpen}
              >
                Products
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"
                  className={`transition-transform duration-150 ${ddOpen ? 'rotate-180' : ''}`}>
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>
              {ddOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-ink-2 rounded-2xl shadow-2xl border border-brd p-2 z-50">
                  {products.map(p => (
                    <Link key={p.name} href={p.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-3 transition-colors">
                      <div>
                        <div className="flex items-center gap-2 font-head font-semibold text-sm text-tx">
                          {p.name}
                          <span className={`text-[10px] font-bold font-mono uppercase px-1.5 py-0.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                        </div>
                        <div className="text-xs text-muted mt-0.5">{p.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-tx hover:bg-ink-3 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Link href="/#products"
              className="px-5 py-2 bg-gradient-to-br from-accent to-accent-deep text-ink text-sm font-semibold rounded-xl hover:brightness-110 transition-all">
              Get started
            </Link>
          </div>

          <button onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden ml-auto flex flex-col gap-1.5 p-2 rounded-lg hover:bg-ink-3"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            <span className={`block w-5 h-0.5 bg-tx transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-tx transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-tx transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-ink pt-[calc(40px+64px)] px-6 pb-8 overflow-y-auto lg:hidden flex flex-col gap-2">
          <p className="text-xs font-mono font-bold text-faint uppercase tracking-widest mb-2">Products</p>
          {products.map(p => (
            <Link key={p.name} href={p.href} className="flex items-center gap-3 p-3 rounded-xl bg-ink-2 hover:bg-ink-3 transition-colors">
              <div>
                <div className="font-head font-semibold text-sm text-tx">{p.name}</div>
                <div className="text-xs text-muted">{p.desc}</div>
              </div>
            </Link>
          ))}
          <div className="border-t border-brd my-3" />
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="text-base font-medium text-tx py-2">{l.label}</Link>
          ))}
          <Link href="/#products"
            className="mt-4 w-full py-3 text-center bg-accent text-ink rounded-xl text-sm font-semibold">
            Get started
          </Link>
        </div>
      )}
    </>
  )
}
