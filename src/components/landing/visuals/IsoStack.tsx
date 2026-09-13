import { useId } from "react";
import { COS30, planeMatrix, project } from "./iso";
import { IsoBox } from "./IsoBox";

export type StackPattern = "core" | "rings" | "circuit" | "modules" | "grid";

export type StackLayer = {
  label: string;
  sub?: string;
  pattern: StackPattern;
};

const NS = { vectorEffect: "non-scaling-stroke" as const };

function Pattern({ pattern, markId }: { pattern: StackPattern; markId: string }) {
  switch (pattern) {
    case "core":
      return (
        <g fill="none">
          <rect x="7" y="7" width="86" height="86" stroke="var(--iso-edge-soft)" {...NS} />
          {[20, 35, 65, 80].map((p) => (
            <g key={p}>
              <line x1={p} y1="7" x2={p} y2="30" stroke="var(--iso-edge-soft)" {...NS} />
              <line x1={p} y1="70" x2={p} y2="93" stroke="var(--iso-edge-soft)" {...NS} />
              <line x1="7" y1={p} x2="30" y2={p} stroke="var(--iso-edge-soft)" {...NS} />
              <line x1="70" y1={p} x2="93" y2={p} stroke="var(--iso-edge-soft)" {...NS} />
            </g>
          ))}
          <rect
            x="30"
            y="30"
            width="40"
            height="40"
            fill="var(--iso-core)"
            stroke="var(--iso-accent)"
            {...NS}
          />
          <rect
            x="34"
            y="34"
            width="32"
            height="32"
            stroke="var(--iso-accent)"
            strokeOpacity="0.45"
            {...NS}
          />
          <use href={`#${markId}`} />
        </g>
      );
    case "rings":
      return (
        <g fill="none">
          {[12, 24, 36].map((r) => (
            <circle key={r} cx="50" cy="50" r={r} stroke="var(--iso-edge-soft)" {...NS} />
          ))}
          <circle
            cx="50"
            cy="50"
            r="24"
            stroke="var(--iso-accent)"
            strokeOpacity="0.55"
            strokeDasharray="10 8"
            {...NS}
          />
          <line x1="8" y1="50" x2="92" y2="50" stroke="var(--iso-edge-soft)" {...NS} />
          <line x1="50" y1="8" x2="50" y2="92" stroke="var(--iso-edge-soft)" {...NS} />
          <circle cx="50" cy="50" r="4" fill="var(--iso-accent)" />
          <circle cx="74" cy="50" r="2.2" fill="var(--iso-accent)" />
          <circle cx="50" cy="14" r="2" fill="var(--iso-edge)" />
        </g>
      );
    case "circuit":
      return (
        <g fill="none">
          <polyline
            points="10,24 34,24 44,34 70,34 78,26 90,26"
            stroke="var(--iso-edge-soft)"
            {...NS}
          />
          <polyline
            points="10,52 26,52 36,62 60,62 70,52 90,52"
            stroke="var(--iso-accent)"
            strokeOpacity="0.6"
            {...NS}
          />
          <polyline points="10,80 40,80 48,72 90,72" stroke="var(--iso-edge-soft)" {...NS} />
          <polyline points="54,12 54,34" stroke="var(--iso-edge-soft)" {...NS} />
          <polyline points="46,62 46,88" stroke="var(--iso-edge-soft)" {...NS} />
          {[
            [10, 24],
            [90, 26],
            [90, 52],
            [10, 80],
            [90, 72],
            [54, 12],
            [46, 88],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" fill="var(--iso-edge)" />
          ))}
          <circle cx="10" cy="52" r="2.6" fill="var(--iso-accent)" />
        </g>
      );
    case "modules":
      return (
        <g fill="none">
          <rect x="9" y="9" width="36" height="22" stroke="var(--iso-edge-soft)" {...NS} />
          <rect x="51" y="9" width="40" height="22" stroke="var(--iso-edge-soft)" {...NS} />
          <rect x="9" y="37" width="22" height="30" stroke="var(--iso-edge-soft)" {...NS} />
          <rect
            x="37"
            y="37"
            width="26"
            height="30"
            fill="var(--iso-accent)"
            fillOpacity="0.18"
            stroke="var(--iso-accent)"
            strokeOpacity="0.7"
            {...NS}
          />
          <rect x="69" y="37" width="22" height="30" stroke="var(--iso-edge-soft)" {...NS} />
          <rect x="9" y="73" width="82" height="18" stroke="var(--iso-edge-soft)" {...NS} />
        </g>
      );
    case "grid":
    default:
      return (
        <g fill="none">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            Array.from({ length: 4 }).map((__, j) => {
              const hot = (i === 1 && j === 2) || (i === 2 && j === 1);
              return (
                <rect
                  key={`${i}-${j}`}
                  x={12 + i * 20}
                  y={12 + j * 20}
                  width="16"
                  height="16"
                  fill={hot ? "var(--iso-accent)" : "none"}
                  fillOpacity={hot ? 0.22 : undefined}
                  stroke={hot ? "var(--iso-accent)" : "var(--iso-edge-soft)"}
                  {...NS}
                />
              );
            }),
          )}
        </g>
      );
  }
}

/**
 * Exploded isometric stack — each plate one layer of a system. Annotations
 * (when enabled) are rendered as HTML over the SVG so label text stays
 * legible at every breakpoint instead of scaling with the drawing.
 */
export function IsoStack({
  layers,
  annotate = false,
  className = "",
  scale = 1.55,
  gap = 44,
}: {
  layers: StackLayer[];
  annotate?: boolean;
  className?: string;
  scale?: number;
  gap?: number;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const s = scale;
  const W = 100;
  const H = 7;
  const n = layers.length;
  const zTop = (n - 1) * gap;
  const halfW = W * COS30 * s;
  const padX = 18;
  const padTop = 18;
  const padBottom = 22;
  const ox = padX + halfW;
  const oy = padTop + (zTop + H) * s;
  const stackW = halfW * 2 + padX * 2;
  const labelW = annotate ? 240 : 0;
  const vbW = stackW + labelW;
  const vbH = oy + W * s + padBottom;

  const zOf = (i: number) => (n - 1 - i) * gap;
  const order = layers.map((_, i) => n - 1 - i); // paint bottom plate first

  const annotations = layers.map((layer, i) => {
    const z = zOf(i);
    const [cx, cy] = project([W, 0, z + H / 2], s, ox, oy);
    return { layer, i, cx, cy };
  });

  const [glowX, glowY] = project([50, 50, zTop], s, ox, oy);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${vbW.toFixed(0)} ${vbH.toFixed(0)}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0%" stopColor="var(--iso-accent)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--iso-accent)" stopOpacity="0" />
          </radialGradient>
          <symbol id={`${uid}-mark`} viewBox="0 0 670 658">
            <image href="/brand/curiousdevs-mark-light.png" width="670" height="658" />
          </symbol>
          <g id={`${uid}-markuse`}>
            <use href={`#${uid}-mark`} x="38" y="38" width="24" height="24" />
          </g>
        </defs>

        <ellipse
          cx={ox}
          cy={oy + W * s * 0.5 + 4}
          rx={halfW * 1.02}
          ry={halfW * 0.56}
          fill="none"
          stroke="var(--iso-edge-soft)"
          strokeDasharray="2 5"
        />

        {order.map((i, k) => {
          const z = zOf(i);
          const layer = layers[i];
          const isTop = i === 0;
          const below = k > 0 ? order[k - 1] : null;
          return (
            <g key={layer.label}>
              {below !== null &&
                (
                  [
                    [0, W],
                    [W, 0],
                    [W, W],
                  ] as const
                ).map(([x, y]) => {
                  const [x1, y1] = project([x, y, zOf(below) + H], s, ox, oy);
                  const [x2, y2] = project([x, y, z], s, ox, oy);
                  return (
                    <line
                      key={`${x}-${y}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--iso-edge-soft)"
                      strokeDasharray="3 4"
                    />
                  );
                })}
              {below !== null &&
                (() => {
                  const [x1, y1] = project([50, 50, zOf(below) + H], s, ox, oy);
                  const [x2, y2] = project([50, 50, z], s, ox, oy);
                  return (
                    <g>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="var(--iso-accent)"
                        strokeOpacity="0.35"
                      />
                      <circle r="2.4" fill="var(--iso-accent)" className="anim-signal">
                        <animateMotion
                          dur="2.4s"
                          begin={`${k * 0.45}s`}
                          repeatCount="indefinite"
                          path={`M ${x1} ${y1} L ${x2} ${y2}`}
                        />
                      </circle>
                    </g>
                  );
                })()}
              {isTop && (
                <ellipse
                  cx={glowX}
                  cy={glowY}
                  rx={halfW * 1.05}
                  ry={halfW * 0.62}
                  fill={`url(#${uid}-glow)`}
                />
              )}
              <IsoBox x={0} y={0} z={z} w={W} d={W} h={H} s={s} ox={ox} oy={oy} accent={isTop} />
              <g transform={planeMatrix(s, ox, oy, z + H)}>
                <Pattern pattern={layer.pattern} markId={`${uid}-markuse`} />
              </g>
            </g>
          );
        })}

        {annotate &&
          annotations.map(({ i, cx, cy }) => (
            <g key={i}>
              <line
                x1={cx + 6}
                y1={cy}
                x2={stackW + 14}
                y2={cy}
                stroke="var(--iso-edge)"
                strokeDasharray="2 3"
              />
              <circle
                cx={stackW + 16}
                cy={cy}
                r="2.2"
                fill={i === 0 ? "var(--iso-accent)" : "var(--iso-edge)"}
              />
            </g>
          ))}
      </svg>

      {annotate &&
        annotations.map(({ layer, cy }) => (
          <div
            key={layer.label}
            className="absolute -translate-y-1/2"
            style={{
              left: `${((stackW + 26) / vbW) * 100}%`,
              top: `${(cy / vbH) * 100}%`,
              right: 0,
            }}
          >
            <p className="font-mono text-[9px] leading-tight tracking-[0.14em] text-foreground uppercase sm:text-[11px]">
              {layer.label}
            </p>
            {layer.sub && (
              <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground sm:text-xs">
                {layer.sub}
              </p>
            )}
          </div>
        ))}
    </div>
  );
}
