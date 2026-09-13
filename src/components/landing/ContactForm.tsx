import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { contact } from "@/content/site";
import { sendContactMessage } from "@/lib/actions";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <div className="py-10 text-center" role="status">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-orange">
          <Check className="size-5 text-orange" />
        </span>
        <h3 className="mt-5 text-xl font-medium tracking-tight">Message received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Thank you. We'll reply by email with a few useful questions or a time to talk.
        </p>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();
    setLoading(true);
    try {
      await sendContactMessage({
        data: {
          name: value("name"),
          email: value("email"),
          company: value("company"),
          building: value("building"),
          stage: value("stage"),
          message: value("message"),
          source: "Contact page",
        },
      });
      setSent(true);
    } catch {
      setError(
        `Couldn't send that — check your connection and try again, or email ${contact.email} directly.`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
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

      <Field id="ct-company" label="Company">
        <input id="ct-company" name="company" autoComplete="organization" className={inputCls} />
      </Field>

      <Field id="ct-building" label="What are you building?" required>
        <input
          id="ct-building"
          name="building"
          required
          placeholder="An AI system, a new product, a research question…"
          className={inputCls}
        />
      </Field>

      <Field id="ct-stage" label="Current stage">
        <select id="ct-stage" name="stage" className={inputCls} defaultValue={contact.stages[0]}>
          {contact.stages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field id="ct-message" label="Message">
        <textarea
          id="ct-message"
          name="message"
          rows={5}
          placeholder="Tell us what you're trying to build, fix or explore."
          className={inputCls}
        />
      </Field>

      {error && (
        <p role="alert" className="text-sm font-medium text-foreground">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Sending…" : "Start the Conversation"} <ArrowRight className="size-4" />
        </button>
        <p className="text-xs text-muted-foreground">
          Or email{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-foreground underline underline-offset-4"
          >
            {contact.email}
          </a>
        </p>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-[var(--radius)] border border-hairline bg-ivory px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-orange focus-visible:ring-2 focus-visible:ring-orange/20";

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
