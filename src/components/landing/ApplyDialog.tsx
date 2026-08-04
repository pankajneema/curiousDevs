import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Paperclip, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sendApplication } from "@/lib/actions";

const MAX_RESUME_BYTES = 8 * 1024 * 1024;

export function ApplyDialog({ role, children }: { role: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const resume = form.get("resume");
    if (resume instanceof File && resume.size > MAX_RESUME_BYTES) {
      setError("That resume is over 8MB — try a smaller file or link to it instead.");
      return;
    }

    setLoading(true);
    try {
      await sendApplication({ data: form });
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
            setFileName(null);
          }, 200);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg border-hairline bg-surface p-0 sm:max-w-lg">
        <div className="border-b border-hairline px-6 py-5">
          <DialogHeader className="space-y-2 text-left">
            <p className="eyebrow flex items-center gap-2">
              <Send className="size-3.5 text-amber-accent" /> Application
            </p>
            <DialogTitle className="text-xl font-extrabold tracking-tight">
              Apply — {role}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Tell us who you are and point us at your best work. We read every application
              ourselves.
            </DialogDescription>
          </DialogHeader>
        </div>

        {sent ? (
          <div className="px-6 py-12 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-none border border-amber-accent/40 bg-amber-accent/10">
              <Check className="size-5 text-amber-accent" />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">Application received</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              We reply within one business day, either way.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="btn-quiet mt-7 rounded-none border border-hairline bg-surface-2 px-5 py-2.5 text-sm font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="space-y-4 px-6 py-6" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="ap-name" label="Name" required>
                <input id="ap-name" name="name" required autoComplete="name" className={inputCls} />
              </Field>
              <Field id="ap-email" label="Email" required>
                <input
                  id="ap-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field id="ap-role" label="Role" required>
              <input id="ap-role" name="role" defaultValue={role} required className={inputCls} />
            </Field>
            <Field id="ap-link" label="LinkedIn, GitHub or portfolio">
              <input
                id="ap-link"
                name="link"
                type="url"
                placeholder="https://"
                className={inputCls}
              />
            </Field>

            <Field id="ap-resume" label="Resume (PDF or DOC, up to 8MB)">
              <label
                htmlFor="ap-resume"
                className="flex cursor-pointer items-center gap-2.5 rounded-none border border-dashed border-hairline bg-surface-2 px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-amber-accent/50 hover:text-foreground"
              >
                <Paperclip className="size-3.5 shrink-0" />
                <span className="truncate">{fileName ?? "Attach a file"}</span>
              </label>
              <input
                id="ap-resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </Field>

            <Field id="ap-notes" label="Why this role">
              <textarea id="ap-notes" name="notes" rows={4} className={inputCls} />
            </Field>

            {error && <p className="text-xs font-medium text-foreground">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-none bg-amber-accent px-6 py-3 text-sm font-semibold text-background disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send application"} <ArrowRight className="size-4" />
            </button>
            <p className="eyebrow text-center">We read every application ourselves</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
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
