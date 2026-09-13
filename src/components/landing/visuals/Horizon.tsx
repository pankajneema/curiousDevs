import { useId } from "react";
import { createRng } from "./iso";

const W = 1440;
const H = 560;

function ridge(rng: () => number, base: number, amp: number, freq: number, phase: number) {
  const pts: [number, number][] = [];
  for (let x = 0; x <= W; x += 16) {
    const y =
      base -
      amp *
        (0.55 * Math.sin(x * freq + phase) +
          0.3 * Math.sin(x * freq * 2.3 + phase * 1.7) +
          0.15 * Math.sin(x * freq * 5.1 + phase * 0.6)) -
      8 * (rng() - 0.5);
    pts.push([x, y]);
  }
  return pts;
}

const area = (pts: [number, number][]) =>
  `M 0 ${H} L ${pts.map(([x, y]) => `${x} ${y.toFixed(1)}`).join(" L ")} L ${W} ${H} Z`;

const line = (pts: [number, number][], dy: number) =>
  `M ${pts.map(([x, y]) => `${x} ${(y + dy).toFixed(1)}`).join(" L ")}`;

/**
 * Layered ridge horizon with topographic contour lines and a warm light
 * at the horizon — the "real world" the vision sections point at. Seeded,
 * so server and client render the same terrain.
 */
export function Horizon({ className = "", seed = 11 }: { className?: string; seed?: number }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rng = createRng(seed);
  const far = ridge(rng, 318, 64, 0.0031, 1.1);
  const mid = ridge(rng, 384, 78, 0.0044, 2.7);
  const near = ridge(rng, 458, 58, 0.0061, 0.35);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--near-black)" stopOpacity="0" />
          <stop offset="45%" stopColor="var(--deep-navy)" stopOpacity="0.9" />
          <stop offset="62%" stopColor="var(--signal-bright)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--near-black)" stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`${uid}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--signal-bright)" stopOpacity="0.42" />
          <stop offset="100%" stopColor="var(--signal-bright)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${uid}-sky)`} />
      <ellipse cx={W * 0.64} cy={300} rx={560} ry={170} fill={`url(#${uid}-sun)`} />

      <g stroke="var(--paper)" strokeOpacity="0.1">
        <line x1="0" y1="250" x2={W} y2="250" strokeDasharray="2 10" />
        {Array.from({ length: 31 }).map((_, i) => (
          <line key={i} x1={i * 48} y1="246" x2={i * 48} y2={i % 5 === 0 ? 238 : 243} />
        ))}
      </g>

      <path
        d={`M ${W * 0.74} 318 A 320 320 0 0 1 ${W * 0.9} 196`}
        fill="none"
        stroke="var(--signal-bright)"
        strokeOpacity="0.75"
        strokeWidth="1.2"
      />
      <circle cx={W * 0.9} cy={196} r="4" fill="var(--signal-bright)" />
      <circle
        cx={W * 0.9}
        cy={196}
        r="12"
        fill="none"
        stroke="var(--signal-bright)"
        strokeOpacity="0.35"
      />

      <path d={area(far)} fill="var(--navy-raised)" />
      <path d={line(far, 0)} fill="none" stroke="var(--signal-bright)" strokeOpacity="0.28" />
      <path d={area(mid)} fill="var(--deep-navy)" />
      {[10, 26].map((dy) => (
        <path key={dy} d={line(mid, dy)} fill="none" stroke="var(--paper)" strokeOpacity="0.05" />
      ))}
      <path d={area(near)} fill="var(--near-black)" />
      {[12, 28, 48, 72, 100].map((dy) => (
        <path key={dy} d={line(near, dy)} fill="none" stroke="var(--paper)" strokeOpacity="0.055" />
      ))}
    </svg>
  );
}
