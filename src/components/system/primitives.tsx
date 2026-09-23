import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { STATUS_LABEL, STATUS_NOTE, type Status } from "@/lib/content";

/* --------------------------------- Layout ---------------------------------- */

export function Section({
  children,
  className,
  id,
  bordered = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bordered?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", bordered && "hairline-t", className)}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- Labels ---------------------------------- */

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-tech", className)}>{children}</p>;
}

export function SectionHeader({
  index: _index,
  label,
  title,
  lede,
  status,
  className,
}: {
  index?: string;
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  status?: Status;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      {label ? (
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Label>{label}</Label>
        </div>
      ) : null}
      <h2 className="text-3xl leading-[1.05] sm:text-4xl md:text-5xl">{title}</h2>
      {lede ? (
        <div className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {lede}
        </div>
      ) : null}
    </header>
  );
}

/* --------------------------------- Status ---------------------------------- */
/* Status badges are intentionally not rendered anywhere on the site. */

export function StatusTag(_props: { status: Status; className?: string; withDot?: boolean }) {
  return null;
}

export function StatusLegend(_props: { className?: string }) {
  return null;
}

/* ---------------------------------- Cards ---------------------------------- */

export function TechCard({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-line bg-surface/60 p-6",
        interactive && "transition-colors duration-300 hover:border-line-strong hover:bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function NumberedCard({
  n: _n,
  title,
  children,
  className,
}: {
  n?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <TechCard interactive className={cn("h-full", className)}>
      <h3 className="text-lg md:text-xl">{title}</h3>
      {children ? (
        <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
      ) : null}
    </TechCard>
  );
}

export function Metric({
  value,
  label,
  status,
  className,
}: {
  value: string;
  label: string;
  status?: Status;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-line-strong pt-5", className)}>
      <p className="font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
        {value}
      </p>
      <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-muted-foreground">{label}</p>
      {status ? <StatusTag status={status} className="mt-4" /> : null}
    </div>
  );
}

export function Callout({
  title,
  children,
  tone = "default",
  className,
}: {
  title?: string;
  children: ReactNode;
  tone?: "default" | "signal" | "alert";
  className?: string;
}) {
  const tones = {
    default: "border-l-line-strong",
    signal: "border-l-signal",
    alert: "border-l-alert",
  } as const;
  return (
    <aside
      className={cn(
        "border-y border-r border-line border-l-2 bg-surface/40 p-6 md:p-8",
        tones[tone],
        className,
      )}
    >
      {title ? <Label className="mb-4 text-foreground/70">{title}</Label> : null}
      <div className="text-sm leading-relaxed text-muted-foreground md:text-base">{children}</div>
    </aside>
  );
}

/* --------------------------------- Tables ---------------------------------- */

export function DataTable({
  head,
  rows,
  caption,
  className,
}: {
  head: string[];
  rows: ReactNode[][];
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 max-w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[34rem] border-collapse text-left">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-line-strong py-3 pr-6 align-bottom font-mono text-[0.625rem] font-normal uppercase tracking-[0.18em] text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "border-b border-line py-4 pr-6 text-sm leading-relaxed",
                    j === 0 ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DefinitionList({
  items,
  className,
}: {
  items: { term: ReactNode; description: ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => (
        <div key={i} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-foreground">
            {item.term}
          </dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TickList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
          <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-signal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------- Text ----------------------------------- */

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-3xl text-lg leading-relaxed text-foreground/90 md:text-xl", className)}>
      {children}
    </p>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base",
        className,
      )}
    >
      {children}
    </p>
  );
}
