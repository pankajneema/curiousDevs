import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-2.5 text-amber-accent ${className}`}>
      <span className="h-px w-6 shrink-0 bg-orange" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * Section header in the V2 voice: mono eyebrow, light display headline with
 * an orange second line, and (in `split` layout) supporting copy on the right.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  action,
  layout = "split",
  className = "",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body?: ReactNode;
  action?: ReactNode;
  layout?: "split" | "stack";
  className?: string;
}) {
  const heading = (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display mt-6 text-[clamp(2.3rem,4.6vw,3.9rem)]">
        {title}
        {accent && (
          <>
            <br className="hidden sm:block" /> <span className="text-orange">{accent}</span>
          </>
        )}
      </h2>
    </div>
  );

  if (layout === "stack") {
    return (
      <div data-reveal className={className}>
        {heading}
        {body && (
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">{body}</p>
        )}
        {action && <div className="mt-7">{action}</div>}
      </div>
    );
  }

  return (
    <div
      data-reveal
      className={`grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16 ${className}`}
    >
      {heading}
      {(body || action) && (
        <div className="lg:pb-2">
          {body && (
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">{body}</p>
          )}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  );
}
