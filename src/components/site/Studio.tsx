import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { WorkItem } from "@/content/studio";
import { Label, TickList } from "@/components/system/primitives";

/**
 * A line illustration in both palettes. The dark original and its light
 * copy share geometry; styles.css shows whichever matches data-theme, so
 * the switch costs no JavaScript and never flashes the wrong one.
 */
export function Illustration({
  name,
  alt,
  className,
  aspect = "16 / 10",
}: {
  name: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  const style = { aspectRatio: aspect };
  const base = "w-full object-cover"; // display comes from .illo-* in styles.css
  return (
    <span className={cn("block", className)}>
      <img
        src={`/illustrations/${name}.svg`}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={style}
        className={cn(base, "illo-dark")}
      />
      <img
        src={`/illustrations/${name}-light.svg`}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        style={style}
        className={cn(base, "illo-light")}
      />
    </span>
  );
}

/** Section header with an action aligned to its baseline on wide screens. */
export function HeaderRow({ children, action }: { children: ReactNode; action: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-8">
      {children}
      {action}
    </div>
  );
}

/** One row of a numbered index list: number, title and line, arrow. */
export function IndexRow({
  n,
  title,
  line,
  to,
  hash,
}: {
  n: string;
  title: string;
  line: string;
  to: string;
  hash?: string;
}) {
  return (
    <Link
      to={to}
      hash={hash}
      className="cell-link grid grid-cols-[3.5rem_minmax(0,1fr)_1.5rem] items-baseline gap-4 border-b border-line px-2 py-6 text-foreground"
    >
      <span className="mono-xs text-muted-foreground">{n}</span>
      <span className="flex flex-col gap-1.5">
        <span className="font-display text-lg tracking-[-0.035em] md:text-xl">{title}</span>
        <span className="text-sm leading-relaxed text-muted-foreground">{line}</span>
      </span>
      <span aria-hidden className="cell-arrow text-muted-foreground">
        →
      </span>
    </Link>
  );
}

/** The closing call to action on a page. */
export function CtaPanel({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-8 border border-line bg-surface p-7 md:p-14">
      <div className="flex max-w-3xl flex-col gap-4">
        <Label className="text-signal">{label}</Label>
        <h2 className="text-3xl leading-[1.05] sm:text-4xl md:text-5xl">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

/** A tinted aside with the accent rule on its left edge. */
export function Outcome({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-l-2 border-signal bg-surface px-6 py-5">
      <Label className="text-signal">{label}</Label>
      <div className="text-sm leading-relaxed text-foreground md:text-base">{children}</div>
    </div>
  );
}

/** A step on a ruled timeline, marked with an accent square. */
export function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="relative flex flex-col gap-3.5 border-t border-line-strong pt-6">
      <span aria-hidden className="absolute -top-[5px] left-0 size-[9px] bg-signal" />
      <Label>{n}</Label>
      <h3 className="text-2xl">{title}</h3>
      {children}
    </div>
  );
}

/** One of our own projects: track and status, summary, points, stack and link. */
export function WorkCard({ work: w }: { work: WorkItem }) {
  return (
    <article id={w.id} className="flex scroll-mt-24 flex-col gap-4 bg-background p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <Label className="text-signal">{w.track}</Label>
        <span
          className={cn(
            "mono-xs whitespace-nowrap border px-2.5 py-1 uppercase",
            w.tone === "signal"
              ? "border-signal text-signal"
              : "border-line-strong text-muted-foreground",
          )}
        >
          {w.status}
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl">{w.name}</h3>
      <p className="text-base leading-relaxed text-foreground/90">{w.summary}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{w.body}</p>
      <div className="flex flex-col gap-3.5">
        <Label>{w.listLabel}</Label>
        <TickList items={w.points} />
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <span className="mono-xs uppercase text-muted-foreground">{w.stack}</span>
        <Link
          to={w.link.to}
          className="border-b border-signal pb-1 pt-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-foreground transition-colors hover:text-signal"
        >
          {w.link.label} →
        </Link>
      </div>
    </article>
  );
}
