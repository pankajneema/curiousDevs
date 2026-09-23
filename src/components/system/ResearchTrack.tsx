import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * How a question graduates.
 *
 * Research needs a shape of its own: the Intelligence page draws a ring
 * because intelligence is continuous, and the Robotics page draws a descending
 * ladder because authority has an order. A question is neither — it is a track
 * that forks, and the point of the drawing is that *both* branches publish.
 * Only one of them graduates into a division.
 *
 * Built from ruled grid cells rather than SVG, so the labels keep their real
 * size at every breakpoint instead of scaling down with a viewBox.
 */

export type TrackStep = { index: string; name: string; body: string };
export type TrackOutcome = { verdict: string; body: string };

export function ResearchTrack({
  steps,
  outcomes,
  className,
}: {
  steps: readonly TrackStep[];
  outcomes: readonly TrackOutcome[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      {/* the track */}
      <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step.index}
            className="group relative bg-background p-6 transition-colors duration-300 hover:bg-surface/50 md:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                {step.index}
              </span>
              {i < steps.length - 1 ? (
                <span aria-hidden className="mono-xs text-line-strong">
                  →
                </span>
              ) : null}
            </div>
            <h3 className="mt-5 font-display text-lg tracking-[-0.035em] md:text-xl">
              {step.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>

            {!reduce ? (
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal/70"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              />
            ) : null}
          </li>
        ))}
      </ol>

      {/* the fork: both branches publish, one graduates */}
      <p className="mono-xs mt-8 text-muted-foreground">THEN ONE OF TWO THINGS HAPPENS</p>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {outcomes.map((outcome, i) => (
          <div
            key={outcome.verdict}
            className={cn(
              "rounded-3xl border p-6 md:p-8",
              i === 0 ? "border-signal/40 bg-surface/40" : "border-line",
            )}
          >
            <p className={cn("mono-xs", i === 0 ? "text-signal" : "text-muted-foreground")}>
              {outcome.verdict.toUpperCase()}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {outcome.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
