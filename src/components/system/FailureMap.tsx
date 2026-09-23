import { useState } from "react";

import { cn } from "@/lib/utils";
import { FAILURE_ARITHMETIC, FAILURE_CLASSES } from "@/lib/content";
import { Label } from "@/components/system/primitives";

/**
 * Failure map — the six classes a learned policy can emit, what each looks like
 * in the numbers, its consequence if unhandled, and where it is caught.
 * Rendered as an inspectable list with a signal trace per class rather than an
 * illustration.
 */
export function FailureMap() {
  const [open, setOpen] = useState<string>(FAILURE_CLASSES[3]!.id);

  return (
    <div className="border border-line">
      {FAILURE_CLASSES.map((f, i) => {
        const isOpen = f.id === open;
        return (
          <div key={f.id} className={cn(i > 0 && "border-t border-line")}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : f.id)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full items-center gap-5 px-5 py-5 text-left transition-colors",
                  isOpen ? "bg-surface" : "hover:bg-surface/60",
                )}
              >
                <FailureTrace kind={f.id} />
                <span className="flex-1 font-display text-base tracking-[-0.02em]">{f.name}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mono-xs hidden shrink-0 sm:block",
                    f.severity === 3 ? "text-alert" : "text-muted-foreground",
                  )}
                >
                  {f.severity === 3 ? "HIGH CONSEQUENCE" : "CONTAINED"}
                </span>
                <span aria-hidden className="mono-xs w-4 text-right text-muted-foreground">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div className="grid gap-6 px-5 pb-7 pl-5 sm:grid-cols-3 sm:pl-[4.25rem]">
                <div>
                  <Label>In the numbers</Label>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.looksLike}
                  </p>
                </div>
                <div>
                  <Label>If unhandled</Label>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.consequence}
                  </p>
                </div>
                <div>
                  <Label className="text-signal">Caught by</Label>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.caughtBy}</p>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
      <p className="border-t border-line bg-surface/40 px-5 py-5 text-sm leading-relaxed text-muted-foreground">
        {FAILURE_ARITHMETIC}
      </p>
    </div>
  );
}

/** A 48×16 signal trace that draws the shape of each failure class. */
function FailureTrace({ kind }: { kind: string }) {
  const paths: Record<string, string> = {
    numerical: "M0 8 H14 M20 8 H22 M28 2 V14 M34 8 H48",
    contract: "M0 12 H20 L20 3 H28 L28 12 H48",
    unauthorised: "M0 12 C10 12 16 4 24 4 C32 4 38 2 48 2",
    "confident-wrong": "M0 12 C12 12 18 6 26 6 C34 6 40 6 48 6",
    timing: "M0 8 H10 M16 8 H26 M32 8 H48",
    drift: "M0 5 C12 5 18 7 26 9 C34 11 40 12 48 13",
  };
  return (
    <svg
      aria-hidden
      width="48"
      height="16"
      viewBox="0 0 48 16"
      className="hidden shrink-0 text-signal sm:block"
    >
      <path d={paths[kind] ?? "M0 8 H48"} fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
