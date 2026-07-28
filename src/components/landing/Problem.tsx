const scenarios = [
  {
    n: "01",
    tag: "Borrowed authority",
    title: "The assistant inherits access nobody granted it.",
    body: "It was wired up with a service credential so it would 'just work'. Now it reads every row a human never could, and no ticket records the moment that started.",
  },
  {
    n: "02",
    tag: "Instruction hijack",
    title: "A document tells the agent what to do next.",
    body: "The page it retrieved carries a sentence written for the model, not the reader. The agent obeys. Your prompt never mentioned any of it.",
  },
  {
    n: "03",
    tag: "Quiet data exit",
    title: "Personal records leave through a helper call.",
    body: "One integration widens its payload during an upgrade. Identity fields ride along to a vendor you never mapped, and the export looks routine in the logs.",
  },
  {
    n: "04",
    tag: "Machines in motion",
    title: "Nothing broke. The robot simply improvised.",
    body: "The task was under-specified, so the fleet resolved the ambiguity itself. Every individual choice was defensible; the combined outcome was not.",
  },
];

const gaps = [
  {
    title: "Dashboards",
    state: "Recorded",
    body: "They narrate the incident after the money left. Useful for the write-up, powerless at the moment of action.",
  },
  {
    title: "Prompt rules",
    state: "Suggested",
    body: "Text inside a prompt is persuasion. A long context, a clever input or a bad day is enough to talk the model out of it.",
  },
  {
    title: "Annual audits",
    state: "Snapshot",
    body: "A binder describing last quarter's system. Your data flows changed on Tuesday and the evidence never caught up.",
  },
  {
    title: "Model reviewers",
    state: "Approximate",
    body: "Asking a model to police a model doubles both the uncertainty and the bill, and still yields no reproducible verdict.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative border-b border-hairline py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-danger/40 bg-danger/10 px-3 py-1.5 text-danger">
            Where it breaks
          </span>
          <h2 className="mt-6 text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
            Nothing alarms{" "}
            <span className="font-serif font-normal text-muted-foreground italic">
              when autonomy goes wrong.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            There is no stack trace for a decision. The system runs green while doing precisely the
            wrong thing, and you find out from a customer, a regulator or a bank statement.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-[var(--hairline)] md:grid-cols-2">
          {scenarios.map((s) => (
            <article key={s.n} className="cell-hover bg-surface p-8">
              <p className="flex items-center gap-3">
                <span className="font-mono text-xs text-amber-accent">{s.n}</span>
                <span className="eyebrow">{s.tag}</span>
              </p>
              <h3 className="mt-5 max-w-sm text-2xl leading-tight font-bold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-28 text-center">
          <p className="eyebrow">The missing control</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.03em]">
            Everything you own today{" "}
            <span className="font-serif font-normal text-muted-foreground italic">
              watches, none of it decides.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Four familiar categories, one shared blind spot: none of them stand between intent and
            execution while the system is live.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {gaps.map((g) => (
            <article key={g.title} className="cell-hover bg-surface p-7">
              <h3 className="text-lg font-semibold tracking-tight">{g.title}</h3>
              <p className="eyebrow mt-2 text-amber-soft">{g.state}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
