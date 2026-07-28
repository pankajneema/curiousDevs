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
    <section id="top" className="relative pt-32 pb-0 overflow-hidden">
      <Wireframe className="top-0 left-0 h-[560px] w-[560px] -translate-x-1/4 -translate-y-1/6 opacity-80" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="flex w-fit max-w-full items-center gap-0 overflow-hidden rounded-full border border-hairline bg-surface/60">
              <span className="shrink-0 rounded-full border border-amber-accent/40 bg-amber-accent/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-amber-accent uppercase">
                <span className="live-dot mr-2 inline-block size-1.5 rounded-full bg-amber-soft align-middle" />
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

            <h1 className="mt-8 text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
              Give autonomy
              <br />
              <span className="text-aurora">a chain of command.</span>
            </h1>

            <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
              Software that acts on its own is already inside your stack — booking payments, reading
              customer records, calling tools you never reviewed. CuriousDevs puts a decision
              checkpoint in front of every one of those actions, so autonomy stays{" "}
              <span className="font-serif text-foreground italic">answerable</span>.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <BookingDialog>
                <button className="inline-flex items-center gap-2 btn-shine rounded-full bg-amber-accent px-6 py-3 text-sm font-semibold text-background">
                  Book a working session <ArrowRight className="size-4" />
                </button>
              </BookingDialog>
              <a
                href="/product"
                className="inline-flex items-center gap-2 btn-quiet rounded-full border border-hairline bg-surface/60 px-6 py-3 text-sm font-semibold hover:bg-surface-2"
              >
                See the platform
              </a>
            </div>

            <p className="eyebrow mt-12">Built as one stack</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3">
              {["AgentGuard", "CurioComply", "AeroOS"].map((p, i) => (
                <div key={p} className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-amber-soft">0{i + 1}</span>
                  <span className="text-lg font-semibold tracking-tight">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full items-center justify-center lg:self-center">
            <div className="w-full max-w-md">
              <Checkpoint />
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-pause relative mt-16 overflow-hidden border-y border-hairline">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <span className="eyebrow">Why now</span>
          <span className="eyebrow">2026 — 2030</span>
        </div>
        <div className="overflow-hidden border-t border-hairline">
          <div className="animate-marquee-slow flex w-max">
            {[...stats, ...stats, ...stats].map((s, i) => (
              <div
                key={i}
                className="stat-tick flex min-w-[19rem] items-center gap-4 border-r border-hairline px-8 py-6 hover:text-foreground"
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
      </div>
    </section>
  );
}
