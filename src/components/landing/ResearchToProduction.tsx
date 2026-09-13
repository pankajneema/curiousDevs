import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { researchProcess } from "@/content/site";
import { revealDelay } from "./motion";
import { SectionHeading } from "./SectionHeading";
import { IsoBlock } from "./visuals/IsoBlock";

/** Research → Prototype → Engineer → Validate → Product, one object per stage. */
export function ProcessSteps({ footer = true }: { footer?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline shadow-[var(--card-shadow)]">
      <ol className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-5">
        {researchProcess.map((step, i) => (
          <li
            key={step.n}
            data-reveal
            style={revealDelay(i * 80)}
            className="spotlight group flex flex-col bg-card p-7 sm:last:col-span-2 lg:last:col-span-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">{step.n}</span>
              {i < researchProcess.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="hidden size-4 text-muted-foreground/60 lg:block"
                />
              )}
            </div>
            <IsoBlock
              stage={i as 0 | 1 | 2 | 3 | 4}
              className="mx-auto my-8 h-28 w-28 transition-transform duration-500 group-hover:-translate-y-1.5 sm:h-32 sm:w-32"
            />
            <h3 className="text-xl font-medium tracking-tight">{step.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
      {footer && (
        <div className="on-dark flex flex-col gap-5 bg-navy px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <p className="display text-2xl sm:text-[1.9rem]">
            Research today. <span className="text-orange">Real impact tomorrow.</span>
          </p>
          <Link to="/research" className="btn-outline group self-start sm:self-auto">
            Explore Research
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function ResearchToProduction() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Research → Product"
          title="Research becomes"
          accent="technology."
          body="Research creates possibilities. Engineering turns them into systems that can be tested, deployed and improved — and repeated problems into reusable technology."
        />
        <div className="mt-16">
          <ProcessSteps />
        </div>
      </div>
    </section>
  );
}
