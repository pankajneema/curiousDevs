import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Binary,
  Bot,
  Boxes,
  CircuitBoard,
  Cog,
  Cpu,
  FileText,
  Layers,
  Orbit,
  ScanEye,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { FinalCta } from "@/components/landing/FinalCta";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { revealDelay } from "@/components/landing/motion";
import { ProcessSteps } from "@/components/landing/ResearchToProduction";
import { ResearchMap } from "@/components/landing/visuals/ResearchMap";
import { research } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

const TITLE = "Research — Researching What Comes Next";
const DESCRIPTION =
  "CuriousDevs research across AI systems, agentic intelligence, multimodal AI, computer vision, edge AI, robotics, physical AI, AI hardware, advanced compute and neurotechnology.";

export const Route = createFileRoute("/research")({
  head: () =>
    buildSeoHead({
      path: "/research",
      title: TITLE,
      description: DESCRIPTION,
      keywords: [
        "AI research",
        "agentic intelligence",
        "multimodal AI",
        "computer vision research",
        "edge AI",
        "physical AI",
        "neurotechnology",
      ],
      ogType: "website",
    }),
  component: ResearchPage,
});

const AREA_ICONS: Record<string, LucideIcon> = {
  "AI Systems": Boxes,
  "Agentic Intelligence": Bot,
  "Multimodal AI": Layers,
  "Computer Vision": ScanEye,
  "Edge AI": Cpu,
  Robotics: Cog,
  "Physical AI": Orbit,
  "AI Hardware": CircuitBoard,
  "Advanced Compute": Binary,
  Neurotechnology: Waves,
};

function ResearchPage() {
  const notes = getAllPosts().slice(0, 3);

  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema("/research", TITLE, DESCRIPTION)),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow={research.eyebrow}
        title={research.title}
        accent={research.accent}
        body={research.body}
        actions={
          <>
            <a href="#areas" className="btn-primary">
              Research areas <ArrowDown className="size-4" />
            </a>
            <Link to="/blog" className="btn-outline">
              Engineering notes
            </Link>
          </>
        }
        aside={<ResearchMap className="mx-auto w-full max-w-[520px]" />}
      />

      <section id="areas" className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Research areas"
            title="Where we are"
            accent="looking."
            body="The questions behind our work — from production AI systems today to the physical and deeper technologies that come next."
          />
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {research.areas.map((a, i) => {
              const Icon = AREA_ICONS[a.name] ?? Boxes;
              return (
                <li
                  key={a.name}
                  data-reveal
                  style={revealDelay((i % 5) * 70)}
                  className="panel spotlight flex flex-col p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-hairline bg-background">
                      <Icon className="size-[18px] text-orange" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight">{a.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.question}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="on-dark border-t border-hairline py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Research → Product"
            title="Research becomes"
            accent="technology."
            body="Research creates possibilities. Engineering turns them into systems that can be tested, deployed and improved."
          />
          <div className="mt-16">
            <ProcessSteps footer={false} />
          </div>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              layout="stack"
              eyebrow="Publications"
              title="Published when"
              accent="it's real."
            />
            <div data-reveal className="panel mt-10 overflow-hidden p-8 sm:p-10">
              <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
              <span className="flex size-12 items-center justify-center rounded-xl border border-hairline bg-background">
                <FileText className="size-5 text-orange" strokeWidth={1.5} />
              </span>
              <p className="mt-6 text-xl font-medium tracking-tight">Papers and experiments</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                We publish papers, experiments, prototypes and notes only when they exist. Until
                then, our engineering notes share what we are learning along the way.
              </p>
            </div>
          </div>

          {notes.length > 0 && (
            <div data-reveal style={revealDelay(120)}>
              <p className="eyebrow lg:mt-3">Engineering notes</p>
              <ul className="mt-6 divide-y divide-[var(--hairline)] border-y border-hairline">
                {notes.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group flex items-start justify-between gap-6 py-7"
                    >
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.16em] text-amber-accent uppercase">
                          {post.category}
                        </p>
                        <h3 className="mt-2 text-xl font-medium tracking-tight transition-colors group-hover:text-amber-accent">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {post.description}
                        </p>
                      </div>
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline transition-colors group-hover:border-orange group-hover:bg-orange group-hover:text-ivory">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/blog" className="link-arrow mt-7">
                All engineering notes <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <FinalCta />
      <Footer />
    </main>
  );
}
