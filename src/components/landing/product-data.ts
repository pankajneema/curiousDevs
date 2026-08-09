export type Product = {
  n: string;
  slug: string;
  name: string;
  category: string;
  role: string;
  line: string;
  summary: string;
  points: string[];
  metrics: { label: string; value: string }[];
  horizon: string;
  panel: { label: string; value: string; tone?: "ok" | "warn" | "bad" }[];
  activity: { label: string; tag: string; tone: "ok" | "warn" | "bad"; detail: string }[];
};

export const products: Product[] = [
  {
    n: "01",
    slug: "build",
    name: "Build",
    category: "AI-native development",
    role: "Start here",
    line: "Build practical AI systems.",
    summary:
      "We design and engineer AI-native products, RAG applications, knowledge copilots, agents, multi-agent workflows, and AI-powered product features. The work includes architecture, backend systems, evaluation, security, deployment, and documentation from the beginning.",
    points: [
      "RAG applications, enterprise search, and knowledge copilots",
      "AI agents, workflow automation, tools, APIs, memory, and state",
      "Planner, executor, reviewer, and multi-agent orchestration",
      "AI-native product experiences and embedded intelligence",
      "Backend services, integrations, data pipelines, and application logic",
      "Evaluation baselines, security controls, deployment, and handover",
    ],
    metrics: [
      { label: "Entry", value: "AI idea or workflow" },
      { label: "Output", value: "Working capability" },
      { label: "Proof", value: "Baseline + evals" },
    ],
    horizon: "Founding engagements open",
    panel: [
      { label: "Workflow mapped", value: "01", tone: "ok" },
      { label: "Architecture defined", value: "YES", tone: "ok" },
      { label: "Evaluation set", value: "READY", tone: "warn" },
      { label: "Scope status", value: "SCOPED", tone: "ok" },
    ],
    activity: [
      {
        label: "knowledge-copilot",
        tag: "DESIGN",
        tone: "ok",
        detail: "retrieval + citation flow",
      },
      { label: "workflow-agent", tag: "BUILD", tone: "warn", detail: "tool permissions mapped" },
      { label: "multi-agent", tag: "EVAL", tone: "ok", detail: "trajectory test set ready" },
      { label: "ai-feature", tag: "SCOPE", tone: "ok", detail: "acceptance criteria drafted" },
    ],
  },
  {
    n: "02",
    slug: "audit",
    name: "AI Audit / Assessment",
    category: "AI production assessment",
    role: "See clearly",
    line: "Find the problem before fixing it.",
    summary:
      "We review an existing AI system across accuracy, retrieval, grounding, agent reliability, security, cost, latency, and observability. You receive a clear scorecard, failure map, and prioritized plan for what to do next.",
    points: [
      "AI Production Score across eight practical dimensions",
      "RAG retrieval, grounding, and answer-quality review",
      "Agent workflow, tool-use, edge-case, and regression review",
      "Prompt-injection, data leakage, access, and guardrails review",
      "Latency, model usage, token cost, and infrastructure review",
      "Written findings, priority order, and a decision-ready next step",
    ],
    metrics: [
      { label: "Entry", value: "Existing AI system" },
      { label: "Output", value: "Score + report" },
      { label: "Proof", value: "Failure evidence" },
    ],
    horizon: "Founding assessments open",
    panel: [
      { label: "Dimensions", value: "08", tone: "ok" },
      { label: "Test set", value: "REVIEWED", tone: "warn" },
      { label: "Risks", value: "RANKED", tone: "bad" },
      { label: "Next step", value: "CLEAR", tone: "ok" },
    ],
    activity: [
      {
        label: "production-score",
        tag: "MEASURE",
        tone: "ok",
        detail: "eight dimensions reviewed",
      },
      { label: "rag-review", tag: "FINDING", tone: "warn", detail: "grounding gap identified" },
      { label: "security-check", tag: "FLAG", tone: "bad", detail: "permission risk documented" },
      { label: "next-step", tag: "PRIORITIZE", tone: "ok", detail: "remediation path prepared" },
    ],
  },
  {
    n: "03",
    slug: "fix",
    name: "Fix",
    category: "AI reliability engineering",
    role: "After assessment",
    line: "Improve existing AI systems.",
    summary:
      "We audit and diagnose existing AI systems across accuracy, retrieval, grounding, agent reliability, security, cost, latency, and observability. Every engagement starts with a baseline and ends with a prioritized remediation plan and comparable evidence.",
    points: [
      "RAG reliability, retrieval precision and recall, and hallucination analysis",
      "AI security, prompt-injection, system-prompt leak, and guardrails audits",
      "Agent trajectory testing, edge cases, regression suites, and QA",
      "Root-cause diagnosis for accuracy, latency, cost, and workflow failures",
      "MCP, tool-permission, data-flow, and integration review",
      "Engineering fixes with before-and-after evidence",
    ],
    metrics: [
      { label: "Entry", value: "Failure or risk" },
      { label: "Output", value: "Failure map" },
      { label: "Proof", value: "Before / after" },
    ],
    horizon: "Founding engagements open",
    panel: [
      { label: "System assessed", value: "01", tone: "ok" },
      { label: "Failure modes", value: "MAPPED", tone: "bad" },
      { label: "Priority fixes", value: "RANKED", tone: "warn" },
      { label: "Retest plan", value: "READY", tone: "ok" },
    ],
    activity: [
      { label: "rag-eval", tag: "DIAGNOSE", tone: "warn", detail: "retrieval gap identified" },
      { label: "agent-test", tag: "BLOCK", tone: "bad", detail: "unsafe tool trajectory" },
      { label: "latency-trace", tag: "MEASURE", tone: "ok", detail: "critical path isolated" },
      {
        label: "security-review",
        tag: "REMEDIATE",
        tone: "ok",
        detail: "guardrail change proposed",
      },
    ],
  },
  {
    n: "04",
    slug: "scale",
    name: "Scale",
    category: "Production AI infrastructure",
    role: "Ready for production",
    line: "Run AI reliably in production.",
    summary:
      "We productionize AI systems with backend engineering, Docker and Kubernetes, CI/CD, model routing, semantic caching, observability, cloud or private deployment, runbooks, and knowledge transfer. The goal is a system your team can operate after handover.",
    points: [
      "Production AI infrastructure, cloud deployment, and private or VPC environments",
      "Docker, Kubernetes, CI/CD, release controls, and model serving",
      "Logs, traces, metrics, alerts, incident runbooks, and observability",
      "Model routing, semantic caching, token attribution, and cost controls",
      "Security hardening, resilience, fallback behavior, and access governance",
      "Deployment, documentation, training, QA, and ongoing engineering",
    ],
    metrics: [
      { label: "Entry", value: "Working system" },
      { label: "Output", value: "Production handover" },
      { label: "Proof", value: "Operational metrics" },
    ],
    horizon: "Founding engagements open",
    panel: [
      { label: "Environment", value: "MAPPED", tone: "ok" },
      { label: "Release path", value: "DEFINED", tone: "ok" },
      { label: "Observability", value: "PLANNED", tone: "warn" },
      { label: "Handover", value: "DOCUMENTED", tone: "ok" },
    ],
    activity: [
      { label: "deployment", tag: "HARDEN", tone: "ok", detail: "private environment configured" },
      { label: "model-router", tag: "OPTIMIZE", tone: "warn", detail: "cost policy under review" },
      { label: "observability", tag: "CONNECT", tone: "ok", detail: "traces and alerts mapped" },
      { label: "runbook", tag: "HANDOVER", tone: "ok", detail: "operator guide in review" },
    ],
  },
];
