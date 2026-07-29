import { Check } from "lucide-react";
import { pricing } from "@/content/site";
import { BookingDialog } from "./BookingDialog";

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-hairline pt-4 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-20">
          {pricing.map((product) => (
            <div key={product.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline pb-5">
                <h3 className="text-2xl font-bold tracking-tight">{product.name}</h3>
                <p className="eyebrow">{product.tagline}</p>
              </div>

              <div
                className={`mt-8 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-[var(--hairline)] ${
                  product.tiers.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {product.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`relative flex flex-col p-7 ${
                      tier.featured ? "bg-surface-2" : "bg-surface"
                    }`}
                  >
                    {tier.featured && (
                      <span className="mb-3 inline-flex w-fit items-center rounded-full bg-amber-accent px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-background uppercase">
                        Most adopted
                      </span>
                    )}
                    <p className="eyebrow">{tier.name}</p>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold tracking-tight">{tier.price}</span>
                      {tier.unit && (
                        <span className="font-mono text-xs text-muted-foreground">{tier.unit}</span>
                      )}
                    </div>
                    <p className="mt-3 min-h-[2.5rem] text-sm text-muted-foreground">{tier.desc}</p>
                    <ul className="mt-5 flex flex-col gap-2.5 border-t border-hairline pt-5">
                      {tier.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[13px] text-foreground">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-amber-soft" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {tier.cta === "Talk to us" ||
                    tier.cta === "Talk to sales" ||
                    tier.cta === "Book a working session" ? (
                      <BookingDialog>
                        <button
                          className={`btn-quiet mt-6 rounded-full border px-5 py-2.5 text-center text-sm font-semibold ${
                            tier.featured
                              ? "border-amber-accent/50 bg-amber-accent/10 text-amber-accent"
                              : "border-hairline bg-surface-2 text-foreground"
                          }`}
                        >
                          {tier.cta}
                        </button>
                      </BookingDialog>
                    ) : (
                      <a
                        href="/contact"
                        className="btn-quiet mt-6 rounded-full border border-hairline bg-surface-2 px-5 py-2.5 text-center text-sm font-semibold"
                      >
                        {tier.cta}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
