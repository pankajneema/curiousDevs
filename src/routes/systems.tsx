import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { FinalCta } from "@/components/landing/FinalCta";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { revealDelay } from "@/components/landing/motion";
import { FlowGraph } from "@/components/landing/visuals/FlowGraph";
import { SystemFlow } from "@/components/landing/visuals/SystemFlow";
import { domains, engineeringMethod, systemFlows, type SystemFlow as Flow } from "@/content/site";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

const TITLE = "Systems Thinking — Real Problems. Real Systems.";
const DESCRIPTION =
  "How CuriousDevs thinks in systems: AI systems, agentic automation, edge intelligence, robotics and hardware — each as a chain where every link has to hold.";

export const Route = createFileRoute("/systems")({
  head: () =>
    buildSeoHead({
      path: "/systems",
      title: TITLE,
      description: DESCRIPTION,
      keywords: [
        "systems engineering",
        "AI system architecture",
        "agentic automation",
        "edge intelligence",
        "robotics systems",
      ],
      ogType: "website",
    }),
  component: SystemsPage,
});

function SystemsPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema("/systems", TITLE, DESCRIPTION)),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="Systems thinking"
        title="Real Problems."
        accent="Real Systems."
        body="CuriousDevs is an engineering organization, not a menu of services. We think in systems — chains of decisions where every link, from data and models to evaluation, security and hardware, has to hold."
        actions={
          <>
            <Link to="/contact" className="btn-primary group">
              Bring us a problem
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/technology" className="btn-outline">
              Our technology
            </Link>
          </>
        }
        meta={systemFlows.map((f) => f.label)}
      />

      {systemFlows.map((flow, i) => (
        <SystemRow key={flow.id} flow={flow} index={i} />
      ))}

      <section className="on-dark border-t border-hairline py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Method"
            title="One structure."
            accent="Every system."
            body="The same engineering discipline, whether the system is production software today or a machine tomorrow."
          />
          <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringMethod.map((step, i) => (
              <li
                key={step}
                data-reveal
                style={revealDelay((i % 4) * 70)}
                className="panel spotlight flex items-center gap-4 px-6 py-6"
              >
                <span className="font-mono text-xs text-amber-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium tracking-tight">{step}</span>
                {i < engineeringMethod.length - 1 && (
                  <ArrowRight aria-hidden="true" className="ml-auto size-4 text-muted-foreground" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta />
      <Footer />
    </main>
  );
}

function SystemRow({ flow, index }: { flow: Flow; index: number }) {
  const domain = domains.find((d) => d.id === flow.domain);
  return (
    <section
      id={flow.id}
      className={`border-t border-hairline py-24 sm:py-32 ${index % 2 === 1 ? "on-navy" : ""}`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div data-reveal>
          <p className="font-mono text-sm text-amber-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="eyebrow mt-6">{flow.label}</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,4.2vw,3.6rem)]">{flow.title}</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {flow.problem}
          </p>
          {domain && (
            <Link to="/technology" hash={domain.id} className="link-arrow mt-9">
              {domain.name} <ArrowRight className="size-4" />
            </Link>
          )}
        </div>

        <div data-reveal style={revealDelay(120)} className="panel spotlight overflow-hidden">
          <div className="on-dark relative isolate h-56 overflow-hidden rounded-t-[inherit] border-b border-hairline bg-night sm:h-64">
            <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
            <FlowGraph layout={flow.layout} count={flow.steps.length} className="h-full w-full" />
          </div>
          <div className="p-7 sm:p-9">
            <p className="eyebrow">System flow</p>
            <SystemFlow steps={flow.steps} className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
