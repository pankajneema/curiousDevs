/**
 * Copy for the studio site: Home, Services, Industries, Research and the
 * Physical AI Lab. Ported from the "CuriousDevs Website" design canvas.
 *
 * Illustrations live in public/illustrations as `<name>.svg` (dark) and
 * `<name>-light.svg` (light); pages refer to them by `<name>` only.
 */

export const STUDIO = {
  location: "Delhi NCR, India",
  blurb:
    "An AI engineering studio and research lab. We help organisations decide where AI creates value, engineer it into their products and operations, and run it reliably.",
  github: "https://github.com/CuriousDevs-AI",
};

export type Term = { term: string; description: string };
export type Meta = { term: string; value: string };

/* ---------------------------------- Home ----------------------------------- */

export const HOME = {
  eyebrow: "CuriousDevs · AI engineering studio and research lab",
  lede: "We help organisations decide where AI creates value, engineer it into their products and operations, and run it reliably — hosted in India or inside their own environment. Strategy, engineering and operations, delivered by one accountable team.",
  principles: [
    {
      t: "Accountable team",
      d: "The engineers in your first conversation are the engineers who build the system.",
    },
    {
      t: "You own the work",
      d: "Source code, model weights, prompts, documentation and deployment logs belong to you.",
    },
    {
      t: "Weekly demonstrations",
      d: "Working software every week, not status reports. Redirect the work at any point.",
    },
    {
      t: "Confidential by default",
      d: "An NDA before any confidential detail is shared. Your data is used for your project only.",
    },
    { t: "Private deployment", d: "Hosted in India, or entirely within your own network." },
  ],
  work: [
    {
      id: "tokenfin",
      track: "Production",
      name: "TokenFin",
      status: "In development",
      tone: "signal" as const,
      summary:
        "Cost attribution and control for organisations running large language models in production.",
      body: "Model providers send one consolidated bill. TokenFin attributes every model call to the team, feature or customer that made it, so AI spend can be budgeted, explained and reduced with the same discipline as cloud infrastructure.",
      listLabel: "Capabilities",
      points: [
        "Per-call attribution to team, feature and customer",
        "Budgets and alerts on spend as it happens",
        "Usage analysis to guide model choice and caching",
        "Integration with existing applications, with an MCP interface for AI tooling",
      ],
      stack: "Go · FastAPI · Next.js · MCP",
      link: { label: "Register interest", to: "/contact" as const },
    },
    {
      id: "ojas",
      track: "Research",
      name: "OJAS",
      status: "Early engineering",
      tone: "muted" as const,
      summary:
        "A general-purpose execution runtime for Physical AI — the layer between a model and a machine.",
      body: "Models can describe a scene, but nothing in their output decides whether an action is permitted, safe or possible. OJAS explores how to turn model output into controlled action on real hardware, independent of any one robot or vendor.",
      listLabel: "Research direction",
      points: [
        "Canonical interfaces between models, sensors and actuators",
        "Adapters to ROS 2, simulation and other robotics backends",
        "A deterministic policy check before every action",
        "A path from runtime to data platform to an OJAS model",
      ],
      stack: "ROS 2 · edge compute · simulation",
      link: { label: "Visit the Physical AI Lab", to: "/lab" as const },
    },
  ],
  steps: [
    {
      n: "01",
      title: "Discover",
      body: "Working sessions on your processes, data and constraints. We agree the baseline the work will be measured against.",
      out: "Prioritised use cases and a written proposal",
    },
    {
      n: "02",
      title: "Prototype",
      body: "A working system on your real data, early enough to change direction before anything expensive is built around it.",
      out: "A prototype your team can use",
    },
    {
      n: "03",
      title: "Pilot",
      body: "Live with real users or real traffic, measured against the agreed baseline. We report what we find, favourable or not.",
      out: "A pilot report with measured results",
    },
    {
      n: "04",
      title: "Operate",
      body: "Full roll-out, monitoring and continuous improvement. If the pilot does not beat the baseline, we recommend stopping.",
      out: "A system with an accountable owner",
    },
  ],
  models: [
    {
      tag: "Fixed scope",
      name: "Project",
      body: "A defined outcome, a fixed price and written acceptance criteria. Suited to assessments, pilots and single systems.",
      items: [
        "Written scope and acceptance criteria",
        "Weekly demonstrations",
        "Complete hand-over of code and documentation",
      ],
    },
    {
      tag: "Monthly",
      name: "Dedicated engineers",
      body: "AI, backend and product engineers embedded in your team, working in your repositories and to your roadmap.",
      items: [
        "Your tools, rituals and release cycle",
        "The same engineers from scoping to support",
        "Capacity adjusted monthly",
      ],
    },
    {
      tag: "Retainer",
      name: "Managed AI",
      body: "We host, monitor and improve the systems we build, with a named engineer and a monthly report.",
      items: [
        "Hosting, monitoring and on-call",
        "Monthly evaluation and tuning",
        "Model usage reported separately each month",
      ],
    },
  ],
  company: [
    {
      term: "Based in",
      description: "Delhi NCR, India, working with teams across India and internationally.",
    },
    {
      term: "Structure",
      description:
        "A client engineering studio, with a research lab and a Physical AI lab alongside it.",
    },
    {
      term: "Standard",
      description: "Nothing is described as available until there is evidence behind it.",
    },
  ] satisfies Term[],
  faqs: [
    {
      q: "Do you build complete software, or only the AI components?",
      a: "Complete systems — backend, frontend, integrations and infrastructure. AI is one part of a system, and we engineer all of it.",
    },
    {
      q: "Can you fine-tune a model on our data?",
      a: "Yes, when the evidence supports it. We first test retrieval and prompting, then fine-tune and compare the result against the base model on your own test set.",
    },
    {
      q: "Can everything run inside our own infrastructure?",
      a: "Yes. We deploy open-weight models and the full application within your cloud account or on your own hardware, so your data never leaves your network.",
    },
    {
      q: "What happens if a pilot does not deliver?",
      a: "The pilot exists to find out at low cost. If it does not beat the baseline agreed in discovery, we say so plainly and recommend stopping.",
    },
    {
      q: "Do you work with organisations outside India?",
      a: "Yes. We work with organisations in India and internationally, where working hours overlap sufficiently.",
    },
  ],
};

export type WorkItem = (typeof HOME.work)[number];

/* -------------------------------- Services --------------------------------- */

export type Service = {
  n: string;
  id: string;
  name: string;
  desc: string;
  problems: string[];
  caps: Term[];
  outcome: string;
  cta: string;
};

export type Practice = {
  id: string;
  n: string;
  name: string;
  img: string;
  alt: string;
  desc: string;
  long: string;
  services: Service[];
};

export const PRACTICES: Practice[] = [
  {
    id: "advisory",
    n: "P.01",
    name: "Advisory",
    img: "practice-advisory",
    alt: "Line illustration of a value-against-effort matrix with one highlighted priority",
    desc: "Decide what to build, what to buy and what to leave alone — before money is committed.",
    long: "AI decisions made on evidence rather than enthusiasm. We assess where AI changes the economics of your operations, what it will cost, and what has to be in place for it to work.",
    services: [
      {
        n: "01",
        id: "strategy",
        name: "AI Strategy and Readiness Assessment",
        desc: "An evidence-based view of where AI will create value in your organisation, what it will cost to build and run, and what must be true of your data and teams before it can work.",
        problems: [
          "AI initiatives that start from tools rather than business problems",
          "Pilots that succeed in demonstrations but never reach production",
          "No reliable view of build, run and model-usage costs before commitment",
        ],
        caps: [
          {
            term: "Discovery",
            description:
              "Process mapping with operating teams to locate the decisions, hand-offs and repetitive work where AI changes the economics.",
          },
          {
            term: "Data and systems",
            description:
              "Assessment of data quality, access, integration points and security constraints that determine what is feasible.",
          },
          {
            term: "Economics",
            description:
              "Cost models covering engineering, infrastructure and per-request model usage, compared with the current cost of each process.",
          },
          {
            term: "Governance",
            description:
              "Policies for data handling, human review, model risk and acceptable use, aligned with the Digital Personal Data Protection Act, 2023.",
          },
        ],
        outcome:
          "A prioritised portfolio of use cases with costed business cases, a sequenced roadmap, and a governance framework your leadership can approve and your teams can operate.",
        cta: "Discuss an assessment",
      },
    ],
  },
  {
    id: "applied-ai",
    n: "P.02",
    name: "Applied AI Engineering",
    img: "practice-applied-ai",
    alt: "Line illustration of an agent coordinating a set of connected tools",
    desc: "Language models, agents, retrieval, custom models and vision — engineered as production software.",
    long: "The core of our work. We engineer AI systems with the same discipline as any software your business depends on: specified behaviour, evaluation before release, access control and full observability.",
    services: [
      {
        n: "02",
        id: "genai",
        name: "Generative AI Applications",
        desc: "Production applications and copilots built on large language models, integrated into your products and internal tools with the controls that enterprise use requires.",
        problems: [
          "Knowledge workers spending hours reading, drafting and summarising",
          "Prototypes that cannot handle real data, permissions or load",
          "Model outputs that cannot be traced, tested or explained",
        ],
        caps: [
          {
            term: "Architecture",
            description:
              "Model selection across OpenAI, Anthropic, Google and open-weight models, behind an abstraction layer so the model can change without a rewrite.",
          },
          {
            term: "Controls",
            description:
              "Structured outputs, guardrails, role-based access and human approval for consequential actions.",
          },
          {
            term: "Evaluation",
            description:
              "Task-specific test sets and automated regression checks that run on every prompt or model change.",
          },
          {
            term: "Integration",
            description:
              "APIs, single sign-on and audit logging that fit your existing architecture and pass your security review.",
          },
        ],
        outcome:
          "A production LLM application with documented behaviour, measured quality and predictable cost — maintainable by your team or operated by ours.",
        cta: "Discuss an application",
      },
      {
        n: "03",
        id: "agents",
        name: "Agentic Systems and Workflow Automation",
        desc: "AI agents that plan and carry out multi-step work across your systems — updating records, raising documents, scheduling and escalating — within permissions you define.",
        problems: [
          "Operational work that consists of moving information between systems",
          "Rule-based automation that breaks on unstructured inputs and exceptions",
          "Justified concern about software acting without oversight",
        ],
        caps: [
          {
            term: "Orchestration",
            description:
              "Single- and multi-agent architectures using LangGraph, the Model Context Protocol and durable workflow engines such as Temporal.",
          },
          {
            term: "Tool integration",
            description:
              "Typed connectors to CRM, ERP, email, calendars, databases and internal APIs.",
          },
          {
            term: "Oversight",
            description:
              "Scoped permissions, approval checkpoints, rate limits and complete action logs that can be audited and reversed.",
          },
          {
            term: "Automation",
            description:
              "Deterministic workflows in n8n or code wherever an agent is not the right tool for the job.",
          },
        ],
        outcome:
          "Processes that complete end to end with measured throughput and error rates, and a complete record of every action taken on your behalf.",
        cta: "Discuss a workflow",
      },
      {
        n: "04",
        id: "voice",
        name: "Conversational and Voice AI",
        desc: "Voice and messaging agents for customer-facing operations — reception, lead qualification, appointment scheduling, payment follow-up and support — in English, Hindi and other Indian languages.",
        problems: [
          "Missed calls and slow responses to high-intent enquiries",
          "Contact-centre capacity that cannot match peaks in demand",
          "Conversations that leave no structured record in the CRM",
        ],
        caps: [
          {
            term: "Telephony",
            description:
              "Inbound and outbound calling over SIP and Indian telephony providers, with recording, transfer and IVR modernisation.",
          },
          {
            term: "Messaging",
            description:
              "Agents on the official WhatsApp Business Platform, web chat and Instagram, using approved message templates.",
          },
          {
            term: "Speech",
            description:
              "Streaming recognition and synthesis with natural turn-taking and interruption handling, tuned for Indian accents.",
          },
          {
            term: "Agent library",
            description:
              "Receptionist, lead qualification, appointment, payment follow-up, support and internal knowledge agents, configured to your scripts and systems.",
          },
        ],
        outcome:
          "Every enquiry answered and recorded, a person brought in when it matters, and conversation data flowing directly into your CRM.",
        cta: "Discuss a voice agent",
      },
      {
        n: "05",
        id: "knowledge",
        name: "Enterprise Search and Knowledge Systems",
        desc: "Retrieval-augmented systems that answer questions from your documents and data with citations, enforcing the access rights your organisation already defines.",
        problems: [
          "Institutional knowledge scattered across drives, wikis, tickets and databases",
          "Search that returns documents when people need answers",
          "Risk of AI exposing information to people who should not see it",
        ],
        caps: [
          {
            term: "Ingestion",
            description:
              "Connectors for SharePoint, Google Drive, Confluence, Notion, ticketing systems and relational databases, with incremental synchronisation.",
          },
          {
            term: "Retrieval",
            description:
              "Hybrid lexical and vector search with re-ranking, tuned on your own queries.",
          },
          {
            term: "Access control",
            description:
              "Document-level permissions enforced at retrieval time, before anything reaches the model.",
          },
          {
            term: "Quality",
            description:
              "Answer accuracy and citation coverage measured on a curated set of real questions from your teams.",
          },
        ],
        outcome:
          "Accurate, sourced answers for employees and customers, with measured accuracy and no leakage across permission boundaries.",
        cta: "Discuss a knowledge system",
      },
      {
        n: "06",
        id: "models",
        name: "Custom Models and Fine-Tuning",
        desc: "Domain-specific models trained on your data, for tasks where general-purpose models are too costly, too slow or too inconsistent.",
        problems: [
          "High-volume tasks where large-model costs do not scale",
          "Inconsistent format or tone from prompted general models",
          "Data that cannot be sent to third-party model providers",
        ],
        caps: [
          {
            term: "Data",
            description:
              "Dataset design, cleaning, labelling and synthetic data generation, with quality controls at each step.",
          },
          {
            term: "Training",
            description:
              "Parameter-efficient (LoRA, QLoRA) and full fine-tuning of open-weight models, and distillation from larger models.",
          },
          {
            term: "Evaluation",
            description:
              "Comparison against the base model and prompted alternatives on held-out test sets before any deployment decision.",
          },
          {
            term: "Serving",
            description:
              "Optimised inference with vLLM on GPU infrastructure, hosted in India or in your own environment.",
          },
        ],
        outcome:
          "A model you own outright, with documented evaluation results, lower cost per request and behaviour that meets your specification.",
        cta: "Discuss a model",
      },
      {
        n: "07",
        id: "vision",
        name: "Document Intelligence and Computer Vision",
        desc: "Extraction, classification and inspection systems that turn documents and images into validated, structured data.",
        problems: [
          "Manual data entry from invoices, forms, KYC and trade documents",
          "Errors discovered only after data has entered core systems",
          "Visual inspection that depends on individual attention",
        ],
        caps: [
          {
            term: "Document AI",
            description:
              "Layout-aware extraction from scanned and digital documents, including tables, handwriting and engineering drawings.",
          },
          {
            term: "Validation",
            description:
              "Cross-checks against ERP records, master data and business rules before anything is posted.",
          },
          {
            term: "Vision",
            description:
              "Detection and classification models for quality inspection, safety monitoring and inventory.",
          },
          {
            term: "Review",
            description:
              "Confidence-based routing so people review only uncertain fields, with a full audit trail.",
          },
        ],
        outcome:
          "Straight-through processing for routine documents, exceptions surfaced for review, and every extracted field traceable to its source.",
        cta: "Send sample documents",
      },
    ],
  },
  {
    id: "platforms",
    n: "P.03",
    name: "Software and Data Platforms",
    img: "practice-platforms",
    alt: "Line illustration of business records flowing into an AI-assisted workflow",
    desc: "The business platforms, products and data foundations that AI runs inside.",
    long: "AI only creates value inside the systems people use every day. We build those systems — business platforms, products and data pipelines — with AI designed in from the start.",
    services: [
      {
        n: "08",
        id: "business-platforms",
        name: "AI-Native Business Platforms",
        desc: "CRM, ERP and HRMS platforms designed with AI inside the workflow — or AI capabilities added to the platforms you already operate.",
        problems: [
          "Business software that records work instead of doing it",
          "Teams operating across spreadsheets and disconnected tools",
          "Off-the-shelf platforms that do not fit Indian business processes",
        ],
        caps: [
          {
            term: "CRM",
            description:
              "Lead capture from every channel, scoring, automated follow-up and conversation summaries inside the pipeline.",
          },
          {
            term: "ERP",
            description:
              "Inventory, procurement and finance modules with AI-assisted reconciliation, anomaly detection and forecasting.",
          },
          {
            term: "HRMS",
            description:
              "Employee records, attendance, leave and payroll, with assistants for policy queries and candidate screening.",
          },
          {
            term: "Extension",
            description:
              "AI capabilities integrated into Zoho, Odoo, Salesforce, Tally and custom systems through their APIs.",
          },
        ],
        outcome:
          "A platform your teams adopt because it removes work, with data structured for reporting and further automation.",
        cta: "Discuss a platform",
      },
      {
        n: "09",
        id: "engineering",
        name: "Product and Platform Engineering",
        desc: "Full-stack engineering for web applications, backend platforms, real-time systems and data pipelines — the foundations that AI capabilities depend on.",
        problems: [
          "Products that need AI features but lack engineering capacity",
          "Backends that cannot sustain real-time load or event volumes",
          "Data spread across systems with no reliable pipeline",
        ],
        caps: [
          {
            term: "Product",
            description:
              "Web applications in Next.js and TypeScript, built for accessibility and performance.",
          },
          {
            term: "Backend",
            description:
              "Services in Go, Python and Node.js with well-defined APIs, authentication and observability.",
          },
          {
            term: "Real-time",
            description:
              "Event-driven architectures on Kafka and WebSockets for voice, messaging and other real-time workloads.",
          },
          {
            term: "Data",
            description:
              "Pipelines, warehousing and analytics on PostgreSQL and modern data tooling.",
          },
        ],
        outcome:
          "Production software with tested code, documentation and deployment pipelines — delivered by engineers embedded in your team or against a fixed scope.",
        cta: "Discuss a product",
      },
    ],
  },
  {
    id: "ai-operations",
    n: "P.04",
    name: "AI Operations",
    img: "practice-operations",
    alt: "Line illustration of server nodes with a live telemetry line above them",
    desc: "Hosting, private deployment, monitoring and cost control once a system is live.",
    long: "Launch is the beginning of an AI system, not the end. We operate what we build — or what others built — with monitoring, cost control and an accountable team.",
    services: [
      {
        n: "10",
        id: "operations",
        name: "AI Infrastructure, MLOps and Managed Operations",
        desc: "Deployment and operation of AI systems hosted in India or inside your own environment, with monitoring, cost control and on-call support.",
        problems: [
          "AI systems in production that no one is accountable for",
          "Data-residency or regulatory requirements that rule out public APIs",
          "Model and usage costs that grow without visibility",
        ],
        caps: [
          {
            term: "Deployment",
            description:
              "Private deployment of open-weight models and applications on Kubernetes — in your cloud account, on-premises, or hosted in India.",
          },
          {
            term: "Observability",
            description:
              "Tracing, quality monitoring, drift detection and alerting with OpenTelemetry, Prometheus and Grafana.",
          },
          {
            term: "Cost control",
            description:
              "Attribution of model usage to teams, features and customers, with routing and caching to reduce spend.",
          },
          {
            term: "Operations",
            description:
              "Incident response, scheduled evaluation runs and monthly improvement cycles under an agreed service level.",
          },
        ],
        outcome:
          "AI systems that stay reliable, secure and cost-predictable after launch, with a named engineering team accountable for them.",
        cta: "Discuss operations",
      },
    ],
  },
];

export const SERVICES_HERO_META: Meta[] = [
  { term: "Advisory", value: "Strategy and readiness" },
  { term: "Applied AI", value: "Agents, LLMs, models, vision" },
  { term: "Platforms", value: "Business systems and products" },
  { term: "Operations", value: "Private AI and MLOps" },
];

/* ------------------------------- Industries -------------------------------- */

export type Industry = {
  n: string;
  id: string;
  name: string;
  sub: string;
  img: string;
  alt: string;
  headline: string;
  intro: string;
  challenges: string[];
  apps: Term[];
  reqs: string[];
  cta: string;
};

export const INDUSTRIES: Industry[] = [
  {
    n: "I.01",
    id: "financial-services",
    name: "Financial Services and FinTech",
    sub: "Banking · NBFCs · Lending · Insurance · Payments",
    img: "industry-financial-services",
    alt: "Line illustration of price movements above ledger rows, one entry highlighted",
    headline: "Scale customer operations without weakening control.",
    intro:
      "Lenders, insurers and payment companies run high-volume customer processes under close regulatory scrutiny. AI can add capacity in collections, onboarding and servicing — but only if every interaction and decision remains explainable and auditable.",
    challenges: [
      "Collections and servicing volumes that grow faster than contact-centre capacity",
      "Manual KYC, underwriting and claims document review",
      "Customer data fragmented across core systems, CRMs and channels",
    ],
    apps: [
      {
        term: "Collections and servicing",
        description:
          "Voice and WhatsApp agents for payment reminders and promise-to-pay capture, with scripts, call windows and escalation set by your policy.",
      },
      {
        term: "Onboarding and KYC",
        description:
          "Extraction and verification of identity, income and business documents, with exceptions routed to reviewers.",
      },
      {
        term: "Underwriting support",
        description:
          "Summaries of applicant documents and bank statements for credit teams, with the source of every figure shown.",
      },
      {
        term: "Risk analytics",
        description:
          "Anomaly detection on transaction and operational data, surfaced to analysts rather than acted on automatically.",
      },
    ],
    reqs: [
      "A complete audit trail for every automated interaction and decision",
      "Designed to support RBI requirements on digital lending, outsourcing and fair practices",
      "Private deployment where data cannot leave regulated infrastructure",
    ],
    cta: "Discuss a financial services use case",
  },
  {
    n: "I.02",
    id: "healthcare",
    name: "Healthcare and HealthTech",
    sub: "Hospitals · Clinics · Diagnostics · Digital health",
    img: "industry-healthcare",
    alt: "Line illustration of three waveform signals, one highlighted",
    headline: "Return clinical time to clinicians.",
    intro:
      "Providers lose capacity to scheduling, documentation and patient communication. AI can absorb much of that administrative load — provided patient data is protected and clinical judgement stays with clinicians.",
    challenges: [
      "Front-desk and call-centre load from appointments and report enquiries",
      "Clinical and claims documentation that consumes staff time",
      "Patient records spread across systems with limited interoperability",
    ],
    apps: [
      {
        term: "Patient access",
        description:
          "Appointment booking, reminders and report-ready notifications over voice and WhatsApp.",
      },
      {
        term: "Documentation support",
        description:
          "Extraction and summarisation of records, prescriptions and discharge summaries, for review by clinical staff.",
      },
      {
        term: "Claims and revenue cycle",
        description:
          "Assembly and validation of documents for insurance claims and pre-authorisations.",
      },
      {
        term: "Staff knowledge",
        description:
          "Assistants that answer from protocols, SOPs and formularies, citing their source.",
      },
    ],
    reqs: [
      "Consent and data handling consistent with the Digital Personal Data Protection Act, 2023",
      "Interoperability with Ayushman Bharat Digital Mission standards where relevant",
      "Clinical decisions remain with qualified professionals — AI assists, it does not diagnose",
    ],
    cta: "Discuss a healthcare use case",
  },
  {
    n: "I.03",
    id: "manufacturing",
    name: "Manufacturing and Industrial Technology",
    sub: "Discrete · Process · Automotive · Industrial equipment",
    img: "industry-manufacturing",
    alt: "Line illustration of a robotic arm inspecting parts on a conveyor",
    headline: "Connect the plant floor to the decisions above it.",
    intro:
      "Manufacturers generate data in ERP, MES, quality systems and supplier documents, yet most decisions still depend on manual consolidation. AI and computer vision shorten that loop — and our Physical AI research aims, in time, to close it on the machines themselves.",
    challenges: [
      "Quality inspection that depends on manual visual checks",
      "Supplier certificates, drawings and purchase documents processed by hand",
      "Planning decisions assembled from ERP exports and spreadsheets",
    ],
    apps: [
      {
        term: "Visual inspection",
        description:
          "Camera-based defect detection at inspection stations, with every image and decision logged for traceability.",
      },
      {
        term: "Supplier documentation",
        description:
          "Extraction and validation of certificates of analysis, drawings and purchase orders against specification.",
      },
      {
        term: "Planning assistance",
        description:
          "Natural-language access to ERP and production data for planners, with the underlying query shown.",
      },
      {
        term: "Maintenance intelligence",
        description:
          "Analysis of sensor and maintenance logs to prioritise inspections and reduce unplanned downtime.",
      },
    ],
    reqs: [
      "Operation on edge hardware with intermittent connectivity",
      "Integration with existing ERP and MES, not replacement",
      "Safety-critical actions kept under independent, deterministic control",
    ],
    cta: "Discuss a manufacturing use case",
  },
  {
    n: "I.04",
    id: "retail",
    name: "Retail and E-commerce",
    sub: "D2C brands · Marketplaces · Omnichannel retail",
    img: "industry-retail",
    alt: "Line illustration of parcels in a grid with one order routed to a customer",
    headline: "Resolve every order conversation at the speed of checkout.",
    intro:
      "Digital commerce runs on thin margins and high volumes. Most customer contact concerns order status, delivery, payment confirmation and returns — work AI can resolve directly once it is connected to order and logistics systems.",
    challenges: [
      "Support volumes dominated by repetitive order and delivery queries",
      "Return-to-origin losses on unconfirmed cash-on-delivery orders",
      "Catalogue content that cannot keep pace with the assortment",
    ],
    apps: [
      {
        term: "Order support",
        description:
          "WhatsApp and chat agents that resolve order, delivery and return queries from live system data.",
      },
      {
        term: "COD confirmation",
        description: "Automated order confirmation and address verification before dispatch.",
      },
      {
        term: "Catalogue intelligence",
        description:
          "Generation and enrichment of product titles, attributes and descriptions, with review workflows.",
      },
      {
        term: "Demand insight",
        description:
          "Forecasting and assortment analysis from sales, inventory and marketplace data.",
      },
    ],
    reqs: [
      "Real-time integration with order, inventory and logistics platforms",
      "Use of the official WhatsApp Business Platform and approved templates",
      "Brand-consistent tone, with human escalation for complaints",
    ],
    cta: "Discuss a retail use case",
  },
  {
    n: "I.05",
    id: "logistics",
    name: "Logistics and Supply Chain",
    sub: "3PL · Express · Freight · Field services",
    img: "industry-logistics",
    alt: "Line illustration of a route network with one highlighted delivery path",
    headline: "Turn status calls into proactive updates.",
    intro:
      "Logistics operators coordinate drivers, warehouses and customers across time-critical processes. Much of the operational load is communication and documentation — exactly where AI reduces cost and improves first-attempt delivery.",
    challenges: [
      "Inbound calls from customers and partners asking for shipment status",
      "Proof-of-delivery and trade documents processed manually",
      "Exceptions detected after the customer has already been affected",
    ],
    apps: [
      {
        term: "Proactive communication",
        description: "Automated delivery updates and rescheduling over WhatsApp and voice.",
      },
      {
        term: "Document processing",
        description:
          "Extraction from proofs of delivery, e-way bills, invoices and customs documents.",
      },
      {
        term: "Exception management",
        description:
          "Alerts on delays and anomalies from tracking and telematics data, routed to the right team.",
      },
      {
        term: "Dispatch support",
        description: "Assistants for scheduling and assigning drivers and field technicians.",
      },
    ],
    reqs: [
      "Integration with TMS, WMS and telematics providers",
      "High availability through peak volumes",
      "Operation in the languages drivers and customers actually speak",
    ],
    cta: "Discuss a logistics use case",
  },
  {
    n: "I.06",
    id: "enterprise-software",
    name: "Enterprise Software and SaaS",
    sub: "B2B SaaS · Platforms · Technology companies",
    img: "industry-enterprise-software",
    alt: "Line illustration of source code connected to a set of services",
    headline: "Ship AI features your customers can trust.",
    intro:
      "Software companies are expected to add AI capabilities quickly while keeping quality, security and unit economics under control. That requires evaluation, guardrails and cost engineering alongside the features themselves.",
    challenges: [
      "Roadmap pressure to deliver AI features without a specialised team",
      "Uncertain quality and behaviour of LLM features in production",
      "Model costs that erode margins as usage grows",
    ],
    apps: [
      {
        term: "In-product copilots",
        description: "Assistants, generation and search designed into your product experience.",
      },
      {
        term: "Agentic features",
        description:
          "Workflow automation inside your product, with permissions and audit logs your customers can review.",
      },
      {
        term: "Evaluation infrastructure",
        description: "Test suites and regression checks integrated into your CI/CD pipeline.",
      },
      {
        term: "Cost engineering",
        description:
          "Usage attribution per customer and feature, model routing and caching — the problem our TokenFin work addresses.",
      },
    ],
    reqs: [
      "Multi-tenant data isolation that passes enterprise security reviews",
      "A model-provider abstraction that avoids lock-in",
      "Engineers who work inside your repositories, processes and release cycles",
    ],
    cta: "Discuss a product use case",
  },
  {
    n: "I.07",
    id: "real-estate",
    name: "Real Estate and PropTech",
    sub: "Developers · Brokerages · Property management",
    img: "industry-real-estate",
    alt: "Line illustration of building elevations with one unit highlighted",
    headline: "Respond to every enquiry while it is still warm.",
    intro:
      "Real estate businesses invest heavily in enquiries from portals and campaigns, then lose many of them to delayed follow-up. Construction and property management add a substantial documentation burden.",
    challenges: [
      "Portal and campaign leads contacted hours or days after the enquiry",
      "Site-visit scheduling and follow-up managed by hand",
      "Agreements, approvals and drawings reviewed manually",
    ],
    apps: [
      {
        term: "Lead response",
        description:
          "Immediate call-back and qualification of portal leads by voice agents, with results written to the CRM.",
      },
      {
        term: "Visit scheduling",
        description: "Booking, reminders and rescheduling of site visits.",
      },
      {
        term: "Sales enablement",
        description: "An inventory, pricing and availability assistant for sales teams.",
      },
      {
        term: "Document review",
        description: "Extraction from agreements, approvals and tenancy documents.",
      },
    ],
    reqs: [
      "Integration with property portals and real estate CRMs",
      "Compliance with consent and commercial-communication regulations",
      "Inventory and pricing that stay accurate and current",
    ],
    cta: "Discuss a real estate use case",
  },
  {
    n: "I.08",
    id: "education",
    name: "Education and EdTech",
    sub: "Universities · Schools · Test preparation · EdTech",
    img: "industry-education",
    alt: "Line illustration of a rising bar chart with one period highlighted",
    headline: "Convert admission-season demand into enrolments.",
    intro:
      "Institutions face sharp seasonal peaks in enquiries and a year-round need for student support. AI provides timely, consistent responses at scale, so counsellors can focus on the conversations that need them.",
    challenges: [
      "Admission enquiries that peak beyond counselling capacity",
      "Fee reminders and administrative queries handled manually",
      "Little personalised support for students between classes",
    ],
    apps: [
      {
        term: "Admissions",
        description:
          "Enquiry response, counselling follow-up and demo-class scheduling over voice and WhatsApp.",
      },
      {
        term: "Student services",
        description: "Assistants for fees, timetables and administrative questions.",
      },
      {
        term: "Learning support",
        description: "Course assistants grounded strictly in approved curriculum material.",
      },
      {
        term: "Funnel analytics",
        description: "Analysis of the journey from first enquiry to enrolment.",
      },
    ],
    reqs: [
      "Age-appropriate safeguards and parental consent where required",
      "Answers grounded only in approved material",
      "Integration with student information systems and CRMs",
    ],
    cta: "Discuss an education use case",
  },
];

export const INDUSTRIES_HERO_META: Meta[] = [
  { term: "Sectors", value: "Eight, chosen for fit" },
  { term: "Principle", value: "Problem first, model second" },
  { term: "Data", value: "Private deployment where required" },
  { term: "Proof", value: "Measured against your baseline" },
];

/* -------------------------------- Research --------------------------------- */

export const RESEARCH = {
  heroMeta: [
    { term: "Focus", value: "Applied, not foundational" },
    { term: "Output", value: "Methods and internal tools" },
    { term: "Feeds", value: "Every client engagement" },
    { term: "Sister lab", value: "Physical AI Lab" },
  ] satisfies Meta[],
  areas: [
    {
      n: "01",
      tag: "Agents",
      title: "Agent reliability",
      q: "Where do multi-step agents fail in real workflows, and which guardrails actually prevent it?",
      why: "Agents that take actions — not just answer — fail in quiet, expensive ways: the wrong record updated, a step skipped, a loop that never ends.",
      output: "Approval patterns, permission scopes and action logs for agents that take actions.",
    },
    {
      n: "02",
      tag: "Evaluation",
      title: "Evaluation",
      q: "How do you know a model or prompt change made things better, not just different?",
      why: "Most teams judge AI by trying a few examples. That hides regressions until a customer finds them.",
      output:
        "Task-specific test sets and regression checks that run on every prompt or model change.",
    },
    {
      n: "03",
      tag: "Efficiency",
      title: "Efficient models and cost",
      q: "When does a small fine-tuned model beat a large general one — and what does each request really cost?",
      why: "AI bills arrive as one number. Without attribution, nobody knows which feature or customer is expensive, or whether a smaller model would do.",
      output:
        "A fine-tuning playbook with evaluation built in. Our cost-attribution work now continues as TokenFin, our production-track product, currently in development.",
    },
    {
      n: "04",
      tag: "Context",
      title: "Shared context for agents",
      q: "How should several agents share what a project has already decided?",
      why: "Switching between coding agents means explaining the project again. Decisions, tasks and hand-overs get lost between tools.",
      output:
        "An experimental shared context layer, used internally across the coding agents we build with.",
    },
  ],
  loop: [
    {
      n: "01 · Question",
      title: "It starts in a real system",
      body: "A failure, a cost spike or an unanswered question in client work becomes a research question.",
    },
    {
      n: "02 · Experiment",
      title: "It is tested in the lab",
      body: "We reproduce it, measure it and try fixes on our own systems — never first on a client’s.",
    },
    {
      n: "03 · Method",
      title: "It ships as a method",
      body: "What works becomes a pattern, a tool or a check in how we build. What fails is documented.",
    },
  ],
};

/* ---------------------------------- Lab ------------------------------------ */

export const LAB = {
  heroMeta: [
    { term: "Intelligence", value: "OJAS" },
    { term: "Embodiment", value: "PARTH" },
    { term: "Target hardware", value: "Existing edge compute" },
    { term: "Status", value: "Early engineering" },
  ] satisfies Meta[],
  loop: [
    {
      title: "Perceive",
      body: "Sensor streams become structured observation: detections, poses and measurements the system can reason over.",
    },
    {
      title: "Understand",
      body: "Observations fuse into one live picture of the scene and the machine, held alongside memory of the task.",
    },
    {
      title: "Decide",
      body: "The model proposes. Explicit rules, permissions and constraints decide whether that proposal may execute.",
    },
    {
      title: "Act",
      body: "Authorised intent reaches real devices through stable interfaces, with independent safety hardware underneath.",
    },
  ],
  ojas: [
    "Designed to run a CuriousDevs model, a third-party model or your own — behind one contract",
    "Designed so that every action passes an explicit policy check",
    "Planned adapters to ROS 2, simulation and other backends",
    "Targeting Jetson-class, Raspberry Pi and x86 GPU hardware",
  ],
  parth: [
    "Designed with independent safety hardware below every software layer",
    "Stationary, wheeled and bipedal configurations planned on one stack",
    "Commercial actuators, compute and sensors before anything custom",
  ],
  layers: [
    {
      id: "models",
      index: "04",
      name: "Models",
      role: "Supply learned intelligence",
      detail:
        "Third-party, open and customer models run from the start, behind one contract. Our own model comes later, starting from open vision-language-action work.",
      owner: "Model-agnostic",
    },
    {
      id: "runtime",
      index: "03",
      name: "OJAS Runtime",
      role: "Turn model output into controlled action",
      detail:
        "Perception, world state, reasoning, planning, memory, rules and policies, tools and actions, telemetry and a device abstraction — the execution system between the model and the machine.",
      owner: "CuriousDevs Intelligence",
      emphasis: true,
    },
    {
      id: "compute",
      index: "02",
      name: "Edge compute",
      role: "Run the loop next to the machine",
      detail:
        "Existing edge platforms: Jetson class, Raspberry Pi, x86 with a GPU. Not hardware we ask you to buy.",
      owner: "Existing hardware first",
    },
    {
      id: "io",
      index: "01",
      name: "Sensors and actuators",
      role: "Sense and move",
      detail:
        "Cameras, depth and inertial sensing, motors, arms and grippers, reached through stable interfaces with independent emergency-stop hardware.",
      owner: "Physical I/O",
    },
  ],
  statusHead: ["Component", "Status", "Next step"],
  statusRows: [
    [
      "OJAS Runtime v0.1",
      "In engineering — architecture first",
      "Canonical interfaces, runtime core and a first adapter",
    ],
    ["Backend adapters", "Design", "Prove portability with a second backend"],
    ["Data and training platform", "Research", "Begins once the runtime is stable"],
    ["OJAS Model", "Research", "Start from open VLA models, then train our own"],
    ["PARTH", "Paused", "Resumes when OJAS can drive a machine end to end"],
  ],
};
