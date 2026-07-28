import { doctrine, timeline } from "@/content/site";

export function Roadmap() {
  return (
    <section id="roadmap" className="border-b border-hairline py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="eyebrow">The path, 2026 to 2030</p>
            <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
              Ambitious,{" "}
              <span className="font-serif font-normal text-muted-foreground italic">
                but in order.
              </span>
            </h2>
            <div className="mt-10 divide-y divide-[var(--hairline)] border-y border-hairline">
              {timeline.map((t) => (
                <div key={t.year} className="grid gap-2 py-6 sm:grid-cols-[8rem_1fr]">
                  <span className="font-mono text-xs tracking-widest text-amber-accent">
                    {t.year}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-lift panel-sheen rounded-2xl border border-hairline bg-surface p-8">
            <p className="eyebrow">What we believe</p>
            <p className="mt-4 font-serif text-2xl leading-snug italic">
              &ldquo;Any action a machine takes on its own should have a name attached, a reason
              recorded, and someone who can answer for it.&rdquo;
            </p>
            <ul className="mt-8 space-y-4 border-t border-hairline pt-8">
              {doctrine.map((d, i) => (
                <li key={d} className="flex gap-4 text-sm">
                  <span className="font-mono text-xs text-amber-soft">0{i + 1}</span>
                  <span className="text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
