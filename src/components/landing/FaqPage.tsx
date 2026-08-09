import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { detailedFaqs } from "@/content/faq";

export function FaqPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return detailedFaqs;
    return detailedFaqs.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(value));
  }, [query]);

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-36 sm:px-8 sm:pb-32">
      <div className="max-w-2xl">
        <p className="eyebrow text-amber-accent">Frequently asked questions</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
          Clear answers before we start working.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          How we build, audit, fix, secure, and scale AI systems, plus practical details about
          delivery, ownership, pricing, and data access.
        </p>
      </div>

      <label className="relative mt-10 block max-w-xl">
        <span className="sr-only">Search frequently asked questions</span>
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions"
          className="w-full rounded-none border border-hairline bg-surface px-11 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-amber-accent/60"
        />
      </label>

      <div className="mt-10 divide-y divide-[var(--hairline)] border-y border-hairline">
        {filtered.map((item) => {
          const index = detailedFaqs.indexOf(item);
          const expanded = open === index;
          return (
            <div key={item.q}>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-amber-accent"
              >
                <span className="text-base font-semibold tracking-tight">{item.q}</span>
                <ChevronDown
                  className={`size-4 shrink-0 text-amber-accent transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>
              {expanded && (
                <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-muted-foreground">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-sm text-muted-foreground">No questions matched that search.</p>
      )}
    </section>
  );
}
