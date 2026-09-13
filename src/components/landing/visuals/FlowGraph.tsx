import type { SystemFlow } from "@/content/site";

type Pt = [number, number];

function cubic(p: Pt[], t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * p[0][0] + b * p[1][0] + c * p[2][0] + d * p[3][0],
    a * p[0][1] + b * p[1][1] + c * p[2][1] + d * p[3][1],
  ];
}

function layoutOf(layout: SystemFlow["layout"], count: number): { pts: Pt[]; path: string } {
  switch (layout) {
    case "snake": {
      const xs = [44, 108, 172, 236];
      const pts = [
        ...xs.map((x): Pt => [x, 52]),
        ...[...xs].reverse().map((x): Pt => [x, 108]),
      ].slice(0, count);
      return { pts, path: "M44 52 L236 52 C272 52 272 108 236 108 L44 108" };
    }
    case "loop": {
      const cx = 140;
      const cy = 80;
      const r = 52;
      const pts = Array.from({ length: count }, (_, i): Pt => {
        const a = Math.PI + (i * 2 * Math.PI) / count;
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      });
      return {
        pts,
        path: `M${cx - r} ${cy} A${r} ${r} 0 1 1 ${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx - r} ${cy}`,
      };
    }
    case "radial": {
      const xs = [40, 98, 156, 208, 250];
      return { pts: xs.slice(0, count).map((x): Pt => [x, 80]), path: "M40 80 L250 80" };
    }
    case "line": {
      const ctrl: Pt[] = [
        [34, 118],
        [92, 24],
        [186, 24],
        [248, 78],
      ];
      const pts = Array.from({ length: count }, (_, i) => cubic(ctrl, i / Math.max(1, count - 1)));
      return { pts, path: "M34 118 C92 24 186 24 248 78" };
    }
    case "stack":
    default: {
      const ys = [34, 64, 94, 124].slice(0, count);
      return { pts: ys.map((y): Pt => [140, y]), path: "M140 34 L140 124" };
    }
  }
}

/**
 * Abstract node-link glyph for a system flow — the shape of the chain
 * (pipeline, loop, perception, motion, compute stack), not decoration.
 */
export function FlowGraph({
  layout,
  count,
  className = "",
}: {
  layout: SystemFlow["layout"];
  count: number;
  className?: string;
}) {
  const { pts, path } = layoutOf(layout, count);

  return (
    <svg viewBox="0 0 280 160" className={className} aria-hidden="true">
      {layout === "radial" && (
        <g fill="none" stroke="var(--iso-accent)" strokeOpacity="0.35">
          {[16, 30, 44].map((r) => (
            <path
              key={r}
              d={`M ${40 + r * Math.cos(-0.7)} ${80 + r * Math.sin(-0.7)} A ${r} ${r} 0 0 1 ${40 + r * Math.cos(0.7)} ${80 + r * Math.sin(0.7)}`}
            />
          ))}
        </g>
      )}

      {layout === "loop" && (
        <g>
          <circle
            cx="140"
            cy="80"
            r="18"
            fill="none"
            stroke="var(--iso-edge-soft)"
            strokeDasharray="2 3"
          />
          <circle cx="140" cy="80" r="4" fill="var(--iso-accent)" />
        </g>
      )}

      {layout === "stack" &&
        pts.map(([x, y], i) => {
          const hot = i === 1 || i === 2;
          return (
            <polygon
              key={i}
              points={`${x - 62},${y - 8} ${x + 74},${y - 8} ${x + 62},${y + 8} ${x - 74},${y + 8}`}
              fill={hot ? "var(--iso-accent)" : "var(--iso-top)"}
              fillOpacity={hot ? 0.16 : 1}
              stroke={hot ? "var(--iso-accent)" : "var(--iso-edge)"}
            />
          );
        })}

      <path
        d={path}
        fill="none"
        stroke="var(--iso-edge)"
        strokeDasharray={layout === "line" ? "3 4" : undefined}
      />

      {layout !== "stack" &&
        pts.map(([x, y], i) => {
          const end = i === 0 || i === pts.length - 1;
          return layout === "line" ? (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="var(--iso-top)" stroke="var(--iso-edge)" />
              <circle cx={x} cy={y} r="3" fill={end ? "var(--iso-accent)" : "var(--iso-edge)"} />
            </g>
          ) : (
            <rect
              key={i}
              x={x - 5}
              y={y - 5}
              width="10"
              height="10"
              fill={end ? "var(--iso-accent)" : "var(--iso-top)"}
              stroke={end ? "var(--iso-accent)" : "var(--iso-edge)"}
            />
          );
        })}

      <circle r="3" fill="var(--iso-accent)" className="anim-signal">
        <animateMotion
          dur={layout === "loop" ? "5s" : "3.2s"}
          repeatCount="indefinite"
          path={path}
        />
      </circle>
    </svg>
  );
}
