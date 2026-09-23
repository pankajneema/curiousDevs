import { motion, useReducedMotion } from "motion/react";

import { PIPELINE } from "@/lib/content";
import { Label } from "@/components/system/primitives";

/**
 * Data pipeline: teleoperation → episode storage → baseline → fine-tuning →
 * edge compilation → versioned deployment → observability → retraining.
 * The loop is closed: stage 08 feeds stage 04.
 */
export function Pipeline() {
  const reduce = useReducedMotion();

  return (
    <div>
      <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE.map((stage, i) => (
          <li
            key={stage.n}
            className="group relative bg-background p-6 transition-colors hover:bg-surface"
          >
            <div className="flex items-center justify-between">
              <Label className="text-signal">{stage.n}</Label>
              {i < PIPELINE.length - 1 ? (
                <svg
                  aria-hidden
                  width="26"
                  height="8"
                  viewBox="0 0 26 8"
                  className="text-line-strong"
                >
                  <line
                    x1="0"
                    y1="4"
                    x2="20"
                    y2="4"
                    stroke="currentColor"
                    strokeWidth="1"
                    className={reduce ? undefined : "flow-dash"}
                  />
                  <path d="M18 1 L24 4 L18 7" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              ) : (
                <span className="mono-xs text-muted-foreground">→ 04</span>
              )}
            </div>
            <h3 className="mt-5 font-display text-base tracking-[-0.02em]">{stage.stage}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
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
      <p className="mono-xs mt-4 text-muted-foreground">
        CLOSED LOOP — STAGE 08 RETURNS TO STAGE 04. THE PIPELINE IS THE MECHANISM BY WHICH THE ONLY
        DURABLE ASSET ACCUMULATES.
      </p>
    </div>
  );
}
