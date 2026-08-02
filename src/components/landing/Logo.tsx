/**
 * The C-Dot mark. Base construction is the Brand Book v1.4 §17 spec
 * (viewBox 0 0 200 200, ring centreline radius R = 76, opening 80° from
 * 10°–90°, dot orbit 1.04R at 50°) — adjusted per direct feedback to a
 * thinner ring and a larger dot:
 *   - stroke weight = 0.48R (spec was 0.62R), round caps
 *   - dot radius = 0.32 × stroke weight (spec was 0.20 × stroke)
 * The dot colour is signal blue, not the spec's reserved coral, also per
 * direct feedback. Re-derive the clearance check before changing further —
 * dot must never touch either cap.
 */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <path
        d="M 176 100 A 76 76 0 1 1 113.2 25.15"
        className="stroke-foreground"
        strokeWidth="36.48"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="160.55" cy="49.19" r="11.67" className="fill-amber-accent" />
    </svg>
  );
}

/** The dot orbiting the opening — the only branded animation. 1.2s per
 * revolution, linear, infinite. Used for loading states. */
export function LogoLoader({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <path
        d="M 176 100 A 76 76 0 1 1 113.2 25.15"
        className="stroke-foreground"
        strokeWidth="36.48"
        strokeLinecap="round"
        fill="none"
      />
      <g className="c-dot-loader-orbit">
        <circle cx="160.55" cy="49.19" r="11.67" className="fill-amber-accent" />
      </g>
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="text-[15px] font-bold tracking-[-0.02em] text-foreground">
      Curious<span className="text-amber-accent">Devs</span>
    </span>
  );
}
