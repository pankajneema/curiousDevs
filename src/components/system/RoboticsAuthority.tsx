import { cn } from "@/lib/utils";

/**
 * The authority stack of a CuriousDevs machine.
 *
 * Deliberately not a ring. The Intelligence page draws a loop because
 * intelligence is continuous; authority is a descending order, so this reads
 * top to bottom and ends on hardware. The last band is the only one that is
 * not software, and it is drawn that way.
 *
 * It is composed to sit in a half-width column, so every band stacks its own
 * parts rather than relying on horizontal room.
 */

export type AuthorityBand = {
  index: string;
  name: string;
  authority: string;
  body: string;
  hardware?: boolean;
};

export function RoboticsAuthority({
  layers,
  note,
  className,
}: {
  layers: readonly AuthorityBand[];
  note?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-stretch gap-4">
        {/* the direction of authority, stated once alongside the stack */}
        <div aria-hidden className="relative hidden w-7 shrink-0 sm:block">
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line-strong" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-signal">↓</span>
          <span className="mono-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-muted-foreground [writing-mode:vertical-rl]">
            AUTHORITY INCREASES
          </span>
        </div>

        <ol className="min-w-0 flex-1 overflow-hidden rounded-3xl border border-line">
          {layers.map((layer, i) => (
            <li
              key={layer.name}
              className={cn(
                "p-5 transition-colors duration-300 md:p-6",
                i > 0 && "border-t border-line",
                layer.hardware ? "bg-alert/5" : "hover:bg-surface/50",
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="mono-xs text-muted-foreground">{layer.index}</span>
                <span className={cn("mono-xs", layer.hardware ? "text-alert" : "text-signal")}>
                  {layer.authority.toUpperCase()}
                </span>
              </div>
              <h3
                className={cn(
                  "mt-3 font-display text-lg tracking-[-0.035em] md:text-xl",
                  layer.hardware && "text-alert",
                )}
              >
                {layer.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {note ? <p className="mono-xs mt-6 leading-relaxed text-muted-foreground">{note}</p> : null}
    </div>
  );
}
