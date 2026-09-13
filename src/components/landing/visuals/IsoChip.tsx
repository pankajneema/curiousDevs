import { useId } from "react";
import { COS30, planeMatrix, project } from "./iso";
import { IsoBox, IsoCylinder } from "./IsoBox";

const NS = { vectorEffect: "non-scaling-stroke" as const };

/**
 * An isometric board with a chip. `sensor` adds a lens and a perception
 * frustum (intelligent systems / edge); `compute` adds a stacked die with
 * an orange core (hardware / accelerators).
 */
export function IsoChip({
  variant = "compute",
  className = "",
}: {
  variant?: "compute" | "sensor";
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const s = 1.25;
  const W = 100;
  const halfW = W * COS30 * s;
  const ox = 20 + halfW;
  const top = variant === "sensor" ? 84 : 16;
  const oy = top + 5 * s;
  const vbW = halfW * 2 + 40;
  const vbH = oy + W * s + 20;

  const [cx, cy] = project([50, 50, 22], s, ox, oy);

  return (
    <svg
      viewBox={`0 0 ${vbW.toFixed(0)} ${vbH.toFixed(0)}`}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${uid}-g`}>
          <stop offset="0%" stopColor="var(--iso-accent)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--iso-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <IsoBox x={0} y={0} z={0} w={W} d={W} h={5} s={s} ox={ox} oy={oy} />
      <g transform={planeMatrix(s, ox, oy, 5)} fill="none">
        {[10, 20, 80, 90].map((p) => (
          <g key={p}>
            <line x1={p} y1="6" x2={p} y2="94" stroke="var(--iso-edge-soft)" {...NS} />
            <line x1="6" y1={p} x2="94" y2={p} stroke="var(--iso-edge-soft)" {...NS} />
          </g>
        ))}
        {[34, 42, 50, 58, 66].map((p) => (
          <g key={p}>
            <line x1={p} y1="20" x2={p} y2="30" stroke="var(--iso-edge)" {...NS} />
            <line x1={p} y1="70" x2={p} y2="80" stroke="var(--iso-edge)" {...NS} />
            <line x1="20" y1={p} x2="30" y2={p} stroke="var(--iso-edge)" {...NS} />
            <line x1="70" y1={p} x2="80" y2={p} stroke="var(--iso-edge)" {...NS} />
          </g>
        ))}
        <polyline
          points="80,42 88,42 94,36"
          stroke="var(--iso-accent)"
          strokeOpacity="0.7"
          {...NS}
        />
        <polyline
          points="58,80 58,88 64,94"
          stroke="var(--iso-accent)"
          strokeOpacity="0.7"
          {...NS}
        />
      </g>

      <ellipse cx={cx} cy={cy + 14} rx={halfW * 0.62} ry={halfW * 0.36} fill={`url(#${uid}-g)`} />
      <IsoBox x={30} y={30} z={5} w={40} d={40} h={8} s={s} ox={ox} oy={oy} />

      {variant === "compute" ? (
        <>
          <IsoBox x={36} y={36} z={13} w={28} d={28} h={6} s={s} ox={ox} oy={oy} accent />
          <g transform={planeMatrix(s, ox, oy, 19)} fill="none">
            <rect
              x="42"
              y="42"
              width="16"
              height="16"
              fill="var(--iso-accent)"
              fillOpacity="0.85"
            />
            {[45, 50, 55].map((p) => (
              <line key={p} x1={p} y1="38" x2={p} y2="41" stroke="var(--iso-accent)" {...NS} />
            ))}
          </g>
        </>
      ) : (
        <>
          <g transform={planeMatrix(s, ox, oy, 13)} fill="none">
            <rect x="34" y="34" width="32" height="32" stroke="var(--iso-edge-soft)" {...NS} />
          </g>
          <IsoCylinder cx={50} cy={50} z={13} r={11} h={12} s={s} ox={ox} oy={oy} accentTop />
          <g transform={planeMatrix(s, ox, oy, 25)} fill="none">
            <circle
              cx="50"
              cy="50"
              r="6"
              fill="var(--iso-core)"
              stroke="var(--iso-accent)"
              {...NS}
            />
            <circle cx="50" cy="50" r="2.4" fill="var(--iso-accent)" />
          </g>
          {(() => {
            const [lx, ly] = project([50, 50, 25], s, ox, oy);
            const corners = [
              [20, 20],
              [80, 20],
              [80, 80],
              [20, 80],
            ].map(([x, y]) => project([x, y, 82], s, ox, oy));
            return (
              <g>
                {corners.map(([x, y], k) => (
                  <line
                    key={k}
                    x1={lx}
                    y1={ly}
                    x2={x}
                    y2={y}
                    stroke="var(--iso-accent)"
                    strokeOpacity="0.35"
                    strokeDasharray="3 4"
                  />
                ))}
                <g transform={planeMatrix(s, ox, oy, 82)} fill="none">
                  <rect
                    x="20"
                    y="20"
                    width="60"
                    height="60"
                    stroke="var(--iso-edge-soft)"
                    {...NS}
                  />
                  {[
                    "20,32 20,20 32,20",
                    "68,20 80,20 80,32",
                    "80,68 80,80 68,80",
                    "32,80 20,80 20,68",
                  ].map((pts) => (
                    <polyline key={pts} points={pts} stroke="var(--iso-accent)" {...NS} />
                  ))}
                  <rect
                    x="40"
                    y="36"
                    width="22"
                    height="26"
                    stroke="var(--iso-accent)"
                    strokeOpacity="0.8"
                    strokeDasharray="4 3"
                    {...NS}
                  />
                </g>
              </g>
            );
          })()}
        </>
      )}
    </svg>
  );
}
