import { planeMatrix } from "./iso";
import { IsoBox } from "./IsoBox";

const NS = { vectorEffect: "non-scaling-stroke" as const };

/**
 * One object per stage of Research → Prototype → Engineer → Validate →
 * Product: the same cube becoming progressively more solid and resolved.
 */
export function IsoBlock({
  stage,
  className = "",
}: {
  stage: 0 | 1 | 2 | 3 | 4;
  className?: string;
}) {
  const s = 1;
  const ox = 70;
  const oy = 52;
  const common = { s, ox, oy };

  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <g transform={planeMatrix(s, ox, oy, 0)} fill="none">
        <rect
          x="0"
          y="0"
          width="80"
          height="80"
          stroke="var(--iso-edge-soft)"
          strokeDasharray="2 4"
          {...NS}
        />
      </g>

      {stage === 0 && (
        <>
          <IsoBox x={10} y={10} z={0} w={60} d={60} h={60} {...common} hollow dashed />
          <g transform={planeMatrix(s, ox, oy, 30)}>
            <circle cx="40" cy="40" r="4" fill="var(--iso-accent)" />
            <circle
              cx="40"
              cy="40"
              r="10"
              fill="none"
              stroke="var(--iso-accent)"
              strokeOpacity="0.45"
              {...NS}
            />
          </g>
        </>
      )}

      {stage === 1 && (
        <>
          <IsoBox x={10} y={10} z={0} w={60} d={60} h={60} {...common} hollow />
          <IsoBox x={25} y={25} z={0} w={30} d={30} h={30} {...common} accent />
        </>
      )}

      {stage === 2 && (
        <>
          <IsoBox x={10} y={10} z={0} w={60} d={60} h={16} {...common} />
          <IsoBox x={10} y={10} z={22} w={60} d={60} h={16} {...common} />
          <IsoBox x={10} y={10} z={44} w={60} d={60} h={16} {...common} accent />
          <g transform={planeMatrix(s, ox, oy, 60)} fill="none">
            <rect
              x="22"
              y="22"
              width="36"
              height="36"
              stroke="var(--iso-accent)"
              strokeOpacity="0.6"
              {...NS}
            />
          </g>
        </>
      )}

      {stage === 3 && (
        <>
          <IsoBox x={10} y={10} z={0} w={60} d={60} h={60} {...common} />
          <g transform={planeMatrix(s, ox, oy, 60)} fill="none">
            {[25, 40, 55].map((p) => (
              <g key={p}>
                <line x1={p} y1="10" x2={p} y2="70" stroke="var(--iso-edge-soft)" {...NS} />
                <line x1="10" y1={p} x2="70" y2={p} stroke="var(--iso-edge-soft)" {...NS} />
              </g>
            ))}
            <polyline
              points="20,38 34,56 62,22"
              stroke="var(--iso-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              {...NS}
            />
          </g>
        </>
      )}

      {stage === 4 && (
        <>
          <IsoBox x={10} y={10} z={0} w={60} d={60} h={44} {...common} accent />
          <g transform={planeMatrix(s, ox, oy, 44)} fill="none">
            <rect x="18" y="18" width="44" height="44" stroke="var(--iso-edge-soft)" {...NS} />
            <circle cx="40" cy="40" r="12" stroke="var(--iso-accent)" {...NS} />
            <circle cx="40" cy="40" r="4.5" fill="var(--iso-accent)" />
            <line
              x1="22"
              y1="68"
              x2="58"
              y2="68"
              stroke="var(--iso-accent)"
              strokeOpacity="0.6"
              {...NS}
            />
          </g>
        </>
      )}
    </svg>
  );
}
