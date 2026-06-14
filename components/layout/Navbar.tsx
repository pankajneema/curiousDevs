'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const products = [
  {
    name: 'TokenFin',
    badge: 'Beta',
    badgeColor: 'bg-teal/10 text-teal',
    desc: 'LLM Cost Attribution & FinOps',
    href: '/products/tokenfin',
    dashboardHref: '/dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    name: 'AgentOS',
    badge: '2026',
    badgeColor: 'bg-coral/10 text-coral',
    desc: 'Enterprise AI Agent Governance',
    href: '/products/agentos',
    dashboardHref: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8533A" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2"/>
        <path d="M9 11V7a3 3 0 0 1 6 0v4"/>
        <circle cx="12" cy="16" r="1" fill="#E8533A"/>
      </svg>
    ),
  },
]

const navLinks = [
  { label: 'Platform', href: '/#platform' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [ddOpen, setDdOpen]           = useState(false)
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
      {/* Announce bar */}
      <div className="bg-midnight text-white text-center py-2 px-4 text-xs font-mono tracking-wider">
        🚀 TokenFin private beta is live — LLM cost attribution for AI teams.&nbsp;
        <Link href="/products/tokenfin" className="text-teal underline-offset-2 hover:underline">Request access →</Link>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-border' : 'bg-surface'}`}>
        <nav className="max-w-content mx-auto px-6 h-16 flex items-center gap-6" aria-label="Main navigation">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-head font-bold text-lg text-midnight shrink-0">
            <svg width="32" height="32" viewBox="0 0 44 44">
              <g transform="translate(22,22) scale(0.72)">
                <path d="M 27.9,-2.4 A 28,28 0 1,1 2.4,-27.9 L 1.5,-17.9 A 18,18 0 1,0 17.9,-1.5 Z" fill="#1A1A2E"/>
                <circle cx="19.8" cy="-19.8" r="5.5" fill="#E8533A"/>
              </g>
            </svg>
            CuriousDevs
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1">

            {/* Products dropdown */}
            <div className="relative" ref={ddRef}>
              <button
                onClick={() => setDdOpen(v => !v)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-sub hover:text-midnight hover:bg-surface-2 transition-colors"
                aria-expanded={ddOpen}
              >
                Products
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"
                  className={`transition-transform duration-150 ${ddOpen ? 'rotate-180' : ''}`}>
                  <path d="M2 4l4 4 4-4"/>
                </svg>
              </button>

              {ddOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-border p-2 z-50">
                  {products.map(p => (
                    <Link key={p.name} href={p.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center shrink-0">{p.icon}</div>
                      <div>
                        <div className="flex items-center gap-2 font-head font-semibold text-sm text-midnight">
                          {p.name}
                          <span className={`text-[10px] font-bold font-mono uppercase px-1.5 py-0.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                        </div>
                        <div className="text-xs text-sub mt-0.5">{p.desc}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-border mt-1 pt-1 px-3 pb-1 flex justify-between items-center">
                    <span className="text-xs text-sub">Need help?</span>
                    <Link href="/contact" className="text-xs font-semibold text-coral hover:underline">Talk to us →</Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-sub hover:text-midnight hover:bg-surface-2 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Link href="/contact" className="text-sm font-medium text-sub hover:text-midnight transition-colors">Contact</Link>
            <Link href="https://tokenfin.curiousdevs.com/login"
              className="px-4 py-2 text-sm font-semibold text-midnight border border-border rounded-lg hover:border-midnight hover:bg-surface transition-colors flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
              </svg>
              Log in to TokenFin
            </Link>
            <Link href="https://tokenfin.curiousdevs.com"
              className="px-4 py-2 bg-coral text-white text-sm font-semibold rounded-lg hover:bg-[#D4472F] transition-colors">
              Get started free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden ml-auto flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            <span className={`block w-5 h-0.5 bg-midnight transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}/>
            <span className={`block w-5 h-0.5 bg-midnight transition-opacity ${mobileOpen ? 'opacity-0' : ''}`}/>
            <span className={`block w-5 h-0.5 bg-midnight transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[calc(40px+64px)] px-6 pb-8 overflow-y-auto lg:hidden flex flex-col gap-2">
          <p className="text-xs font-mono font-bold text-sub uppercase tracking-widest mb-2">Products</p>
          {products.map(p => (
            <Link key={p.name} href={p.href}
              className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-surface-2 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">{p.icon}</div>
              <div>
                <div className="font-head font-semibold text-sm text-midnight">{p.name}</div>
                <div className="text-xs text-sub">{p.desc}</div>
              </div>
            </Link>
          ))}
          <div className="border-t border-border my-3"/>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="text-base font-medium text-midnight py-2">{l.label}</Link>
          ))}
          <Link href="/contact" className="text-base font-medium text-midnight py-2">Contact</Link>
          <div className="mt-4 flex flex-col gap-3">
            <Link href="https://tokenfin.curiousdevs.com/login"
              className="w-full py-3 text-center border border-border rounded-xl text-sm font-semibold text-midnight">
              Log in
            </Link>
            <Link href="https://tokenfin.curiousdevs.com"
              className="w-full py-3 text-center bg-coral text-white rounded-xl text-sm font-semibold">
              Get started free
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
