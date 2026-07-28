import { useState } from "react";
import { ShieldHalf } from "lucide-react";
import { solutions, verdictClass } from "./solutions-data";

export function Solutions() {
  const [active, setActive] = useState(0);
  const s = solutions[active];

  return (
    <section className="border-b border-hairline pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-[var(--hairline)] lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="flex flex-col gap-px bg-[var(--hairline)]">
            <div className="bg-surface p-5">
              <p className="eyebrow">Industries</p>
            </div>
            {solutions.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.slug}
                  onClick={() => setActive(i)}
                  className={`group relative flex items-center gap-3 px-5 py-4 text-left transition-colors ${
                    on ? "bg-surface-2" : "bg-surface hover:bg-surface-2/60"
                  }`}
                >
                  {on && <span className="absolute inset-y-0 left-0 w-[3px] bg-amber-accent" />}
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${on ? "bg-amber-accent" : "bg-hairline"}`}
                  />
                  <span
                    className={`text-sm font-medium tracking-tight ${on ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <article className="panel-sheen bg-surface p-6 sm:p-7">
            <p className="eyebrow">{s.tag}</p>
            <h2 className="mt-3 max-w-2xl text-2xl leading-[1.05] font-extrabold tracking-[-0.02em] sm:text-3xl">
              {s.headline}{" "}
              <span className="font-serif font-normal text-muted-foreground italic">{s.accent}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">{s.body}</p>

            <p className="eyebrow mt-6 mb-3">Enforcement pipeline</p>
            <div className="flex flex-col gap-2.5">
              {s.scenarios.map((sc, i) => (
                <div key={sc.n} className="cell-hover rounded-xl border border-hairline bg-surface-2/40 p-4 sm:p-5">
                  <p className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{sc.n}</span>
                    <span className="text-sm font-semibold tracking-tight">{sc.title}</span>
                  </p>

                  <div className="mt-3.5 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-0">
                    <div className="sm:flex-1 sm:pr-4">
                      <span className="eyebrow flex items-center gap-2 text-danger">
                        <span className="size-1.5 rounded-full bg-danger" /> Risk
                      </span>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{sc.risk}</p>
                    </div>

                    <div
                      className="hidden shrink-0 sm:block sm:w-10 flow-line"
                      style={{ "--flow-delay": `${i * 0.4}s` } as React.CSSProperties}
                    />

                    <div className="flex shrink-0 flex-col items-center gap-1.5 sm:w-16">
                      <span className="flex size-9 items-center justify-center rounded-full border border-hairline bg-surface text-amber-accent">
                        <ShieldHalf className="size-3.5" strokeWidth={1.7} />
                      </span>
                      <span className="eyebrow whitespace-nowrap">Checkpoint</span>
                    </div>

                    <div
                      className="hidden shrink-0 sm:block sm:w-10 flow-line"
                      style={{ "--flow-delay": `${i * 0.4 + 0.3}s` } as React.CSSProperties}
                    />

                    <div className="sm:flex-1 sm:pl-4 sm:text-right">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide uppercase ${verdictClass(sc.verdict)}`}
                      >
                        {sc.verdict}
                      </span>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{sc.response}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-6">
              {s.compliance.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase"
                >
                  {c}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
