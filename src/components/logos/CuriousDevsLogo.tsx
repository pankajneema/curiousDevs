export function CuriousDevsLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bulb glow (orange/yellow gradient) */}
      <defs>
        <linearGradient id="bulbGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="bulbBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      
      {/* Orange/yellow glow arc */}
      <path
        d="M 25 45 A 30 30 0 0 1 75 45"
        fill="none"
        stroke="url(#bulbGlow)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      
      {/* Main bulb outline */}
      <circle
        cx="50"
        cy="50"
        r="25"
        fill="none"
        stroke="url(#bulbBody)"
        strokeWidth="4"
      />
      
      {/* C letter */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="url(#bulbBody)"
        fontFamily="system-ui, sans-serif"
      >
        C
      </text>
      
      {/* Circuit stems at bottom */}
      <line x1="40" y1="78" x2="40" y2="95" stroke="url(#bulbBody)" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="78" x2="50" y2="95" stroke="url(#bulbBody)" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="78" x2="60" y2="95" stroke="url(#bulbBody)" strokeWidth="3" strokeLinecap="round" />
      
      {/* Circuit dots */}
      <circle cx="40" cy="95" r="3" fill="url(#bulbBody)" />
      <circle cx="50" cy="95" r="3" fill="url(#bulbBody)" />
      <circle cx="60" cy="95" r="3" fill="url(#bulbBody)" />
      
      {/* Connection nodes on the bulb */}
      <circle cx="30" cy="35" r="2.5" fill="url(#bulbBody)" />
      <circle cx="70" cy="35" r="2.5" fill="url(#bulbBody)" />
      <line x1="30" y1="35" x2="25" y2="28" stroke="url(#bulbBody)" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="35" x2="75" y2="28" stroke="url(#bulbBody)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
