import { useId } from "react";

/**
 * A dark planet limb with an orange rim light and faint graticule — the
 * closing "what comes next" image behind final calls to action.
 */
export function Planet({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const R = 380;
  const C = 400;

  return (
    <svg viewBox="0 0 800 800" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-body`} cx="32%" cy="28%" r="80%">
          <stop offset="0%" stopColor="var(--navy-raised)" />
          <stop offset="65%" stopColor="var(--near-black)" />
        </radialGradient>
        <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--signal-bright)" stopOpacity="0.95" />
          <stop offset="30%" stopColor="var(--paper)" stopOpacity="0.4" />
          <stop offset="62%" stopColor="var(--paper)" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <circle cx={C} cy={C} r={R} />
        </clipPath>
        <filter id={`${uid}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <circle
        cx={C}
        cy={C}
        r={R + 8}
        fill="none"
        stroke={`url(#${uid}-rim)`}
        strokeWidth="28"
        opacity="0.55"
        filter={`url(#${uid}-blur)`}
      />
      <circle cx={C} cy={C} r={R} fill={`url(#${uid}-body)`} />

      <g clipPath={`url(#${uid}-clip)`} fill="none" stroke="var(--paper)" strokeOpacity="0.06">
        <g transform={`rotate(-18 ${C} ${C})`}>
          {[-300, -200, -100, 0, 100, 200, 300].map((dy) => (
            <ellipse key={dy} cx={C} cy={C + dy} rx={Math.sqrt(R * R - dy * dy)} ry={34} />
          ))}
          {[90, 180, 270, 350].map((rx) => (
            <ellipse key={rx} cx={C} cy={C} rx={rx} ry={R} />
          ))}
        </g>
      </g>

      <circle cx={C} cy={C} r={R} fill="none" stroke={`url(#${uid}-rim)`} strokeWidth="1.5" />
    </svg>
  );
}
