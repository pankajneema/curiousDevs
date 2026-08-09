export type Verdict = "HUMAN ONLY" | "AI ASSISTS" | "AI DRAFTS" | "AI ACTS";

export type Solution = {
  slug: string;
  name: string;
  icon: string;
  tag: string;
  headline: string;
  accent: string;
  body: string;
  compliance: string[];
  scenarios: { n: string; title: string; risk: string; verdict: Verdict; response: string }[];
};

const verdictTone: Record<Verdict, string> = {
  "AI ACTS": "border-hairline bg-surface-2 text-muted-foreground",
  "AI DRAFTS": "border-amber-soft/40 bg-amber-soft/10 text-foreground",
  "AI ASSISTS": "border-amber-accent/40 bg-amber-accent/10 text-foreground",
  "HUMAN ONLY": "border-danger/40 bg-danger/10 text-foreground",
};

export function verdictClass(v: Verdict) {
  return verdictTone[v];
}

export const solutions: Solution[] = [
  {
    slug: "fintech",
    name: "Fintech & Banking",
    icon: "landmark",
    tag: "Fintech & Banking",
    headline: "Help customers faster",
    accent: "without losing control.",
    body: "AI can answer customer questions, review documents, detect unusual activity, and support lending or payment teams. We help make those workflows accurate, secure, and ready for real customers.",
    compliance: ["Customer data", "Payment controls", "DPDP", "Audit evidence"],
    scenarios: [
      {
        n: "01",
        title: "Customer support copilot",
        risk: "A customer asks about a payment, refund, or account issue and needs a clear answer from the right records.",
        verdict: "AI ACTS",
        response:
          "We connect the copilot to approved information, keep sensitive fields protected, and test its answers.",
      },
      {
        n: "02",
        title: "Fraud and risk review",
        risk: "A team receives more alerts than people can review and needs help finding the cases that matter first.",
        verdict: "AI ASSISTS",
        response:
          "AI can sort and explain cases, while high-risk decisions stay with the right human reviewer.",
      },
      {
        n: "03",
        title: "Lending and document checks",
        risk: "Documents and applications take too long to review, but an incorrect decision can be costly.",
        verdict: "AI DRAFTS",
        response:
          "We extract information, show the supporting evidence, and keep exceptions visible for human review.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: "heart-pulse",
    tag: "Healthcare & Life Sciences",
    headline: "Support better care",
    accent: "with safer AI workflows.",
    body: "AI can help staff find information, summarize notes, support patients, and reduce repetitive work. We design the system around privacy, human review, and the care relationship.",
    compliance: ["Patient data", "Human review", "DPDP", "Data agreements"],
    scenarios: [
      {
        n: "01",
        title: "Patient support assistant",
        risk: "Patients want quick answers about appointments, preparation, or next steps without waiting for a busy team.",
        verdict: "AI ACTS",
        response:
          "We use approved information and clear boundaries so the assistant helps without pretending to replace clinical care.",
      },
      {
        n: "02",
        title: "Clinical note summarization",
        risk: "Clinicians spend time reading long notes and need the important details in a shorter format.",
        verdict: "AI DRAFTS",
        response:
          "AI creates a draft with links back to the source, while a clinician remains responsible for the final record.",
      },
      {
        n: "03",
        title: "Sensitive record access",
        risk: "The wrong person or workflow could expose another patient's information.",
        verdict: "HUMAN ONLY",
        response:
          "We test identity, access, retrieval boundaries, and failure cases before the system is used with real data.",
      },
    ],
  },
  {
    slug: "enterprise-saas",
    name: "Enterprise SaaS & IT",
    icon: "blocks",
    tag: "Enterprise SaaS & IT",
    headline: "Turn AI features into",
    accent: "reliable product experiences.",
    body: "AI can help users search, write, analyze, configure, and automate work inside your product. We help SaaS teams move from an impressive demo to a feature customers can trust.",
    compliance: ["Product security", "Access control", "SOC 2 controls", "Customer DPAs"],
    scenarios: [
      {
        n: "01",
        title: "Product copilot",
        risk: "Users want answers about their own workspace, projects, tickets, or reports.",
        verdict: "AI ACTS",
        response:
          "We connect the copilot to the right workspace data and test that one customer cannot see another customer's information.",
      },
      {
        n: "02",
        title: "AI workflow automation",
        risk: "An agent can create tickets, update records, or call tools, but a wrong action can affect real operations.",
        verdict: "AI ASSISTS",
        response: "We define which actions are safe to automate and which actions need approval.",
      },
      {
        n: "03",
        title: "Feature quality after release",
        risk: "A prompt, model, or data change improves one answer and quietly breaks another.",
        verdict: "AI DRAFTS",
        response:
          "We create test cases and regression checks so the team can improve the feature without guessing.",
      },
    ],
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    icon: "shopping-bag",
    tag: "Retail & E-commerce",
    headline: "Make every customer interaction",
    accent: "more useful.",
    body: "AI can recommend products, answer order questions, help support teams, and improve catalog or merchandising work. We keep the experience helpful without making promises the system cannot support.",
    compliance: ["Customer data", "Order systems", "Payments", "Vendor access"],
    scenarios: [
      {
        n: "01",
        title: "Shopping assistant",
        risk: "Customers want product advice based on their needs, budget, and available stock.",
        verdict: "AI ACTS",
        response:
          "We ground recommendations in current catalog and inventory information and make the reasoning easy to check.",
      },
      {
        n: "02",
        title: "Order and returns support",
        risk: "Customers need accurate updates, but support teams cannot answer every request manually.",
        verdict: "AI DRAFTS",
        response:
          "The assistant can handle routine questions and route unusual cases to a person with the right context.",
      },
      {
        n: "03",
        title: "Promotion or refund automation",
        risk: "An automated decision can create revenue loss or a poor customer experience if the rules are unclear.",
        verdict: "AI ASSISTS",
        response:
          "We define safe limits, approval points, and tests before connecting AI to money-moving workflows.",
      },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    icon: "truck",
    tag: "Logistics & Supply Chain",
    headline: "Coordinate operations",
    accent: "with better information.",
    body: "AI can help teams read documents, answer shipment questions, spot delays, and coordinate suppliers. We connect the workflow to trusted data and keep exceptions visible.",
    compliance: ["Shipment data", "Supplier access", "Operations", "Exception handling"],
    scenarios: [
      {
        n: "01",
        title: "Shipment information assistant",
        risk: "Operations teams need one answer from many systems, documents, and carrier updates.",
        verdict: "AI ACTS",
        response:
          "We build a grounded assistant that shows where the answer came from and flags missing information.",
      },
      {
        n: "02",
        title: "Delay and exception handling",
        risk: "A late shipment needs a fast response, but the right action depends on customer, route, inventory, and supplier context.",
        verdict: "AI ASSISTS",
        response:
          "AI can summarize the situation and suggest next steps while teams keep control of important decisions.",
      },
      {
        n: "03",
        title: "Supplier document processing",
        risk: "Manual document work slows procurement and creates avoidable data-entry mistakes.",
        verdict: "AI DRAFTS",
        response:
          "We extract and validate information, then send uncertain fields to a human instead of silently guessing.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education & EdTech",
    icon: "graduation-cap",
    tag: "Education & EdTech",
    headline: "Give learners and teams",
    accent: "better support at scale.",
    body: "AI can support students, teachers, admissions, content teams, and operations. We help make answers useful, age-appropriate, grounded, and easy for staff to review.",
    compliance: ["Student data", "Content quality", "Access control", "Human review"],
    scenarios: [
      {
        n: "01",
        title: "Course and student assistant",
        risk: "Learners want quick explanations and guidance from approved course material.",
        verdict: "AI ACTS",
        response:
          "We ground answers in the institution's content and make it clear when the system is unsure.",
      },
      {
        n: "02",
        title: "Admissions and support workflow",
        risk: "Repeated questions consume staff time and applicants need consistent information.",
        verdict: "AI DRAFTS",
        response:
          "AI handles routine questions and sends complex or sensitive cases to the right staff member.",
      },
      {
        n: "03",
        title: "Assessment support",
        risk: "A system may produce an answer that looks confident but is not appropriate for a student's level or context.",
        verdict: "AI ASSISTS",
        response:
          "We test quality, set review points, and keep educators responsible for high-impact decisions.",
      },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Operations",
    icon: "factory",
    tag: "Manufacturing & Operations",
    headline: "Bring intelligence to",
    accent: "the work already happening.",
    body: "AI can help teams search manuals, support maintenance, summarize incidents, and improve planning. We connect it to operational data without hiding uncertainty.",
    compliance: ["Operational data", "Safety review", "Supplier systems", "Access control"],
    scenarios: [
      {
        n: "01",
        title: "Maintenance knowledge assistant",
        risk: "Technicians need the right manual, history, or troubleshooting step while work is in progress.",
        verdict: "AI ACTS",
        response:
          "We build a searchable assistant grounded in approved manuals, equipment history, and current procedures.",
      },
      {
        n: "02",
        title: "Incident and quality analysis",
        risk: "Teams spend hours reading reports and may miss a pattern across sites or production lines.",
        verdict: "AI DRAFTS",
        response:
          "AI summarizes incidents and highlights possible patterns for an engineer to verify.",
      },
      {
        n: "03",
        title: "Safety-sensitive action",
        risk: "An automated recommendation could affect people, equipment, or production if context is missing.",
        verdict: "HUMAN ONLY",
        response: "We keep safety-sensitive actions behind explicit checks and human approval.",
      },
    ],
  },
  {
    slug: "government",
    name: "Government & Public Sector",
    icon: "building-2",
    tag: "Government & Public Sector",
    headline: "Build citizen-facing AI",
    accent: "with evidence and control.",
    body: "AI can help citizens find information, help staff process applications, and make public services easier to use. We focus on clear answers, privacy, accessibility, and accountable operations.",
    compliance: ["Citizen data", "DPDP", "CERT-In guidance", "Public accountability"],
    scenarios: [
      {
        n: "01",
        title: "Citizen information assistant",
        risk: "People need a simple answer about a scheme, document, or service without searching many government pages.",
        verdict: "AI ACTS",
        response:
          "We ground answers in approved public information and show the source so people can verify it.",
      },
      {
        n: "02",
        title: "Application processing",
        risk: "Staff spend time checking forms and documents while applicants wait for an update.",
        verdict: "AI DRAFTS",
        response:
          "AI can extract and organize information, while uncertain or sensitive cases remain with officers.",
      },
      {
        n: "03",
        title: "Sensitive public decision",
        risk: "An automated output could affect a person's access to an important service.",
        verdict: "HUMAN ONLY",
        response:
          "We keep high-impact decisions accountable to the responsible human team and document the process.",
      },
    ],
  },
];
