import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { DomainVisual } from "./visuals/DomainVisual";
import { Footer } from "./Footer";
import { IsoStack } from "./visuals/IsoStack";
import { HumanoidDiagram } from "./visuals/ProductDiagrams";

function SystemFlow() {
  const steps = [
    "DATA",
    "MODEL",
    "RETRIEVAL / TOOLS",
    "AGENT",
    "EVALUATION",
    "SECURITY",
    "OBSERVABILITY",
    "PRODUCTION",
  ];
  return (
    <div
      className="v3-flow"
      role="img"
      aria-label="Production AI system flow from data to production"
    >
      {steps.map((step, i) => (
        <div className="v3-flow-step" key={step}>
          <span className="v3-node" />
          <span>{step}</span>
          {i < steps.length - 1 && <span className="v3-flow-line" />}
        </div>
      ))}
    </div>
  );
}

const pillars: {
  index: string;
  name: string;
  tech: string;
  body: string;
  visual: "ai-engineering" | "intelligent-systems" | "robotics" | "deeptech";
  href?: string;
}[] = [
  {
    index: "01",
    name: "AI Engineering",
    tech: "LLMs · RAG · Agents · Multimodal · Evaluation · Security · Observability · Infrastructure",
    body: "Intelligent software that survives production.",
    visual: "ai-engineering",
  },
  {
    index: "02",
    name: "Intelligent Systems",
    tech: "Computer Vision · Edge AI · Embedded Intelligence · Sensors · Real-Time Inference · Decision Systems",
    body: "Moving intelligence to where the decision happens.",
    visual: "intelligent-systems",
  },
  {
    index: "03",
    name: "DeepTech",
    tech: "AI Hardware · Accelerators · Embedded Systems · Advanced Sensors · Physical AI · Neurotechnology · BCI",
    body: "Exploring the deeper technologies that expand what intelligent systems can do.",
    visual: "deeptech",
  },
  {
    index: "04",
    name: "Robotics",
    tech: "Perception · Planning · Control · Manipulation · Navigation · Autonomy · Physical AI",
    body: "Extending intelligence into machines that perceive and act.",
    visual: "robotics",
  },
];

const process = [
  ["Research", "Understand the problem and what has already been tried."],
  ["Prototype", "Build the smallest thing that tests the risky assumption."],
  ["Engineer", "Turn the prototype into a system that handles real inputs."],
  ["Evaluate", "Measure against a fixed test set. Numbers before opinions."],
  ["Operate", "Deploy, observe, and improve on evidence from production."],
];

export function V3Home() {
  return (
    <main id="main-content" className="v3-home">
      <section className="v3-hero on-dark">
        <div className="tech-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="v3-hero-inner">
          <div className="v3-hero-copy">
            <p className="eyebrow text-orange">Research · Engineering · Real-world impact</p>
            <h1>
              From Research to <span>Real-World Technology.</span>
            </h1>
            <p className="v3-lead">
              We research, engineer and deploy AI systems that work in production — and we are
              building the technology that connects that intelligence to the physical world.
            </p>
            <div className="v3-actions">
              <Link to="/contact" className="btn-primary">
                Start a Project <ArrowRight className="size-4" />
              </Link>
              <Link to="/technology" className="btn-outline">
                Explore Our Technology
              </Link>
            </div>
          </div>
          <div
            className="v3-hero-stack"
            role="img"
            aria-label="Four-layer technology stack: AI Engineering, Intelligent Systems, Robotics and DeepTech"
          >
            <IsoStack
              annotate
              gap={52}
              className="mx-auto w-full max-w-[650px]"
              layers={[
                { label: "AI ENGINEERING", sub: "LLMs / RAG", pattern: "core" },
                {
                  label: "INTELLIGENT SYSTEMS",
                  sub: "Computer Vision / Edge AI",
                  pattern: "rings",
                },
                { label: "DEEPTECH", sub: "AI Hardware / Physical AI", pattern: "grid" },
                { label: "ROBOTICS", sub: "Perception / Planning", pattern: "circuit" },
              ]}
            />
          </div>
        </div>
        <div className="v3-trust-strip">
          Built on open models and open infrastructure. We publish what we learn.
        </div>
      </section>

      <section className="v3-section v3-foundation">
        <div className="v3-split-heading">
          <div>
            <p className="eyebrow">Current foundation</p>
            <h2>Build AI for production.</h2>
          </div>
          <p>
            AI systems are more than models. We engineer the architecture, retrieval, agents,
            evaluation, security, observability and infrastructure required to make them work in
            reality — under load, under attack and under change.
          </p>
        </div>
        <SystemFlow />
        <p className="v3-capability-line">
          LLMs · RAG · Agents · Multimodal · Automation · Evaluation · Security · Observability ·
          Infrastructure · Deployment
        </p>
      </section>

      <section className="v3-section v3-pillars" id="technology">
        <div className="v3-section-heading">
          <p className="eyebrow">Technology areas</p>
          <h2>
            Four connected areas.
            <br />
            <span>One continuum.</span>
          </h2>
        </div>
        <div className="v3-pillar-grid">
          {pillars.map((p) => (
            <article className="v3-pillar" key={p.name}>
              <div className="v3-pillar-top">
                <span className="v3-index">{p.index}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="v3-tech-list">{p.tech}</p>
              {p.visual === "robotics" ? (
                <HumanoidDiagram className="v3-pillar-visual" />
              ) : (
                <DomainVisual id={p.visual} size="sm" className="v3-pillar-visual" />
              )}
              <p className="v3-pillar-body">{p.body}</p>
              <Link
                to="/technology"
                hash={p.name.toLowerCase().replace(" ", "-")}
                className="link-arrow"
              >
                Explore <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="v3-section v3-process on-dark">
        <div className="v3-section-heading">
          <p className="eyebrow">How we work</p>
          <h2>
            Research to production,
            <br />
            <span>without the gaps.</span>
          </h2>
        </div>
        <div className="v3-process-rail">
          {process.map(([title, body], i) => (
            <div className="v3-process-step" key={title}>
              <span className="v3-node" />
              <p className="v3-index">0{i + 1}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <blockquote>
          “Evaluation is not a phase. It is the thing that tells you whether any of the rest
          worked.”
        </blockquote>
      </section>

      <section className="v3-section v3-direction on-dark">
        <div className="v3-section-heading">
          <p className="eyebrow">Our technology</p>
          <h2>
            Noema and Soma.
            <br />
            <span>Two layers we are building.</span>
          </h2>
          <p>The intelligence, and the body it operates through.</p>
        </div>
        <div className="v3-direction-grid">
          <Link to="/technology/noema" className="v3-direction-card">
            <div>
              <h3>Noema</h3>
              <p>
                The intelligence layer. Multimodal systems that perceive, understand and reason
                about situations.
              </p>
            </div>
            <span className="link-arrow">
              Explore Noema <ArrowRight className="size-4" />
            </span>
          </Link>
          <Link to="/technology/soma" className="v3-direction-card">
            <div>
              <h3>Soma</h3>
              <p>
                The embodiment layer. A humanoid platform for sensing, planning and safe physical
                action.
              </p>
            </div>
            <span className="link-arrow">
              Explore Soma <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
        <div className="v3-loop">
          <span>PERCEIVE</span>
          <i /> <span>REASON</span>
          <i /> <span>PLAN</span>
          <i /> <span>ACT</span>
          <i /> <span>LEARN</span>
        </div>
        <p className="v3-honesty">Both are early. We publish what works and what does not.</p>
      </section>

      <section className="v3-section v3-research">
        <div className="v3-split-heading">
          <div>
            <p className="eyebrow">Research</p>
            <h2>Working in the open.</h2>
          </div>
          <p>
            Notes, experiments and results from what we are building. Published whether or not the
            result was the one we wanted.
          </p>
        </div>
        <div className="v3-empty-note">
          <span className="v3-index">RESEARCH / 001</span>
          <p>First notes publishing shortly — follow the work as it becomes real.</p>
          <Link to="/research" className="link-arrow">
            View research <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="v3-vision on-dark">
        <p className="eyebrow text-orange">The direction</p>
        <h2>
          Intelligence beyond
          <br />
          the screen.
        </h2>
        <p>
          Most AI today produces information. We are working toward systems that perceive a
          situation, decide what to do and act on it — in factories, in the field and in machines
          that people depend on.
        </p>
        <div className="v3-principles">
          <span>
            <b>Measure honestly</b>A number on a fixed test set, or it did not happen.
          </span>
          <span>
            <b>Build for reality</b>The demo is not the product; the thing that runs on a bad day
            is.
          </span>
          <span>
            <b>Publish the failures</b>The negative result is the part nobody else shares.
          </span>
        </div>
      </section>

      <section className="v3-section v3-contact">
        <div className="v3-split-heading">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h2>Have a difficult problem?</h2>
            <p>
              Whether you are building an AI system, exploring a new product, or researching what
              comes next — tell us what you are trying to do.
            </p>
          </div>
          <div className="v3-contact-form">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
