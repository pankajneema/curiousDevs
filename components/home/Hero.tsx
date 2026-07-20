'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cv = canvasRef.current
    if (!cv || reduce) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    let W = 0, H = 0, raf = 0
    let pts: { x: number; y: number; vx: number; vy: number }[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const size = () => {
      const r = cv.getBoundingClientRect()
      W = cv.width = r.width * dpr
      H = cv.height = r.height * dpr
      const n = Math.min(44, Math.floor(r.width / 28))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.16 * dpr, vy: (Math.random() - 0.5) * 0.16 * dpr,
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const maxd = W / 7
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy)
          if (d < maxd) {
            ctx.globalAlpha = (1 - d / maxd) * 0.26
            ctx.strokeStyle = '#38BDF8'; ctx.lineWidth = dpr
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        ctx.globalAlpha = 0.7; ctx.fillStyle = '#38BDF8'
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4 * dpr, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    size(); draw()
    let to: ReturnType<typeof setTimeout>
    const onResize = () => { cancelAnimationFrame(raf); clearTimeout(to); to = setTimeout(() => { size(); draw() }, 200) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  const nodes = [
    { lab: 'Agents', sub: 'software', color: 'text-p1', bg: 'bg-p1/10', icon: <><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="9" cy="10" r="1.3" fill="currentColor" stroke="none" /><circle cx="15" cy="10" r="1.3" fill="currentColor" stroke="none" /><path d="M9 15h6" strokeLinecap="round" /></> },
    { lab: 'Data', sub: 'compliance', color: 'text-p2', bg: 'bg-p2/10', icon: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></> },
    { lab: 'Machines', sub: 'physical', color: 'text-p3', bg: 'bg-p3/10', icon: <><rect x="6" y="9" width="12" height="9" rx="2" /><path d="M12 9V5M12 5a1.6 1.6 0 100-.01" strokeLinecap="round" /><path d="M9.5 13h.01M14.5 13h.01M3 13v3M21 13v3" strokeLinecap="round" /></> },
  ]

  return (
    <section className="relative overflow-hidden pt-24 pb-16 text-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" aria-hidden="true" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[820px] h-[520px] max-w-full rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, var(--glow), transparent 68%)' }} aria-hidden="true" />
      <div className="relative z-10 max-w-content mx-auto px-6">
        <span className="inline-flex items-center gap-2 font-mono text-xs text-muted bg-white/[0.04] border border-brd-2 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-p2 animate-blink" style={{ boxShadow: '0 0 10px 1px #34E39B' }} />
          Deep-tech security · Est. 2026
        </span>
        <h1 className="font-head font-bold tracking-tight text-4xl sm:text-6xl lg:text-7xl mt-6 max-w-[15ch] mx-auto leading-[1.05]">
          Securing the <span className="gradient-text">autonomous future</span> — from AI agents to physical machines.
        </h1>
        <p className="text-muted text-lg lg:text-xl max-w-[60ch] mx-auto mt-6">
          Autonomy is arriving faster than the trust to run it safely. CuriosDevs builds the accountability layer for
          autonomous systems: the software agents acting today, the data they touch, and the machines they&apos;ll become.
        </p>
        <div className="flex gap-3.5 justify-center mt-9 flex-wrap">
          <Link href="/#products" className="px-6 py-3 bg-gradient-to-br from-accent to-accent-deep text-ink text-sm font-semibold rounded-xl hover:brightness-110 hover:-translate-y-0.5 transition-all">
            See what we&apos;re building →
          </Link>
          <Link href="/#platform" className="px-6 py-3 bg-white/[0.04] border border-brd-2 text-tx text-sm font-semibold rounded-xl hover:border-accent hover:text-accent transition-all">
            Explore the platform
          </Link>
        </div>

        {/* trust spectrum */}
        <div className="mt-20 max-w-[840px] mx-auto">
          <div className="relative grid grid-cols-3">
            <div className="absolute top-[33px] left-[9%] right-[9%] h-0.5 rounded-full opacity-60"
              style={{ background: 'linear-gradient(90deg, var(--p1), var(--p2), var(--p3))' }} />
            {nodes.map(n => (
              <div key={n.lab} className="relative z-10 flex flex-col items-center gap-3.5">
                <div className={`w-[70px] h-[70px] rounded-[20px] grid place-items-center border border-brd-2 ${n.bg} ${n.color}`}
                  style={{ boxShadow: '0 20px 50px -20px rgba(0,0,0,.6)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{n.icon}</svg>
                </div>
                <div className="font-mono text-[13px] font-semibold text-tx">{n.lab}</div>
                <div className="text-xs text-faint -mt-1.5">{n.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-center mt-7 font-mono text-xs text-muted tracking-wide">
            One guardian layer across <span className="text-tx">three domains</span> of autonomy.
          </p>
        </div>
      </div>
    </section>
  )
}
