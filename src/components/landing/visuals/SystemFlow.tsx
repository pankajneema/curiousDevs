import type { CSSProperties } from "react";

/**
 * A system chain as labelled nodes joined by live connectors. Each connector
 * travels with the node it leads into, so when the chain wraps the new line
 * reads as a continuation rather than leaving a dangling link at line end.
 * The final node is emphasised as the outcome.
 */
export function SystemFlow({ steps, className = "" }: { steps: string[]; className?: string }) {
  return (
    <ol className={`flex flex-wrap items-center gap-y-3 ${className}`}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="flow-line w-5 sm:w-7"
                style={{ "--flow-delay": `${i * 0.35}s` } as CSSProperties}
              />
            )}
            <span
              className={`flex items-center gap-2 rounded-[var(--radius)] border bg-surface px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.1em] whitespace-nowrap uppercase sm:text-[11px] ${last ? "border-orange text-foreground" : "border-hairline text-foreground/80"}`}
            >
              <span className={last ? "text-amber-accent" : "text-muted-foreground"}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
