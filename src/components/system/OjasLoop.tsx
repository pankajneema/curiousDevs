import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { OJAS_LOOP, LOOP_NOTE } from "@/lib/content";
import { Label } from "@/components/system/primitives";

/**
 * The OJAS loop — perceive → world state → reason/plan → policy check → act →
 * observe, closed back into perception. Rendered as a ring of stages with a
 * travelling pulse, plus a detail panel for the selected stage.
 */
export function OjasLoop() {
  const [active, setActive] = useState(OJAS_LOOP[3]!.id);
  const reduce = useReducedMotion();
  const current = OJAS_LOOP.find((s) => s.id === active) ?? OJAS_LOOP[0]!;

  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-[1.1fr_1fr]">
      {/* Stage ring */}
      <div className="relative bg-background p-6 md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-field opacity-[0.12]"
        />
        <Label className="relative">Closed loop · continuous</Label>

        <ol className="relative mt-7 space-y-px" role="tablist" aria-label="OJAS loop stages">
          {OJAS_LOOP.map((stage, i) => {
            const isActive = stage.id === active;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(stage.id)}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-xl px-4 py-4 text-left transition-colors",
                    isActive ? "bg-surface" : "hover:bg-surface/60",
                  )}
                >
                  <span className="relative mt-1 flex w-6 shrink-0 flex-col items-center">
                    <span
                      aria-hidden
                      className={cn(
                        "size-2 rounded-full transition-colors",
                        isActive ? "bg-signal" : stage.gate ? "bg-alert/70" : "bg-line-strong",
                      )}
                    />
                    {i < OJAS_LOOP.length - 1 ? (
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1 w-px flex-1 self-center",
                          isActive ? "bg-signal/50" : "bg-line-strong/60",
                        )}
                        style={{ minHeight: "1.75rem" }}
                      />
                    ) : null}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="mono-xs text-muted-foreground">{stage.index}</span>
                      <span
                        className={cn(
                          "font-display text-base tracking-[-0.02em] transition-colors",
                          isActive ? "text-foreground" : "text-foreground/80",
                        )}
                      >
                        {stage.name}
                      </span>
                      {stage.gate ? (
                        <span className="mono-xs rounded-full border border-alert/40 px-2 py-0.5 text-alert">
                          GATE
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {stage.summary}
                    </span>
                  </span>

                  {!reduce && isActive ? (
                    <motion.span
                      aria-hidden
                      layout
                      className="mt-2 h-px w-6 shrink-0 bg-signal"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      style={{ transformOrigin: "left" }}
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>

        <p className="relative mono-xs mt-6 border-t border-line pt-5 text-muted-foreground">
          THE LAST STAGE FEEDS THE FIRST — THE LOOP DOES NOT END
        </p>
      </div>

      {/* Detail panel */}
      <div className="relative flex flex-col bg-surface/50 p-6 md:p-8">
        <Label className="text-signal">{current.gate ? "Authority" : "Stage"}</Label>
        <motion.div
          key={current.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-5"
        >
          <h3 className="font-display text-2xl tracking-[-0.025em] md:text-3xl">{current.name}</h3>
          <StageVisual id={current.id} reduce={!!reduce} />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            {current.detail}
          </p>
        </motion.div>

        <p className="mt-auto border-t border-line pt-6 text-sm leading-relaxed text-muted-foreground">
          {LOOP_NOTE}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ stage schematics ---------------------------- */

const dash = (reduce: boolean, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] as const },
      };

function StageVisual({ id, reduce }: { id: string; reduce: boolean }) {
  const line = "stroke-line-strong";
  const sig = "stroke-signal";

  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-background/60 p-5">
      <svg
        viewBox="0 0 320 120"
        role="img"
        aria-label={`Schematic for the ${id} stage`}
        className="h-[120px] w-full"
        fill="none"
        strokeWidth="1.25"
      >
        {id === "perceive" ? (
          <g>
            <motion.path d="M20 20 L60 60 L20 100" className={sig} {...dash(reduce)} />
            {Array.from({ length: 54 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={90 + (i % 18) * 12}
                cy={30 + Math.floor(i / 18) * 26}
                r="1.6"
                className="fill-foreground/45"
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? false : { opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.012, duration: 0.3 }}
              />
            ))}
            <motion.rect
              x="120"
              y="22"
              width="74"
              height="72"
              rx="4"
              className={sig}
              {...dash(reduce, 0.3)}
            />
            <motion.rect
              x="228"
              y="42"
              width="56"
              height="52"
              rx="4"
              className={sig}
              {...dash(reduce, 0.5)}
            />
          </g>
        ) : null}

        {id === "world" ? (
          <g>
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M40 ${86 - i * 26} L160 ${52 - i * 26} L280 ${86 - i * 26} L160 ${120 - i * 26} Z`}
                className={i === 2 ? sig : line}
                {...dash(reduce, i * 0.18)}
              />
            ))}
            <circle cx="160" cy="60" r="3" className="fill-signal" />
          </g>
        ) : null}

        {id === "reason" ? (
          <g>
            <motion.path d="M30 60 H110" className={line} {...dash(reduce)} />
            <motion.path d="M110 60 C150 60 150 22 200 22" className={sig} {...dash(reduce, 0.2)} />
            <motion.path
              d="M110 60 C150 60 150 60 200 60"
              className={line}
              {...dash(reduce, 0.3)}
            />
            <motion.path
              d="M110 60 C150 60 150 98 200 98"
              className={line}
              {...dash(reduce, 0.4)}
            />
            {[22, 60, 98].map((y, i) => (
              <rect
                key={y}
                x="200"
                y={y - 10}
                width="86"
                height="20"
                rx="10"
                className={i === 0 ? sig : line}
              />
            ))}
            <circle cx="110" cy="60" r="3.5" className="fill-signal" />
          </g>
        ) : null}

        {id === "policy" ? (
          <g>
            <motion.path d="M20 60 H132" className={line} {...dash(reduce)} />
            <motion.rect
              x="132"
              y="18"
              width="56"
              height="84"
              rx="6"
              className="stroke-alert"
              {...dash(reduce, 0.15)}
            />
            <motion.path d="M188 60 H300" className={sig} {...dash(reduce, 0.5)} />
            <motion.path d="M160 34 V86" className="stroke-alert/60" {...dash(reduce, 0.6)} />
            <circle cx="300" cy="60" r="3" className="fill-signal" />
            <circle cx="20" cy="60" r="3" className="fill-foreground/50" />
          </g>
        ) : null}

        {id === "act" ? (
          <g>
            <motion.path
              d="M46 104 V58 L108 30"
              className={sig}
              {...dash(reduce)}
              strokeWidth="2"
            />
            <motion.path
              d="M108 30 L150 46"
              className={sig}
              {...dash(reduce, 0.35)}
              strokeWidth="2"
            />
            <rect x="34" y="104" width="24" height="10" rx="3" className={line} />
            <motion.rect
              x="176"
              y="70"
              width="40"
              height="34"
              rx="3"
              className={line}
              {...dash(reduce, 0.5)}
            />
            <motion.path
              d="M20 114 H300"
              className="stroke-line-strong/70"
              {...dash(reduce, 0.6)}
            />
            <motion.path
              d="M236 114 H300"
              className="stroke-alert"
              {...dash(reduce, 0.8)}
              strokeWidth="2"
            />
          </g>
        ) : null}

        {id === "observe" ? (
          <g>
            <motion.path
              d="M20 60 C60 10 80 110 120 60 C160 10 180 110 220 60 C252 18 272 92 300 60"
              className={sig}
              {...dash(reduce)}
            />
            <motion.path
              d="M300 60 C300 104 250 112 160 112 C70 112 20 104 20 74"
              className="stroke-line-strong"
              {...dash(reduce, 0.5)}
              strokeDasharray="3 5"
            />
            <circle cx="20" cy="74" r="3" className="fill-signal" />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
