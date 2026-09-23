import { Suspense, lazy, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { ANATOMY_GROUPS, PARTH_ANATOMY, type AnatomyNode } from "@/lib/content";
import { Label } from "@/components/system/primitives";

const ParthModel = lazy(() => import("@/components/system/ParthModel"));

const GROUP_CLASS: Record<AnatomyNode["group"], string> = {
  sensing: "text-signal",
  manipulation: "text-foreground",
  locomotion: "text-foreground/70",
  power: "text-alert",
};

const Placeholder = () => (
  <div className="grid h-[28rem] w-full place-items-center md:h-[34rem]">
    <span className="mono-xs text-muted-foreground">Loading PARTH…</span>
  </div>
);

/**
 * Interactive PARTH anatomy. A real-time 3D model of the machine: drag to
 * rotate, hover or click a subsystem to inspect it, or open the exploded view.
 * Every figure shown is a baseline design decision, not a measured result.
 */
export function ParthAnatomy() {
  const [active, setActive] = useState("wrist");
  const reduce = useReducedMotion();
  const current = PARTH_ANATOMY.find((n) => n.id === active) ?? PARTH_ANATOMY[0]!;

  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-[1.1fr_0.9fr]">
      {/* 3D model */}
      <div className="relative bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-field opacity-[0.12]"
        />
        <div className="relative">
          <ClientOnly fallback={<Placeholder />}>
            <Suspense fallback={<Placeholder />}>
              <ParthModel activeId={active} onSelect={setActive} />
            </Suspense>
          </ClientOnly>
        </div>

        <div className="relative flex flex-wrap gap-x-5 gap-y-2 border-t border-line px-6 py-5">
          {ANATOMY_GROUPS.map((g) => (
            <span key={g.id} className="mono-xs flex items-center gap-2 text-muted-foreground">
              <span
                aria-hidden
                className={cn("size-1.5 rounded-full bg-current", GROUP_CLASS[g.id])}
              />
              {g.label.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Callout detail + selector */}
      <div className="flex flex-col bg-surface/50 p-6 md:p-8">
        <Label className="text-signal">Component</Label>

        <motion.div
          key={current.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          className="mt-5"
        >
          <h3 className="font-display text-2xl tracking-[-0.025em] md:text-3xl">{current.name}</h3>
          <p className="mono-xs mt-3 text-signal">{current.spec.toUpperCase()}</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {current.note}
          </p>
        </motion.div>

        <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-6">
          {PARTH_ANATOMY.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setActive(node.id)}
              aria-pressed={node.id === active}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors",
                node.id === active
                  ? "border-signal/60 bg-signal/10 text-foreground"
                  : "border-line text-muted-foreground hover:border-line-strong hover:text-foreground",
              )}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
