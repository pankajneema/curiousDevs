import { steps } from "@/content/legacy";

const planes = [
  {
    label: "Discovery · Control Plane",
    blocks: [
      {
        title: "Problem discovery",
        sub: "Users · Workflows · Architecture",
        chips: ["Context", "Risk", "Scope"],
        foot: "A clear problem statement",
      },
      {
        title: "Baseline and evaluation",
        sub: "Quality · Cost · Latency · Security",
        chips: ["Test Set", "Metrics", "Evidence"],
        foot: "Comparable starting point",
      },
      {
        title: "Architecture and SOW",
        sub: "Deliverables · Assumptions · Acceptance",
        chips: ["Build", "Fix", "Scale"],
        foot: "A defined workstream",
      },
    ],
  },
  {
    label: "Delivery · Evidence Plane",
    blocks: [
      {
        title: "Build or diagnose",
        sub: "Implement · Investigate · Engineer",
        chips: ["Backend", "RAG", "Agents"],
        foot: "Working system or failure map",
      },
      {
        title: "Evaluate and re-test",
        sub: "Edge cases · Regression · Acceptance",
        chips: ["Accuracy", "Reliability", "Security"],
        foot: "Before-and-after evidence",
      },
      {
        title: "Deploy and hand over",
        sub: "Infrastructure · Observability · Runbooks",
        chips: ["MLOps", "QA", "Training"],
        foot: "A system your team can operate",
      },
    ],
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-b border-hairline py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="eyebrow">How it Works</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.03em]">
            From problem discovery{" "}
            <span className="text-muted-foreground">to production proof.</span>
          </h2>
        </div>

        <div className="card-lift mt-16 rounded-none border border-hairline bg-surface/50 p-5 sm:p-8">
          {planes.map((plane, pi) => (
            <div key={plane.label} className={pi ? "mt-8" : ""}>
              <p className="eyebrow">{plane.label}</p>
              <div className="mt-4 grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] md:grid-cols-3">
                {plane.blocks.map((b) => (
                  <div key={b.title} className="cell-hover bg-surface-2 p-6">
                    <h3 className="text-base font-semibold tracking-tight">{b.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{b.sub}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {b.chips.map((c) => (
                        <span
                          key={c}
                          className="rounded-none border border-hairline px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="eyebrow mt-5">{b.foot}</p>
                  </div>
                ))}
              </div>
              {pi === 0 && (
                <p className="eyebrow mt-6 text-center text-amber-accent">
                  ↓ Engineering workstream · Evaluate
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <article key={s.n} className="cell-hover bg-surface p-6">
              <p className="font-mono text-xs text-amber-accent">
                {s.n} <span className="text-muted-foreground">· {s.phase}</span>
              </p>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
