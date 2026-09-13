import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { vision } from "@/content/site";
import { revealDelay } from "./motion";
import { Eyebrow } from "./SectionHeading";
import { Horizon } from "./visuals/Horizon";

export function VisionTeaser() {
  return (
    <section className="on-dark relative isolate overflow-hidden border-t border-hairline">
      <Horizon className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[80%] w-full" />
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-[clamp(15rem,40vw,26rem)] sm:px-8 sm:pt-36">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div data-reveal>
            <Eyebrow>{vision.eyebrow}</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.5rem,5.2vw,4.5rem)]">
              <span className="text-sheen">{vision.title}</span>
              <br />
              <span className="text-orange">{vision.accent}</span>
            </h2>
          </div>
          <div data-reveal style={revealDelay(120)} className="lg:pb-3">
            <p className="max-w-md text-[17px] leading-relaxed text-muted-foreground">
              {vision.body}
            </p>
            <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.12em] uppercase">
              {vision.evolution.map((e, i) => (
                <li key={e} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-amber-accent" aria-hidden="true">
                      →
                    </span>
                  )}
                  <span className="rounded-full border border-hairline bg-night/60 px-3 py-1.5 whitespace-nowrap backdrop-blur">
                    {e}
                  </span>
                </li>
              ))}
            </ol>
            <Link to="/research" className="link-arrow mt-9">
              Explore Research <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
