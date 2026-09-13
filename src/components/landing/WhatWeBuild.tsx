import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight } from "lucide-react";
import { domains, technologyThesis, type DomainId } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { DomainVisual } from "./visuals/DomainVisual";

/**
 * Interactive technology explorer: the four areas as a vertical tab list,
 * each opening a large visual panel. Radix Tabs provides roving focus and
 * arrow-key navigation.
 */
export function WhatWeBuild() {
  const [active, setActive] = useState<DomainId>(domains[0].id);

  return (
    <section id="technology" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our technology"
          title="Intelligent Systems,"
          accent="Built End to End."
          body={technologyThesis}
          action={
            <Link to="/technology" className="link-arrow">
              Explore Technology <ArrowRight className="size-4" />
            </Link>
          }
        />

        <Tabs.Root
          data-reveal
          value={active}
          onValueChange={(v) => setActive(v as DomainId)}
          orientation="vertical"
          className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
        >
          <Tabs.List
            aria-label="Technology areas"
            className="flex flex-col self-start border-t border-hairline"
          >
            {domains.map((d) => (
              <Tabs.Trigger
                key={d.id}
                value={d.id}
                className="group relative w-full border-b border-hairline py-6 text-left outline-none focus-visible:bg-foreground/[0.03]"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-orange-bright transition-transform duration-500 group-data-[state=active]:scale-x-100"
                />
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-muted-foreground transition-colors group-data-[state=active]:text-amber-accent">
                    {d.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[clamp(1.4rem,2.3vw,1.9rem)] tracking-tight text-foreground/50 transition-colors group-hover:text-foreground/80 group-data-[state=active]:text-foreground">
                      {d.name}
                    </span>
                    <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-data-[state=active]:grid-rows-[1fr]">
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-sm leading-relaxed text-muted-foreground">
                          {d.statement}
                        </span>
                      </span>
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 -translate-x-2 text-orange opacity-0 transition-all duration-300 group-data-[state=active]:translate-x-0 group-data-[state=active]:opacity-100"
                  />
                </span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {domains.map((d) => (
            <Tabs.Content
              key={d.id}
              value={d.id}
              className="outline-none data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 data-[state=active]:duration-500"
            >
              <div className="panel spotlight flex h-full min-h-[480px] flex-col overflow-hidden p-7 sm:p-9">
                <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
                <div
                  aria-hidden="true"
                  className="glow-orange absolute top-1/2 left-1/2 -z-10 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                />
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="eyebrow">
                      {d.n} / {d.caption}
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {d.summary}
                    </p>
                  </div>
                </div>
                <DomainVisual id={d.id} size="lg" className="my-8 h-60 flex-1 sm:h-72" />
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
                  <ul className="flex flex-wrap gap-2">
                    {d.capabilities.slice(0, 4).map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-hairline bg-foreground/[0.03] px-3 py-1 text-xs text-foreground/80"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link to="/technology" hash={d.id} className="link-arrow">
                    Explore {d.name} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
