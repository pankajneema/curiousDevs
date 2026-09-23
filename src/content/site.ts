/**
 * CuriousDevs — content model (website rebuild, September 2026).
 *
 * Every page reads its copy from here. All claims carry one of three tiers:
 * capability (sellable Monday), direction ("we are building", no deployments),
 * research (open questions only). No invented numbers, customers, logos,
 * deployments or performance claims. Sentence case throughout — no all-caps
 * labels, no arrows in link text, no middle-dot meta strings.
 */

export type Tier = "capability" | "direction" | "research";

export const tagline = "From research to real-world technology.";

export const hero = {
  title: tagline,
  body: "We engineer AI systems that hold up in production, and we are building the technology that connects that intelligence to the physical world.",
  primaryCta: { label: "Start a project", to: "/contact" },
  secondaryCta: { label: "See how we work", to: "/product" },
};

/* ── Section 2: What we do today (capability) ─────────────────────── */

export const capabilityIntro = {
  heading: "What we do today",
  sub: "Four ways to start.",
  note: "Current capability. The work that funds the research below.",
  cta: { label: "See how we work together", to: "/product" },
};

/* ── Section 3: How we work ───────────────────────────────────────── */

export const process = [
  { label: "Research", body: "Understand the problem and what has already been tried." },
  { label: "Prototype", body: "Build the smallest thing that tests the risky assumption." },
  { label: "Engineer", body: "Turn the prototype into a system that handles real inputs." },
  { label: "Evaluate", body: "Measure against a fixed test set. Numbers before opinions." },
  { label: "Operate", body: "Deploy, observe, and improve on evidence from production." },
];

export const processQuote =
  "Evaluation is not a phase. It is the thing that tells you whether any of the rest worked.";

/* ── Section 4: Four connected areas ──────────────────────────────── */

export type AreaId = "ai-engineering" | "intelligent-systems" | "robotics" | "deeptech";

export type Area = {
  id: AreaId;
  name: string;
  /** One sentence, then the scope — never joined with middle dots. */
  statement: string;
  scope: string;
};

/**
 * Order runs outward from software to machines. These are four parallel
 * areas, not a sequence — never number them.
 */
export const areas: Area[] = [
  {
    id: "ai-engineering",
    name: "AI Engineering",
    statement: "Intelligent software that survives production.",
    scope: "Retrieval, agents, evaluation, security, observability, infrastructure.",
  },
  {
    id: "intelligent-systems",
    name: "Intelligent Systems",
    statement: "Moving intelligence to where the decision happens.",
    scope: "Computer vision, edge AI, embedded intelligence, real-time inference.",
    // Edge AI ships here as a capability line only once the measured
    // artifact exists (research note 001). Until then, no claim.
  },
  {
    id: "robotics",
    name: "Robotics",
    statement: "Extending intelligence into machines that perceive and act.",
    scope: "Perception, planning, control, manipulation, autonomy.",
  },
  {
    id: "deeptech",
    name: "DeepTech",
    statement: "The deeper technologies that expand what intelligent systems can do.",
    scope: "AI hardware, accelerators, advanced sensors, new compute.",
  },
];

export const areasHeading = "Four connected areas. One continuum.";

/* ── Section 5: Where we are going (direction) ────────────────────── */

export const direction = {
  heading: "Where we are going",
  sub: "Intelligence, and the machine it operates through.",
  note: "Early-stage research. Funded by the production work above, published as it becomes real.",
  entries: [
    {
      name: "CuriousDevs Intelligence",
      to: "/technology/intelligence" as const,
      body: "Multimodal perception, grounded reasoning, uncertainty-aware planning, evaluated against fixed test sets. Built on open models.",
    },
    {
      name: "CuriousDevs Robotics",
      to: "/technology/robotics" as const,
      body: "Perception and planning are being built now. Actuation and the physical platform are research, with no timeline.",
    },
  ],
};

/* ── Section 6: Working in the open ───────────────────────────────── */

export const openNotes = {
  heading: "Working in the open",
  body: "Notes, experiments and results from what we are building. Published whether or not the result was the one we wanted.",
  /* No promise language. While no note is published, the section lists
     research areas instead. */
};

/* ── Section 7: The direction (principles) ────────────────────────── */

export const principles = [
  { title: "Measure honestly", body: "A number on a fixed test set, or it did not happen." },
  {
    title: "Build for reality",
    body: "The demo is not the product; the thing that runs on a bad day is.",
  },
  {
    title: "Publish the failures",
    body: "The negative result is the part nobody else shares.",
  },
];

/* ── Research ─────────────────────────────────────────────────────── */

export type ResearchArea = { name: string; question: string };

export const research = {
  title: "Research",
  body: "Research areas we are working in. Notes published as results arrive.",
  areas: [
    {
      name: "AI systems",
      question:
        "How do models, retrieval, tools and evaluation combine into systems that hold up in production?",
    },
    {
      name: "Agentic intelligence",
      question: "How should agents plan, use tools and act — safely and measurably?",
    },
    {
      name: "Multimodal AI",
      question: "How do systems reason across text, images, audio and structured data together?",
    },
    {
      name: "Computer vision",
      question: "How do camera and sensor streams become perception a system can rely on?",
    },
    {
      name: "Edge AI",
      question:
        "What does it take to run inference on-device, within real power and latency limits?",
    },
    {
      name: "Robotics",
      question: "How do perception, planning and control close the loop on a physical machine?",
    },
    {
      name: "Physical AI",
      question: "What changes when an intelligent system's actions have physical consequences?",
    },
    {
      name: "AI hardware",
      question: "Where do accelerators and specialized compute change what is possible?",
    },
    {
      name: "Foundation models",
      question:
        "What would it take to train a foundation model for physical AI in India, and what is the smallest useful version of that?",
    },
    {
      name: "Neurotechnology",
      question: "How might brain–computer interfaces reshape human–machine interaction?",
    },
  ] satisfies ResearchArea[],
};

/* ── Work ─────────────────────────────────────────────────────────── */

export const work = {
  title: "Work",
  intro:
    "Systems built before CuriousDevs, published with client details removed. New case studies as current work clears confidentiality.",
  rule: "No invented metrics. No placeholder logos.",
};

/* ── Company ──────────────────────────────────────────────────────── */

export const company = {
  title: "Company",
  body: "CuriousDevs exists to research and engineer technology that solves difficult real-world problems.",
  principles: [
    {
      title: "Research deeply",
      body: "Understand the problem and the science before choosing the solution.",
    },
    {
      title: "Engineer carefully",
      body: "Architecture, evaluation and security are designed in, not added later.",
    },
    {
      title: "Measure honestly",
      body: "Claims follow evidence. Decisions are made on what the system actually does.",
    },
    {
      title: "Build for reality",
      body: "Systems are judged by how they behave in the real world, not in the demo.",
    },
  ],
  base: "Gurugram, India",
  email: "hello@curiousdevs.com",
};

/* ── Contact ──────────────────────────────────────────────────────── */

export const contact = {
  title: "Start a project",
  body: "Tell us what you're trying to build, fix or explore.",
  email: "hello@curiousdevs.com",
  stages: [
    "Idea or exploring",
    "Prototype",
    "In development",
    "In production",
    "Have a system that needs review",
    "Research question",
  ],
};

/* ── Careers ──────────────────────────────────────────────────────── */

export const careers = {
  title: "Careers",
  body: "We show real openings only. When a role opens, it will be listed here with exactly what it is and how to apply.",
};
