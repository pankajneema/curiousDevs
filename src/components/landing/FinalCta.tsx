import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { finalCta } from "@/content/site";
import { revealDelay } from "./motion";
import { Eyebrow } from "./SectionHeading";
import { Planet } from "./visuals/Planet";

export function FinalCta({
  title = finalCta.title,
  accent = finalCta.accent,
  body = finalCta.body,
}: {
  title?: string;
  accent?: string;
  body?: string;
}) {
  return (
    <section className="on-dark grain relative isolate overflow-hidden border-t border-hairline">
      <Planet className="pointer-events-none absolute top-[8%] right-[-55%] -z-10 h-[150%] w-auto sm:right-[-30%] lg:top-[-4%] lg:right-[-10%]" />
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-20 [mask-image:linear-gradient(to_right,black,transparent_70%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-28 sm:px-8 sm:py-40 lg:grid-cols-[1.15fr_1fr] lg:items-end">
        <div data-reveal>
          <Eyebrow>{finalCta.eyebrow}</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.5rem,5.2vw,4.5rem)]">
            <span className="text-sheen">{title}</span>
            <br />
            <span className="text-orange">{accent}</span>
          </h2>
        </div>
        <div data-reveal style={revealDelay(120)} className="lg:pb-3">
          <p className="max-w-md text-[17px] leading-relaxed text-muted-foreground">{body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary group">
              Start the Conversation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/research" className="btn-outline">
              Explore Research
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
