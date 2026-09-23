import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { PHYSICAL_AI_STACK } from "@/lib/content";
import { Label } from "@/components/system/primitives";

/**
 * The Physical AI stack — applications, models, OJAS Runtime, edge compute,
 * sensors and actuators. Selecting a layer expands its responsibility and
 * ownership. OJAS Runtime is emphasised because it is the layer we own.
 */
export function PhysicalAIStack() {
  const [open, setOpen] = useState("runtime");
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-3xl border border-line">
      {PHYSICAL_AI_STACK.map((layer, i) => {
        const isOpen = layer.id === open;
        return (
          <div key={layer.id} className={cn(i > 0 && "border-t border-line")}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : layer.id)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full items-center gap-4 px-5 py-5 text-left transition-colors md:px-7",
                  isOpen ? "bg-surface" : "hover:bg-surface/60",
                  layer.emphasis && !isOpen && "bg-surface/40",
                )}
              >
                <span className="mono-xs w-7 shrink-0 text-muted-foreground">{layer.index}</span>
                <span
                  aria-hidden
                  className={cn(
                    "hidden h-8 w-px shrink-0 sm:block",
                    layer.emphasis ? "bg-signal" : "bg-line-strong",
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "font-display text-lg tracking-[-0.025em] md:text-xl",
                      layer.emphasis && "text-signal",
                    )}
                  >
                    {layer.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {layer.role}
                  </span>
                </span>
                <span className="mono-xs hidden shrink-0 text-right text-muted-foreground lg:block">
                  {layer.owner}
                </span>
                <span aria-hidden className="mono-xs w-4 shrink-0 text-right text-muted-foreground">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            {isOpen ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={reduce ? false : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 px-5 pb-7 md:grid-cols-[1fr_14rem] md:px-7"
              >
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {layer.detail}
                </p>
                <div>
                  <Label>Ownership</Label>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {layer.owner}
                  </p>
                </div>
              </motion.div>
            ) : null}
          </div>
        );
      })}
      <p className="mono-xs border-t border-line bg-surface/40 px-5 py-5 text-muted-foreground md:px-7">
        INTENT FLOWS DOWN · STATE FLOWS UP · OJAS RUNTIME OWNS THE MODEL-TO-ACTION PATH
      </p>
    </div>
  );
}
