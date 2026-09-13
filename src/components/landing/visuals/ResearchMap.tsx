import { research } from "@/content/site";

const C = 260;
const RINGS = [72, 124, 176, 228];

// [ring, angle°] — hand-tuned so labels never collide or leave the frame.
const PLACEMENT: Record<string, [number, number]> = {
  "AI Systems": [0, -20],
  "Multimodal AI": [0, 70],
  "Agentic Intelligence": [0, 110],
  "Computer Vision": [1, -120],
  "Edge AI": [1, 185],
  Robotics: [2, -50],
  "Physical AI": [2, 118],
  "AI Hardware": [3, 65],
  "Advanced Compute": [3, 105],
  Neurotechnology: [3, -102],
};

function Marker({ ring, x, y }: { ring: number; x: number; y: number }) {
  if (ring === 0) return <circle cx={x} cy={y} r="5" fill="var(--iso-accent)" />;
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill="var(--iso-accent)" fillOpacity="0.08" />
      <circle
        cx={x}
        cy={y}
        r="4.5"
        fill="var(--iso-core)"
        stroke="var(--iso-accent)"
        strokeWidth="1.5"
      />
    </g>
  );
}

/**
 * Research map: concentric rings radiating from one core, with every research
 * area placed as a node — connected directions around a single thesis.
 */
export function ResearchMap({ className = "" }: { className?: string }) {
  const nodes = research.areas.map((a) => {
    const [ring, angle] = PLACEMENT[a.name] ?? [3, 0];
    const rad = (angle * Math.PI) / 180;
    return { ...a, ring, x: C + RINGS[ring] * Math.cos(rad), y: C + RINGS[ring] * Math.sin(rad) };
  });

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 520 520"
        className="block h-auto w-full"
        role="img"
        aria-label="Research map of AI systems, agentic intelligence, multimodal AI, computer vision, edge AI, robotics, physical AI, AI hardware, advanced compute and neurotechnology, connected around one core."
      >
        <g className="anim-spin-slow" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle
            cx={C}
            cy={C}
            r="248"
            fill="none"
            stroke="var(--iso-accent)"
            strokeOpacity="0.6"
            strokeDasharray="70 1500"
            strokeLinecap="round"
          />
        </g>
        {RINGS.map((r, i) => (
          <circle
            key={r}
            cx={C}
            cy={C}
            r={r}
            fill="none"
            stroke={i === 0 ? "var(--iso-accent)" : "var(--iso-edge-soft)"}
            strokeOpacity={i === 0 ? 0.5 : 1}
            strokeDasharray={i >= 2 ? "3 5" : undefined}
          />
        ))}
        <line
          x1={C - 248}
          y1={C}
          x2={C + 248}
          y2={C}
          stroke="var(--iso-edge-soft)"
          strokeDasharray="2 6"
        />
        <line
          x1={C}
          y1={C - 248}
          x2={C}
          y2={C + 248}
          stroke="var(--iso-edge-soft)"
          strokeDasharray="2 6"
        />
        {nodes.map((n) => (
          <line key={n.name} x1={C} y1={C} x2={n.x} y2={n.y} stroke="var(--iso-edge-soft)" />
        ))}
        <circle cx={C} cy={C} r="44" fill="var(--iso-accent)" fillOpacity="0.06" />
        <circle cx={C} cy={C} r="30" fill="var(--iso-core)" stroke="var(--iso-accent)" />
        <image
          href="/brand/curiousdevs-mark-light.png"
          x={C - 14}
          y={C - 14}
          width="28"
          height="28"
        />
        {nodes.map((n) => (
          <Marker key={n.name} ring={n.ring} x={n.x} y={n.y} />
        ))}
      </svg>

      {nodes.map((n) => {
        const right = n.x >= C;
        return (
          <span
            key={n.name}
            aria-hidden="true"
            className={`absolute -translate-y-1/2 text-[10px] whitespace-nowrap text-foreground/90 sm:text-xs ${right ? "pl-3.5" : "-translate-x-full pr-3.5 text-right"}`}
            style={{ left: `${(n.x / 520) * 100}%`, top: `${(n.y / 520) * 100}%` }}
          >
            {n.name}
          </span>
        );
      })}
    </div>
  );
}
