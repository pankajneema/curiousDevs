import { useRef, useState } from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { sendContactMessage } from "@/lib/actions";
import { CONTACT_COPY, CONTACT_TIMELINES, CONTACT_TOPICS } from "@/lib/copy";
import { Label } from "@/components/system/primitives";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(200),
  work_email: z.string().trim().email("Enter a valid email address").max(320),
  company: z.string().trim().max(200).optional(),
  topic: z.string().trim().min(1, "Choose what we can help with").max(200),
  project: z.string().trim().min(1, "Tell us a little about the project").max(4000),
  timeline: z.string().trim().max(200).optional(),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

type Field = {
  name: keyof Values;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
  full?: boolean;
  autoComplete?: string;
};

/** Six essential fields. Anything we can ask in the reply is not asked here. */
const FIELDS: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    name: "work_email",
    label: "Work email",
    type: "email",
    required: true,
    placeholder: "you@company.com",
    autoComplete: "email",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Optional",
    autoComplete: "organization",
  },
  {
    name: "topic",
    label: "What can we help with?",
    type: "select",
    required: true,
    options: CONTACT_TOPICS,
  },
  {
    name: "project",
    label: "Briefly, what are you working on?",
    type: "textarea",
    required: true,
    full: true,
    placeholder: "What you are building or trying to solve, and where it stands today.",
  },
  { name: "timeline", label: "Timeline", type: "select", options: CONTACT_TIMELINES },
];

const EMPTY: Values = {
  name: "",
  work_email: "",
  company: "",
  topic: "",
  project: "",
  timeline: "",
};

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  /** Validate one field on blur, so a mistake is caught before submit. */
  const validateField = (key: keyof Values) => {
    const result = schema.safeParse(values);
    if (result.success) return;
    const issue = result.error.issues.find((i) => i.path[0] === key);
    if (issue) setErrors((e) => ({ ...e, [key]: issue.message }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof Values] = issue.message;
      }
      setErrors(next);
      // Move the caret to the first problem rather than leaving the person
      // to hunt for it — the whole form is visible, but the error may not be.
      const first = FIELDS.find((f) => next[f.name]);
      if (first) {
        formRef.current
          ?.querySelector<HTMLElement>(`#field-${first.name}`)
          ?.focus({ preventScroll: false });
      }
      return;
    }

    setState("sending");
    try {
      await sendContactMessage({
        data: {
          name: parsed.data.name,
          email: parsed.data.work_email,
          company: parsed.data.company || undefined,
          area: parsed.data.topic,
          building: parsed.data.project,
          timeline: parsed.data.timeline || undefined,
          source: "Contact page",
        },
      });
    } catch (error) {
      console.error(error);
      setState("error");
      return;
    }
    setState("sent");
    // Let assistive technology land on the confirmation.
    window.requestAnimationFrame(() => successRef.current?.focus());
  };

  if (state === "sent") {
    return (
      <div className="rounded-3xl border border-signal/40 bg-signal/5 p-8 md:p-12">
        <Label className="text-signal">{CONTACT_COPY.success.label}</Label>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-5 text-2xl tracking-[-0.035em] outline-none md:text-3xl"
        >
          {CONTACT_COPY.success.title}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {CONTACT_COPY.success.body}
        </p>
      </div>
    );
  }

  const sending = state === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const id = `field-${field.name}`;
          const error = errors[field.name];
          const invalid = Boolean(error);

          return (
            <div key={field.name} className={cn("flex flex-col", field.full && "sm:col-span-2")}>
              <label htmlFor={id} className="label-tech mb-3 text-foreground/80">
                {field.label}
                {field.required ? (
                  <span className="ml-2 text-signal">required</span>
                ) : (
                  <span className="ml-2 text-ink-faint">optional</span>
                )}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={5}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  onBlur={() => validateField(field.name)}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${id}-error` : undefined}
                  className={cn(controlClass(invalid), "resize-y")}
                />
              ) : field.type === "select" ? (
                <div className="relative">
                  <select
                    id={id}
                    name={field.name}
                    value={values[field.name] ?? ""}
                    onChange={(e) => set(field.name, e.target.value)}
                    onBlur={() => validateField(field.name)}
                    aria-invalid={invalid}
                    aria-describedby={invalid ? `${id}-error` : undefined}
                    className={cn(controlClass(invalid), "appearance-none pr-11")}
                  >
                    <option value="">Select…</option>
                    {field.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {/* a select with appearance-none has no affordance of its own */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted-foreground"
                  >
                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
                      <path
                        d="M1 1L5.5 5.5L10 1"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete ?? "off"}
                  value={values[field.name] ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  onBlur={() => validateField(field.name)}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${id}-error` : undefined}
                  className={controlClass(invalid)}
                />
              )}

              {error ? (
                <p id={`${id}-error`} className="mono-xs mt-2 text-alert">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" disabled={sending} className="btn-primary disabled:opacity-70">
          {sending ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="mono-xs text-muted-foreground">
          {state === "error" ? (
            <span className="text-alert">
              Could not send. Please try again, or email {CONTACT_COPY.email}.
            </span>
          ) : sending ? (
            "Sending…"
          ) : (
            ""
          )}
        </p>
      </div>
    </form>
  );
}

function controlClass(invalid: boolean) {
  return cn(
    "min-h-11 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors",
    "placeholder:text-ink-faint focus:border-signal",
    invalid ? "border-alert" : "border-line hover:border-line-strong",
  );
}
