import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { PARTH_AUTHORITY, PARTH_SAFETY_NOTE } from "@/lib/content";
import { Label } from "@/components/system/primitives";

/**
 * Authority ladder — model layer proposes, policy authorises, skills validate,
 * controller limits clamp, and independent safety hardware removes power.
 * Lower layers hold more authority; the hardware layer is drawn as the floor.
 */
export function AuthorityLadder() {
  const reduce = useReducedMotion();

  return (
    <div>
      <ol className="overflow-hidden rounded-3xl border border-line">
        {PARTH_AUTHORITY.map((layer, i) => (
          <li
            key={layer.name}
            className={cn(
              "relative",
              i > 0 && "border-t border-line",
              layer.hardware ? "bg-alert/5" : "bg-background",
            )}
          >
            <div className="flex flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:gap-7 md:px-7">
              <span className="mono-xs w-7 shrink-0 text-muted-foreground">{layer.index}</span>
              <div className="min-w-0 md:w-56 md:shrink-0">
                <h3
                  className={cn(
                    "font-display text-lg tracking-[-0.025em]",
                    layer.hardware && "text-alert",
                  )}
                >
                  {layer.name}
                </h3>
                <p className="mono-xs mt-2 text-muted-foreground">{layer.owner.toUpperCase()}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    layer.hardware ? "text-alert" : "text-foreground",
                  )}
                >
                  {layer.authority}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
              </div>
            </div>
            {!reduce ? (
              <motion.span
                aria-hidden
                className={cn(
                  "absolute inset-y-0 left-0 w-px origin-top",
                  layer.hardware ? "bg-alert" : "bg-signal/50",
                )}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              />
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
        <Label className="shrink-0 text-alert">Authority increases downward</Label>
        <p className="text-sm leading-relaxed text-muted-foreground">{PARTH_SAFETY_NOTE}</p>
      </div>
    </div>
  );
}
