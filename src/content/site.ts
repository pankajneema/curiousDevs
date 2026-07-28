import type { Product } from "@/components/landing/product-data";
export { products } from "@/components/landing/product-data";
export type { Product };

export const faqs = [
  {
    q: "In one sentence, what do you sell?",
    a: "A decision checkpoint for software and machines that act on their own — it approves, trims, escalates or refuses each action, and keeps a signed record of why.",
  },
  {
    q: "How is this different from the monitoring we already run?",
    a: "Monitoring describes the past. We sit between the intent and the execution, so the questionable action never happens rather than showing up in a chart afterwards.",
  },
  {
    q: "Isn't this just careful prompting?",
    a: "Prompts are requests to a model. Our rules are evaluated outside the model in ordinary code, so a clever input, a long context or a bad sampling run cannot argue its way past them.",
  },
  {
    q: "Why is the compliance product urgent?",
    a: "India's data-protection obligations become enforceable on a fixed date, with penalties large enough to matter to a board. Teams need continuous proof, not an annual report.",
  },
  {
    q: "Will we have to rewrite our agents?",
    a: "No. You point tool traffic at a lightweight gateway or drop in an SDK. Rules change without redeploying anything you built.",
  },
  {
    q: "What does it cost us in latency?",
    a: "The full pipeline — identity check, policy match, threat inspection — targets under 10ms per call, with recording happening asynchronously so it never blocks execution. There is no extra model call on the critical path.",
  },
  {
    q: "Can I self-host AgentGuard, or is it cloud-only?",
    a: "AgentGuard is open-core: the gateway, SDK and policy engine are open-source and free to self-host with no seat limits. The managed cloud — dashboard, alerting, MCP registry, compliance exports — is optional.",
  },
  {
    q: "Can we hand the output to an auditor?",
    a: "Yes. Every request, argument, verdict and response lands in an append-only ledger, exportable against the frameworks your auditor already uses.",
  },
  {
    q: "Where do physical machines fit in?",
    a: "The fleet layer reuses the same checkpoint and the same ledger, so drones and ground robots inherit the controls instead of getting a parallel, weaker system.",
  },
];


export const timeline = [
  {
    year: "2026",
    title: "AgentGuard goes public, core in the open",
    body: "Gateway, SDKs and the rule engine ship where engineers can read them. Trust in security software is earned by being inspectable.",
  },
  {
    year: "2026–27",
    title: "CurioComply opens with a free scan",
    body: "Anyone can see their exposure in two minutes. Teams that like the answer stay for the automation underneath it.",
  },
  {
    year: "2027",
    title: "The compliance cutover",
    body: "India's obligations become enforceable. We intend to be the boring, obvious choice by the time procurement starts calling.",
  },
  {
    year: "2027–28",
    title: "AeroOS leaves the lab",
    body: "Mission command for mixed fleets, standing on the checkpoint and evidence layers already in production.",
  },
  {
    year: "2030",
    title: "Where this is going",
    body: "When a board asks how they can trust machines acting without a human in the loop, we want the answer to be a product, not a policy memo.",
  },
];

export const doctrine = [
  "Security is the whole product, never a module bolted on later.",
  "Build from India, measure against the best anywhere.",
  "Open the core; developers adopt what they can read.",
  "Treat regulation as demand, not as drag.",
  "Every layer must make the next one easier to sell.",
];

export const pricing = [
  {
    slug: "agentguard",
    name: "AgentGuard",
    tagline: "Open-core. Self-host free, or let us run it.",
    tiers: [
      {
        name: "Open Source",
        price: "Free",
        unit: "forever",
        desc: "The full gateway, self-hosted. No seat limits.",
        items: [
          "SDK + self-hosted proxy",
          "Local policy engine",
          "Local audit logging",
          "Community support",
        ],
        cta: "View on GitHub",
        featured: false,
      },
      {
        name: "Pro",
        price: "$99–299",
        unit: "/mo",
        desc: "The managed brain for teams shipping agents.",
        items: [
          "Everything in Open Source",
          "Managed dashboard + alerts",
          "Runtime threat detection",
          "5–20 agents, session replay",
        ],
        cta: "Book a working session",
        featured: true,
      },
      {
        name: "Enterprise",
        price: "$20k–100k+",
        unit: "/yr",
        desc: "On-prem or VPC for regulated teams at scale.",
        items: [
          "SSO / SAML",
          "On-prem or VPC deployment",
          "MCP registry + custom policies",
          "Audit exports, SLA support",
        ],
        cta: "Talk to us",
        featured: false,
      },
    ],
  },
  {
    slug: "curiocomply",
    name: "CurioComply",
    tagline: "Start with a free scan. Scale into the deadline.",
    tiers: [
      {
        name: "Free Scanner",
        price: "₹0",
        unit: "",
        desc: "A two-minute DPDP exposure check.",
        items: ["Automated readiness scan", "Shareable exposure report", "No commitment"],
        cta: "Run a free scan",
        featured: false,
      },
      {
        name: "SMB",
        price: "₹15–30k",
        unit: "/mo",
        desc: "D2C brands, small SaaS, clinics, edtech.",
        items: [
          "Data discovery & mapping",
          "Consent in 22 languages",
          "Data-principal rights portal",
          "Breach filing workflow",
        ],
        cta: "Book a working session",
        featured: true,
      },
      {
        name: "Mid-market",
        price: "₹50k–1.5L",
        unit: "/mo",
        desc: "Fintech, healthtech, Series A–C startups.",
        items: [
          "Everything in SMB",
          "Breach command centre at scale",
          "Consent at scale",
          "Due-diligence-ready evidence",
        ],
        cta: "Talk to us",
        featured: false,
      },
      {
        name: "Enterprise",
        price: "₹25L+",
        unit: "/yr",
        desc: "Banks, insurers, Significant Data Fiduciaries.",
        items: [
          "Sectoral tri-filing engine",
          "On-prem options",
          "DPO workspace",
          "Audit defence",
        ],
        cta: "Talk to us",
        featured: false,
      },
    ],
  },
  {
    slug: "aeroos",
    name: "AeroOS",
    tagline: "Priced per active robot. Roadmap 2027+.",
    tiers: [
      {
        name: "Starter",
        price: "$150",
        unit: "/mo",
        desc: "Up to 3 robots.",
        items: ["Unified control tower", "Mission dispatcher", "Compliance geofencing"],
        cta: "Book a working session",
        featured: false,
      },
      {
        name: "Professional",
        price: "$750",
        unit: "/mo",
        desc: "Up to 15 robots.",
        items: ["Everything in Starter", "AeroHealth analytics", "Priority support"],
        cta: "Book a working session",
        featured: true,
      },
      {
        name: "Industrial Enterprise",
        price: "$10k–50k+",
        unit: "/yr",
        desc: "Unlimited fleet, on-prem.",
        items: [
          "Unlimited robots",
          "On-prem deployment",
          "AI anomaly detection",
          "Dedicated support",
        ],
        cta: "Talk to us",
        featured: false,
      },
    ],
  },
];

export const roles = [
  {
    title: "Compliance Lead",
    team: "Security",
    location: "Noida",
    body: "Ex-law-firm or Big-4. Own CurioComply's regulatory content and the DPDP readiness scanner's accuracy.",
  },
];


export const steps = [
  {
    n: "01",
    phase: "Pre-Production",
    title: "Map & Evaluate",
    body: "Data maps and adversarial evals run against a sandboxed reconstruction of your agents and pipelines.",
  },
  {
    n: "02",
    phase: "Pre-Production",
    title: "Build Baseline",
    body: "Behavioural baseline established. Risk and compliance scores generated from observed failure modes.",
  },
  {
    n: "03",
    phase: "Pre-Production",
    title: "Generate Policies",
    body: "Failure traces become deterministic policy signatures, reusable across every agent and fleet.",
  },
  {
    n: "04",
    phase: "Runtime",
    title: "Enforce & Monitor",
    body: "Every tool call, LLM call, user input and machine command passes through the enforcement layer in real time.",
  },
  {
    n: "05",
    phase: "The Loop",
    title: "Prove & Harden",
    body: "Evidence exports map to SOC 2, ISO 27001 and DPDP. Telemetry feeds back and enforcement tightens continuously.",
  },
];

