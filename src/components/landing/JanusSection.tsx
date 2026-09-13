import { Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Boxes, FlaskConical } from "lucide-react";
import { janus } from "@/content/site";
import { revealDelay } from "./motion";
import { Eyebrow } from "./SectionHeading";
import { JanusConsole } from "./visuals/JanusConsole";

const features = [
  {
    Icon: Boxes,
    title: "One engineering workspace",
    body: "Models, knowledge, agents, tools and workflows understood as one system.",
  },
  {
    Icon: FlaskConical,
    title: "Evaluation before trust",
    body: "Regression tests and failure cases before a change reaches production.",
  },
  {
    Icon: Activity,
    title: "Production visibility",
    body: "Traces, latency, cost and security for every run, in the same place.",
  },
];

export function JanusSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.3fr] lg:gap-16">
        <div data-reveal>
          <Eyebrow>Proprietary technology</Eyebrow>
          <h2 className="display mt-6 text-[clamp(3rem,6vw,5rem)]">{janus.name}</h2>
          <p className="mt-2 text-[clamp(1.35rem,2.4vw,1.75rem)] tracking-tight text-orange">
            {janus.tagline}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {janus.positioning}
          </p>

          <ul className="mt-10 space-y-6">
            {features.map(({ Icon, title, body }, i) => (
              <li key={title} data-reveal style={revealDelay(100 + i * 80)} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-hairline bg-[var(--paper-raised)] shadow-[var(--shadow-1)]">
                  <Icon className="size-[18px] text-orange" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[15px] font-medium tracking-tight">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link to="/janus" className="btn-primary group mt-10">
            Explore Janus
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div data-reveal style={revealDelay(120)} className="relative">
          <div
            aria-hidden="true"
            className="glow-orange pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
          />
          <JanusConsole />
        </div>
      </div>
    </section>
  );
}
