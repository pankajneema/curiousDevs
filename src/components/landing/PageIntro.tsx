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
    <section className="relative border-b border-hairline pt-22 pb-8 sm:pt-24 sm:pb-10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="eyebrow flex items-center gap-2">
          <span className="live-dot inline-block size-1.5 rounded-none bg-amber-accent" />
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-[clamp(1.75rem,4.6vw,3.1rem)] leading-[1.05] font-extrabold tracking-[-0.03em] sm:mt-4">
          {title} <span className="text-aurora">{accent}</span>
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:mt-4">{body}</p>
        {action && (
          <BookingDialog>
            <button className="btn-shine mt-5 rounded-none bg-amber-accent px-6 py-3 text-sm font-semibold text-background sm:mt-6">
              Book a working session
            </button>
          </BookingDialog>
        )}
        {children}
      </div>
    </section>
  );
}
