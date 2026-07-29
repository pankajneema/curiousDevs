import type { ReactNode } from "react";

export function LegalDoc({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="relative border-b border-hairline pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-[clamp(1.85rem,5vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="mt-3 font-mono text-xs text-muted-foreground">Last updated {updated}</p>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{intro}</p>
        <div className="mt-12 flex flex-col gap-10">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-hairline pt-8">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-amber-soft">{n}</span>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      </div>
      <div className="mt-3 max-w-2xl space-y-3 text-[14.5px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
