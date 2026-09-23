import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * The physical intelligence loop, drawn as a closed ring.
 *
 * Seven stages sit on a circle; the arc leaving the last one returns to the
 * first, which is the whole point of the diagram — physical intelligence is
 * continuous, not a one-shot inference. The ring is the desktop composition;
 * below `md` it recomposes into a vertical rail that ends in an explicit
 * return, rather than shrinking a circle nobody can read.
 */

type Stage = { name: string; note: string };

const STAGES: Stage[] = [
  { name: "Perceive", note: "Signals → observation" },
  { name: "Understand", note: "Observation → state" },
  { name: "Reason", note: "Goals and constraints" },
  { name: "Plan", note: "Reasoning → intent" },
  { name: "Act", note: "Intent → machine" },
  { name: "Observe", note: "The result, measured" },
  { name: "Update", note: "State carries forward" },
];

/* ---------- ring geometry, computed once ---------- */

const VIEW_W = 880;
const VIEW_H = 520;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const R = 165; // node ring radius
const LABEL_R = R + 30; // labels sit outside the ring
const GAP = 7; // degrees of clear space either side of a node

const STEP = 360 / STAGES.length;
const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const px = (deg: number, r: number) => CX + r * Math.cos(rad(deg));
const py = (deg: number, r: number) => CY + r * Math.sin(rad(deg));

const NODES = STAGES.map((stage, i) => {
  const deg = i * STEP;
  const c = Math.cos(rad(deg));
  return {
    ...stage,
    index: String(i + 1).padStart(2, "0"),
    deg,
    x: px(deg, R),
    y: py(deg, R),
    lx: px(deg, LABEL_R),
    ly: py(deg, LABEL_R),
    anchor: c > 0.25 ? "start" : c < -0.25 ? "end" : "middle",
  } as const;
});

/** Arc from one node to the next, leaving a gap at each end. */
const ARCS = NODES.map((node, i) => {
  const from = node.deg + GAP;
  const to = node.deg + STEP - GAP;
  const last = i === NODES.length - 1; // the closing arc: Update → Perceive
  return {
    key: node.name,
    last,
    d: `M ${px(from, R).toFixed(1)} ${py(from, R).toFixed(1)} A ${R} ${R} 0 0 1 ${px(to, R).toFixed(1)} ${py(to, R).toFixed(1)}`,
  };
});

export function IntelligenceLoop({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      {/* Ring — only where the column is wide enough for its labels */}
      <figure className="hidden xl:block">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="The physical intelligence loop: perceive, understand, reason, plan, act, observe, update, and back to perceive."
        >
          {/* arcs */}
          {ARCS.map((arc) => (
            <path
              key={arc.key}
              d={arc.d}
              fill="none"
              stroke={arc.last ? "var(--signal)" : "var(--rule-2)"}
              strokeWidth={arc.last ? 1.5 : 1}
              strokeLinecap="round"
              className={arc.last && !reduce ? "flow-dash" : undefined}
              opacity={arc.last ? 0.9 : 1}
            />
          ))}

          {/* nodes */}
          {NODES.map((node) => (
            <g key={node.name}>
              <circle cx={node.x} cy={node.y} r="5.5" fill="var(--ground)" />
              <circle
                cx={node.x}
                cy={node.y}
                r="5.5"
                fill="none"
                stroke="var(--signal)"
                strokeWidth="1.5"
              />
              <text
                x={node.lx}
                y={node.ly - 10}
                textAnchor={node.anchor}
                className="fill-foreground font-display"
                style={{ fontSize: 23, letterSpacing: "-0.02em" }}
              >
                {node.name}
              </text>
              <text
                x={node.lx}
                y={node.ly + 16}
                textAnchor={node.anchor}
                className="fill-muted-foreground font-mono"
                style={{ fontSize: 14 }}
              >
                {node.note}
              </text>
            </g>
          ))}

          {/* centre: what the ring is */}
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            style={{ fontSize: 12.5, letterSpacing: "0.18em" }}
          >
            CONTINUOUS
          </text>
          <text
            x={CX}
            y={CY + 16}
            textAnchor="middle"
            className="fill-muted-foreground font-mono"
            style={{ fontSize: 12.5, letterSpacing: "0.18em" }}
          >
            NOT ONE-SHOT
          </text>
        </svg>
      </figure>

      {/* Rail — every narrower column, and every phone */}
      <ol className="xl:hidden" aria-label="The physical intelligence loop">
        {NODES.map((node, i) => (
          <li key={node.name} className="relative flex gap-5 pb-7 last:pb-0">
            {/* connector */}
            {i < NODES.length - 1 ? (
              <span aria-hidden className="absolute left-[5px] top-4 h-full w-px bg-line-strong" />
            ) : null}
            <span
              aria-hidden
              className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-[1.5px] border-signal bg-background"
            />
            <div className="min-w-0">
              <p className="mono-xs text-muted-foreground">{node.index}</p>
              <p className="mt-1 font-display text-xl tracking-[-0.035em]">{node.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{node.note}</p>
            </div>
          </li>
        ))}
        <li className="flex gap-5 border-t border-line pt-6">
          <span aria-hidden className="mono-xs mt-0.5 w-[11px] shrink-0 text-signal">
            ↻
          </span>
          <p className={cn("mono-xs text-signal")}>RETURNS TO PERCEIVE</p>
        </li>
      </ol>
    </div>
  );
}
