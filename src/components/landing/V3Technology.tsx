import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { DomainVisual } from "./visuals/DomainVisual";
import { IsoStack } from "./visuals/IsoStack";
import { HumanoidDiagram } from "./visuals/ProductDiagrams";

const pillars = [
  [
    "01",
    "AI Engineering",
    "LLMs · RAG · Agents · Multimodal · Evaluation · Security · Observability · Infrastructure",
    "We build reliable model systems that move from a promising prototype to intelligent software people can trust in production.",
    "ai-engineering",
  ],
  [
    "02",
    "Intelligent Systems",
    "Computer Vision · Edge AI · Embedded Intelligence · Sensors · Real-Time Inference · Decision Systems",
    "We connect perception, context and decisions so intelligence can operate closer to the moment and place where action matters.",
    "intelligent-systems",
  ],
  [
    "03",
    "DeepTech",
    "AI Hardware · Accelerators · Embedded Systems · Advanced Sensors · Physical AI · Neurotechnology · BCI · Next-Gen Compute",
    "We explore the underlying technologies that expand the limits of intelligent systems — from silicon and sensing to new interfaces with the physical world.",
    "deeptech",
  ],
  [
    "04",
    "Robotics",
    "Perception · Planning · Control · Manipulation · Navigation · Autonomy · Humanoid Systems · VLA",
    "We turn intelligence into movement: machines that can perceive their surroundings, plan safely, manipulate the world and learn through action.",
    "robotics",
  ],
];

export function V3Technology() {
  return (
    <main id="main-content" className="v3-technology-page">
      <Nav />
      <section className="v3-tech-hero on-dark">
        <div className="tech-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="v3-tech-hero-inner relative z-10 mx-auto max-w-7xl">
          <div>
            <p className="eyebrow text-orange">Our technology</p>
            <h1>
              Four connected areas.
              <br />
              <span>One continuum.</span>
            </h1>
            <p>
              AI Engineering, Intelligent Systems, DeepTech and Robotics — one intelligent-systems
              thesis that moves from production software toward machines.
            </p>
          </div>
          <div
            className="v3-tech-stack"
            role="img"
            aria-label="Technology stack from AI Engineering to DeepTech"
          >
            <IsoStack
              annotate
              gap={52}
              className="mx-auto w-full max-w-[640px]"
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
      </section>
      <section className="v3-section">
        <div className="v3-technology-grid">
          {pillars.map(([index, name, tech, body, visual]) => (
            <article id={visual} key={name} className="v3-technology-card scroll-mt-24">
              <div className="flex items-center justify-between">
                <span className="v3-index">{index}</span>
              </div>
              {visual === "robotics" ? (
                <div
                  className="v3-technology-visual"
                  role="img"
                  aria-label="Humanoid robot systems diagram"
                >
                  <HumanoidDiagram />
                </div>
              ) : (
                <DomainVisual
                  id={visual as "ai-engineering" | "intelligent-systems" | "robotics" | "deeptech"}
                  size="sm"
                  className="v3-technology-visual"
                />
              )}
              <h2>{name}</h2>
              <p className="font-mono text-xs leading-7 text-[var(--slate)]">{tech}</p>
              <p className="mt-auto pt-10">{body}</p>
              <Link to="/contact" className="link-arrow mt-6">
                Start a conversation <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="v3-tech-closing on-dark">
        <p className="eyebrow text-orange">Technology direction</p>
        <h2>
          Noema gives it mind.
          <br />
          <span>Soma gives it body.</span>
        </h2>
        <p>Both are early. We publish what works and what does not.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/technology/noema" className="btn-outline">
            Explore Noema
          </Link>
          <Link to="/technology/soma" className="btn-primary">
            Explore Soma <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
