const lanes = [
  { label: "Agents", y: 46 },
  { label: "Data", y: 110 },
  { label: "Machines", y: 174 },
];

export function Checkpoint() {
  return (
    <div className="relative select-none">
      <svg
        viewBox="0 0 420 220"
        className="w-full"
        role="img"
        aria-label="Three streams of activity converging into one checkpoint that returns a signed verdict"
      >
        <defs>
          <linearGradient id="cp-line" x1="0" x2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <g className="text-foreground">
          {lanes.map((lane, i) => (
            <g key={lane.label}>
              <path
                d={`M 18 ${lane.y} H 150 Q 186 ${lane.y} 186 110`}
                fill="none"
                stroke="url(#cp-line)"
                strokeWidth="1"
              />
              <path
                d={`M 18 ${lane.y} H 150 Q 186 ${lane.y} 186 110`}
                fill="none"
                className="cp-flow text-amber-accent"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ animationDelay: `${i * 1.1}s` }}
              />
              <circle cx="18" cy={lane.y} r="3" className="fill-amber-soft/70" />
            </g>
          ))}

          <path
            d="M 234 110 H 402"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
          <path
            d="M 234 110 H 402"
            fill="none"
            className="cp-flow text-amber-soft"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ animationDelay: "0.55s" }}
          />

          <circle
            cx="210"
            cy="110"
            r="30"
            className="cp-ring text-amber-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="210" cy="110" r="22" className="fill-surface" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          <path
            d="M 201 110 l 6 6 l 12 -13"
            fill="none"
            className="text-amber-accent"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {lanes.map((lane) => (
          <text
            key={lane.label}
            x="30"
            y={lane.y - 10}
            className="fill-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase"
          >
            {lane.label}
          </text>
        ))}
        <text
          x="402"
          y="98"
          textAnchor="end"
          className="fill-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase"
        >
          Verdict
        </text>
      </svg>

      <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
        {[
          { k: "<10ms", v: "decision time" },
          { k: "No model", v: "in the hot path" },
          { k: "Signed", v: "every outcome" },
        ].map((s) => (
          <div key={s.k} className="stat-tick bg-surface/60 px-4 py-4">
            <div className="text-sm font-semibold tracking-tight text-amber-accent">{s.k}</div>
            <div className="eyebrow mt-1">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
