import type { ReactNode } from "react";
import { riseDelay } from "./motion";
import { Eyebrow } from "./SectionHeading";

/**
 * Dark page hero for every inner page — the same language as the homepage
 * hero: technical grid, warm light, grain, light display type with an
 * orange line, and a staggered entrance.
 */
export function PageIntro({
  eyebrow,
  title,
  accent,
  body,
  actions,
  aside,
  meta,
  compact = false,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  meta?: string[];
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark grain relative isolate overflow-hidden border-b border-hairline">
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(90%_85%_at_70%_20%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="glow-orange pointer-events-none absolute -top-56 right-[-18%] -z-10 size-[min(880px,120vw)] rounded-full"
      />
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 ${compact ? "pt-36 pb-16 sm:pt-44 sm:pb-24" : "pt-36 pb-20 sm:pt-44 sm:pb-28"}`}
      >
        <div className={aside ? "grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10" : ""}>
          <div>
            <div className="rise-in" style={riseDelay(0)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1
              className="rise-in display mt-7 max-w-4xl text-[clamp(2.5rem,5.2vw,4.6rem)]"
              style={riseDelay(90)}
            >
              <span className="text-sheen">{title}</span>
              {accent && (
                <>
                  <br className="hidden sm:block" /> <span className="text-orange">{accent}</span>
                </>
              )}
            </h1>
            <div
              className="rise-in mt-7 max-w-2xl text-[17px] leading-relaxed text-muted-foreground sm:text-lg"
              style={riseDelay(180)}
            >
              {body}
            </div>
            {actions && (
              <div className="rise-in mt-10 flex flex-wrap gap-3" style={riseDelay(260)}>
                {actions}
              </div>
            )}
          </div>
          {aside && (
            <div className="rise-in relative" style={riseDelay(220)}>
              {aside}
            </div>
          )}
        </div>
        {children && (
          <div className="rise-in" style={riseDelay(340)}>
            {children}
          </div>
        )}
      </div>

      {meta && meta.length > 0 && (
        <div className="border-t border-hairline bg-night/70">
          <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 sm:px-8">
            {meta.map((m, i) => (
              <li key={m} className="flex items-center gap-5 text-[13px] text-foreground/70">
                {i > 0 && <span aria-hidden="true" className="h-px w-6 bg-orange/60" />}
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
