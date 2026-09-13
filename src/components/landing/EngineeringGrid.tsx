/**
 * Deterministic, seeded parametric background system — an "engineering
 * blueprint" grid of irregular modules, construction lines, anchor points
 * and nodes. Replaces canvas-based decoration (rotating wireframes, random
 * particle networks): pure SVG, so it renders in the SSR payload and never
 * differs between server and client for a given seed.
 *
 * Deliberately NOT a repeating pattern — each instance is generated from a
 * seed + density tier, giving every section its own composition while
 * keeping one visual language (see Brand Book v1.4 restraint rules: no
 * gradients, no glow, --rule/--slate/--signal only).
 */
type Density = "sparse" | "medium" | "dense";
type Accent = "rule" | "slate" | "signal";

const DENSITY: Record<Density, { modules: number; lines: number; nodes: number; arcs: number }> = {
  sparse: { modules: 4, lines: 4, nodes: 5, arcs: 1 },
  medium: { modules: 7, lines: 6, nodes: 8, arcs: 1 },
  dense: { modules: 11, lines: 9, nodes: 12, arcs: 2 },
};

// mulberry32 — tiny, fast, deterministic. Same seed -> same sequence on
// server and client, so hydration never mismatches.
function createRng(seed: number) {
  let a = seed | 0;
  return function rng() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function colorOf(accent: Accent) {
  if (accent === "signal") return "var(--accent-display)";
  if (accent === "slate") return "var(--muted-foreground)";
  return "var(--eg-rule)";
}

function pickAccent(rng: () => number): Accent {
  const r = rng();
  if (r < 0.09) return "signal";
  if (r < 0.25) return "slate";
  return "rule";
}

export function EngineeringGrid({
  seed = 1,
  density = "medium",
  width = 800,
  height = 500,
  animated = true,
  className = "",
}: {
  seed?: number;
  density?: Density;
  width?: number;
  height?: number;
  animated?: boolean;
  className?: string;
}) {
  const rng = createRng(seed);
  const cfg = DENSITY[density];

  const modules = Array.from({ length: cfg.modules }, (_, i) => {
    const w = width * (0.1 + rng() * 0.24);
    const h = height * (0.08 + rng() * 0.22);
    const x = rng() * (width - w);
    const y = rng() * (height - h);
    const openSide = rng() < 0.5 ? Math.floor(rng() * 4) : -1; // -1 = closed rect
    return {
      key: `m${i}`,
      x,
      y,
      w,
      h,
      openSide,
      accent: pickAccent(rng),
      detail: i >= Math.ceil(cfg.modules * 0.55),
    };
  });

  const lines = Array.from({ length: cfg.lines }, (_, i) => {
    const vertical = rng() < 0.5;
    const axisLen = vertical ? height : width;
    const crossLen = vertical ? width : height;
    const lengthFrac = 0.25 + rng() * 0.6;
    const start = rng() * (1 - lengthFrac) * axisLen;
    const pos = rng() * crossLen;
    return {
      key: `l${i}`,
      vertical,
      pos,
      start,
      length: lengthFrac * axisLen,
      dashed: rng() < 0.4,
      accent: pickAccent(rng),
      detail: i >= Math.ceil(cfg.lines * 0.5),
    };
  });

  const nodes = Array.from({ length: cfg.nodes }, (_, i) => ({
    key: `n${i}`,
    x: rng() * width,
    y: rng() * height,
    square: rng() < 0.5,
    filled: rng() < 0.35,
    accent: pickAccent(rng),
    detail: i >= Math.ceil(cfg.nodes * 0.45),
  }));

  const arcs = Array.from({ length: cfg.arcs }, (_, i) => {
    const r = Math.min(width, height) * (0.06 + rng() * 0.1);
    const circumference = 2 * Math.PI * r;
    const sweepFrac = 0.15 + rng() * 0.2;
    return {
      key: `a${i}`,
      cx: rng() * width,
      cy: rng() * height,
      r,
      rotate: rng() * 360,
      dash: `${circumference * sweepFrac} ${circumference}`,
    };
  });

  const signalLine = animated ? (lines.find((l) => l.accent === "signal") ?? lines[0]) : null;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {modules.map((m) => {
        const stroke = colorOf(m.accent);
        const opacity = m.accent === "rule" ? 0.9 : m.accent === "slate" ? 0.35 : 0.4;
        const groupClass = m.detail ? "hidden sm:block" : undefined;
        if (m.openSide === -1) {
          return (
            <rect
              key={m.key}
              x={m.x}
              y={m.y}
              width={m.w}
              height={m.h}
              fill="none"
              stroke={stroke}
              strokeOpacity={opacity}
              strokeWidth="1"
              className={groupClass}
            />
          );
        }
        const { x, y, w, h, openSide } = m;
        const corners = [
          [x, y],
          [x + w, y],
          [x + w, y + h],
          [x, y + h],
        ];
        const sides = [0, 1, 2, 3].filter((s) => s !== openSide);
        const d = sides
          .map(
            (s) =>
              `M ${corners[s][0]} ${corners[s][1]} L ${corners[(s + 1) % 4][0]} ${corners[(s + 1) % 4][1]}`,
          )
          .join(" ");
        return (
          <path
            key={m.key}
            d={d}
            fill="none"
            stroke={stroke}
            strokeOpacity={opacity}
            strokeWidth="1"
            className={groupClass}
          />
        );
      })}

      {lines.map((l) => {
        const stroke = colorOf(l.accent);
        const opacity = l.accent === "rule" ? 0.7 : l.accent === "slate" ? 0.3 : 0.35;
        const props = l.vertical
          ? { x1: l.pos, x2: l.pos, y1: l.start, y2: l.start + l.length }
          : { x1: l.start, x2: l.start + l.length, y1: l.pos, y2: l.pos };
        return (
          <line
            key={l.key}
            {...props}
            stroke={stroke}
            strokeOpacity={opacity}
            strokeWidth="1"
            strokeDasharray={l.dashed ? "3 4" : undefined}
            className={l.detail ? "hidden sm:block" : undefined}
          />
        );
      })}

      {arcs.map((a) => (
        <circle
          key={a.key}
          cx={a.cx}
          cy={a.cy}
          r={a.r}
          fill="none"
          stroke="var(--eg-rule)"
          strokeOpacity="0.7"
          strokeWidth="1"
          strokeDasharray={a.dash}
          transform={`rotate(${a.rotate} ${a.cx} ${a.cy})`}
        />
      ))}

      {nodes.map((n) => {
        const stroke = colorOf(n.accent);
        const size = n.square ? 3 : 2.6;
        const groupClass = n.detail ? "hidden sm:block" : undefined;
        if (n.square) {
          return n.filled ? (
            <rect
              key={n.key}
              x={n.x - size / 2}
              y={n.y - size / 2}
              width={size}
              height={size}
              fill={stroke}
              fillOpacity="0.6"
              className={groupClass}
            />
          ) : (
            <rect
              key={n.key}
              x={n.x - size / 2}
              y={n.y - size / 2}
              width={size}
              height={size}
              fill="none"
              stroke={stroke}
              strokeOpacity="0.8"
              strokeWidth="1"
              className={groupClass}
            />
          );
        }
        return n.filled ? (
          <circle
            key={n.key}
            cx={n.x}
            cy={n.y}
            r={size}
            fill={stroke}
            fillOpacity="0.55"
            className={groupClass}
          />
        ) : (
          <circle
            key={n.key}
            cx={n.x}
            cy={n.y}
            r={size}
            fill="none"
            stroke={stroke}
            strokeOpacity="0.8"
            strokeWidth="1"
            className={groupClass}
          />
        );
      })}

      {signalLine && (
        <circle r="2" fill="var(--accent-display)" fillOpacity="0.55" className="eg-signal">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path={
              signalLine.vertical
                ? `M ${signalLine.pos} ${signalLine.start} L ${signalLine.pos} ${signalLine.start + signalLine.length}`
                : `M ${signalLine.start} ${signalLine.pos} L ${signalLine.start + signalLine.length} ${signalLine.pos}`
            }
          />
        </circle>
      )}
    </svg>
  );
}
