import { StatusBadge, type CapabilityStatus } from "./StatusBadge";

const areas: { n: string; label: string; status: CapabilityStatus; body: string }[] = [
  {
    n: "01",
    label: "Robotics",
    status: "building",
    body: "Extending intelligent systems into physical environments through perception, control, autonomy, and physical AI.",
  },
  {
    n: "02",
    label: "AI hardware & accelerators",
    status: "exploring",
    body: "Where AI-native workloads meet the constraints of specialized compute and the hardware running them.",
  },
  {
    n: "03",
    label: "AI-native devices & sensors",
    status: "exploring",
    body: "Advanced sensors and devices designed around AI workloads from the start, not retrofitted.",
  },
  {
    n: "04",
    label: "Intelligent machines",
    status: "exploring",
    body: "Systems that need the same guardrails and observability discipline as software agents.",
  },
];

export function BeyondSoftware() {
  return (
    <section className="border-b border-hairline py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-amber-accent">Beyond software</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.03em]">
            From intelligence to action.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            The next generation of intelligent systems will depend not only on software, but on
            compute, hardware, devices, sensors, and new ways of interacting with the physical
            world. These are long-term directions, not current products or committed specifications
            — we're naming them because the same discipline we apply to production AI is the
            discipline these fields need too.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <div key={a.n} className="flex flex-col gap-3 bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{a.n}</span>
                <StatusBadge status={a.status} />
              </div>
              <h3 className="text-sm font-bold tracking-tight">{a.label}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
