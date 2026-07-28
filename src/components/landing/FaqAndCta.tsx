import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { faqs } from "@/content/site";
import { BookingDialog } from "./BookingDialog";


export function FaqAndCta() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section id="contact" className="relative border-b border-hairline py-32">
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] leading-[1] font-extrabold tracking-[-0.03em]">
            Let something decide for you.{" "}
            <span className="text-aurora">Just not unsupervised.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Bring one workflow you are nervous about. We will show you exactly where the checkpoint
            goes and what it would have stopped last month.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <BookingDialog>
              <button className="inline-flex items-center gap-2 btn-shine rounded-full bg-amber-accent px-6 py-3 text-sm font-semibold text-background">
                Book a working session <ArrowRight className="size-4" />
              </button>
            </BookingDialog>
            <a
              href="/product"
              className="inline-flex items-center gap-2 btn-quiet rounded-full border border-hairline bg-surface/60 px-6 py-3 text-sm font-semibold hover:bg-surface-2"
            >
              See the platform <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3rem)] font-extrabold tracking-[-0.03em]">
              The things people ask first
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Short answers on how this runs, what it costs you in speed, and what you can hand to an
              auditor.
            </p>
          </div>


          <div className="mt-12 divide-y divide-[var(--hairline)] border-y border-hairline">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium">{f.q}</span>
                  {open === i ? (
                    <Minus className="size-4 shrink-0 text-amber-accent" />
                  ) : (
                    <Plus className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {open === i && (
                  <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

