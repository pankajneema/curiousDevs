export function CompanyBannerVisual() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-[#08111c] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-6">
      <div className="tech-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-orange/15 blur-3xl"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 620 390"
        className="relative z-10 h-auto w-full"
        role="img"
        aria-labelledby="company-visual-title company-visual-desc"
      >
        <title id="company-visual-title">CuriousDevs research to real-world systems</title>
        <desc id="company-visual-desc">
          A connected technical stack showing research, intelligence, systems, and real-world
          technology.
        </desc>
        <defs>
          <linearGradient id="company-panel" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#14253a" />
            <stop offset="1" stopColor="#0b1624" />
          </linearGradient>
          <linearGradient id="company-core" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ff8a24" />
            <stop offset="1" stopColor="#c84b00" />
          </linearGradient>
          <filter id="company-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d="M52 285 H568" stroke="#2d4057" strokeDasharray="4 7" />
        <path d="M91 76 V303 M529 76 V303" stroke="#23364c" strokeDasharray="3 7" />
        <ellipse cx="310" cy="290" rx="174" ry="39" fill="none" stroke="#2d4057" />
        <ellipse cx="310" cy="290" rx="124" ry="25" fill="none" stroke="#203349" />

        <g opacity="0.8">
          <path
            d="M148 238 L310 174 L472 238 L310 302 Z"
            fill="url(#company-panel)"
            stroke="#38516c"
          />
          <path
            d="M148 238 V256 L310 321 L472 256 V238 L310 302 Z"
            fill="#0d1a29"
            stroke="#2d4057"
          />
          <path d="M204 238 L310 197 L416 238 L310 279 Z" fill="none" stroke="#304861" />
          <path d="M258 238 L310 218 L362 238 L310 258 Z" fill="none" stroke="#304861" />
        </g>

        <g>
          <path
            d="M202 165 L310 119 L418 165 L310 211 Z"
            fill="url(#company-panel)"
            stroke="#49708f"
          />
          <path
            d="M202 165 V180 L310 226 L418 180 V165 L310 211 Z"
            fill="#122337"
            stroke="#38516c"
          />
          <path d="M246 165 L310 139 L374 165 L310 191 Z" fill="none" stroke="#5f83a1" />
          <path d="M278 165 L310 152 L342 165 L310 178 Z" fill="none" stroke="#ff6b00" />
          <circle cx="310" cy="165" r="5" fill="#ff6b00" filter="url(#company-glow)" />
        </g>

        <g>
          <path d="M248 91 L310 63 L372 91 L310 119 Z" fill="url(#company-core)" stroke="#ffb36e" />
          <path d="M248 91 V103 L310 132 L372 103 V91 L310 119 Z" fill="#9f3c08" stroke="#ff8a24" />
          <path d="M276 91 L310 76 L344 91 L310 106 Z" fill="#07101a" stroke="#ffd6b5" />
          <path d="M298 91 L310 85 L322 91 L310 97 Z" fill="#ff6b00" />
        </g>

        <path d="M310 48 V28" stroke="#ff6b00" strokeWidth="1.4" />
        <circle cx="310" cy="22" r="6" fill="#ff6b00" />
        <path
          d="M310 22 C408 13 473 40 515 103"
          fill="none"
          stroke="#ff6b00"
          strokeDasharray="3 6"
          opacity="0.8"
        />
        <circle cx="518" cy="108" r="5" fill="#ff6b00" />

        <g fill="#9ba4b0" fontFamily="Courier New, monospace" fontSize="11" letterSpacing="2">
          <text x="42" y="73" fill="#ff9a4d">
            01 / RESEARCH
          </text>
          <text x="42" y="92">
            QUESTION
          </text>
          <text x="42" y="213" fill="#73b9ff">
            02 / INTELLIGENCE
          </text>
          <text x="42" y="232">
            REPRESENTATION
          </text>
          <text x="428" y="221" fill="#80d7b1">
            03 / SYSTEMS
          </text>
          <text x="428" y="240">
            ENGINEERING
          </text>
          <text x="428" y="337" fill="#f4f0e9">
            04 / REAL WORLD
          </text>
          <text x="428" y="356">
            IMPACT
          </text>
        </g>

        <path d="M151 108 H240" stroke="#2d4057" strokeDasharray="3 5" />
        <path d="M380 108 H512" stroke="#2d4057" strokeDasharray="3 5" />
        <circle cx="151" cy="108" r="3" fill="#73b9ff" />
        <circle cx="512" cy="108" r="3" fill="#80d7b1" />
      </svg>
      <div className="relative z-10 mt-2 flex items-center justify-between border-t border-hairline pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>Curiosity / discipline / evidence</span>
        <span className="text-orange">Build for reality</span>
      </div>
    </div>
  );
}
