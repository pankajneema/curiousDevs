export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon
        points="16,3 27.26,9.5 27.26,22.5 16,29 4.74,22.5 4.74,9.5"
        className="stroke-amber-accent"
        fill="color-mix(in oklab, var(--accent-amber) 10%, transparent)"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M20 11 A6 6 0 1 0 20 21"
        className="stroke-foreground"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="16" r="2" className="fill-amber-accent" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="text-[15px] font-bold tracking-tight text-foreground">
      Curious<span className="text-amber-accent">Devs</span>
    </span>
  );
}
