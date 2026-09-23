import type { ReactNode } from "react";

import { StatusTag, Label } from "@/components/system/primitives";
import type { Status } from "@/lib/content";

export function PageHero({
  index: _index,
  label,
  title,
  lede,
  status,
  meta,
  children,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lede: ReactNode;
  status?: Status;
  meta?: { term: string; value: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-field opacity-40 field-mask"
      />
      <div className="shell relative py-20 md:py-28">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Label>{label}</Label>
          {status ? <StatusTag status={status} /> : null}
        </div>

        <h1 className="mt-8 max-w-4xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <div className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {lede}
        </div>

        {meta?.length ? (
          <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.term}>
                <dt className="label-tech">{m.term}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-foreground/90">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children}
      </div>
    </section>
  );
}
