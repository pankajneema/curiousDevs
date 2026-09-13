import { planeMatrix, project } from "./iso";
import { IsoCylinder } from "./IsoBox";

const NS = { vectorEffect: "non-scaling-stroke" as const };

function Segment({
  x,
  y,
  len,
  angle,
  width,
}: {
  x: number;
  y: number;
  len: number;
  angle: number;
  width: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <rect
        x={-width / 2}
        y={-width / 2}
        width={len + width}
        height={width}
        rx={width / 2}
        fill="var(--iso-left)"
        stroke="var(--iso-edge)"
      />
      <line
        x1={width / 2}
        y1={-width / 2 + 3}
        x2={len - width / 2}
        y2={-width / 2 + 3}
        stroke="var(--iso-edge-soft)"
      />
    </g>
  );
}

function Joint({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="var(--iso-top)" stroke="var(--iso-edge)" />
      <circle cx={x} cy={y} r={r * 0.62} fill="none" stroke="var(--iso-accent)" />
      <circle cx={x} cy={y} r={r * 0.22} fill="var(--iso-accent)" />
    </g>
  );
}

/**
 * Line-art manipulator on an isometric ground plate — perception target,
 * planned path and joint range drawn as the system it represents
 * (perception → planning → control → movement).
 */
export function RobotArm({ className = "" }: { className?: string }) {
  const s = 1.1;
  const ox = 120;
  const oy = 110;
  const rad = (d: number) => (d * Math.PI) / 180;

  const [bx, by] = project([50, 50, 22], s, ox, oy);
  const shoulder = { x: bx, y: by - 6 };
  const a1 = -62;
  const l1 = 70;
  const elbow = { x: shoulder.x + Math.cos(rad(a1)) * l1, y: shoulder.y + Math.sin(rad(a1)) * l1 };
  const a2 = 24;
  const l2 = 62;
  const wrist = { x: elbow.x + Math.cos(rad(a2)) * l2, y: elbow.y + Math.sin(rad(a2)) * l2 };
  const a3 = 78;
  const l3 = 20;
  const tool = { x: wrist.x + Math.cos(rad(a3)) * l3, y: wrist.y + Math.sin(rad(a3)) * l3 };

  const [tx, ty] = project([112, 34, 0], s, ox, oy);

  return (
    <svg viewBox="10 45 270 205" className={className} aria-hidden="true">
      <g transform={planeMatrix(s, ox, oy, 0)} fill="none">
        <rect x="0" y="0" width="140" height="100" stroke="var(--iso-edge-soft)" {...NS} />
        {[20, 40, 60, 80, 100, 120].map((p) => (
          <line
            key={p}
            x1={p}
            y1="0"
            x2={p}
            y2="100"
            stroke="var(--iso-edge-soft)"
            strokeOpacity="0.6"
            {...NS}
          />
        ))}
        {[25, 50, 75].map((p) => (
          <line
            key={p}
            x1="0"
            y1={p}
            x2="140"
            y2={p}
            stroke="var(--iso-edge-soft)"
            strokeOpacity="0.6"
            {...NS}
          />
        ))}
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="var(--iso-accent)"
          strokeOpacity="0.4"
          strokeDasharray="4 5"
          {...NS}
        />
        <rect
          x="102"
          y="24"
          width="20"
          height="20"
          fill="var(--iso-accent)"
          fillOpacity="0.14"
          stroke="var(--iso-accent)"
          {...NS}
        />
      </g>

      <path
        d={`M ${tool.x} ${tool.y + 4} C ${tool.x + 10} ${tool.y + 40}, ${tx - 10} ${ty - 40}, ${tx} ${ty}`}
        fill="none"
        stroke="var(--iso-accent)"
        strokeOpacity="0.6"
        strokeDasharray="2 4"
      />

      <IsoCylinder cx={50} cy={50} z={0} r={18} h={14} s={s} ox={ox} oy={oy} />
      <IsoCylinder cx={50} cy={50} z={14} r={12} h={8} s={s} ox={ox} oy={oy} accentTop />

      <path
        d={`M ${shoulder.x - 34} ${shoulder.y - 20} A 40 40 0 0 1 ${shoulder.x + 8} ${shoulder.y - 40}`}
        fill="none"
        stroke="var(--iso-edge)"
        strokeDasharray="2 4"
      />

      <Segment x={shoulder.x} y={shoulder.y} len={l1} angle={a1} width={16} />
      <Segment x={elbow.x} y={elbow.y} len={l2} angle={a2} width={13} />
      <Segment x={wrist.x} y={wrist.y} len={l3} angle={a3} width={10} />

      <g
        transform={`translate(${tool.x} ${tool.y}) rotate(${a3 - 90})`}
        fill="none"
        stroke="var(--iso-edge)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M -8 0 L -8 12 L -4 18" />
        <path d="M 8 0 L 8 12 L 4 18" />
      </g>

      <Joint x={shoulder.x} y={shoulder.y} r={10} />
      <Joint x={elbow.x} y={elbow.y} r={8.5} />
      <Joint x={wrist.x} y={wrist.y} r={7} />

      <circle r="2.4" fill="var(--iso-accent)" className="anim-signal">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={`M ${tool.x} ${tool.y + 4} C ${tool.x + 10} ${tool.y + 40}, ${tx - 10} ${ty - 40}, ${tx} ${ty}`}
        />
      </circle>
    </svg>
  );
}
