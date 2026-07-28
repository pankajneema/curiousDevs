import type { ReactNode } from "react";
import { BookingDialog } from "./BookingDialog";

export function PageIntro({
  eyebrow,
  title,
  accent,
  body,
  action = true,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  action?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative border-b border-hairline pt-28 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow flex items-center gap-2">
          <span className="live-dot inline-block size-1.5 rounded-full bg-amber-accent" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-[clamp(1.85rem,5vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
          {title} <span className="text-aurora">{accent}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{body}</p>
        {action && (
          <BookingDialog>
            <button className="btn-shine mt-6 rounded-full bg-amber-accent px-6 py-3 text-sm font-semibold text-background">
              Book a working session
            </button>
          </BookingDialog>
        )}
        {children}
      </div>
    </section>
  );
}
