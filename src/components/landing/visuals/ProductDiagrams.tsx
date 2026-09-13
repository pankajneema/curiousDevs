const line = {
  stroke: "var(--iso-edge-soft)",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke" as const,
};
const accent = {
  stroke: "var(--iso-accent)",
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke" as const,
};

export function LlmDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 300"
      className={className}
      role="img"
      aria-label="Noema multimodal intelligence system receiving text, image, audio and sensor context, then producing perception, reasoning, planning and action"
    >
      <defs>
        <linearGradient id="noema-core" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--iso-top)" />
          <stop offset="1" stopColor="var(--iso-core)" />
        </linearGradient>
        <filter id="noema-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000" floodOpacity=".18" />
        </filter>
      </defs>
      <path d="M28 150 H612" {...line} strokeDasharray="3 6" />
      <path
        d="M28 150 C128 150 130 90 214 90 S300 150 320 150 S416 210 498 210 S556 150 612 150"
        fill="none"
        {...accent}
        strokeDasharray="5 6"
        opacity=".75"
      />

      {[
        [58, 76, "TEXT"],
        [58, 122, "IMAGE"],
        [58, 168, "AUDIO"],
        [58, 214, "SENSORS"],
      ].map(([x, y, label]) => (
        <g key={String(label)}>
          <rect
            x={Number(x)}
            y={Number(y) - 13}
            width="82"
            height="26"
            rx="3"
            fill="var(--iso-top)"
            stroke="var(--iso-edge)"
          />
          <circle cx={Number(x) + 13} cy={Number(y)} r="3" fill="var(--iso-accent)" />
          <text
            x={Number(x) + 24}
            y={Number(y) + 3}
            fill="var(--technical-gray)"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="1"
          >
            {label}
          </text>
          <path d={`M${Number(x) + 82} ${Number(y)} H220`} {...line} />
        </g>
      ))}

      <g filter="url(#noema-shadow)">
        <path
          d="M220 104 L280 78 L340 104 L340 188 L280 218 L220 188 Z"
          fill="url(#noema-core)"
          stroke="var(--iso-edge)"
        />
        <path
          d="M242 112 L280 96 L318 112 L318 176 L280 194 L242 176 Z"
          fill="var(--iso-core)"
          stroke="var(--iso-accent)"
        />
        <path d="M255 126 H305 M255 140 H294 M255 154 H312" {...line} />
        <circle cx="280" cy="111" r="5" fill="var(--iso-accent)" />
      </g>
      <text
        x="280"
        y="242"
        textAnchor="middle"
        fill="var(--technical-gray)"
        fontSize="10"
        fontFamily="var(--font-mono)"
        letterSpacing="1.4"
      >
        NOEMA / CORE
      </text>
      <text
        x="280"
        y="259"
        textAnchor="middle"
        fill="var(--technical-gray)"
        fontSize="8"
        fontFamily="var(--font-mono)"
        letterSpacing="1"
      >
        PERCEIVE · REPRESENT · REASON
      </text>

      {[
        [414, 94, "PERCEPTION"],
        [414, 132, "UNDERSTANDING"],
        [414, 170, "REASONING"],
        [414, 208, "PLANNING"],
      ].map(([x, y, label], i) => (
        <g key={String(label)}>
          <path
            d={`M340 ${150 + (i - 1.5) * 18} H${Number(x)}`}
            {...accent}
            strokeDasharray="4 5"
          />
          <rect
            x={Number(x)}
            y={Number(y) - 13}
            width={i === 1 ? 112 : 96}
            height="26"
            rx="3"
            fill="var(--iso-top)"
            stroke={i === 3 ? "var(--iso-accent)" : "var(--iso-edge)"}
          />
          <circle
            cx={Number(x) + 13}
            cy={Number(y)}
            r="3"
            fill={i === 3 ? "var(--iso-accent)" : "var(--iso-edge-soft)"}
          />
          <text
            x={Number(x) + 24}
            y={Number(y) + 3}
            fill="var(--technical-gray)"
            fontSize="8.5"
            fontFamily="var(--font-mono)"
            letterSpacing=".8"
          >
            {label}
          </text>
        </g>
      ))}
      <path d="M526 170 H606" {...accent} />
      <circle cx="606" cy="170" r="5" fill="var(--iso-accent)" />
      <text
        x="606"
        y="194"
        textAnchor="end"
        fill="var(--technical-gray)"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="1.1"
      >
        ACTION / DECISION
      </text>
      <text
        x="320"
        y="28"
        textAnchor="middle"
        fill="var(--technical-gray)"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="1.1"
      >
        MULTIMODAL INTELLIGENCE · EVALUATE · REFINE
      </text>
    </svg>
  );
}

export function HumanoidDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 310"
      className={className}
      role="img"
      aria-label="Humanoid robot diagram showing perception, planning, control and movement"
    >
      <defs>
        <linearGradient id="soma-shell" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--iso-top)" />
          <stop offset="0.5" stopColor="var(--iso-edge)" />
          <stop offset="1" stopColor="var(--iso-core)" />
        </linearGradient>
        <linearGradient id="soma-panel" x1="0" x2="0.8" y1="0" y2="1">
          <stop offset="0" stopColor="var(--iso-core)" />
          <stop offset="1" stopColor="var(--iso-top)" />
        </linearGradient>
        <radialGradient id="soma-sensor" cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor="var(--iso-accent)" stopOpacity=".8" />
          <stop offset="1" stopColor="var(--iso-accent)" stopOpacity=".12" />
        </radialGradient>
        <filter id="soma-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="11" floodColor="#000" floodOpacity=".24" />
        </filter>
      </defs>
      <path d="M42 264 H518 M82 264 V72 M478 264 V72" {...line} strokeDasharray="3 5" />
      <ellipse cx="280" cy="264" rx="124" ry="25" fill="none" stroke="var(--iso-edge-soft)" />

      {/* perception field */}
      <path d="M128 58 Q280 12 432 58 M154 77 Q280 38 406 77" fill="none" {...line} />
      <path d="M128 58 L102 48 M432 58 L458 48" {...accent} strokeDasharray="4 4" />

      {/* head, sensor band and neck */}
      <g filter="url(#soma-shadow)">
        <path
          d="M247 54 Q247 30 280 30 Q313 30 313 54 L307 84 Q280 96 253 84 Z"
          fill="url(#soma-shell)"
          stroke="var(--iso-edge)"
        />
        <path
          d="M254 55 Q280 48 306 55 V72 Q280 78 254 72 Z"
          fill="url(#soma-sensor)"
          stroke="var(--iso-accent)"
        />
        <circle cx="267" cy="63" r="3" fill="var(--iso-accent)" />
        <circle cx="293" cy="63" r="3" fill="var(--iso-accent)" />
        <circle cx="280" cy="59" r="2" fill="var(--paper)" opacity=".85" />
      </g>
      <path d="M258 80 H302 M268 89 V101 H292 V89" fill="none" {...accent} />

      {/* torso chassis */}
      <path
        d="M225 102 L280 92 L335 102 L326 174 L280 190 L234 174 Z"
        fill="url(#soma-shell)"
        stroke="var(--iso-edge)"
      />
      <path
        d="M244 112 L280 104 L316 112 L311 148 L280 157 L249 148 Z"
        fill="url(#soma-panel)"
        stroke="var(--iso-accent)"
      />
      <path d="M257 122 H303 M257 132 H294" {...line} />
      <circle cx="280" cy="169" r="7" fill="var(--iso-top)" stroke="var(--iso-accent)" />
      <path d="M240 160 H320 M251 177 H309" {...line} opacity=".8" />
      <path d="M239 116 L221 133 M321 116 L339 133" {...line} />

      {/* articulated arms */}
      <path
        d="M230 112 L188 140 L155 181 L125 169 M330 112 L372 140 L405 181 L435 169"
        fill="none"
        stroke="var(--iso-edge)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M230 112 L188 140 L155 181 L125 169 M330 112 L372 140 L405 181 L435 169"
        fill="none"
        stroke="var(--iso-edge-soft)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[188, 372, 155, 405].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy={i < 2 ? 140 : 181}
          r="9"
          fill="var(--iso-top)"
          stroke="var(--iso-accent)"
        />
      ))}
      <path d="M117 164 l-12 5 M117 174 l-12 5 M443 164 l12 5 M443 174 l12 5" {...accent} />

      {/* pelvis and articulated legs */}
      <path
        d="M238 177 L280 190 L322 177 L313 207 L280 218 L247 207 Z"
        fill="url(#soma-shell)"
        stroke="var(--iso-edge)"
      />
      <path
        d="M250 205 L226 244 L218 276 L188 276 M310 205 L334 244 L342 276 L372 276"
        fill="none"
        stroke="var(--iso-edge)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M250 205 L226 244 L218 276 M310 205 L334 244 L342 276"
        fill="none"
        stroke="var(--iso-edge-soft)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="250" cy="205" r="9" fill="var(--iso-top)" stroke="var(--iso-accent)" />
      <circle cx="310" cy="205" r="9" fill="var(--iso-top)" stroke="var(--iso-accent)" />
      <circle cx="226" cy="244" r="8" fill="var(--iso-top)" stroke="var(--iso-accent)" />
      <circle cx="334" cy="244" r="8" fill="var(--iso-top)" stroke="var(--iso-accent)" />
      <path
        d="M188 276 H225 M335 276 H372"
        stroke="var(--iso-edge)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* system callouts */}
      <path d="M82 92 H154 L185 120 M478 92 H406 L375 120" {...accent} strokeDasharray="4 5" />
      <text
        x="82"
        y="82"
        fill="var(--technical-gray)"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="1"
      >
        VISION / DEPTH / IMU
      </text>
      <text
        x="478"
        y="82"
        textAnchor="end"
        fill="var(--technical-gray)"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="1"
      >
        CONTROL / ACTUATION
      </text>
      <text
        x="280"
        y="301"
        textAnchor="middle"
        fill="var(--technical-gray)"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="1.2"
      >
        SENSE → PLAN → MOVE → LEARN
      </text>
    </svg>
  );
}
