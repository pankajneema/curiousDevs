import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { HumanoidDiagram, LlmDiagram } from "@/components/landing/visuals/ProductDiagrams";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () =>
    buildSeoHead({
      path: "/work",
      title: "Work — CuriousDevs",
      description: "Selected systems and engineering directions from CuriousDevs.",
    }),
  component: WorkPage,
});

const work = [
  {
    category: "AI ENGINEERING / SHIPPING",
    title: "Production intelligence, not a demo wrapper.",
    summary:
      "We build the path around the model: retrieval, tools, agents, evaluation, security and observability that keeps an AI system useful when inputs change.",
    detail: "Instruction → context → reasoning → evaluation → observable action",
    diagram: LlmDiagram,
  },
  {
    category: "ROBOTICS / RESEARCH",
    title: "Machines that can sense before they move.",
    summary:
      "Our robotics direction connects perception, planning and control into a loop that can be measured, constrained and improved from real episodes.",
    detail: "Perception → planning → control → actuation → new data",
    diagram: HumanoidDiagram,
  },
];

function WorkPage() {
  return (
    <main id="main-content" className="v3-work-page">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/work",
              "Work — CuriousDevs",
              "Selected systems and engineering directions from CuriousDevs.",
            ),
          ),
        }}
      />
      <section className="v3-work-hero on-dark">
        <div className="tech-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="eyebrow text-orange">Selected work</p>
          <h1>
            Real problems.
            <br />
            <span>Real systems.</span>
          </h1>
          <p>
            We show the system behind the claim: what the problem was, what had to connect, and how
            we would know it worked.
          </p>
        </div>
      </section>
      <section className="v3-work-section">
        <div className="v3-work-intro">
          <div>
            <p className="eyebrow">How to read this</p>
            <h2>Every diagram has a job.</h2>
          </div>
          <p>
            A case study is not a capability list. It follows a real path from input to outcome,
            with the engineering decisions and constraints left visible.
          </p>
        </div>
        <div className="v3-work-grid">
          {work.map(({ category, title, summary, detail, diagram: Diagram }) => (
            <article className="v3-work-card" key={title}>
              <div className="v3-work-card-copy">
                <p className="v3-index">{category}</p>
                <h3>{title}</h3>
                <p>{summary}</p>
                <p className="v3-work-detail">{detail}</p>
                <Link to="/contact" className="link-arrow">
                  Discuss a similar system <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="v3-work-diagram">
                <Diagram />
              </div>
            </article>
          ))}
        </div>
        <p className="v3-work-note">
          More case studies as client work clears confidentiality. We will publish the measurement
          with them.
        </p>
      </section>
      <section className="v3-work-method on-dark">
        <p className="eyebrow text-orange">The standard</p>
        <h2>Problem → System → Evaluation → Outcome.</h2>
        <p>
          No invented metrics. No placeholder logos. The work gets published when there is something
          real to point at.
        </p>
      </section>
      <Footer />
    </main>
  );
}
