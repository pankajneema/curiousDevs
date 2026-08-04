import { ArrowRight } from "lucide-react";
import { Checkpoint } from "./Checkpoint";
import { Wireframe } from "./Wireframe";
import { BookingDialog } from "./BookingDialog";

const badgeTicker = [
  "RUNTIME AGENT CONTROL",
  "DATA-PROTECTION AUTOPILOT",
  "FLEET COMMAND LAYER",
  "ENGINEERED IN INDIA",
];

const stats = [
  { value: "45:1", label: "Non-human to human identities", sub: "typical enterprise estate" },
  { value: "13 May 2027", label: "India's data-protection cutover", sub: "a date nobody can move" },
  { value: "₹250 cr", label: "Maximum penalty per violation", sub: "under the DPDP Act" },
  { value: "6 hours", label: "Incident reporting window", sub: "CERT-In directions" },
  { value: "<10ms", label: "Verdict on every tool call", sub: "no model in the hot path" },
  { value: "3 layers", label: "Agents, data, machines", sub: "one accountability spine" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-24 sm:py-28 lg:pt-32 lg:pb-0">
      <Wireframe className="top-0 left-0 h-[560px] w-[560px] -translate-x-1/4 -translate-y-1/6 opacity-80" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="flex w-fit max-w-full items-center gap-0 overflow-hidden rounded-none border border-hairline bg-surface/80 shadow-[0_8px_24px_rgba(10,20,36,0.06)]">
              <span className="shrink-0 rounded-none border border-amber-accent/40 bg-amber-accent/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-amber-accent uppercase">
                <span className="live-dot mr-2 inline-block size-1.5 rounded-none bg-amber-soft align-middle" />
                Deep-tech security · Est. 2026
              </span>
              <div
                className="relative hidden w-64 overflow-hidden sm:block"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, #000 12%, #000 78%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 12%, #000 78%, transparent)",
                }}
              >
                <div className="animate-marquee flex w-max gap-8 px-4">
                  {[...badgeTicker, ...badgeTicker].map((b, i) => (
                    <span key={i} className="eyebrow whitespace-nowrap">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-[clamp(2.6rem,6.5vw,4.4rem)] leading-[0.95] font-extrabold tracking-[-0.03em] sm:mt-8">
              Give autonomy
              <br />
              <span className="text-aurora">a chain of command.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-muted-foreground sm:mt-7 sm:text-[17px]">
              Software that acts on its own is already inside your stack — booking payments, reading
              customer records, calling tools you never reviewed. CuriousDevs puts a decision
              checkpoint in front of every one of those actions, so autonomy stays{" "}
              <span className="text-foreground">answerable</span>.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
              <BookingDialog>
                <button className="inline-flex items-center gap-2 btn-shine rounded-none bg-amber-accent px-6 py-3 text-sm font-semibold text-background">
                  Book a working session <ArrowRight className="size-4" />
                </button>
              </BookingDialog>
              <a
                href="/product"
                className="inline-flex items-center gap-2 btn-quiet rounded-none border border-hairline bg-surface/60 px-6 py-3 text-sm font-semibold hover:bg-surface-2"
              >
                See the platform
              </a>
            </div>

            <p className="eyebrow mt-10 sm:mt-12">Built as one stack</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
              {["AgentGuard", "CurioComply", "AeroOS"].map((p, i) => (
                <div key={p} className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-amber-soft">0{i + 1}</span>
                  <span className="text-lg font-semibold tracking-tight">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full items-center justify-center lg:self-center">
            <div className="w-full max-w-md rounded-none border border-hairline bg-surface/70 p-3 shadow-[0_18px_48px_rgba(10,20,36,0.08)]">
              <Checkpoint />
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-pause relative mt-12 overflow-hidden border-y border-hairline bg-surface/50 sm:mt-16">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 sm:px-8">
          <span className="eyebrow">Why now</span>
          <span className="eyebrow">2026 — 2030</span>
        </div>
        <div
          className="stats-marquee-wrap overflow-hidden border-t border-hairline"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
          }}
        >
          <div className="animate-marquee-slow flex w-max">
            {[...stats, ...stats, ...stats].map((s, i) => (
              <div
                key={i}
                className="stat-tick flex min-w-[17rem] items-center gap-4 border-r border-hairline bg-surface/60 px-6 py-5 hover:text-foreground sm:min-w-[19rem] sm:px-8 sm:py-6"
              >
                <span className="text-2xl font-bold tracking-tight whitespace-nowrap text-amber-accent">
                  {s.value}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm">{s.label}</span>
                  <span className="eyebrow">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Static fallback: shown only under prefers-reduced-motion, so no stat is
            permanently unreachable when the marquee animation is disabled. */}
        <div className="stats-static grid border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.value}
              className="flex items-center gap-4 border-r border-b border-hairline bg-surface/60 px-6 py-5 last:border-r-0 sm:px-8 sm:py-6"
            >
              <span className="text-2xl font-bold tracking-tight whitespace-nowrap text-amber-accent">
                {s.value}
              </span>
              <span className="leading-tight">
                <span className="block text-sm">{s.label}</span>
                <span className="eyebrow">{s.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
