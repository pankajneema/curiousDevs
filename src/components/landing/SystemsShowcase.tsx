import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { systemFlows } from "@/content/site";
import { Eyebrow } from "./SectionHeading";
import { FlowGraph } from "./visuals/FlowGraph";

export function SystemsShowcase() {
  const rail = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 16), behavior: "smooth" });
  };

  return (
    <section className="on-navy relative isolate overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="glow-orange pointer-events-none absolute -top-64 left-[-20%] -z-10 size-[760px] rounded-full opacity-60"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          data-reveal
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <Eyebrow>Systems thinking</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.3rem,4.6vw,3.9rem)]">
              Real Problems.
              <br />
              <span className="text-orange">Real Systems.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              We think in systems, not a menu of services. Each one is a chain of decisions — and
              every link has to hold.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous system"
                className="flex size-11 items-center justify-center rounded-full border border-hairline text-foreground transition-colors hover:border-orange-bright hover:bg-foreground/[0.04]"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next system"
                className="flex size-11 items-center justify-center rounded-full border border-hairline text-foreground transition-colors hover:border-orange-bright hover:bg-foreground/[0.04]"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
            <Link to="/systems" className="link-arrow">
              View all systems <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Reveal sits on the rail, not the cards: cards live inside a
            horizontal scroller, where a per-card view timeline would bind to
            the rail instead of the page. */}
        <ul
          ref={rail}
          data-reveal
          className="-mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 xl:mx-0 xl:grid xl:grid-cols-5 xl:overflow-visible xl:px-0"
        >
          {systemFlows.map((flow) => (
            <li
              key={flow.id}
              className="w-[80vw] max-w-[300px] shrink-0 snap-start xl:w-auto xl:max-w-none"
            >
              <Link
                to="/systems"
                hash={flow.id}
                className="panel spotlight card-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="on-dark relative isolate h-44 overflow-hidden rounded-t-[inherit] border-b border-hairline bg-night">
                  <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
                  <FlowGraph
                    layout={flow.layout}
                    count={flow.steps.length}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-amber-accent uppercase">
                    {flow.label}
                  </p>
                  <h3 className="mt-3 text-lg leading-snug font-medium tracking-tight">
                    {flow.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {flow.problem}
                  </p>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-[13px] text-foreground/80">
                    Explore system
                    <span className="flex size-8 items-center justify-center rounded-full border border-hairline transition-colors group-hover:border-orange-bright group-hover:bg-orange-bright group-hover:text-night">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
