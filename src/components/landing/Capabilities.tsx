import { useState, type ReactNode } from "react";

function KV({ label, value, tone }: { label: string; value: string; tone?: "ok" | "warn" | "bad" }) {
  const toneClass = tone === "bad" ? "text-danger" : tone === "warn" ? "text-amber-accent" : "text-foreground";
  return (
    <div className="flex items-center justify-between border-b border-hairline py-2 last:border-0">
      <span className="eyebrow">{label}</span>
      <span className={`font-mono text-[12px] ${toneClass}`}>{value}</span>
    </div>
  );
}

function MockPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-2/60">
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
    title: "Agent IAM",
    tags: ["LEAST-PRIVILEGE", "SCOPED CREDENTIALS"],
    body: "Every agent receives a unique, cryptographically-verifiable identity — exactly as employees do.",
    points: [
      "Least-privilege policy per agent, down to the tool and argument",
      "Short-lived, scoped credentials issued per session, auto-rotated",
      "Full inventory: every agent, every permission, every credential",
    ],
    mock: (
      <MockPanel title="Agent Inventory">
        <KV label="support-agent" value="4 tools · scoped" tone="ok" />
        <KV label="ops-agent" value="7 tools · scoped" tone="ok" />
        <KV label="kyc-agent" value="2 tools · scoped" tone="ok" />
        <KV label="rag-pipeline" value="1 tool · review" tone="warn" />
      </MockPanel>
    ),
  },
  {
    n: "02",
    title: "Policy Engine",
    tags: ["ESCALATE", "DRY-RUN"],
    body: "Policies are plain YAML, versioned in git — reviewable, testable, auditable.",
    points: [
      "Argument limits, spend caps, rate limits, time windows",
      "Human-in-the-loop escalation for sensitive actions",
      "Dry-run mode against historical traffic before enforcement",
    ],
    mock: (
      <MockPanel title="Escalation Request">
        <KV label="Agent" value="support-agent" />
        <KV label="Action" value="tool.refund" />
        <KV label="Amount" value="₹50,000" />
        <KV label="Risk" value="HIGH · 87/100" tone="bad" />
        <div className="mt-4 flex gap-2">
          <span className="flex-1 rounded-lg border border-amber-soft/40 bg-amber-soft/10 py-1.5 text-center text-[11.5px] font-semibold text-amber-soft">
            Approve
          </span>
          <span className="flex-1 rounded-lg border border-danger/40 bg-danger/10 py-1.5 text-center text-[11.5px] font-semibold text-danger">
            Deny
          </span>
        </div>
      </MockPanel>
    ),
  },
  {
    n: "03",
    title: "Threat Detection",
    tags: ["INJECTION", "DRIFT"],
    body: "Millisecond classifiers screen every call for injection, drift and leakage.",
    points: [
      "Injection detection via fine-tuned classifiers plus heuristics",
      "Goal-drift detection against expected per-task behaviour",
      "PII, secret and API-key exfiltration guard on every output",
    ],
    mock: (
      <MockPanel title="Attack Vectors Blocked">
        {[
          "User input → injected payload",
          "Tool response → hijack attempt",
          "Agent handoff → cross-agent inject",
        ].map((v) => (
          <div key={v} className="flex items-center justify-between border-b border-hairline py-2 text-[12px] last:border-0">
            <span>{v}</span>
            <span className="rounded-full border border-danger/40 bg-danger/10 px-2 py-0.5 font-mono text-[9.5px] tracking-wide text-danger uppercase">
              Blocked
            </span>
          </div>
        ))}
      </MockPanel>
    ),
  },
  {
    n: "04",
    title: "Audit & Forensics",
    tags: ["SOC 2", "DPDP"],
    body: "A tamper-evident, append-only log of every prompt, call, verdict and response.",
    points: [
      "Session replay, reconstructed step-by-step for any incident",
      "SHA-256 hash per entry — tamper-evident by design",
      "One-click exports mapped to SOC 2, ISO 27001 and DPDP evidence",
    ],
    mock: (
      <MockPanel title="Audit Log Entry">
        <pre className="font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-muted-foreground">{`{
  "decision": "DENY",
  "tool": "exec_shell",
  "agent": "kyc-agent",
  "latency_ms": 6,
  "hash": "sha256:a3f9c281…"
}`}</pre>
      </MockPanel>
    ),
  },
  {
    n: "05",
    title: "MCP Security",
    tags: ["REGISTRY", "RE-VERIFY"],
    body: "Every MCP server and tool is scanned before it connects — and continuously after.",
    points: [
      "Static and behavioural scanning for hidden instructions",
      "A curated trusted-tools registry the MCP ecosystem is missing",
      "Continuous re-verification; drift after approval is quarantined",
    ],
    mock: (
      <MockPanel title="Connected Tools">
        <KV label="calendar-mcp" value="verified" tone="ok" />
        <KV label="crm-mcp" value="verified" tone="ok" />
        <KV label="unknown-tool-v2" value="quarantined" tone="bad" />
      </MockPanel>
    ),
  },
];

export function Capabilities() {
  const [open, setOpen] = useState(1);

  return (
    <section className="border-b border-hairline py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">Enforcement capabilities</p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.03em]">
          Complete{" "}
          <span className="font-serif font-normal text-muted-foreground italic">surface coverage.</span>
        </h2>

        <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-2xl border border-hairline bg-[var(--hairline)]">
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
                  <span className="flex-1 text-[15px] font-semibold tracking-tight">{it.title}</span>
                  <div className="hidden gap-2 sm:flex">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[9px] tracking-wide text-muted-foreground uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-lg text-amber-accent">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="grid gap-8 px-6 pb-8 md:grid-cols-2">
                    <div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {it.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-[13px] text-foreground">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-amber-accent" />
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
