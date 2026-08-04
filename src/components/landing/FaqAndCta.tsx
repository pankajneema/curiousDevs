import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { faqs } from "@/content/site";
import { BookingDialog } from "./BookingDialog";

export function FaqAndCta({ schema = false }: { schema?: boolean } = {}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          // Static, developer-authored FAQ copy — safe to serialize directly.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
      <section id="contact" className="relative border-b border-hairline py-24 sm:py-32">
        <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
          <h2 className="text-[clamp(2rem,5.5vw,3.75rem)] leading-[1] font-extrabold tracking-[-0.03em]">
            Let something decide for you.{" "}
            <span className="text-aurora">Just not unsupervised.</span>
          </h2>
          <p className="mt-5 text-muted-foreground sm:mt-6">
            Bring one workflow you are nervous about. We will show you exactly where the checkpoint
            goes and what it would have stopped last month.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-9">
            <BookingDialog>
              <button className="inline-flex items-center gap-2 btn-shine rounded-none bg-amber-accent px-6 py-3 text-sm font-semibold text-background">
                Book a working session <ArrowRight className="size-4" />
              </button>
            </BookingDialog>
            <a
              href="/product"
              className="inline-flex items-center gap-2 btn-quiet rounded-none border border-hairline bg-surface/60 px-6 py-3 text-sm font-semibold hover:bg-surface-2"
            >
              See the platform <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="text-center">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 text-[clamp(1.7rem,4.2vw,2.8rem)] font-extrabold tracking-[-0.03em] sm:mt-4">
              The things people ask first
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground sm:mt-4">
              Short answers on how this runs, what it costs you in speed, and what you can hand to
              an auditor.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[var(--hairline)] rounded-none border border-hairline bg-surface/70 p-1.5 shadow-[0_12px_32px_rgba(10,20,36,0.05)] sm:mt-12 sm:p-2">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 rounded-none px-4 py-5 text-left transition-colors hover:bg-surface-2/80"
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
