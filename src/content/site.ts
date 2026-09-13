/**
 * CuriousDevs Website V2 — content model.
 *
 * Every page reads its copy from here, so new technology areas, research
 * directions, systems or products can be added as data without another
 * redesign. No invented numbers, customers, logos, deployments or
 * performance claims.
 */

export const coreStory = ["Research", "Engineering", "Systems", "Products", "Real-World Impact"];

export const coreStoryLong = [
  { n: "01", title: "Research deeply", body: "Start from the question, not the tool." },
  { n: "02", title: "Engineer carefully", body: "Architecture, evaluation and security first." },
  { n: "03", title: "Build real systems", body: "Systems that hold up outside the demo." },
  {
    n: "04",
    title: "Reuse what repeats",
    body: "Turn repeated problems into reusable technology.",
  },
  { n: "05", title: "Develop products", body: "Package that technology into products." },
];

export const hero = {
  eyebrow: "Research × Engineering × Systems",
  title: "From Research to",
  accent: "Real-World Technology.",
  body: "We research, engineer, and build intelligent systems — from production AI and automation to the technologies that connect intelligence with the physical world.",
};

export type DomainId = "ai-engineering" | "intelligent-systems" | "robotics" | "deeptech";

export type Domain = {
  id: DomainId;
  n: string;
  name: string;
  statement: string;
  summary: string;
  caption: string;
  capabilities: string[];
  flows: SystemFlowId[];
};

export const domains: Domain[] = [
  {
    id: "ai-engineering",
    n: "01",
    name: "AI Engineering",
    statement: "Building intelligent software that works in production.",
    summary: "LLMs / RAG / Agents / Automation / Evaluation / Security / Infrastructure",
    caption: "From data to intelligence",
    capabilities: [
      "LLMs",
      "RAG",
      "AI Agents",
      "AI Applications",
      "Multimodal AI",
      "Automation",
      "Agentic Workflows",
      "Evaluation",
      "Security",
      "Reliability",
      "Observability",
      "Infrastructure",
      "Deployment",
    ],
    flows: ["ai-system", "agentic-automation"],
  },
  {
    id: "intelligent-systems",
    n: "02",
    name: "Intelligent Systems",
    statement: "Moving intelligence closer to where perception and decisions happen.",
    summary: "Computer Vision / Edge AI / Embedded / Sensors / Real-Time / Decisions",
    caption: "Intelligence everywhere",
    capabilities: [
      "Computer Vision",
      "Edge AI",
      "Embedded Intelligence",
      "Sensors",
      "Real-Time Intelligence",
      "Decision Systems",
      "On-Device AI",
    ],
    flows: ["edge-intelligence"],
  },
  {
    id: "robotics",
    n: "03",
    name: "Robotics",
    statement: "Extending intelligence into the physical world.",
    summary: "Perception / Planning / Control / Navigation / Manipulation / Autonomy",
    caption: "Intelligence in motion",
    capabilities: [
      "Robotic Systems",
      "Perception",
      "Planning",
      "Control",
      "Navigation",
      "Manipulation",
      "Autonomy",
      "Physical AI",
      "Machine Intelligence",
    ],
    flows: ["robotics"],
  },
  {
    id: "deeptech",
    n: "04",
    name: "DeepTech",
    statement: "Exploring deeper technologies that can expand what intelligent systems can do.",
    summary: "AI Hardware / Accelerators / Advanced Sensors / Neurotechnology / Compute",
    caption: "Technologies for what's next",
    capabilities: [
      "AI Hardware",
      "AI Accelerators",
      "Specialized Compute",
      "AI-Native Devices",
      "Advanced Sensors",
      "Intelligent Machines",
      "Neurotechnology / BCI",
      "Advanced Computing",
    ],
    flows: ["hardware"],
  },
];

export const technologyThesis =
  "These are connected areas within one intelligent-systems thesis, not four unrelated businesses.";

export type SystemFlowId =
  "ai-system" | "agentic-automation" | "edge-intelligence" | "robotics" | "hardware";

export type SystemFlow = {
  id: SystemFlowId;
  label: string;
  title: string;
  domain: DomainId;
  problem: string;
  steps: string[];
  layout: "snake" | "loop" | "radial" | "line" | "stack";
};

export const systemFlows: SystemFlow[] = [
  {
    id: "ai-system",
    label: "AI System",
    title: "Production AI Systems",
    domain: "ai-engineering",
    problem:
      "Turning a model into a system that retrieves, reasons, acts and holds up under real use.",
    steps: [
      "Data",
      "Model",
      "Retrieval / Tools",
      "Agent",
      "Evaluation",
      "Security",
      "Observability",
      "Production",
    ],
    layout: "snake",
  },
  {
    id: "agentic-automation",
    label: "Agentic Automation",
    title: "Agentic Workflow Systems",
    domain: "ai-engineering",
    problem:
      "Letting agents take real actions — with tools, permissions and evaluation inside the loop.",
    steps: ["Trigger", "Agent", "Tools", "Data", "Decision", "Action", "Evaluation"],
    layout: "loop",
  },
  {
    id: "edge-intelligence",
    label: "Edge Intelligence",
    title: "Computer Vision at the Edge",
    domain: "intelligent-systems",
    problem:
      "Running perception and decisions close to the sensor, where latency and connectivity matter.",
    steps: ["Sensors", "Perception", "Inference", "Decision", "Action"],
    layout: "radial",
  },
  {
    id: "robotics",
    label: "Robotics",
    title: "Robotic Perception & Control",
    domain: "robotics",
    problem: "Closing the loop between seeing, planning and moving in the physical world.",
    steps: ["Perception", "Planning", "Control", "Movement"],
    layout: "line",
  },
  {
    id: "hardware",
    label: "Hardware",
    title: "AI Hardware",
    domain: "deeptech",
    problem: "Understanding the compute that intelligent systems ultimately run on.",
    steps: ["Input", "Compute", "Acceleration", "Output"],
    layout: "stack",
  },
];

export const engineeringMethod = [
  "Problem",
  "Context",
  "System",
  "Architecture",
  "Engineering",
  "Evaluation",
  "Outcome",
  "Technology",
];

export const researchProcess = [
  { n: "01", label: "Research", body: "Explore possibilities and ask the right questions." },
  { n: "02", label: "Prototype", body: "Build quickly to find out what is real." },
  { n: "03", label: "Engineer", body: "Turn validated ideas into reliable systems." },
  { n: "04", label: "Validate", body: "Measure honestly against real conditions." },
  { n: "05", label: "Product", body: "Turn repeated problems into reusable technology." },
];

export type ResearchArea = {
  name: string;
  question: string;
};

export const research = {
  eyebrow: "Research",
  title: "Researching What",
  accent: "Comes Next.",
  body: "We explore AI systems, agentic intelligence, multimodal AI, computer vision, edge AI, robotics, physical AI, AI hardware, advanced compute and neurotechnology. We publish papers, experiments, prototypes or notes only when they exist.",
  areas: [
    {
      name: "AI Systems",
      question:
        "How do models, retrieval, tools and evaluation combine into systems that hold up in production?",
    },
    {
      name: "Agentic Intelligence",
      question: "How should agents plan, use tools and act — safely and measurably?",
    },
    {
      name: "Multimodal AI",
      question: "How do systems reason across text, images, audio and structured data together?",
    },
    {
      name: "Computer Vision",
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
      name: "AI Hardware",
      question: "Where do accelerators and specialized compute change what is possible?",
    },
    {
      name: "Advanced Compute",
      question: "Which computing approaches expand what intelligent systems can do?",
    },
    {
      name: "Neurotechnology",
      question: "How might brain–computer interfaces reshape human–machine interaction?",
    },
  ] satisfies ResearchArea[],
};

export const janus = {
  name: "Janus",
  tagline: "Intelligent Systems Platform",
  positioning:
    "Janus is CuriousDevs' proprietary technology direction for building, evaluating, deploying and operating intelligent systems. Its first practical form focuses on production AI systems; the architecture can expand toward edge and physical systems as the technology matures.",
  principle:
    "An engineer should understand what an intelligent system uses, how it reasons, what it can do, how it performs, where it fails and what is happening in production — in one place.",
  verbs: ["Build", "Evaluate", "Deploy", "Operate"],
  modules: [
    {
      key: "models",
      name: "Model integration",
      body: "Connect and route across the models a system depends on.",
    },
    {
      key: "knowledge",
      name: "Knowledge / RAG",
      body: "Documents, retrieval and grounding as first-class parts of the system.",
    },
    {
      key: "agents",
      name: "Agents / tools / memory",
      body: "What an agent can call, what it remembers and what it is allowed to do.",
    },
    {
      key: "workflows",
      name: "Workflow orchestration",
      body: "Multi-step automation with explicit triggers, decisions and actions.",
    },
    {
      key: "evaluation",
      name: "Evaluation & regression",
      body: "Test sets and regression checks before a change reaches production.",
    },
    {
      key: "security",
      name: "Security / permissions",
      body: "Guardrails, permissions and policy boundaries in the request path.",
    },
    {
      key: "observability",
      name: "Observability",
      body: "Traces, latency and cost for every step of every run.",
    },
    {
      key: "deploy",
      name: "Production deployment",
      body: "Promote a system from build to production with confidence.",
    },
  ],
  architectureInputs: [
    "Models",
    "Knowledge",
    "Agents",
    "Tools",
    "Workflows",
    "Evaluation",
    "Security",
    "Observability",
  ],
  workspace: [
    "Systems",
    "Models",
    "Knowledge",
    "Agents",
    "Workflows",
    "Evaluation",
    "Security",
    "Deploy",
  ],
  graph: ["Documents", "RAG", "Agent", "Tools", "Action"],
  inspector: [
    ["Model", "—"],
    ["Tools", "—"],
    ["Evaluation", "—"],
    ["Latency", "—"],
    ["Cost", "—"],
    ["Security", "Active"],
  ] as [string, string][],
  extension: [
    "Janus",
    "Edge runtime",
    "Vision / Sensors",
    "Physical systems",
    "Robotics",
    "Machines",
  ],
};

export const company = {
  eyebrow: "Company",
  title: "Curiosity Drives",
  accent: "What We Build.",
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

export const vision = {
  eyebrow: "Vision",
  title: "Intelligence",
  accent: "Beyond the Screen.",
  body: "We are building toward a future where intelligent systems do more than generate information — they perceive, decide, interact and operate in the real world.",
  evolution: ["AI", "Systems", "Machines", "Deeper technology"],
};

export const finalCta = {
  eyebrow: "Let's build together",
  title: "Have a difficult",
  accent: "problem?",
  body: "Whether you are building an AI system, exploring a new product, or researching what comes next — let's build something real.",
};

export const contact = {
  title: "Have a difficult",
  accent: "problem?",
  body: "Tell us what you're trying to build, fix or explore.",
  email: "hello@curiousdevs.com",
  stages: ["Idea / exploring", "Prototype", "In development", "In production", "Research question"],
  areas: ["AI Engineering", "Intelligent Systems", "DeepTech", "Robotics", "Not sure yet"],
  timelines: ["As soon as possible", "Within 1–3 months", "3–6 months", "Just exploring"],
};

export const careers = {
  title: "Build difficult",
  accent: "technology.",
  body: "We show real openings only. When a role opens, it will be listed here with exactly what it is and how to apply.",
};
