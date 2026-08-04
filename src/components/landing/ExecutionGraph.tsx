const stages = [
  { x: 40, tag: "IDENTITY", title: "Agent IAM" },
  { x: 224, tag: "ENFORCE", title: "Policy Engine" },
  { x: 408, tag: "INSPECT", title: "Threat Detection" },
  { x: 592, tag: "RECORD", title: "Audit & Forensics" },
  { x: 776, tag: "REGISTRY", title: "MCP Security" },
];

const CHECKPOINT_X = 916;
const Y = 70;

export function ExecutionGraph() {
  return (
    <section className="border-b border-hairline py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">Runtime execution graph</p>
        <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
          Five modules, <span className="text-muted-foreground">one path to a verdict.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Every tool-call walks the same graph, in the same order. Nothing skips a stage, and
          nothing executes before the checkpoint returns a verdict.
        </p>

        <div className="card-lift panel-sheen mt-12 overflow-x-auto rounded-none border border-hairline bg-surface p-6 sm:p-10">
          <svg
            viewBox="0 0 980 160"
            className="w-full min-w-[820px]"
            role="img"
            aria-label="Diagram of the five AgentGuard modules connected in sequence, ending in a signed verdict"
          >
            <defs>
              <linearGradient id="eg-line" x1="0" x2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            <g className="text-foreground">
              {stages.slice(0, -1).map((s, i) => {
                const next = stages[i + 1];
                return (
                  <g key={s.title}>
                    <path
                      d={`M ${s.x} ${Y} H ${next.x}`}
                      stroke="url(#eg-line)"
                      strokeWidth="1"
                      fill="none"
                    />
                    <path
                      d={`M ${s.x} ${Y} H ${next.x}`}
                      className="cp-flow text-amber-accent"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    />
                  </g>
                );
              })}

              <path
                d={`M ${stages[stages.length - 1].x} ${Y} H ${CHECKPOINT_X - 26}`}
                stroke="url(#eg-line)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d={`M ${stages[stages.length - 1].x} ${Y} H ${CHECKPOINT_X - 26}`}
                className="cp-flow text-amber-soft"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                style={{ animationDelay: "2s" }}
              />

              {stages.map((s) => (
                <g key={s.title}>
                  <circle cx={s.x} cy={Y} r="5" className="fill-amber-accent" />
                  <circle
                    cx={s.x}
                    cy={Y}
                    r="9"
                    className="text-amber-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                  />
                </g>
              ))}

              <circle
                cx={CHECKPOINT_X}
                cy={Y}
                r="26"
                className="cp-ring text-amber-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx={CHECKPOINT_X}
                cy={Y}
                r="19"
                className="fill-surface"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="1"
              />
              <path
                d={`M ${CHECKPOINT_X - 8} ${Y} l 5.5 5.5 l 11 -12`}
                fill="none"
                className="text-amber-accent"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {stages.map((s) => (
              <g key={`${s.title}-label`}>
                <text
                  x={s.x}
                  y={Y - 24}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono text-[9px] tracking-[0.16em] uppercase"
                >
                  {s.tag}
                </text>
                <text
                  x={s.x}
                  y={Y + 34}
                  textAnchor="middle"
                  className="fill-foreground text-[12px] font-semibold"
                >
                  {s.title}
                </text>
              </g>
            ))}
            <text
              x={CHECKPOINT_X}
              y={Y + 46}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] tracking-[0.16em] uppercase"
            >
              Verdict
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
