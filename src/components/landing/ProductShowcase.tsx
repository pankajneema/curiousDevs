import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { products } from "./product-data";

const toneClass = {
  ok: "text-amber-soft border-amber-soft/30 bg-amber-soft/10",
  warn: "text-amber-accent border-amber-accent/30 bg-amber-accent/10",
  bad: "text-danger border-danger/30 bg-danger/10",
} as const;

const statToneClass = {
  ok: "text-amber-soft",
  warn: "text-amber-accent",
  bad: "text-danger",
} as const;

const tabs = ["Overview", "Activity"] as const;

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const p = products[active];

  return (
    <section className="relative border-b border-hairline pt-32 pb-20">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="eyebrow flex items-center gap-2">
          <span className="live-dot size-1.5 rounded-full bg-amber-accent" /> The platform
        </p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
          One checkpoint,{" "}
          <span className="text-aurora">three places it has to hold.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          These aren&apos;t three separate bets. Governing what agents do produces the evidence
          regulators want, and both are the prerequisite for trusting machines that move on their
          own.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-[var(--hairline)] lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="flex flex-col gap-px bg-[var(--hairline)]">
            {products.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.slug}
                  onClick={() => {
                    setActive(i);
                    setTab("Overview");
                  }}
                  className={`group relative flex flex-col items-start px-5 py-4 text-left transition-colors ${
                    on ? "bg-surface-2" : "bg-surface hover:bg-surface-2/60"
                  }`}
                >
                  {on && <span className="absolute inset-y-0 left-0 w-[3px] bg-amber-accent" />}
                  <span className="eyebrow">
                    {item.role} · {item.n}
                  </span>
                  <span
                    className={`mt-1.5 text-base font-bold tracking-tight ${
                      on ? "text-amber-accent" : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="mt-0.5 text-xs text-muted-foreground">{item.category}</span>
                </button>
              );
            })}
            <div className="flex-1 bg-surface p-5">
              <p className="eyebrow">Sequence</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                Each layer is usable alone, and worth more when the one below it is already running.
              </p>
            </div>
          </div>

          <article className="panel-sheen bg-surface">
            <div className="p-6 pb-0 sm:p-7 sm:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-amber-accent/40 bg-amber-accent/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-amber-accent uppercase">
                  {p.role}
                </span>
                <span className="eyebrow">{p.horizon}</span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">{p.name}</h2>
              <p className="mt-2 font-serif text-lg leading-snug text-muted-foreground italic">
                {p.line}
              </p>
              <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
            </div>

            {/* Console */}
            <div className="mt-5 overflow-hidden rounded-xl border border-hairline bg-surface-2/60 sm:mx-7 sm:mt-5">
              <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="hidden gap-1.5 sm:flex">
                    <span className="size-2 rounded-full bg-danger/50" />
                    <span className="size-2 rounded-full bg-amber-accent/50" />
                    <span className="size-2 rounded-full bg-amber-soft/50" />
                  </div>
                  <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                    curiousdevs platform · {p.slug}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-amber-accent/30 bg-amber-accent/10 px-2 py-0.5 font-mono text-[9.5px] tracking-wide text-amber-accent uppercase">
                  <span className="live-dot size-1.5 rounded-full bg-amber-accent" /> Preview
                </span>
              </div>

              <div className="flex gap-1 border-b border-hairline px-2 pt-1.5">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-t-lg px-3 py-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors ${
                      tab === t
                        ? "border-b-2 border-amber-accent text-amber-accent"
                        : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {tab === "Overview" ? (
                <>
                  <div className="grid gap-px bg-[var(--hairline)] sm:grid-cols-4">
                    {p.panel.map((row) => (
                      <div key={row.label} className="stat-tick bg-surface px-4 py-3">
                        <p
                          className={`font-mono text-lg font-semibold ${
                            row.tone ? statToneClass[row.tone] : "text-foreground"
                          }`}
                        >
                          {row.value}
                        </p>
                        <p className="eyebrow mt-0.5 leading-tight">{row.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-px bg-[var(--hairline)] sm:grid-cols-3">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="stat-tick bg-surface-2 px-4 py-3">
                        <p className="eyebrow">{m.label}</p>
                        <p className="mt-0.5 font-mono text-sm text-foreground">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col divide-y divide-[var(--hairline)]">
                  {p.activity.map((row) => (
                    <div
                      key={row.label}
                      className="cell-hover flex items-center justify-between gap-4 bg-surface px-4 py-2.5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="truncate font-mono text-[12.5px] text-foreground">{row.label}</span>
                        <span className="hidden truncate text-xs text-muted-foreground sm:inline">{row.detail}</span>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] tracking-wide uppercase ${toneClass[row.tone]}`}
                      >
                        {row.tag}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 pt-6 sm:p-7 sm:pt-6">
              <ul className="grid gap-2.5 border-t border-hairline pt-6 sm:grid-cols-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[13.5px] text-muted-foreground">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-amber-accent" />
                    {pt}
                  </li>
                ))}
              </ul>

              <a
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 btn-shine rounded-full bg-amber-accent px-5 py-2.5 text-sm font-semibold text-background"
              >
                Walk through {p.name} <ArrowRight className="size-4" />
              </a>
            </div>
          </article>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-[var(--hairline)] md:grid-cols-3">
          {products.map((item, i) => (
            <button
              key={item.slug}
              onClick={() => {
                setActive(i);
                setTab("Overview");
              }}
              className={`p-6 text-left transition-colors ${
                i === active ? "bg-surface-2" : "bg-surface hover:bg-surface-2/60"
              }`}
            >
              <span className="font-mono text-xs text-amber-soft">LAYER {item.n}</span>
              <h3 className="mt-3 text-lg font-bold tracking-tight">{item.name}</h3>
              <p className="eyebrow mt-1">{item.category}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.line}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
