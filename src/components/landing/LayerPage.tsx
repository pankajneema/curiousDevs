import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { HumanoidDiagram, LlmDiagram } from "./visuals/ProductDiagrams";

type Layer = "Noema" | "Soma";

const data: Record<
  Layer,
  {
    eyebrow: string;
    title: string;
    intro: string;
    problem: string;
    approach: string;
    questions: string[];
    flow: string[];
    constraints: string[];
  }
> = {
  Noema: {
    eyebrow: "Noema / Intelligence layer",
    title: "Intelligence that understands.",
    intro:
      "Noema is our intelligence layer: a multimodal foundation for perception, reasoning, planning and action. It turns language, images, audio and sensor context into decisions that can be evaluated in the real world.",
    problem:
      "Useful intelligence is not just a bigger model. It has to build a grounded view of a situation, hold context, reason under uncertainty and choose an action that can be measured after it happens.",
    approach:
      "We connect multimodal inputs to a structured intelligence loop: perception creates context, reasoning forms a representation, planning selects the next move and evaluation closes the loop. The system is designed for tools, agents and real-world applications.",
    questions: [
      "What representation best connects language to the state of the world?",
      "How should uncertainty change a model's plan or request for help?",
      "Which evaluations show reliable understanding beyond a polished demo?",
    ],
    flow: [
      "TEXT / IMAGE / AUDIO",
      "PERCEPTION",
      "UNDERSTANDING",
      "REASONING",
      "PLANNING",
      "ACTION",
    ],
    constraints: [
      "Ground every answer in observable context, not text alone.",
      "Keep tool use, permissions and agent decisions inside an auditable loop.",
      "Evaluate task completion and failure modes before changing the system.",
    ],
  },
  Soma: {
    eyebrow: "Soma / Embodiment layer",
    title: "Intelligence, embodied.",
    intro:
      "Soma is our humanoid robotics platform: the physical layer that carries intelligence into a machine with vision, depth, touch, balance, dexterous hands and safe motion control.",
    problem:
      "A robot lives inside latency, friction, uncertainty and safety constraints. Between a sensor frame and a motor command there is a budget measured in milliseconds — and the environment never holds still.",
    approach:
      "We are building the complete embodied loop: sensor ingestion, edge compute, perception, planning, actuation, safety limits and telemetry. Soma is designed to sense, understand, plan, move, act and adapt in real environments.",
    questions: [
      "How should a humanoid degrade safely when perception is uncertain?",
      "Which skills transfer across homes, workplaces and changing objects?",
      "What latency budget does each stage need from camera to hand?",
    ],
    flow: ["SENSORS", "PERCEPTION", "UNDERSTAND", "PLAN", "MOVE", "ACT", "ADAPT"],
    constraints: [
      "Budget latency per stage from sensor frame to motor command.",
      "Keep hard safety limits outside the model and impossible to override.",
      "Capture episodes and telemetry so every deployment improves the next one.",
    ],
  },
};

export function LayerPage({ layer }: { layer: Layer }) {
  const d = data[layer];
  const isSoma = layer === "Soma";

  return (
    <main id="main-content" className="v3-layer-page">
      <Nav />
      <section
        className={`v3-layer-hero ${isSoma ? "v3-layer-hero-soma" : "v3-layer-hero-noema"} on-dark`}
      >
        <div className="tech-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="v3-layer-hero-inner relative z-10 mx-auto max-w-7xl">
          <div className="v3-layer-hero-copy">
            <p className="eyebrow text-orange">{d.eyebrow}</p>
            <h1>{d.title}</h1>
            <p className="v3-layer-intro">{d.intro}</p>
            <div className="v3-layer-hero-actions">
              <Link to="/contact" className="btn-primary">
                Build with {layer} <ArrowRight className="size-4" />
              </Link>
              <Link to="/technology" className="btn-outline">
                Technical overview
              </Link>
            </div>
          </div>
          <div
            className="v3-layer-hero-visual"
            role="img"
            aria-label={`${layer} system visualization`}
          >
            {isSoma ? <HumanoidDiagram /> : <LlmDiagram />}
          </div>
        </div>
        <div className="v3-layer-proof-strip relative z-10 mx-auto max-w-7xl">
          {(isSoma
            ? ["Vision & depth", "Edge compute", "Dexterous control", "Real environments"]
            : ["Multimodal input", "Grounded reasoning", "Agentic planning", "Real-world decisions"]
          ).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="v3-layer-section v3-layer-feature">
        <div className="v3-layer-grid">
          <div>
            <p className="eyebrow">
              {isSoma ? "Perceive. Understand. Act." : "Multimodal intelligence"}
            </p>
            <h2>
              {isSoma
                ? "A humanoid platform for real-world interaction."
                : "Beyond text. A richer understanding of the world."}
            </h2>
          </div>
          <p>{d.problem}</p>
        </div>
      </section>

      <section className="v3-layer-section bg-[var(--paper-2)]">
        <div className="v3-layer-grid">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>
              From input to outcome.
              <br />
              <span>Measured carefully.</span>
            </h2>
          </div>
          <div>
            <p>{d.approach}</p>
            <div
              className="v3-layer-visual"
              role="img"
              aria-label={`${layer} technical system diagram`}
            >
              {isSoma ? (
                <HumanoidDiagram className="h-full w-full" />
              ) : (
                <LlmDiagram className="h-full w-full" />
              )}
            </div>
          </div>
        </div>
        <div className="v3-constraint-grid">
          {d.constraints.map((constraint, i) => (
            <div key={constraint}>
              <span className="v3-index">0{i + 1}</span>
              <p>{constraint}</p>
            </div>
          ))}
        </div>
        <div className="v3-layer-flow">
          {d.flow.map((item, i) => (
            <div key={item}>
              <span className="v3-node" />
              <span>{item}</span>
              {i < d.flow.length - 1 && <i />}
            </div>
          ))}
        </div>
      </section>

      <section className="v3-layer-section">
        <p className="eyebrow">Open questions</p>
        <h2>What we are still learning.</h2>
        <div className="v3-question-grid">
          {d.questions.map((q, i) => (
            <div key={q}>
              <span className="v3-index">0{i + 1}</span>
              <p>{q}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="v3-layer-cta on-dark">
        <p className="eyebrow text-orange">Noema × Soma</p>
        <h2>
          From intelligence
          <br />
          <span>to action.</span>
        </h2>
        <p>
          {isSoma
            ? "Noema gives Soma the intelligence to understand. Soma gives that intelligence a body capable of acting in the real world."
            : "Noema handles cognition and reasoning. Soma gives that intelligence a physical body capable of interacting with the real world."}
        </p>
        <Link to={isSoma ? "/technology/noema" : "/technology/soma"} className="btn-primary">
          Explore {isSoma ? "Noema" : "Soma"} <ArrowRight className="size-4" />
        </Link>
      </section>
      <Footer />
    </main>
  );
}
