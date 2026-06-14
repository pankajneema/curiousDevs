import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-midnight text-white overflow-hidden min-h-screen flex flex-col">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}/>

      {/* Coral glow */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,83,58,.14) 0%, transparent 65%)' }}/>

      {/* Main content — flex-1 so it pushes wave to bottom */}
      <div className="relative flex-1 max-w-content mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center pt-32 pb-20">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse"/>
            <span className="font-mono text-xs tracking-wider text-white/70">Building in public · TokenFin + AgentOS</span>
          </div>

          <h1 className="font-head font-bold text-5xl lg:text-7xl leading-[1.05] tracking-tight">
            We build what<br/>the AI era<br/>
            <span className="text-coral">is missing.</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed max-w-lg">
            CuriousDevs is an AI infrastructure company. We ship the products that AI teams desperately need — starting with LLM cost attribution and enterprise AI agent governance.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/products/tokenfin"
              className="flex items-center gap-2 px-6 py-3 bg-coral hover:bg-[#D4472F] text-white font-semibold rounded-xl transition-colors">
              Explore our products
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </Link>
            <Link href="/#how-it-works"
              className="flex items-center gap-2 px-6 py-3 bg-white/[0.07] hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-colors">
              How it works
            </Link>
          </div>
          <p className="font-mono text-xs text-white/30 tracking-wide">Open source friendly · Design partners welcome · No sales call required</p>
        </div>

        {/* Right: terminal */}
        <div className="hidden lg:block relative">
          <div className="bg-[#0E0E1C] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]"/>
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]"/>
              <span className="w-3 h-3 rounded-full bg-[#28C840]"/>
              <span className="ml-3 font-mono text-xs text-white/30">tokenfin — curiousdevs.com</span>
            </div>
            <div className="p-5 font-mono text-xs leading-relaxed">
              <p className="text-white/30"># Install TokenFin SDK</p>
              <p><span className="text-teal">$</span> <span className="text-white">npm install @curiousdevs/tokenfin</span></p>
              <br/>
              <p className="text-white/30"># Wrap any LLM call — one line</p>
              <p><span className="text-white">const res = await </span><span className="text-teal">track</span><span className="text-white">(openai.chat(&#123;...&#125;), &#123;</span></p>
              <p><span className="text-white">  team: </span><span className="text-[#F59E0B]">&apos;ml-infra&apos;</span><span className="text-white">, feature: </span><span className="text-[#F59E0B]">&apos;search&apos;</span></p>
              <p><span className="text-white">&#125;)</span></p>
              <br/>
              <p><span className="text-teal">✓</span> <span className="text-white/60">Cost attributed:</span> <span className="text-teal">$0.0034</span> <span className="text-white/40">→ ml-infra/search</span></p>
              <p><span className="text-teal">✓</span> <span className="text-white/60">Monthly projection:</span> <span className="text-teal">$2,847</span></p>
              <p><span className="text-teal">✓</span> <span className="text-white/60">Anomaly alert: spend</span> <span className="text-coral">+34%</span> <span className="text-white/40">vs last week</span></p>
              <br/>
              <p><span className="text-teal">$</span> <span className="text-white cursor-blink">█</span></p>
            </div>
          </div>

          {/* Floating stat card */}
          <div className="absolute -right-4 top-1/3 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 w-48">
            <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal text-sm">💰</div>
            <div>
              <div className="font-head font-bold text-midnight text-sm">20–40%</div>
              <div className="text-xs text-sub">Avg cost reduction</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Animated wave transition: midnight → surface ─── */}
      {/* overflow-visible so wave can spill 80px into the Stats section below */}
      <div
        className="relative w-full bg-midnight flex-shrink-0"
        style={{ height: '220px', overflow: 'visible', zIndex: 10 }}
      >

        {/* Layer 1 — back, slowest, lightest */}
        <div
          className="absolute bottom-0 left-0 flex"
          style={{ width: '200%', height: '100%', animation: 'waveScroll 22s linear infinite', opacity: 0.3 }}
        >
          <svg style={{ display: 'block', flex: '0 0 50%', height: '100%' }}
            viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,110 C180,40 360,200 540,110 C720,30 900,200 1080,110 C1260,30 1380,150 1440,100 L1440,220 L0,220 Z" fill="#F9F8F5"/>
          </svg>
          <svg style={{ display: 'block', flex: '0 0 50%', height: '100%' }}
            viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,110 C180,40 360,200 540,110 C720,30 900,200 1080,110 C1260,30 1380,150 1440,100 L1440,220 L0,220 Z" fill="#F9F8F5"/>
          </svg>
        </div>

        {/* Layer 2 — middle, medium speed, reversed */}
        <div
          className="absolute bottom-0 left-0 flex"
          style={{ width: '200%', height: '100%', animation: 'waveScroll 14s linear infinite reverse', opacity: 0.55 }}
        >
          <svg style={{ display: 'block', flex: '0 0 50%', height: '100%' }}
            viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,140 C120,50 360,210 600,130 C840,50 1080,205 1260,110 C1360,60 1420,145 1440,125 L1440,220 L0,220 Z" fill="#F9F8F5"/>
          </svg>
          <svg style={{ display: 'block', flex: '0 0 50%', height: '100%' }}
            viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,140 C120,50 360,210 600,130 C840,50 1080,205 1260,110 C1360,60 1420,145 1440,125 L1440,220 L0,220 Z" fill="#F9F8F5"/>
          </svg>
        </div>

        {/* Layer 3 — front, fastest, fully opaque */}
        <div
          className="absolute bottom-0 left-0 flex"
          style={{ width: '200%', height: '100%', animation: 'waveScroll 9s linear infinite' }}
        >
          <svg style={{ display: 'block', flex: '0 0 50%', height: '100%' }}
            viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,165 C240,70 480,215 720,145 C960,70 1200,210 1440,160 L1440,220 L0,220 Z" fill="#F9F8F5"/>
          </svg>
          <svg style={{ display: 'block', flex: '0 0 50%', height: '100%' }}
            viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,165 C240,70 480,215 720,145 C960,70 1200,210 1440,160 L1440,220 L0,220 Z" fill="#F9F8F5"/>
          </svg>
        </div>

      </div>
    </section>
  )
}
