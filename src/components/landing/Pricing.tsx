import { Check } from "lucide-react";
import { BookingDialog } from "./BookingDialog";

const serviceLines = [
  {
    name: "Build",
    tagline: "AI-native product and feature development",
    desc: "For teams starting an AI capability or building an AI-native product.",
    items: [
      "RAG applications and knowledge copilots",
      "AI agents and workflow automation",
      "Multi-agent orchestration and state",
      "Backend, integrations, evaluation, and deployment",
    ],
  },
  {
    name: "AI Audit / Assessment",
    tagline: "Understand the system before choosing the fix",
    desc: "For teams that have an existing AI system and need a clear view of quality, risk, cost, latency, and the next priority.",
    items: [
      "AI Production Score across eight dimensions",
      "RAG, agent, security, data-flow, and reliability review",
      "Cost, latency, observability, and production-readiness review",
      "Written findings, priority order, and next-step recommendation",
    ],
  },
  {
    name: "Fix",
    tagline: "Diagnose and improve existing AI",
    desc: "For teams whose AI works in a demo but fails in real usage.",
    items: [
      "Reliability, retrieval, and accuracy audits",
      "Security, guardrails, prompt-injection, and tool review",
      "Agent trajectory, edge-case, and regression testing",
      "Cost, latency, and failure-root-cause remediation",
    ],
  },
  {
    name: "Scale",
    tagline: "Production infrastructure and MLOps",
    desc: "For teams taking a working AI system into serious production.",
    items: [
      "Docker, Kubernetes, CI/CD, cloud, or private deployment",
      "Model routing, semantic caching, and cost controls",
      "Logs, traces, metrics, alerts, and incident runbooks",
      "Documentation, training, handover, and ongoing engineering",
    ],
  },
];

export function Pricing() {
  return (
    <section id="services" className="border-b border-hairline pt-4 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-20">
          {serviceLines.map((service) => (
            <div key={service.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline pb-5">
                <h3 className="text-2xl font-bold tracking-tight">{service.name}</h3>
                <p className="eyebrow">{service.tagline}</p>
              </div>

              <div className="mt-8 grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] md:grid-cols-2">
                <div className="relative flex flex-col bg-surface-2 p-7">
                  <p className="eyebrow">Founding engagement</p>
                  <p className="mt-3 text-2xl font-extrabold tracking-tight">
                    Scope after discovery
                  </p>
                  <p className="mt-3 min-h-[2.5rem] text-sm text-muted-foreground">
                    {service.desc}
                  </p>
                  <BookingDialog>
                    <button className="btn-quiet mt-6 rounded-full border border-amber-accent/50 bg-amber-accent/10 px-5 py-2.5 text-center text-sm font-semibold">
                      Discuss this service
                    </button>
                  </BookingDialog>
                </div>
                <div className="flex flex-col bg-surface p-7">
                  <p className="eyebrow">Included capability areas</p>
                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-hairline pt-5">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[13px] text-foreground">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-amber-soft" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                    We are accepting up to 20 completed founding engagements in this service line.
                    Final scope and proposal follow a technical conversation.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
