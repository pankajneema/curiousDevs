import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Search } from "lucide-react";
import { detailedFaqs } from "@/content/faq";

export function FaqPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [...detailedFaqs];
    return detailedFaqs.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(value));
  }, [query]);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Search</p>
          <label className="relative mt-4 block">
            <span className="sr-only">Search frequently asked questions</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions"
              className="w-full rounded-full border border-hairline bg-[var(--paper-raised)] py-3.5 pr-4 pl-11 text-sm text-foreground shadow-[var(--shadow-1)] outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-orange"
            />
          </label>
          <div className="panel mt-8 p-6">
            <p className="text-[15px] font-medium tracking-tight">Can't find what you need?</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Ask us directly — we'll answer by email.
            </p>
            <Link to="/contact" className="link-arrow mt-4">
              Contact us →
            </Link>
          </div>
        </div>

        <div data-reveal>
          <Accordion.Root
            type="single"
            collapsible
            defaultValue="faq-0"
            className="divide-y divide-[var(--hairline)] border-y border-hairline"
          >
            {filtered.map((item) => {
              const index = detailedFaqs.findIndex((f) => f.q === item.q);
              return (
                <Accordion.Item key={item.q} value={`faq-${index}`}>
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left outline-none">
                      <span className="flex items-baseline gap-5">
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg font-medium tracking-tight transition-colors group-hover:text-amber-accent group-focus-visible:text-amber-accent">
                          {item.q}
                        </span>
                      </span>
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline transition-colors duration-300 group-data-[state=open]:border-orange group-data-[state=open]:bg-orange group-data-[state=open]:text-ivory">
                        <Plus className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="max-w-2xl pr-14 pb-7 pl-9 text-[15px] leading-7 text-muted-foreground">
                      {item.a}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
          {filtered.length === 0 && (
            <p className="py-10 text-sm text-muted-foreground">No questions matched that search.</p>
          )}
        </div>
      </div>
    </section>
  );
}
