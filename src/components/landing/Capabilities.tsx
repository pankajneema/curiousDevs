import { useState, type ReactNode } from "react";

function KV({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "ok" | "warn" | "bad";
}) {
  // Text stays ink at this size regardless of tone — signal/danger text this
  // small fails AA contrast (confirmed with Lighthouse).
  const toneClass = "text-foreground";
  return (
    <div className="flex items-center justify-between border-b border-hairline py-2 last:border-0">
      <span className="eyebrow">{label}</span>
      <span className={`font-mono text-[12px] ${toneClass}`}>{value}</span>
    </div>
  );
}

function MockPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-none border border-hairline bg-surface-2/60">
      <div className="border-b border-hairline px-5 py-2.5">
        <span className="eyebrow">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

const items = [
  {
    n: "01",
    title: "AI-native Development",
    tags: ["RAG", "AGENTS"],
    body: "We design AI capabilities around real users, workflows, data, and production constraints instead of building disconnected demos.",
    points: [
      "RAG applications, knowledge copilots, and intelligent search",
      "AI agents, tool use, memory, state, and workflow automation",
      "AI-native product features with backend and integration design",
    ],
    mock: (
      <MockPanel title="Build Scope">
        <KV label="workflow" value="mapped" tone="ok" />
        <KV label="architecture" value="defined" tone="ok" />
        <KV label="evaluation set" value="drafted" tone="warn" />
        <KV label="handover" value="planned" tone="ok" />
      </MockPanel>
    ),
  },
  {
    n: "02",
    title: "Retrieval and Evaluation",
    tags: ["BASELINE", "REGRESSION"],
    body: "We make quality measurable through test sets, retrieval analysis, edge cases, regression suites, and comparable before-and-after evidence.",
    points: [
      "Chunking, metadata, hybrid retrieval, reranking, and vector tuning",
      "Accuracy, grounding, hallucination, latency, and cost analysis",
      "Agent trajectory tests, QA automation, and regression checks",
    ],
    mock: (
      <MockPanel title="Evaluation Summary">
        <KV label="accuracy" value="baseline" tone="warn" />
        <KV label="retrieval" value="measured" tone="ok" />
        <KV label="edge cases" value="queued" tone="warn" />
        <KV label="regression" value="tracked" tone="ok" />
      </MockPanel>
    ),
  },
  {
    n: "03",
    title: "Audit and Diagnosis",
    tags: ["SECURITY", "FAILURE MAP"],
    body: "We identify why an existing AI system fails across reliability, security, data flow, cost, and latency before recommending the fix.",
    points: [
      "RAG reliability and AI security and guardrails audits",
      "Prompt-injection, system-prompt leak, MCP, and tool-permission review",
      "Root-cause diagnosis with a prioritized remediation roadmap",
    ],
    mock: (
      <MockPanel title="Failure Map">
        {[
          "retrieval → irrelevant context",
          "agent → unsafe trajectory",
          "production → missing observability",
        ].map((v) => (
          <div
            key={v}
            className="flex items-center justify-between border-b border-hairline py-2 text-[12px] last:border-0"
          >
            <span>{v}</span>
            <span className="rounded-none border border-danger/40 bg-danger/10 px-2 py-0.5 font-mono text-[9.5px] tracking-wide text-foreground uppercase">
              Review
            </span>
          </div>
        ))}
      </MockPanel>
    ),
  },
  {
    n: "04",
    title: "Optimization and Hardening",
    tags: ["COST", "LATENCY"],
    body: "We improve the system after diagnosis through retrieval changes, model routing, caching, permissions, resilience, and fallback design.",
    points: [
      "Model routing, semantic caching, and token attribution",
      "Latency profiling, payload optimization, and cost controls",
      "Guardrails, access governance, data-leakage prevention, and resilience",
    ],
    mock: (
      <MockPanel title="Optimization Plan">
        <KV label="critical path" value="isolated" tone="ok" />
        <KV label="model route" value="review" tone="warn" />
        <KV label="cache policy" value="proposed" tone="ok" />
        <KV label="security gaps" value="hardened" tone="ok" />
      </MockPanel>
    ),
  },
  {
    n: "05",
    title: "Production Infrastructure",
    tags: ["MLOPS", "HANDOVER"],
    body: "We make a working AI capability operable through infrastructure, deployment, observability, documentation, and knowledge transfer.",
    points: [
      "Docker, Kubernetes, CI/CD, cloud, private, or VPC deployment",
      "Logs, traces, metrics, alerts, runbooks, release controls, and QA",
      "Production handover, training, documentation, and ongoing engineering",
    ],
    mock: (
      <MockPanel title="Production Readiness">
        <KV label="deployment" value="ready" tone="ok" />
        <KV label="observability" value="connected" tone="ok" />
        <KV label="runbooks" value="in review" tone="warn" />
        <KV label="handover" value="scheduled" tone="ok" />
      </MockPanel>
    ),
  },
];

export function Capabilities() {
  const [open, setOpen] = useState(1);

  return (
    <section className="border-b border-hairline py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">Engineering capabilities</p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.03em]">
          Full lifecycle <span className="text-muted-foreground">AI engineering.</span>
        </h2>

        <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)]">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.n} className={isOpen ? "bg-surface-2" : "bg-surface"}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-xs text-muted-foreground">{it.n}</span>
                  <span className="flex-1 text-[15px] font-semibold tracking-tight">
                    {it.title}
                  </span>
                  <div className="hidden gap-2 sm:flex">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-none border border-hairline px-2.5 py-0.5 font-mono text-[9px] tracking-wide text-muted-foreground uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-lg text-amber-accent">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="grid gap-8 px-6 pb-8 md:grid-cols-2 md:items-center">
                    <div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {it.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-[13px] text-foreground">
                            <span className="mt-1.5 size-1 shrink-0 rounded-none bg-amber-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {it.mock}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
