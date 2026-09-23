/**
 * CuriousDevs technical content model.
 *
 * Source of truth: the OJAS Master Product Architecture & Engineering Guide and
 * the PARTH Summary Book. Nothing here describes a planned capability as
 * available, and no figure is presented as a measured result.
 *
 *   OJAS  = intelligence. The execution system between models and machines.
 *   PARTH = embodiment. The humanoid robot that OJAS runs on.
 *   Physical AI = intelligence becoming action, in a closed loop.
 */

export type Status = "built" | "building" | "target" | "concept";

export const STATUS_LABEL: Record<Status, string> = {
  built: "Baseline",
  building: "In engineering",
  target: "Engineering target",
  concept: "Research",
};

export const STATUS_NOTE: Record<Status, string> = {
  built: "Design decision adopted.",
  building: "In active engineering.",
  target: "Engineering target with a defined measurement method.",
  concept: "Long-term research direction.",
};

/* ---------------------------------- Company --------------------------------- */

export const COMPANY = {
  name: "CuriousDevs",
  line: "Intelligence → Runtime → Physical AI",
  location: "Noida, Uttar Pradesh, India",
  positioning:
    "CuriousDevs builds OJAS, an intelligence system for Edge AI and Physical AI, and PARTH, the humanoid robot it is embodied in.",
  refusal:
    "We do not describe a planned capability as available. A capability counts only once it has recorded, repeatable test evidence.",
};

export const RELATIONSHIP =
  "OJAS decides what to do. PARTH decides how the body moves. Models never drive motors directly, and the interface between the two is typed, versioned and auditable — which is why the intelligence and the body can evolve independently.";

export const INTERLOCK =
  "Independent safety hardware — an emergency-stop chain and Safe Torque Off to every drive — sits below every software layer. Lower layers hold more authority and can always override the layers above them. No certification is claimed.";

/* ------------------------------ Physical AI Stack --------------------------- */

export type StackLayer = {
  id: string;
  index: string;
  name: string;
  role: string;
  detail: string;
  owner: string;
  emphasis?: boolean;
};

export const PHYSICAL_AI_STACK: StackLayer[] = [
  {
    id: "applications",
    index: "05",
    name: "Applications",
    role: "Deliver a specific physical task",
    detail:
      "A task, a workcell and a goal, expressed as an operator request or a task API call. Applications describe intent; they do not command motors.",
    owner: "Built on OJAS",
  },
  {
    id: "models",
    index: "04",
    name: "Models",
    role: "Supply learned intelligence",
    detail:
      "A CuriousDevs model, a third-party model or a customer model runs behind the same contract, chosen per deployment. OJAS Runtime never depends on any one of them.",
    owner: "Model-agnostic",
  },
  {
    id: "runtime",
    index: "03",
    name: "OJAS Runtime",
    role: "Turn model output into controlled action",
    detail:
      "Model interface, intelligence execution layer and runtime services. Perception, world state, reasoning, planning, memory, rules and policies, tools and actions, safety and permissions, telemetry and device abstraction.",
    owner: "CuriousDevs Intelligence",
    emphasis: true,
  },
  {
    id: "compute",
    index: "02",
    name: "Edge compute",
    role: "Execute the loop next to the machine",
    detail:
      "Existing edge platforms — NVIDIA Jetson class, Raspberry Pi, x86 with a GPU, other accelerators. Hardware is the substrate below the contract, not the identity of OJAS.",
    owner: "Existing hardware first",
  },
  {
    id: "io",
    index: "01",
    name: "Sensors and actuators",
    role: "Sense and move",
    detail:
      "Cameras, depth and inertial sensing, force/torque sensing, motors, arms, wheels and grippers, reached through a stable device abstraction.",
    owner: "Physical I/O",
  },
];

/* ------------------------------- The OJAS loop ------------------------------ */

export type LoopStage = {
  id: string;
  index: string;
  name: string;
  summary: string;
  detail: string;
  gate?: boolean;
};

export const OJAS_LOOP: LoopStage[] = [
  {
    id: "perceive",
    index: "01",
    name: "Perceive",
    summary: "Sensor input becomes structured observation",
    detail:
      "Camera frames and sensor streams are read through the sensor abstraction and turned into detections, poses and measurements the rest of the loop can reason over. Preprocessing is shared with the training path rather than written twice.",
  },
  {
    id: "world",
    index: "02",
    name: "World state",
    summary: "What is true right now, and what was true before",
    detail:
      "Observations are fused into a single current picture of the scene and the machine, held alongside memory of the task so far. Decisions are made against this state, never against a raw frame in isolation.",
  },
  {
    id: "reason",
    index: "03",
    name: "Reason and plan",
    summary: "The model proposes; the planner shapes it into intent",
    detail:
      "The model runs against the current state through an explicit input/output contract and returns a proposal. Planning turns that proposal into an ordered, parameterised intent expressed as typed requests and available tools.",
  },
  {
    id: "policy",
    index: "04",
    name: "Policy check",
    summary: "Nothing executes until it is authorised",
    detail:
      "Rules and policies, permissions and forbidden actions are evaluated against the proposal and the world state. A proposal that fails any check is refused and recorded. This layer contains no machine learning.",
    gate: true,
  },
  {
    id: "act",
    index: "05",
    name: "Act",
    summary: "Approved intent reaches the device abstraction",
    detail:
      "Only authorised actions are executed, through stable device interfaces rather than hardware-specific code scattered through the system. Independent safety hardware remains below this step at all times.",
  },
  {
    id: "observe",
    index: "06",
    name: "Observe",
    summary: "The result becomes the next cycle's input",
    detail:
      "Outcomes, policy decisions, timings and failures are recorded through telemetry, then fed back as fresh observation. OJAS is a continuous cycle, not a one-shot inference call.",
  },
];

export const LOOP_NOTE =
  "A trained model is not a Physical AI system. Acting in the physical world means combining model output with live sensing, current world state, explicit rules and a controlled way to operate real devices — continuously, on constrained edge hardware.";

/* --------------------------- OJAS Runtime subsystems ------------------------ */

export type Subsystem = {
  id: string;
  index: string;
  name: string;
  responsibility: string;
  isolation: string;
  hard: string;
  detail: string[];
};

export const SUBSYSTEMS: Subsystem[] = [
  {
    id: "model-interface",
    index: "01",
    name: "Model interface",
    responsibility: "Load, describe and run models behind one explicit contract.",
    isolation: "Backend-agnostic boundary",
    hard: "Different artifact formats, accelerators and precision behaviour all have to look the same to the loop.",
    detail: [
      "PyTorch (.pt) is the initial model artifact; the interface is written so it is not a permanent limitation.",
      "ONNX, TensorRT and other backends are planned as additional backends behind the same contract.",
      "Every model declares an input/output contract, so inputs are validated and results are typed regardless of backend.",
      "Model lifecycle — versioning, loading, replacement — belongs here, not in application code.",
    ],
  },
  {
    id: "execution",
    index: "02",
    name: "Intelligence execution layer",
    responsibility:
      "Perception, world state, reasoning, planning, memory, tools and actions — the loop itself.",
    isolation: "Owns the model-to-action execution contract",
    hard: "Keeping state coherent while the loop runs continuously on constrained compute.",
    detail: [
      "Perception turns sensor input into structured observation.",
      "World state holds the current situation; memory holds what has happened in the task.",
      "Reasoning and planning convert a model proposal into ordered, parameterised intent.",
      "Tools and actions are the declared, typed things the system is able to do.",
    ],
  },
  {
    id: "safety",
    index: "03",
    name: "Safety and permissions",
    responsibility: "Authorise or refuse every proposed action before execution.",
    isolation: "Evaluated independently of the model",
    hard: "It has to be simple enough to audit line by line, and still expressive enough to be useful.",
    detail: [
      "Rules and policies are explicit and declared, not implied by model behaviour.",
      "Forbidden actions, task constraints and environment constraints are all first-class.",
      "Refusals are recorded with their reason, so behaviour can be audited and reproduced.",
      "Software authority sits above independent safety hardware, never instead of it.",
    ],
  },
  {
    id: "services",
    index: "04",
    name: "Runtime services",
    responsibility: "Telemetry, configuration, packaging validation and device abstraction.",
    isolation: "Services around the loop",
    hard: "Observability has to be complete without becoming the thing that slows the loop down.",
    detail: [
      "Actions, policy decisions and failures are recorded so behaviour can be replayed.",
      "Packages contain executable code, so a package is validated before it is loaded.",
      "Device abstraction hides platform-specific implementation behind stable interfaces.",
      "Configuration is declarative per deployment and held under version control.",
    ],
  },
];

export const OJAS_PACKAGE = [
  {
    file: "agent.ojas/",
    description: "The OJAS package — the deployable artifact, not a bare model file.",
  },
  { file: "model", description: "The model artifact plus its declared input/output contract." },
  {
    file: "rules",
    description: "Policies, permissions and forbidden actions for this deployment.",
  },
  {
    file: "tools · actions",
    description: "The executable capabilities the runtime is allowed to invoke.",
  },
  { file: "config", description: "Declarative configuration for the machine and the workcell." },
  { file: "metadata", description: "Versioning and provenance, so a run can be reproduced." },
];

export const PACKAGE_NOTE =
  "A package is executable, so the runtime validates it before loading. The unit of deployment is the package: model, rules, tools, actions, configuration and metadata together.";

export const DESIGN_PRINCIPLES = [
  {
    n: "01",
    title: "The model proposes; OJAS decides",
    body: "Model output is a proposal, interpreted against world state and policy before execution.",
  },
  {
    n: "02",
    title: "Clear product boundaries",
    body: "Model, runtime and hardware are separate layers with explicit contracts. None defines the others.",
  },
  {
    n: "03",
    title: "Closed loop, not one-shot inference",
    body: "A continuous cycle of perceiving, deciding, acting and observing.",
  },
  {
    n: "04",
    title: "Existing hardware first",
    body: "OJAS is validated on available edge compute. Custom compute is evidence-gated.",
  },
  {
    n: "05",
    title: "Prove one loop before widening it",
    body: "One reliable end-to-end loop comes before more sensors, models and hardware targets.",
  },
];

export const RUNTIME_CYCLE = [
  "Read sensor and device state through the abstraction layer",
  "Build perception output from the current frames and signals",
  "Update world state and task memory",
  "Run the model against the current state through its declared contract",
  "Plan: turn the proposal into a typed, parameterised request",
  "Evaluate rules, permissions and constraints; refuse and record on failure",
  "Execute the authorised action; emit telemetry; observe the result",
];

export const VALIDATION_CHECKS = [
  {
    check: "Contract validity",
    rejects: "Output that does not match the model's declared output contract",
  },
  {
    check: "Numerical validity",
    rejects: "Non-finite values and values outside any physical range",
  },
  { check: "Authorisation", rejects: "Actions the deployment's policy does not permit" },
  {
    check: "Forbidden actions",
    rejects: "Explicitly prohibited behaviour, regardless of confidence",
  },
  {
    check: "Task and environment constraints",
    rejects: "Actions valid in general but not in this workcell or this task",
  },
  { check: "Staleness", rejects: "Intent computed from observations older than the loop allows" },
];

export const MVP_MEASURES = [
  {
    measure: "One closed loop, end to end",
    method:
      "Model input, inference, policy check, action and observation in a single continuous cycle",
  },
  {
    measure: "Policy refusals behave correctly",
    method: "Prohibited actions are refused, recorded with reason, and never executed",
  },
  {
    measure: "Recovery after failure",
    method: "Supervision returns the system to a defined state",
  },
  {
    measure: "Run-to-run reproducibility",
    method: "The same package and inputs produce results that can be repeated and audited",
  },
  {
    measure: "Observable behaviour",
    method: "Actions, policy decisions and failures are recorded through telemetry",
  },
];

export const MVP_NOTE =
  "Quantitative targets are set in the MVP specification and published only once they have been measured. Nothing on this site restates a target as a result.";

export const HARDWARE_STRATEGY = {
  now: "OJAS runs on existing edge platforms — Jetson class modules, Raspberry Pi, x86 with a GPU — because the execution layer, not the silicon, is what has to be proven first.",
  later:
    "Proprietary compute is a deliberately late option. It becomes a strategic question only if measured OJAS workloads show repeated limitations that existing platforms cannot meet.",
  sequence: [
    "OJAS Runtime stable",
    "Real applications running",
    "Benchmarks and measurements",
    "Repeated bottlenecks identified",
    "Requirements defined — power, latency, memory, I/O, thermal, cost",
  ],
};

export const OJAS_IS_NOT = [
  {
    claim: "Not only a model",
    body: "OJAS is the execution system first, and it stays model-agnostic. A CuriousDevs model, a third-party model or your own runs behind the same contract, chosen to suit the deployment rather than required by it.",
  },
  {
    claim: "Not general-purpose autonomy",
    body: "A human defines the task, the workcell and the rules. OJAS executes inside them.",
  },
  {
    claim: "Not a safety certification",
    body: "Policy checking reduces risk. It is not compliance with any standard and never replaces independent safety hardware.",
  },
  {
    claim: "Not hardware",
    body: "Existing edge compute is used for validation. Custom compute is an evidence-gated option, not part of the identity of OJAS.",
  },
  {
    claim: "Not measured at scale",
    body: "Figures on this site are engineering targets with stated measurement methods, published as results only once measured.",
  },
];

/* ------------------------------- Failure model ------------------------------ */

export type FailureClass = {
  id: string;
  name: string;
  looksLike: string;
  consequence: string;
  caughtBy: string;
  severity: 1 | 2 | 3;
};

export const FAILURE_CLASSES: FailureClass[] = [
  {
    id: "contract",
    name: "Contract violation",
    looksLike: "Output that does not match the model's declared contract",
    consequence: "Undefined downstream behaviour",
    caughtBy: "Model interface — typed input/output validation",
    severity: 2,
  },
  {
    id: "numerical",
    name: "Numerical",
    looksLike: "Non-finite values, or values outside any physical range",
    consequence: "Undefined actuator behaviour",
    caughtBy: "Policy layer — numerical validity check",
    severity: 2,
  },
  {
    id: "unauthorised",
    name: "Unauthorised action",
    looksLike: "A plausible action the deployment is not permitted to take",
    consequence: "Motion outside the agreed envelope",
    caughtBy: "Rules, permissions and forbidden actions",
    severity: 3,
  },
  {
    id: "confident-wrong",
    name: "Confident wrong action",
    looksLike: "A smooth, plausible action toward the wrong outcome",
    consequence: "A wrong result that nothing in the numbers flags",
    caughtBy: "Outcome recording and failure classification",
    severity: 3,
  },
  {
    id: "timing",
    name: "Stale intent",
    looksLike: "A cycle runs long; state is out of date by the time the action lands",
    consequence: "Control acting on a world that has moved on",
    caughtBy: "Timing instrumentation and the staleness check",
    severity: 2,
  },
  {
    id: "drift",
    name: "Silent drift",
    looksLike: "Behaviour degrades gradually as conditions change",
    consequence: "Falling success rate with no alarm",
    caughtBy: "Drift detection against a commissioning baseline",
    severity: 3,
  },
];

export const FAILURE_ARITHMETIC =
  "A model emits numbers, not intentions. It carries no notion of what is legal, safe or currently possible — so everything that decides whether an action may execute has to live outside the model. These are the classes OJAS is designed against.";

export const DRIFT_CRITERIA = [
  {
    criterion: "Detects induced degradation — lighting change, fixture offset, changed part finish",
    target: "Measured against a recorded baseline",
  },
  {
    criterion: "False alerts under stable conditions",
    target: "Low enough that alerts stay trusted",
  },
];

/* ------------------------------ Data and learning --------------------------- */

export const PIPELINE = [
  {
    n: "01",
    stage: "Demonstration capture",
    body: "An operator drives the machine through the task. Frames, states and outcomes are recorded synchronously.",
  },
  {
    n: "02",
    stage: "Episode storage",
    body: "Episodes are stored in an open, ecosystem-compatible layout rather than a private schema.",
  },
  {
    n: "03",
    stage: "Baseline evaluation",
    body: "The base model is evaluated on the task before any tuning, under real conditions. The number is published whatever it shows.",
  },
  {
    n: "04",
    stage: "Tuning",
    body: "The base model is tuned on the captured episodes, reproducibly from raw episodes to checkpoint.",
  },
  {
    n: "05",
    stage: "Edge build",
    body: "The checkpoint is converted to an edge-optimised engine, with the accuracy delta quantified rather than assumed.",
  },
  {
    n: "06",
    stage: "Packaged deployment",
    body: "Model, rules, tools, actions and configuration ship together as one validated package. Rollback is a single command.",
  },
  {
    n: "07",
    stage: "Telemetry",
    body: "Actions, policy decisions, timings and failures are recorded in the field and classified.",
  },
  {
    n: "08",
    stage: "Learning",
    body: "Recorded deployment data feeds the next round of tuning. This is the mechanism by which the system improves.",
  },
];

/* ---------------------------------- PARTH ----------------------------------- */

export const PARTH = {
  definition:
    "PARTH is CuriousDevs' humanoid robot: a human-scale, electrically actuated robot being developed to pick, carry and place objects in structured indoor spaces built for people. Its body and real-time control are built by CuriousDevs Robotics; its intelligence execution is provided by OJAS.",
  vision: "Useful humanoid robots that work safely in the spaces people already use.",
  whyHuman:
    "Human form fits workplaces sized for human reach, walking and tools. The price is difficulty: balance, actuators, safety around people and cost are all harder than for a fixed or wheeled machine. Human shape is chosen for redeployability, not novelty.",
  status:
    "PARTH is at the architecture-definition stage. No capability is claimed as demonstrated, no specification is final, and the figures on this page are recommended engineering targets rather than results.",
  principles: [
    {
      title: "Models never hold safety authority",
      body: "Policies, skills, controller limits and safety hardware can each refuse a model's proposal.",
    },
    {
      title: "Build vertical slices",
      body: "Perception, decision, control, action and feedback end to end, before widening any single layer.",
    },
    {
      title: "Design for replacement",
      body: "Models, sensors, compute and actuators sit behind versioned interfaces.",
    },
    {
      title: "Buy before build",
      body: "Commercial actuators, compute and sensors first. Custom hardware only when measurements justify it.",
    },
    {
      title: "Serviceability built in",
      body: "Replaceable modules, calibration stored with the part, diagnostics from the beginning.",
    },
    {
      title: "Simulation accelerates; hardware decides",
      body: "Only physical tests establish capability.",
    },
  ],
  firstUseCase:
    "The intended first application is object and tote pick-and-place in a zoned indoor workcell: known objects, defined pick and place regions, level floors, and people kept outside the robot's working zone during autonomous operation. It exercises the whole stack — perception, decision, navigation, manipulation and safety — without requiring general-purpose autonomy.",
  firstSlice: [
    "Task received",
    "Identify object",
    "Position itself",
    "Reach",
    "Grasp",
    "Transport",
    "Place and verify",
    "Return to a safe state",
  ],
  configurations: [
    {
      name: "Stationary",
      body: "Upper body on a fixed stand. Manipulation, perception and the full software path, with no balance problem in the way.",
    },
    {
      name: "Wheeled",
      body: "The same upper body on a wheeled base. Indoor navigation and mobile manipulation.",
    },
    {
      name: "Bipedal",
      body: "Two six-degree-of-freedom legs for full humanoid mobility on level floors.",
    },
  ],
  configurationNote:
    "All three configurations share one head, torso, arms, hands, compute, software and actuator families. Baseline kinematics: neck 2, waist 1–3, each arm 7, each leg 6 — 29 to 31 degrees of freedom excluding hands.",
  users: [
    { user: "CuriousDevs R&D", why: "PARTH is the embodied validation platform for OJAS" },
    {
      user: "Industrial and logistics operators",
      why: "Structured indoor sites with repetitive handling work",
    },
    {
      user: "Research and academic partners",
      why: "An embodied-AI platform with shared benchmarks",
    },
  ],
  excluded:
    "Homes and eldercare are explicitly out of scope: unstructured spaces with close physical contact are not a responsible first target. Service logistics remains research, not a commitment.",
};

export type AnatomyNode = {
  id: string;
  name: string;
  spec: string;
  note: string;
  x: number;
  y: number;
  group: "sensing" | "manipulation" | "locomotion" | "power";
};

export const PARTH_ANATOMY: AnatomyNode[] = [
  {
    id: "head",
    name: "Head module",
    spec: "Sensor visor · microphones",
    note: "Stereo and RGB-D cameras sit behind the visor and connect to the AI compute tier. The head is a sensing module, not a face.",
    x: 50,
    y: 9,
    group: "sensing",
  },
  {
    id: "neck",
    name: "Neck",
    spec: "2 DOF — pan, tilt",
    note: "Aims the sensor visor so perception can look where the task is, rather than where the torso happens to face.",
    x: 50,
    y: 18,
    group: "sensing",
  },
  {
    id: "shoulder",
    name: "Shoulder",
    spec: "3 DOF",
    note: "Each arm carries seven degrees of freedom in total, giving redundancy for reaching around obstacles.",
    x: 30,
    y: 26,
    group: "manipulation",
  },
  {
    id: "elbow",
    name: "Elbow",
    spec: "1 DOF",
    note: "Strain-wave reducers are the baseline for arms and wrists, where precision matters more than raw dynamics.",
    x: 25,
    y: 38,
    group: "manipulation",
  },
  {
    id: "wrist",
    name: "Wrist",
    spec: "3 DOF · force/torque sensor",
    note: "Force/torque sensing at the wrist is what makes contact-rich handling measurable instead of guessed.",
    x: 23,
    y: 49,
    group: "manipulation",
  },
  {
    id: "hand",
    name: "Hand / end-effector",
    spec: "Commercial gripper, multi-finger later",
    note: "A commercial gripper is the baseline. A multi-finger hand is a later programme, not a current capability.",
    x: 22,
    y: 58,
    group: "manipulation",
  },
  {
    id: "waist",
    name: "Waist",
    spec: "1–3 DOF",
    note: "Torso articulation extends reach to low totes and high shelves without moving the whole machine.",
    x: 50,
    y: 44,
    group: "locomotion",
  },
  {
    id: "hip",
    name: "Hip",
    spec: "3 DOF",
    note: "Quasi-direct-drive actuation is the baseline for legs, where dynamics and impact tolerance dominate.",
    x: 58,
    y: 56,
    group: "locomotion",
  },
  {
    id: "knee",
    name: "Knee",
    spec: "1 DOF",
    note: "Each leg carries six degrees of freedom. Torque values are sized from simulation with margin, then confirmed on hardware.",
    x: 61,
    y: 70,
    group: "locomotion",
  },
  {
    id: "ankle",
    name: "Ankle",
    spec: "2 DOF",
    note: "Ankle control and foot contact sensing are what turn a standing machine into a walking one.",
    x: 62,
    y: 83,
    group: "locomotion",
  },
  {
    id: "foot",
    name: "Foot",
    spec: "Contact and force/torque sensing",
    note: "Feet report contact state to whole-body control at real-time rates, below the intelligence layer entirely.",
    x: 63,
    y: 92,
    group: "locomotion",
  },
  {
    id: "battery",
    name: "Battery",
    spec: "Hot-swap pack + BMS",
    note: "Rear-mounted and hot-swappable, with a battery management system. Runtime is a target, not a measured figure.",
    x: 72,
    y: 36,
    group: "power",
  },
  {
    id: "status",
    name: "Status light",
    spec: "Externally visible state",
    note: "Anyone nearby can see what the robot believes it is doing. Legibility is a safety feature, not decoration.",
    x: 38,
    y: 14,
    group: "power",
  },
];

export const ANATOMY_GROUPS: { id: AnatomyNode["group"]; label: string }[] = [
  { id: "sensing", label: "Sensing" },
  { id: "manipulation", label: "Manipulation" },
  { id: "locomotion", label: "Locomotion" },
  { id: "power", label: "Power and state" },
];

export const PARTH_TIERS = [
  {
    tier: "Tier 1",
    name: "AI compute",
    body: "Runs OJAS: perception, world state, reasoning, planning and policy. Cameras connect here.",
  },
  {
    tier: "Tier 2",
    name: "Real-time control",
    body: "Skills, motion planning and whole-body control on a deterministic controller, with distributed clocks over EtherCAT.",
  },
  {
    tier: "Tier 3",
    name: "Actuator drivers",
    body: "One driver per joint: current, velocity and position loops, Safe Torque Off input, temperature monitoring.",
  },
  {
    tier: "Tier 4",
    name: "Safety controller",
    body: "Independent of everything above it: emergency-stop chain, watchdogs and heartbeats, Safe Torque Off to all drives, main contactor.",
  },
];

export const PARTH_SUBSYSTEMS = [
  {
    subsystem: "Actuators",
    approach:
      "Integrated modules with field-oriented control, dual encoders, Safe Torque Off input and EtherCAT. Quasi-direct drive for legs; strain-wave reducers for arms and wrists.",
  },
  {
    subsystem: "Hands",
    approach:
      "A commercial gripper as the baseline, with a multi-finger hand as later work rather than a claim.",
  },
  {
    subsystem: "Perception",
    approach:
      "Stereo and RGB-D cameras behind the head visor, with inertial, encoder and force/torque signals reaching the real-time tier.",
  },
  {
    subsystem: "Control",
    approach:
      "Skills, motion planning, whole-body control and learned locomotion, always under supervision.",
  },
  {
    subsystem: "Power",
    approach:
      "Hot-swap battery pack with a battery management system; tethered operation while on a stand.",
  },
  {
    subsystem: "Serviceability",
    approach:
      "Replaceable modules, calibration stored with the part, and diagnostics designed in from the start.",
  },
];

export const PARTH_TARGETS = [
  {
    parameter: "Height",
    target: "1.65–1.75 m",
    basis: "Work surfaces and shelving in human spaces",
  },
  {
    parameter: "Mass",
    target: "TBD",
    basis: "Set at design review once actuator selection is fixed",
  },
  {
    parameter: "Payload",
    target: "TBD",
    basis: "Sized from simulation with margin, confirmed on hardware",
  },
  { parameter: "Runtime", target: "TBD", basis: "Depends on duty cycle and pack selection" },
  {
    parameter: "Degrees of freedom",
    target: "29–31 excluding hands",
    basis: "Neck 2 · waist 1–3 · arms 7 each · legs 6 each",
  },
];

export const PARTH_TARGETS_NOTE =
  "No specification is final. Each parameter stays open until design review, and a recommended target is an engineering starting point — not a result, and not a promise.";

export type AuthorityLayer = {
  index: string;
  name: string;
  owner: string;
  authority: string;
  body: string;
  hardware?: boolean;
};

export const PARTH_AUTHORITY: AuthorityLayer[] = [
  {
    index: "05",
    name: "Model layer",
    owner: "Models",
    authority: "Proposes intent only",
    body: "No authority over safety-critical actuation. Every layer below can refuse what it proposes.",
  },
  {
    index: "04",
    name: "Policy layer",
    owner: "OJAS",
    authority: "Authorises or refuses",
    body: "Authorisation, forbidden actions, task and environment constraints, evaluated before anything is sent down.",
  },
  {
    index: "03",
    name: "Skill layer",
    owner: "PARTH Robotics",
    authority: "Validates parameters",
    body: "Preconditions, parameter ranges and timeouts checked before a skill is allowed to execute.",
  },
  {
    index: "02",
    name: "Controller limits",
    owner: "Real-time control",
    authority: "Clamps and stops",
    body: "Joint position, velocity, acceleration, current, thermal and workspace limits enforced deterministically.",
  },
  {
    index: "01",
    name: "Safety hardware",
    owner: "Independent",
    authority: "Removes power",
    body: "Emergency-stop chain, watchdogs and Safe Torque Off to every drive, through a main contactor, independent of software state.",
    hardware: true,
  },
];

export const PARTH_SAFETY_NOTE =
  "No single failure — in a model, a program or a component — should cause uncontrolled motion. Safe states are defined per configuration: move to a stable posture where possible, then remove torque. Machines under test run on a gantry or harness so power can be removed without fall damage.";

export const PARTH_STANDARDS =
  "The safety case follows ISO 12100 risk assessment, ISO 10218 and ISO/TS 15066, and the functional-safety standards ISO 13849-1 and IEC 62061. It tracks ISO/CD 25785-1, the draft standard for actively balancing robots including bipeds, currently under committee review. No certification is claimed.";

export const PARTH_GATES = [
  {
    gate: "Interface",
    body: "The capability fits the typed contract between OJAS and PARTH control.",
  },
  { gate: "Safety", body: "It cannot produce motion that the layers below are unable to refuse." },
  {
    gate: "Performance",
    body: "It meets the measured requirement on real hardware, not in simulation.",
  },
  { gate: "Reliability", body: "It holds up under repeated, recorded testing." },
];

export const PARTH_GATES_NOTE =
  "OJAS is developed and validated independently, on existing hardware and third-party robots. An OJAS capability becomes a PARTH capability only after passing all four gates.";

export const PARTH_IS_NOT = [
  {
    claim: "Not a released design",
    body: "PARTH is at architecture-definition stage. Illustrations are configurations under design, not products.",
  },
  {
    claim: "Not a demonstrated capability",
    body: "No capability in the current edition is claimed as demonstrated.",
  },
  {
    claim: "Not a finalised specification",
    body: "Height, mass, payload, runtime and speed remain open until design review.",
  },
  {
    claim: "Not certified",
    body: "The safety architecture follows recognised standards. It does not claim certification against them.",
  },
  {
    claim: "Not a home robot",
    body: "Unstructured domestic spaces and close physical contact are explicitly out of scope.",
  },
];

/* -------------------------------- Engagement -------------------------------- */

export const INTEGRATION_REQUIREMENTS = [
  {
    item: "Programmatic state read and command access",
    why: "The device abstraction cannot be satisfied without it",
  },
  {
    item: "Camera mounting points — scene and wrist",
    why: "A wrist view materially improves grasp precision",
  },
  {
    item: "An emergency-stop circuit that removes actuator power",
    why: "Non-negotiable; we will not run autonomously without it",
  },
  {
    item: "A commissioning window for calibration and limit setting",
    why: "Limits are measured physically, not calculated",
  },
  {
    item: "Teleoperation access for demonstration capture",
    why: "The model is tuned on your own task",
  },
];

export const OPERATIONS = {
  installation:
    "Edge compute is provisioned with a standard image, and OJAS runs as a supervised service that starts on power-up and restarts on failure. Commissioning sets limits, workspace bounds and the behavioural baseline. The emergency-stop circuit is verified with the software running, before any autonomous operation.",
  surface:
    "A local interface provides camera feed, task selection, event log and stop control, as a separate process on the same machine. If the interface or the network fails, the machine continues and only visibility is lost.",
  updates: [
    {
      artefact: "OJAS runtime",
      delivery: "Package or container update",
      reversibility: "Pinned versions; previous release retained",
    },
    {
      artefact: "OJAS package",
      delivery: "Validated package, built for the target",
      reversibility: "Rollback is a single command",
    },
    {
      artefact: "Configuration",
      delivery: "Declarative file per deployment",
      reversibility: "Under version control",
    },
  ],
  support:
    "Deployed robotics needs physical presence. A moved camera, a worn gripper or a changed part finish is not diagnosable remotely with confidence — which is exactly why telemetry exists, so a site visit begins with an answer rather than a question.",
};

/* ---------------------------------- Research -------------------------------- */

export const RESEARCH_HYPOTHESES = [
  {
    id: "h1",
    status: "building" as Status,
    question:
      "How do published models behave under real working conditions — varying light, dust, unfixtured presentation, frequent changeover?",
    method:
      "Baseline evaluation of the base model on the task under real conditions, before any tuning.",
    commitment:
      "We have not verified this and do not present it as established. The number is published whatever it shows.",
  },
  {
    id: "h2",
    status: "building" as Status,
    question:
      "Can an explicit policy layer refuse unsafe proposals at loop rate without breaking the timing budget?",
    method:
      "Policy evaluation on every cycle, with loop timing instrumented at the extremes from the first build.",
    commitment:
      "If timing at the extremes exceeds budget, the hot path is reimplemented behind unchanged interfaces.",
  },
  {
    id: "h3",
    status: "target" as Status,
    question:
      "Is gradual degradation detectable against a commissioning baseline before it becomes a defect?",
    method: "Rolling outcome rate against baseline, with deliberately induced degradation.",
    commitment:
      "Detection speed and false-alert rate are both reported; a detector nobody trusts is worse than none.",
  },
  {
    id: "h4",
    status: "target" as Status,
    question: "Does the device abstraction actually reduce the cost of reaching a second machine?",
    method: "Engineering hours recorded against the first and second machine integrations.",
    commitment:
      "If the second integration is not materially cheaper, the abstraction has failed and we say so.",
  },
];

export const STANDING_COMMITMENT =
  "We do not fabricate results, benchmarks or publications. Simulation results are labelled as simulation. Design intent is labelled as design intent. Where a target is missed, the measured figure is published with its failure taxonomy.";

/* --------------------------------- Navigation ------------------------------- */

export type NavLink = { label: string; to: string };
export type NavItem = NavLink | { label: string; children: (NavLink & { note: string })[] };

export const NAV: NavItem[] = [
  { label: "Intelligence", to: "/intelligence" },
  { label: "Robotics", to: "/robotics" },
  { label: "Research", to: "/research" },
  {
    label: "Products",
    children: [
      { label: "OJAS", to: "/products/ojas", note: "The intelligence system" },
      { label: "PARTH", to: "/products/parth", note: "The humanoid robot" },
    ],
  },
  { label: "Company", to: "/company" },
];
