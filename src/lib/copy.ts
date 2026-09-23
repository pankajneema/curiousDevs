/**
 * Public-facing website copy.
 *
 * src/lib/content.ts holds the technical model used by the deep pages.
 * This file holds the plain-language copy a first-time visitor reads.
 *
 *   OJAS  = intelligence.
 *   PARTH = embodiment.
 *   Physical AI = intelligence becoming action.
 */

export const SITE = {
  name: "CuriousDevs",
  tagline: "Intelligence, embodied",
  location: "Noida, Uttar Pradesh, India",
  short:
    "CuriousDevs builds OJAS, an intelligence system for Edge AI and Physical AI, and PARTH, the humanoid robot it is embodied in.",
};

export const HOME_HERO = {
  eyebrow: "CuriousDevs · Noida, India",
  headline: ["Intelligence that", "moves matter"],
  lede: "Intelligence built to perceive, reason, and act in the physical world.",
  note: "Closing the loop between sensing, decision, and motion.",
  primary: { label: "Explore OJAS", to: "/products/ojas" as const },
  secondary: { label: "Meet PARTH", to: "/products/parth" as const },
};

export const HOME_FACTS = [
  {
    term: "Intelligence",
    value: "OJAS — perception, world state, reasoning, planning, memory, policy and action.",
  },
  {
    term: "Embodiment",
    value: "PARTH — a human-scale, electrically actuated robot for indoor handling work.",
  },
  {
    term: "Where it runs",
    value: "Existing edge compute: Jetson class, Raspberry Pi, x86 with a GPU.",
  },
  {
    term: "How we talk about it",
    value: "Nothing is described as available before it has recorded, repeatable evidence.",
  },
];

export const PHYSICAL_AI = {
  label: "Physical AI",
  title: "Intelligence is only half of it. The other half is action.",
  lede: "A model can describe a scene. It cannot decide whether picking that object is permitted right now, hold a coherent picture of a workcell across minutes, or keep a machine safe when its own output is wrong. Everything between the model and the motors is the engineering problem, and that is where CuriousDevs works.",
  pillars: [
    {
      n: "01",
      title: "Perceive",
      body: "Sensor streams become structured observation: detections, poses, measurements the system can reason over.",
    },
    {
      n: "02",
      title: "Understand",
      body: "Observations fuse into one live picture of the scene and the machine, held alongside memory of the task.",
    },
    {
      n: "03",
      title: "Decide",
      body: "The model proposes. Explicit rules, permissions and constraints decide whether that proposal may execute.",
    },
    {
      n: "04",
      title: "Act",
      body: "Authorised intent reaches real devices through stable interfaces, with independent safety hardware underneath.",
    },
  ],
};

export const PROBLEM = {
  label: "Why this layer exists",
  title: "A trained model is not a system that can be trusted with a machine.",
  lede: "Model output is numbers. It carries no notion of what is legal, safe or currently possible, and it has no memory of what the machine was doing a second ago. In the physical world, a mistake is not a retry — it is a stopped machine, a scrapped part or a damaged tool.",
  points: [
    {
      n: "01",
      title: "Nothing authorises the output",
      body: "Inference alone puts nothing between a proposal and an actuator. Authority has to live outside the model.",
    },
    {
      n: "02",
      title: "One-shot inference is not a loop",
      body: "Acting in the world means perceiving, deciding, acting and observing continuously — not answering once.",
    },
    {
      n: "03",
      title: "Behaviour slips quietly",
      body: "Light changes, a fixture moves, a finish changes. Without recorded outcomes, degradation has no alarm.",
    },
    {
      n: "04",
      title: "Every machine speaks differently",
      body: "Without a device abstraction, no engineering carries from one robot, gripper or controller to the next.",
    },
  ],
  consequence:
    "So we build the execution system first: model-agnostic, policy-gated, observable, and running on hardware that already exists.",
};

export const HOME_OJAS = {
  label: "OJAS · intelligence",
  title: "The intelligence system behind physical machines.",
  lede: "It perceives, plans, decides, and acts — at the edge.",
  bullets: [
    "A CuriousDevs model, a third-party model or your own — all behind one contract.",
    "Every action passes a policy check that contains no machine learning.",
    "Runs on existing edge compute, not on hardware we ask you to buy.",
    "Ships as one package: model, rules, tools, actions, configuration, metadata.",
  ],
  cta: { label: "Explore OJAS", to: "/products/ojas" as const },
  deep: { label: "Inside the architecture", to: "/intelligence" as const },
};

export const HOME_PARTH = {
  label: "PARTH · embodiment",
  title: "Intelligence, embodied.",
  lede: "A humanoid robot built to bring OJAS into the physical world.",
  bullets: [
    "Independent safety hardware sits below every software layer.",
    "Stationary, wheeled and bipedal configurations share one stack.",
    "Commercial actuators, compute and sensors before anything custom.",
  ],
  cta: { label: "Meet PARTH", to: "/products/parth" as const },
  deep: { label: "Robotics engineering", to: "/robotics" as const },
};

export const RELATIONSHIP_COPY = {
  label: "How they fit",
  title: "One decides. One moves.",
  lede: "The boundary between intelligence and embodiment is deliberate and typed. Intent flows down as structured requests; state flows up as structured feedback. That is what lets the intelligence and the body evolve on their own clocks.",
  columns: [
    {
      name: "OJAS",
      role: "Intelligence",
      items: [
        "Perception and world state",
        "Reasoning, planning and memory",
        "Rules, permissions, forbidden actions",
        "Tools, actions and telemetry",
      ],
    },
    {
      name: "PARTH",
      role: "Embodiment",
      items: [
        "Skills and motion planning",
        "Whole-body real-time control",
        "Actuators, sensors and power",
        "Independent safety hardware",
      ],
    },
  ],
};

export const HOME_WORK = {
  label: "Working with us",
  title: "What we take on.",
  lede: "A small set of problems we can be held to. If a conventional integrator is the better answer for your task, we will say so in the first conversation.",
  items: [
    {
      title: "OJAS on your machine",
      body: "Bringing a task to a running loop: perception, policy, actions, commissioning and telemetry on hardware you already own.",
    },
    {
      title: "Bring your own robot",
      body: "You own the machine and need the intelligence layer. One device adapter, then the full execution system above it.",
    },
    {
      title: "Safety and policy architecture",
      body: "Explicit rules and an authorisation layer above independent emergency-stop and Safe Torque Off hardware.",
    },
    {
      title: "Evaluation and monitoring",
      body: "Measuring how a model behaves on your task and your floor, then watching for drift once it is running.",
    },
  ],
  cta: { label: "Talk to CuriousDevs", to: "/contact" as const },
};

export const HOME_RESEARCH = {
  label: "Research",
  title: "We publish questions before answers.",
  lede: "We propose no new model architectures. Our open questions are about execution: how published models behave under real conditions, whether policy checks hold at loop rate, whether degradation is detectable early, and whether a device abstraction really makes the second machine cheaper.",
  cta: { label: "Read the open questions", to: "/research" as const },
};

export const HOME_ABOUT = {
  label: "Company",
  title: "Two divisions, one stack, built in Noida.",
  lede: "CuriousDevs Intelligence builds OJAS. CuriousDevs Robotics builds PARTH. The company is deliberately small, the boundary between the two is a contract rather than an org chart, and we are explicit about what exists and what does not.",
  cta: { label: "About CuriousDevs", to: "/company" as const },
};

export const HOME_CONTACT = {
  label: "Contact",
  title: "Have a machine, a task and a tolerance?",
  lede: "Tell us about the station — the machine, the task and what happens today when it fails. A founder reads every message.",
  cta: { label: "Talk to CuriousDevs", to: "/contact" as const },
};

/* -------------------------------- Company ---------------------------------- */

export const COMPANY_COPY = {
  hero: {
    label: "Company",
    title: "We build Physical AI.",
    lede: "CuriousDevs builds the intelligence and the robotic systems that let machines understand and act in the physical world.",
    support: "Two engineering divisions and the research that feeds them, in Noida, India.",
  },
  why: {
    label: "Why we exist",
    title: "Capable models cannot run a machine.",
    paragraphs: [
      "Models are published openly every month. Almost none of them can operate real hardware.",
      "The unglamorous part — running a model continuously next to a machine, with authority, memory and a record of what it did — is where deployments actually fail. The teams releasing models are not the teams who will solve it.",
      "So we build the execution layer first, and a body designed around that layer rather than around a demonstration.",
    ],
  },
  structure: {
    label: "What we are building",
    title: "Two divisions, and the research that feeds them.",
    lede: "CuriousDevs works on Physical AI through two engineering divisions. Research is where the technologies that may become future systems are investigated, before anything is claimed.",
    chain: ["CuriousDevs", "Physical AI"],
    divisions: [
      {
        name: "Intelligence",
        role: "Builds the mind",
        body: "The models, systems and runtimes that let machines perceive, understand, reason, plan and act.",
        project: "OJAS",
        projectNote: "Current flagship system",
        to: "/intelligence" as const,
      },
      {
        name: "Robotics",
        role: "Builds the body",
        body: "The platforms, mechanics, actuation, sensing and control that carry intelligence into the real world.",
        project: "PARTH",
        projectNote: "Current flagship platform",
        to: "/robotics" as const,
      },
      {
        name: "Research",
        role: "Asks what is next",
        body: "Open questions about model behaviour, world representation, embodiment and evaluation, each with a method attached.",
        project: "Open questions",
        projectNote: "Published exactly as measured",
        to: "/research" as const,
      },
    ],
  },
  how: {
    label: "How we think",
    title: "Four positions that shape everything.",
    lede: "How each division works is on its own page. These are the positions the whole company is built on.",
    items: [
      {
        title: "The model proposes; the system decides",
        body: "Model output is a proposal, authorised against world state and explicit rules before anything moves.",
      },
      {
        title: "Safety is architecture, not a feature",
        body: "Independent hardware sits below every software layer, and lower layers always hold more authority.",
      },
      {
        title: "A number without a method is a slogan",
        body: "Every figure we publish carries how it was measured. Missed targets are published as measured.",
      },
      {
        title: "Close to the machine",
        body: "Deployed robotics needs physical presence. Being near the hardware is part of the product, not an overhead.",
      },
    ],
  },
  going: {
    label: "Where we are going",
    title: "Where we are going.",
    body: "One reliable loop, proven and recorded. Then the same execution system across more machines and more tasks, with the cost of each new integration measured against the last. Then embodiment, on a body whose safety architecture was designed before its capabilities were promised.",
    steps: [
      {
        step: "OJAS Runtime",
        note: "Model-agnostic execution on existing edge hardware",
      },
      { step: "Field applications", note: "Real tasks, measured and recorded" },
      { step: "Models", note: "Ours or third-party, behind one contract" },
      { step: "PARTH", note: "Human-scale embodiment around the same stack" },
    ],
  },
  team: {
    label: "The team",
    title: "The people building it are the people you will talk to.",
    body: "CuriousDevs is being built by engineers with experience across production software, AI systems, distributed infrastructure and real-time control. The company is deliberately small.",
    cta: { label: "Talk to us", to: "/contact" as const },
  },
};

/* -------------------------------- Contact ---------------------------------- */

export const CONTACT_COPY = {
  label: "Contact",
  title: "Let's build what comes next.",
  lede: "Tell us what you're building, exploring, or trying to solve.",
  emailLabel: "Or email us directly",
  email: "hello@curiousdevs.com",
  meta: [
    { term: "Based in", value: "Noida, Uttar Pradesh, India" },
    { term: "Reply from", value: "A founder — there is no sales team" },
  ],
  note: "If a conventional integrator is the better answer for your task, we will say so.",
  success: {
    label: "Message received",
    title: "Thank you — a founder will reply.",
    body: "If your task involves a machine you already own, the reply will usually ask about programmatic access, where cameras can be mounted, and your emergency-stop hardware.",
  },
};

export const CONTACT_TIMELINES = [
  "Exploring",
  "Next 3 months",
  "3 to 6 months",
  "6 months or later",
];

export const CONTACT_TOPICS = [
  "OJAS on my machine",
  "Bring your own robot",
  "PARTH and robotics",
  "Research or partnership",
  "General enquiry",
];

/**
 * Intelligence page. Intelligence is the CuriousDevs division that builds the
 * intelligence layer of Physical AI; OJAS is its current flagship project, not
 * its definition. Keep this at technology-domain level. Implementation detail
 * belongs on the OJAS page; Robotics has its own page.
 */
export const INTELLIGENCE_COPY = {
  hero: {
    label: "CuriousDevs Intelligence",
    title: "Building the intelligence layer for Physical AI.",
    lede: "We build the models, systems and runtimes that enable machines to perceive, understand, reason, plan and act in the physical world.",
    support:
      "From learned models to the systems that make intelligence work in the physical world.",
  },
  meaning: {
    label: "What intelligence means",
    title: "From seeing the world to acting in it.",
    paragraphs: [
      "Physical AI needs more than a trained model.",
      "It needs systems that can interpret the physical world, maintain context, reason over changing conditions, make decisions, and turn those decisions into reliable action.",
      "CuriousDevs Intelligence exists to build that layer.",
    ],
  },
  stack: {
    label: "The intelligence stack",
    title: "Intelligence is a system, not a single model.",
    lede: "We work across the technologies that carry a machine from raw physical signals to intelligent behaviour. These are areas of work, not a list of released products.",
    areas: [
      {
        index: "01",
        title: "Perception",
        body: "Turning cameras, sensors and physical signals into structured observations.",
      },
      {
        index: "02",
        title: "World understanding",
        body: "Maintaining representations of the environment, objects, state and change.",
      },
      {
        index: "03",
        title: "Reasoning",
        body: "Understanding situations, goals, relationships and constraints.",
      },
      {
        index: "04",
        title: "Planning",
        body: "Turning reasoning into structured sequences of actions.",
      },
      {
        index: "05",
        title: "Memory",
        body: "Retaining context, experience and relevant state across time.",
      },
      {
        index: "06",
        title: "Models",
        body: "Developing and adapting models for perception, reasoning, multimodal understanding, prediction and action.",
      },
      {
        index: "07",
        title: "Runtime systems",
        body: "Allowing intelligence to operate continuously, in real time, close to the machine.",
      },
      {
        index: "08",
        title: "Evaluation and safety",
        body: "Testing behaviour, measuring failure, constraining decisions and understanding system performance.",
      },
    ],
  },
  modelsSystems: {
    label: "Models and systems",
    title: "A model is a component. The system is the intelligence.",
    lede: "Models provide capabilities. The intelligence layer gives those capabilities context, memory, reasoning, planning, constraints, execution and feedback. We research and fine-tune models, work with external ones, and are building our own — and we build the systems that make any of them useful on a machine.",
    columns: [
      {
        name: "Model intelligence",
        items: [
          "Training",
          "Fine-tuning",
          "Multimodal models",
          "Perception",
          "Reasoning",
          "Action models",
          "Evaluation",
        ],
      },
      {
        name: "System intelligence",
        items: [
          "World state",
          "Memory",
          "Planning",
          "Runtime execution",
          "Tools",
          "Policies",
          "Feedback",
          "Real-time operation",
        ],
      },
    ],
    closing: "Together, they turn model capability into physical intelligence.",
  },
  loop: {
    label: "The physical intelligence loop",
    title: "Perceive. Understand. Reason. Plan. Act.",
    lede: "Physical intelligence is not a one-shot answer. The system observes the world, reasons over what it finds, acts, and then uses the result to inform what it does next.",
  },
  principles: {
    label: "Design principles",
    title: "Built for the physical world.",
    lede: "Intelligence that drives a machine has to hold up in conditions a digital-only model never meets.",
    items: [
      {
        term: "Continuous",
        description: "Intelligence operates as a loop rather than a one-shot response.",
      },
      {
        term: "Contextual",
        description: "Decisions are grounded in current world state and previous observations.",
      },
      {
        term: "Constrained",
        description: "Actions operate within explicit rules, permissions and physical boundaries.",
      },
      {
        term: "Feedback-driven",
        description:
          "Every action changes the environment and becomes information for what happens next.",
      },
      {
        term: "Edge-native",
        description:
          "Intelligence can operate close to the machine, where latency, availability and compute constraints matter.",
      },
    ],
  },
  final: {
    title: "OJAS is where this starts.",
    lede: "The models, world models, runtimes and evaluation systems that follow come from the same foundation. The division is built to be broader than any one of them.",
    primary: { label: "Explore OJAS", to: "/products/ojas" as const },
    secondary: { label: "Talk to us", to: "/contact" as const },
  },
};

/**
 * Robotics page. Robotics is a CuriousDevs division; PARTH is its current
 * flagship project, not its definition. Intelligence builds the mind, Robotics
 * builds the body. Keep this at division level — PARTH's own detail belongs on
 * the PARTH page.
 */
export const ROBOTICS_COPY = {
  hero: {
    label: "CuriousDevs Robotics",
    title: "Building the physical systems that give Physical AI a body.",
    lede: "We design and engineer the machines that carry intelligence into the real world — platforms, mechanics, actuation, sensing and the control that holds them together.",
    support: "Intelligence decides what to do. The machine is what does it.",
  },
  meaning: {
    label: "What robotics means",
    title: "From a decision to motion in the real world.",
    paragraphs: [
      "A decision only matters once something moves.",
      "Turning intent into motion takes a body that can carry a load, sense its own state, stay inside its limits, and fail safely when something goes wrong — in real time, against physics that does not negotiate.",
      "CuriousDevs Robotics exists to build those machines.",
    ],
  },
  stack: {
    label: "The robotics stack",
    title: "A robot is a system, not a mechanism.",
    lede: "We work across the engineering that carries a machine from a structure to something that can do useful work. These are areas of work, not a list of released products.",
    areas: [
      {
        index: "01",
        title: "Robotic platforms",
        body: "Whole machines designed around the work they do — fixed, mobile and human-scale forms.",
      },
      {
        index: "02",
        title: "Mechanical design",
        body: "Structure, kinematics, joints and end effectors sized for real loads and real duty cycles.",
      },
      {
        index: "03",
        title: "Actuation",
        body: "Motors, drives, transmissions and the power architecture that moves them.",
      },
      {
        index: "04",
        title: "Sensing",
        body: "Cameras, encoders, force and proprioception — how a machine knows its own state and its surroundings.",
      },
      {
        index: "05",
        title: "Control",
        body: "Deterministic real-time control: trajectories, limits and whole-body coordination.",
      },
      {
        index: "06",
        title: "Embodied intelligence",
        body: "Bringing perception, decision and motion together so intelligence becomes physical behaviour.",
      },
      {
        index: "07",
        title: "Integration",
        body: "Stable interfaces between compute, drives, sensors and the intelligence layer above.",
      },
      {
        index: "08",
        title: "Real-world operation",
        body: "Calibration, commissioning, serviceability and the diagnostics a machine needs to keep running.",
      },
    ],
  },
  machine: {
    label: "Machine and embodiment",
    title: "A mechanism is a component. The embodiment is the robot.",
    lede: "Structure and actuators move mass. What makes a machine a robot is the layer that gives it state, limits, coordination and a safe way to fail. CuriousDevs Robotics works across both.",
    columns: [
      {
        name: "The mechanism",
        items: [
          "Structure",
          "Joints and kinematics",
          "Actuation",
          "Transmission",
          "End effectors",
          "Power",
        ],
      },
      {
        name: "The embodiment",
        items: [
          "State estimation",
          "Real-time control",
          "Limits and safe states",
          "Calibration",
          "Interfaces to intelligence",
          "Diagnostics",
          "Serviceability",
          "Commissioning",
        ],
      },
    ],
    closing: "Together, they turn a mechanism into a machine that can be trusted to move.",
  },
  authority: {
    label: "Authority",
    title: "Every layer below can refuse the layer above.",
    lede: "Intelligence proposes. Nothing it proposes reaches a motor until each layer beneath it agrees — and the last layer is not software at all.",
    note: "No single failure — in a model, a program or a component — should cause uncontrolled motion. No certification is claimed.",
    layers: [
      {
        index: "05",
        name: "Intelligence",
        authority: "Proposes intent",
        body: "Decides what should happen next. It holds no authority over actuation.",
      },
      {
        index: "04",
        name: "Policy",
        authority: "Authorises or refuses",
        body: "Rules, permissions and constraints, evaluated before anything is sent to the machine.",
      },
      {
        index: "03",
        name: "Skills",
        authority: "Validates parameters",
        body: "Preconditions, parameter ranges and timeouts, checked before a motion may execute.",
      },
      {
        index: "02",
        name: "Controller limits",
        authority: "Clamps and stops",
        body: "Position, velocity, acceleration, current and workspace limits, enforced deterministically.",
      },
      {
        index: "01",
        name: "Safety hardware",
        authority: "Removes power",
        body: "An emergency-stop chain and Safe Torque Off to every drive, independent of software state.",
        hardware: true,
      },
    ],
  },
  principles: {
    label: "How we build",
    title: "Six rules, learned from hardware.",
    lede: "Physics does not accept a patch. These are the rules the division works to.",
    items: [
      {
        term: "Models never hold safety authority",
        description:
          "Policies, skills, controller limits and safety hardware can each refuse a proposal.",
      },
      {
        term: "Vertical slices before breadth",
        description:
          "Perception, decision, control, action and feedback working end to end, before any single layer is widened.",
      },
      {
        term: "Hardware decides",
        description:
          "Simulation sizes the problem. Limits, calibration and reach are settled by moving the machine.",
      },
      {
        term: "Buy before build",
        description:
          "Commercial actuators, compute and sensors first. Custom hardware only when measurements justify it.",
      },
      {
        term: "Design for replacement",
        description: "Sensors, compute and actuators sit behind versioned interfaces.",
      },
      {
        term: "Serviceable from the start",
        description:
          "Replaceable modules, calibration stored with the part, and diagnostics from the beginning.",
      },
    ],
  },
  final: {
    title: "Intelligence builds the mind. Robotics builds the body.",
    lede: "The two divisions carry different responsibilities across a deliberate boundary, so the intelligence and the machine can each evolve on their own clock. PARTH is the first platform to come out of this work; the division is built for the ones that follow.",
    primary: { label: "Meet PARTH", to: "/products/parth" as const },
    secondary: { label: "Talk to us", to: "/contact" as const },
  },
};

/**
 * Research page. Research is not a third division — it is the early stage of
 * work that Intelligence and Robotics eventually carry. Areas below are
 * directions of inquiry, never programmes with results. The four open
 * questions themselves live in content.ts as RESEARCH_HYPOTHESES.
 */
export const RESEARCH_COPY = {
  hero: {
    label: "Research",
    title: "We publish questions before answers.",
    lede: "Research at CuriousDevs is where we investigate the technologies that may become future intelligence systems, robotic platforms, models and infrastructure.",
    support:
      "Nothing on this page is a result. Everything on it is a question with a method attached.",
  },
  why: {
    label: "Why we research",
    title: "Physical AI is mostly unsolved.",
    paragraphs: [
      "Most of what a machine needs in order to act in the world has not been settled.",
      "The parts that look solved on a benchmark — perception, planning, control — behave differently on a real floor, under changing light, against a part that was not presented the way the dataset assumed.",
      "Research is how we close that distance before anything is sold as a product.",
    ],
  },
  explore: {
    label: "What we explore",
    title: "Open ground, across both divisions.",
    lede: "Research is not a third division. It is the early stage of work that Intelligence and Robotics eventually carry — held to the same standard of evidence, without the obligation to succeed.",
    areas: [
      {
        index: "01",
        title: "Model behaviour",
        body: "How learned models hold up outside the conditions they were trained in.",
      },
      {
        index: "02",
        title: "World representation",
        body: "How a machine should hold a picture of a changing physical scene over time.",
      },
      {
        index: "03",
        title: "Decision under constraint",
        body: "How reasoning and planning behave when rules, limits and timing are not negotiable.",
      },
      {
        index: "04",
        title: "Embodiment",
        body: "What a body has to provide before intelligence can do anything useful with it.",
      },
      {
        index: "05",
        title: "Evaluation",
        body: "How to measure a physical system honestly, including the ways it fails.",
      },
      {
        index: "06",
        title: "Learning in service",
        body: "How a deployed system should improve from what it actually sees.",
      },
    ],
    note: "These are directions of inquiry, not programmes with results.",
  },
  method: {
    label: "How we research",
    title: "Method before result.",
    lede: "A question is only worth publishing if the way it will be answered is decided before the work starts.",
    items: [
      {
        term: "Question first",
        description:
          "The question and its method are written down in advance, so the result cannot be chosen afterwards.",
      },
      {
        term: "Measured on hardware",
        description: "Simulation sizes a problem. A physical machine settles it.",
      },
      {
        term: "Failure is a result",
        description: "A question that fails is published with the measurement that killed it.",
      },
      {
        term: "Nothing graduates early",
        description:
          "A finding moves into Intelligence or Robotics only after it has survived measurement on real hardware.",
      },
    ],
  },
  questions: {
    label: "Open questions",
    title: "Four questions we are testing now.",
    lede: "Each carries the method that will answer it and the commitment we have made about publishing what it shows. Our current questions are about execution rather than architecture.",
    note: "This list is current, not permanent. Questions are added and closed as the work moves.",
    methodLabel: "How we test it",
    commitmentLabel: "What we commit to",
  },
  honesty: {
    label: "Honesty",
    title: "What you will not find here.",
    body: "No published papers, no benchmark tables and no performance numbers from work that has not been done. When results exist they appear with the method that produced them — including the ones that miss their target.",
    commitmentTitle: "What we hold ourselves to",
  },
  leads: {
    label: "Where it leads",
    title: "A question becomes a system, or it becomes a published negative.",
    lede: "Findings that survive measurement move into CuriousDevs Intelligence or CuriousDevs Robotics. The ones that do not are published anyway.",
    track: [
      {
        index: "01",
        name: "Open question",
        body: "Written down with the method that will answer it.",
      },
      {
        index: "02",
        name: "Method",
        body: "Fixed in advance, so the result cannot be chosen later.",
      },
      {
        index: "03",
        name: "Measurement",
        body: "Run on real hardware, under the conditions that matter.",
      },
      {
        index: "04",
        name: "Published result",
        body: "Reported exactly as measured, whatever it shows.",
      },
    ],
    outcomes: [
      {
        verdict: "Survives",
        body: "The finding moves into CuriousDevs Intelligence or CuriousDevs Robotics as engineering work.",
      },
      {
        verdict: "Fails",
        body: "The question closes and the measurement that closed it is published anyway.",
      },
    ],
    primary: { label: "Explore Intelligence", to: "/intelligence" as const },
    secondary: { label: "Talk to us", to: "/contact" as const },
  },
};
