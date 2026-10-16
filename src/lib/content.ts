/**
 * Shared types, the Physical AI stack used on /lab, and site navigation.
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

export type NavLink = { label: string; to: string; hash?: string };
export type NavItem = NavLink | { label: string; children: (NavLink & { note: string })[] };

export const NAV: NavItem[] = [
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Work", to: "/work" },
  { label: "Research", to: "/research" },
  { label: "Physical AI", to: "/lab" },
  { label: "Company", to: "/company" },
];
