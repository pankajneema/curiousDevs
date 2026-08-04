import { steps } from "@/content/site";

const planes = [
  {
    label: "Pre-Production · Control Plane",
    blocks: [
      {
        title: "Discovery & Evals",
        sub: "Adversarial · Security · Compliance",
        chips: ["Quality", "Security", "DPDP"],
        foot: "Sandboxed reconstruction",
      },
      {
        title: "Behavioural Baseline",
        sub: "Risk & compliance scoring",
        chips: ["Compliance Risk", "Security Score"],
        foot: "From observed failure modes",
      },
      {
        title: "Policy Signatures",
        sub: "Reusable rules, deterministic, not prompt-based",
        chips: ["Data Protection", "Governance", "Context Mgmt"],
        foot: "Shift-left risk discovery",
      },
    ],
  },
  {
    label: "Runtime · Data Plane",
    blocks: [
      {
        title: "Policy Enforcement",
        sub: "Detect · Allow · Deny · before execution",
        chips: ["Allow", "Deny", "Modify", "Escalate"],
        foot: "Inline, deterministic, real-time",
      },
      {
        title: "Real-time Monitoring",
        sub: "Every signal observed continuously",
        chips: ["User Input", "LLM Calls", "Tool Calls"],
        foot: "Full audit trail on every decision",
      },
      {
        title: "Continuous Hardening",
        sub: "Production tightens enforcement",
        chips: ["Telemetry", "Policy Updates"],
        foot: "No redeployment. No system modification.",
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
            From failure modes{" "}
            <span className="text-muted-foreground">to runtime enforcement.</span>
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
                  ↓ Unified Policy Engine · Deploy
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
