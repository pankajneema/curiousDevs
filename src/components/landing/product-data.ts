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
    slug: "agentguard",
    name: "AgentGuard",
    category: "Runtime control for AI agents",
    role: "The foundation",
    line: "A checkpoint in front of every action your agents try to take.",
    summary:
      "AgentGuard stands on the execution path. Before a tool runs, the request is attributed to a specific agent, matched against rules you can read, and returned as one of four outcomes — run it, trim it, ask a human, or stop it. The model never gets a vote.",
    points: [
      "A distinct identity and permission budget for each agent",
      "Plain, versioned rules instead of instructions buried in prompts",
      "Injection and goal-drift detection on every call, before it executes",
      "Approval queues for high-value actions, with timeouts that fail closed",
      "Signed record of every request and the reason behind its verdict",
      "Verification of the tools and connectors agents are allowed to reach",
      "Open-core: self-host free, no seat limits — managed cloud is optional",
    ],
    metrics: [
      { label: "Verdict time", value: "under 10 ms" },
      { label: "Sits at", value: "the tool call" },
      { label: "Record", value: "append-only" },
    ],
    horizon: "Shipping from 2026",
    panel: [
      { label: "Actions reviewed today", value: "184,402" },
      { label: "Stopped before execution", value: "312", tone: "bad" },
      { label: "Sent for human approval", value: "27", tone: "warn" },
      { label: "Rules in force", value: "1,148", tone: "ok" },
    ],
    activity: [
      { label: "support-agent", tag: "ALLOW", tone: "ok", detail: 'read_db("orders") · 4ms' },
      { label: "kyc-agent", tag: "DENY", tone: "bad", detail: 'exec_shell("rm -rf") · 6ms' },
      {
        label: "ops-agent",
        tag: "ESCALATE",
        tone: "warn",
        detail: "tool.refund · pending approval",
      },
      {
        label: "rag-pipeline",
        tag: "DENY",
        tone: "bad",
        detail: "mcp_call(unverified_tool) · 5ms",
      },
    ],
  },
  {
    n: "02",
    slug: "curiocomply",
    name: "CurioComply",
    category: "Data-protection autopilot",
    role: "The engine",
    line: "Turns everyday operations into evidence a regulator will accept.",
    summary:
      "CurioComply finds where personal data actually lives, follows it as it moves between systems, and keeps a running file of proof — consent trails, deletion requests, breach clocks — so compliance stops being a quarterly scramble by people with spreadsheets.",
    points: [
      "Discovery across the SaaS, databases and buckets Indian teams really use",
      "Detection tuned for national identifiers and Indic-script content",
      "Consent capture, subject requests and breach timers handled end to end",
      "A two-minute opening scan that shows exposure before any contract",
      "Evidence gathered continuously and filed against each obligation",
    ],
    metrics: [
      { label: "First result", value: "2 minutes" },
      { label: "Reach", value: "apps, DBs, storage" },
      { label: "Leaves you with", value: "a defensible file" },
    ],
    horizon: "Building through 2026–27",
    panel: [
      { label: "Systems mapped", value: "62" },
      { label: "Sensitive stores found", value: "9", tone: "warn" },
      { label: "Requests closed in SLA", value: "100%", tone: "ok" },
      { label: "Open gaps", value: "3", tone: "bad" },
    ],
    activity: [
      { label: "checkout-service", tag: "MAPPED", tone: "ok", detail: "4 PII fields identified" },
      { label: "support-crm", tag: "FLAGGED", tone: "warn", detail: "unencrypted export path" },
      {
        label: "dsr-request-2291",
        tag: "CLOSED",
        tone: "ok",
        detail: "erasure fulfilled within SLA",
      },
      { label: "vendor-export-job", tag: "OPEN", tone: "bad", detail: "review required" },
    ],
  },
  {
    n: "03",
    slug: "aeroos",
    name: "AeroOS",
    category: "Command layer for machine fleets",
    role: "The long game",
    line: "The same accountability, extended to machines that move.",
    summary:
      "Once decisions are governed in software, the harder frontier is hardware. AeroOS carries the identical checkpoint model into drones and ground robots — missions authorised before launch, boundaries enforced in flight, and the whole run reconstructable afterwards.",
    points: [
      "One control surface across mixed air and ground hardware",
      "Missions checked against airspace and operating restrictions first",
      "Reuses the agent checkpoint and the evidence trail underneath",
      "Live boundaries that hold even when the link degrades",
      "Frame-by-frame replay for incident review and insurance",
    ],
    metrics: [
      { label: "Fleets", value: "air + ground" },
      { label: "Governed at", value: "mission level" },
      { label: "Built on", value: "the layers below" },
    ],
    horizon: "On the board for 2027+",
    panel: [
      { label: "Craft under command", value: "48" },
      { label: "Missions cleared", value: "1,204", tone: "ok" },
      { label: "Held for airspace", value: "16", tone: "warn" },
      { label: "Boundary breaches", value: "0", tone: "ok" },
    ],
    activity: [
      { label: "craft-014", tag: "CLEARED", tone: "ok", detail: "mission: perimeter sweep" },
      { label: "craft-027", tag: "HELD", tone: "warn", detail: "airspace restriction active" },
      { label: "craft-002", tag: "CLEARED", tone: "ok", detail: "mission: pipeline scan" },
      { label: "craft-031", tag: "CLEARED", tone: "ok", detail: "mission: return-to-base" },
    ],
  },
];
