import { janus } from "@/content/site";
import { Logo } from "../Logo";

/**
 * MODELS + KNOWLEDGE + AGENTS + TOOLS + WORKFLOWS + EVALUATION + SECURITY +
 * OBSERVABILITY → JANUS → INTELLIGENT SYSTEM (V2 brief §07).
 */
export function ArchitectureDiagram() {
  const inputs = janus.architectureInputs;
  return (
    <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,0.9fr)_110px_minmax(0,1.3fr)] lg:gap-0">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {inputs.map((x, i) => (
          <li
            key={x}
            className="flex h-11 items-center gap-3 rounded-[var(--radius)] border border-hairline bg-surface-2 px-3 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors hover:border-orange-bright/50"
          >
            <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            {x}
          </li>
        ))}
      </ul>

      <svg
        viewBox="0 0 110 400"
        preserveAspectRatio="none"
        className="hidden h-full w-full self-stretch lg:block"
        aria-hidden="true"
      >
        {inputs.map((_, i) => {
          const y = 25 + i * 50;
          return (
            <path
              key={i}
              d={`M0 ${y} C 60 ${y}, 50 200, 110 200`}
              fill="none"
              stroke="var(--iso-edge)"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      <p className="text-center font-mono text-amber-accent lg:hidden" aria-hidden="true">
        ↓
      </p>

      <div className="flex flex-col items-stretch gap-4 xl:flex-row xl:items-center">
        <div className="spotlight flex-1 overflow-hidden rounded-[var(--radius-card)] border border-orange-bright/60 bg-night p-7">
          <div
            aria-hidden="true"
            className="glow-orange absolute -top-24 -right-24 -z-10 size-64 rounded-full"
          />
          <div className="flex items-center gap-3">
            <Logo size={26} variant="light" />
            <p className="font-mono text-sm tracking-[0.2em] text-foreground uppercase">Janus</p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {janus.verbs.join(" · ")}
          </p>
        </div>
        <p className="text-center font-mono text-amber-accent" aria-hidden="true">
          <span className="xl:hidden">↓</span>
          <span className="hidden xl:inline">→</span>
        </p>
        <div className="flex-1 rounded-[var(--radius-card)] border border-hairline p-7">
          <p className="font-mono text-sm tracking-[0.2em] text-foreground uppercase">
            Intelligent system
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Understood, evaluated, secured and observable — from first build to production.
          </p>
        </div>
      </div>
    </div>
  );
}
