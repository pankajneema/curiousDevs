import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { sendContactMessage } from "@/lib/actions";

const surfaces = ["AI agents", "Data & DPDP", "Machine fleets"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [surface, setSurface] = useState(surfaces[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <div className="py-10 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-none border border-amber-accent/40 bg-amber-accent/10">
          <Check className="size-5 text-amber-accent" />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-tight">Message received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          We reply within one business day with two concrete times to talk, focused on{" "}
          <span className="text-foreground">{surface.toLowerCase()}</span>.
        </p>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await sendContactMessage({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          company: String(form.get("company") ?? ""),
          surface,
          notes: String(form.get("notes") ?? ""),
        },
      });
      setSent(true);
    } catch {
      setError(
        "Couldn't send that — check your connection and try again, or email hello@curiousdevs.com directly.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="ct-name" label="Name" required>
          <input id="ct-name" name="name" required autoComplete="name" className={inputCls} />
        </Field>
        <Field id="ct-email" label="Work email" required>
          <input
            id="ct-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
          />
        </Field>
      </div>
      <Field id="ct-company" label="Company" required>
        <input
          id="ct-company"
          name="company"
          required
          autoComplete="organization"
          className={inputCls}
        />
      </Field>

      <fieldset>
        <legend className="eyebrow mb-2">What are you securing</legend>
        <div className="flex flex-wrap gap-2">
          {surfaces.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSurface(s)}
              aria-pressed={surface === s}
              className={`rounded-none border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                surface === s
                  ? "border-amber-accent/50 bg-amber-accent/10 text-foreground"
                  : "border-hairline bg-surface-2 text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <Field id="ct-notes" label="The workflow you want reviewed">
        <textarea id="ct-notes" name="notes" rows={4} className={inputCls} />
      </Field>

      {error && <p className="text-xs font-medium text-foreground">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-none bg-amber-accent px-6 py-3 text-sm font-semibold text-background disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send message"} <ArrowRight className="size-4" />
      </button>
      <p className="eyebrow text-center">No sales deck · engineers on the call</p>
    </form>
  );
}

const inputCls =
  "w-full rounded-none border border-hairline bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-amber-accent/60 focus-visible:ring-2 focus-visible:ring-amber-accent/25";

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block">
        {label}
        {required && (
          <span className="text-amber-accent" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
