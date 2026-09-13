import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BookOpen,
  Bot,
  Boxes,
  Cpu,
  FlaskConical,
  Rocket,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { FinalCta } from "@/components/landing/FinalCta";
import { Eyebrow, SectionHeading } from "@/components/landing/SectionHeading";
import { revealDelay } from "@/components/landing/motion";
import { ArchitectureDiagram } from "@/components/landing/visuals/ArchitectureDiagram";
import { JanusConsole } from "@/components/landing/visuals/JanusConsole";
import { janus } from "@/content/site";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

const TITLE = "Janus — Intelligent Systems Platform";
const DESCRIPTION =
  "Janus is CuriousDevs' proprietary technology direction for building, evaluating, deploying and operating intelligent systems, starting with production AI systems.";

export const Route = createFileRoute("/janus")({
  head: () =>
    buildSeoHead({
      path: "/janus",
      title: TITLE,
      description: DESCRIPTION,
      keywords: [
        "Janus intelligent systems platform",
        "AI systems platform",
        "AI evaluation",
        "AI observability",
        "agent orchestration",
      ],
      ogType: "website",
    }),
  component: JanusPage,
});

const MODULE_ICONS: Record<string, LucideIcon> = {
  models: Cpu,
  knowledge: BookOpen,
  agents: Bot,
  workflows: Workflow,
  evaluation: FlaskConical,
  security: ShieldCheck,
  observability: Activity,
  deploy: Rocket,
};

const concept = [
  {
    title: "Workspace",
    body: "Systems, models, knowledge, agents, workflows, evaluation, security and deployment — one navigation for the whole system.",
  },
  {
    title: "Live system graph",
    body: "The actual path a request takes — documents → RAG → agent → tools → action — with state on every node.",
  },
  {
    title: "Inspector",
    body: "Status, model, tools, evaluation, latency, cost and security for whatever is selected.",
  },
];

function JanusPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema("/janus", TITLE, DESCRIPTION)),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="Proprietary technology"
        title={janus.name}
        accent={`${janus.tagline}.`}
        body={janus.positioning}
        actions={
          <>
            <Link to="/contact" className="btn-primary group">
              Talk to us about Janus
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#architecture" className="btn-outline">
              See the architecture <ArrowDown className="size-4" />
            </a>
          </>
        }
      >
        <div className="relative mt-20 sm:mt-24">
          <div
            aria-hidden="true"
            className="glow-orange pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
          <JanusConsole />
        </div>
      </PageIntro>

      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Production AI system platform"
            title="Everything a production"
            accent="AI system depends on."
            body="The first practical form of Janus focuses on production AI systems — the parts an engineering team needs to understand and operate together."
          />
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {janus.modules.map((m, i) => {
              const Icon = MODULE_ICONS[m.key] ?? Boxes;
              return (
                <li
                  key={m.key}
                  data-reveal
                  style={revealDelay((i % 4) * 70)}
                  className="panel spotlight flex flex-col p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-background">
                      <Icon className="size-5 text-orange" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight">{m.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="architecture" className="on-navy border-t border-hairline py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Conceptual architecture"
            title="Many parts."
            accent="One intelligent system."
            body="Models, knowledge, agents, tools, workflows, evaluation, security and observability — brought together by Janus into one system an engineer can understand and operate."
          />
          <div data-reveal className="mt-16">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div data-reveal>
            <Eyebrow>Product principle</Eyebrow>
            <blockquote className="display mt-7 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.14]">
              <span className="text-orange">“</span>
              {janus.principle}
              <span className="text-orange">”</span>
            </blockquote>
          </div>
          <div className="grid gap-4 self-start">
            {concept.map((c, i) => (
              <div
                key={c.title}
                data-reveal
                style={revealDelay(i * 90)}
                className="panel spotlight flex gap-5 p-6 sm:p-7"
              >
                <span className="font-mono text-xs text-amber-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-medium tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark border-t border-hairline py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Long-term extension"
            title="From production AI"
            accent="toward machines."
            body="The architecture is designed to extend as the technology matures — from software systems to edge runtimes, sensors and physical machines."
          />
          <ol className="relative mt-20 grid gap-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            <span
              aria-hidden="true"
              className="absolute top-[7px] right-0 left-0 hidden h-px bg-[linear-gradient(to_right,var(--signal-bright),var(--border-dark)_40%)] lg:block"
            />
            {janus.extension.map((label, i) => (
              <li key={label} data-reveal style={revealDelay(i * 80)} className="relative">
                <span
                  className={`relative block size-3.5 rounded-full border-2 ${i === 0 ? "border-orange-bright bg-orange-bright shadow-[0_0_0_6px_color-mix(in_oklab,var(--signal-bright)_20%,transparent)]" : "border-hairline bg-background"}`}
                />
                <p className="mt-7 font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={`mt-2 text-xl font-medium tracking-tight ${i === 0 ? "text-orange" : ""}`}
                >
                  {label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta
        title="Is Janus built for"
        accent="your problem?"
        body="If the problems Janus addresses are problems you have, tell us — it helps shape what gets built first."
      />
      <Footer />
    </main>
  );
}
