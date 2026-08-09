const scenarios = [
  {
    n: "01",
    tag: "Unclear scope",
    title: "The AI demo works. The production problem is undefined.",
    body: "Teams start with a model call, a prompt, and a hopeful workflow. Without clear architecture, ownership, baseline, or acceptance criteria, the project expands without becoming reliable.",
  },
  {
    n: "02",
    tag: "RAG failure",
    title: "Retrieval returns context that sounds right but is wrong.",
    body: "Chunking, metadata, ranking, and evaluation are not measured. The team sees plausible answers and cannot explain which evidence was used or why the system failed.",
  },
  {
    n: "03",
    tag: "Agent reliability",
    title: "The workflow fails on the edge case nobody tested.",
    body: "The happy path is impressive, but tool permissions, state, retries, fallbacks, and human handoffs are not covered by a regression suite.",
  },
  {
    n: "04",
    tag: "Production gap",
    title: "The system works locally but cannot be operated.",
    body: "There is no release path, cost attribution, observability, runbook, or clear handover. A working prototype becomes an operational risk instead of a product capability.",
  },
];

const gaps = [
  {
    title: "Architecture",
    state: "Defined",
    body: "The system needs clear boundaries, data flows, integrations, and an owner before more features are added.",
  },
  {
    title: "Evaluation",
    state: "Measured",
    body: "A test set and regression loop turn vague quality concerns into engineering decisions.",
  },
  {
    title: "Security",
    state: "Hardened",
    body: "Prompt injection, tool permissions, data leakage, and unsafe fallback behavior need active review.",
  },
  {
    title: "Operations",
    state: "Operable",
    body: "Deployment, observability, cost controls, runbooks, and handover determine whether the system can survive production.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative border-b border-hairline py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-none border border-danger/40 bg-danger/10 px-3 py-1.5 text-foreground">
            Where AI breaks
          </span>
          <h2 className="mt-5 text-[clamp(2.1rem,5vw,3.8rem)] leading-[0.98] font-extrabold tracking-[-0.03em] sm:mt-6">
            AI is easy to demo.{" "}
            <span className="text-muted-foreground">Production is different.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:mt-5">
            RAG returns irrelevant context. Agents fail on edge cases. Costs grow unpredictably.
            Latency hurts the user experience. Security gaps appear around prompts, tools, and data.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] md:grid-cols-2">
          {scenarios.map((s) => (
            <article
              key={s.n}
              className="cell-hover rounded-none border border-hairline/70 bg-surface p-6 shadow-[0_8px_24px_rgba(10,20,36,0.04)] sm:p-8"
            >
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

        <div className="mt-24 text-center sm:mt-28">
          <p className="eyebrow">The missing engineering system</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.5vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.03em]">
            Every serious AI project needs{" "}
            <span className="text-muted-foreground">more than a model call.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            The missing pieces are usually architecture, evaluation, security, optimization,
            deployment discipline, and an owner for the outcome.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {gaps.map((g) => (
            <article
              key={g.title}
              className="cell-hover border border-hairline/70 bg-surface p-6 shadow-[0_8px_24px_rgba(10,20,36,0.03)] sm:p-7"
            >
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
