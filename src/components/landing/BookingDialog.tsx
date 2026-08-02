import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CalendarCheck, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sendBookingRequest } from "@/lib/actions";

const slots = [
  "Mon–Wed, mornings",
  "Mon–Wed, afternoons",
  "Thu–Fri, mornings",
  "Thu–Fri, afternoons",
];

const surfaces = ["AI agents", "Data & DPDP", "Machine fleets"];

export function BookingDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [slot, setSlot] = useState(slots[0]);
  const [surface, setSurface] = useState(surfaces[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await sendBookingRequest({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          company: String(form.get("company") ?? ""),
          surface,
          slot,
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
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v)
          setTimeout(() => {
            setSent(false);
            setError(null);
          }, 200);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg border-hairline bg-surface p-0 sm:max-w-lg">
        <div className="border-b border-hairline px-6 py-5">
          <DialogHeader className="space-y-2 text-left">
            <p className="eyebrow flex items-center gap-2">
              <CalendarCheck className="size-3.5 text-amber-accent" /> 45-minute working session
            </p>
            <DialogTitle className="text-xl font-extrabold tracking-tight">
              Book a checkpoint review
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Bring one workflow you are nervous about. We map where the checkpoint goes and what it
              would have stopped last month.
            </DialogDescription>
          </DialogHeader>
        </div>

        {sent ? (
          <div className="px-6 py-12 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-amber-accent/40 bg-amber-accent/10">
              <Check className="size-5 text-amber-accent" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">Request received</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              We reply within one business day with two time options for{" "}
              <span className="text-foreground">{slot.toLowerCase()}</span>.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="btn-quiet mt-7 rounded-full border border-hairline bg-surface-2 px-5 py-2.5 text-sm font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="space-y-4 px-6 py-6" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="bk-name" label="Name" required>
                <input id="bk-name" name="name" required autoComplete="name" className={inputCls} />
              </Field>
              <Field id="bk-email" label="Work email" required>
                <input
                  id="bk-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field id="bk-company" label="Company" required>
              <input
                id="bk-company"
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
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
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

            <Field id="bk-slot" label="Preferred window">
              <select
                id="bk-slot"
                className={inputCls}
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
              >
                {slots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="bk-notes" label="The workflow you want reviewed">
              <textarea id="bk-notes" name="notes" rows={3} className={inputCls} />
            </Field>

            {error && <p className="text-xs font-medium text-foreground">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-accent px-6 py-3 text-sm font-semibold text-background disabled:opacity-60"
            >
              {loading ? "Sending…" : "Request the session"} <ArrowRight className="size-4" />
            </button>
            <p className="eyebrow text-center">No sales deck · engineers on the call</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

const inputCls =
  "w-full rounded-xl border border-hairline bg-surface-2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-amber-accent/60 focus-visible:ring-2 focus-visible:ring-amber-accent/25";

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
