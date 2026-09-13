import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { coreStory, hero } from "@/content/site";
import { riseDelay } from "./motion";
import { IsoStack, type StackLayer } from "./visuals/IsoStack";

const layers: StackLayer[] = [
  { label: "AI Systems", sub: "Models / Agents / Automation", pattern: "core" },
  { label: "Intelligent Systems", sub: "Vision / Edge / Embedded", pattern: "rings" },
  { label: "Robotics", sub: "Perception / Control / Autonomy", pattern: "circuit" },
  { label: "DeepTech", sub: "Hardware / Compute / Neurotech", pattern: "grid" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="on-dark grain relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(90%_75%_at_65%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="glow-orange pointer-events-none absolute top-[6%] right-[-18%] -z-10 size-[min(1000px,120vw)] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_bottom,transparent,var(--near-black))]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pt-32 pb-16 sm:px-8 lg:pt-36">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.02fr_1fr] lg:gap-6">
          <div>
            <p
              className="rise-in inline-flex items-center gap-2.5 rounded-full border border-hairline bg-foreground/[0.04] py-1.5 pr-4 pl-2 font-mono text-[10.5px] tracking-[0.16em] text-foreground/80 uppercase backdrop-blur"
              style={riseDelay(0)}
            >
              <span className="relative flex size-2">
                <span className="live-dot absolute inset-0 rounded-full bg-orange-bright" />
                <span className="relative size-2 rounded-full bg-orange-bright" />
              </span>
              {hero.eyebrow}
            </p>

            <h1
              className="rise-in display mt-8 text-[clamp(2.35rem,5.2vw,4.9rem)]"
              style={riseDelay(90)}
            >
              <span className="text-sheen">{hero.title}</span>
              <br />
              <span className="text-orange">{hero.accent}</span>
            </h1>

            <p
              className="rise-in mt-7 max-w-xl text-[17px] leading-relaxed text-muted-foreground sm:text-lg"
              style={riseDelay(180)}
            >
              {hero.body}
            </p>

            <div className="rise-in mt-10 flex flex-wrap gap-3" style={riseDelay(260)}>
              <Link to="/contact" className="btn-primary group">
                Start a Project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/janus" className="btn-outline group">
                Explore Janus
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="rise-in relative" style={riseDelay(220)}>
            <div className="float-slow">
              <IsoStack
                layers={layers}
                annotate
                gap={52}
                className="mx-auto w-full max-w-[620px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rise-in border-t border-hairline" style={riseDelay(420)}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-6 sm:px-8">
          <ol
            aria-label="How CuriousDevs works"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-foreground/75 sm:text-sm"
          >
            {coreStory.map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="h-px w-5 bg-orange/60 sm:w-10" />}
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <a
            href="#technology"
            className="hidden shrink-0 items-center gap-3 text-xs text-muted-foreground transition-colors hover:text-foreground lg:flex"
          >
            <span className="flex h-8 w-5 justify-center rounded-full border border-hairline pt-1.5">
              <span className="scroll-cue h-1.5 w-px bg-foreground/70" />
            </span>
            Scroll to explore
          </a>
        </div>
      </div>
    </section>
  );
}
