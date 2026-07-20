import Reveal from '@/components/ui/Reveal'

const steps = [
  { n: '01', h: 'Intercept', p: 'The SDK captures the tool-call with full context — agent identity, session, arguments — before it ever reaches your systems.', lat: '~0 ms · in-line' },
  { n: '02', h: 'Authenticate', p: "The agent's identity is verified and a short-lived, scoped credential is attached. No agent ever holds a permanent master key.", lat: '< 2 ms' },
  { n: '03', h: 'Authorise', p: 'The policy engine checks your guardrails-as-code: is this agent allowed this tool, these arguments, this amount, this rate?', lat: '< 3 ms' },
  { n: '04', h: 'Inspect', p: 'Threat models score the call for injection, goal drift, anomalous sequences and PII or secrets leaking through the payload.', lat: '< 10 ms' },
  { n: '05', h: 'Enforce', p: 'A verdict lands: allow, block, redact, or escalate to a named human for one-click approval before anything executes.', lat: 'instant · or human-gated' },
  { n: '06', h: 'Record', p: 'Every event is written to a tamper-evident log. Replay any session step-by-step; export straight to your compliance evidence.', lat: 'async · zero-blocking' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-content mx-auto px-6 py-24 border-t border-brd">
      <Reveal className="max-w-[680px] mb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">The inspection line</span>
        <h2 className="font-head font-bold text-3xl md:text-4xl mt-4 tracking-tight">Every tool-call runs the same six-stage gauntlet.</h2>
        <p className="text-muted mt-4 text-base">AgentGuard sits inline as a gateway. From intercept to record, each stage has a strict latency budget — security you don&apos;t feel.</p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-x-14 gap-y-7">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={((i % 2) + 1) as 1 | 2}>
            <div className="flex gap-4.5 items-start" style={{ gap: '18px' }}>
              <div className="font-mono text-[13px] font-bold text-accent w-[38px] h-[38px] shrink-0 border border-brd-2 rounded-xl grid place-items-center bg-ink-3">{s.n}</div>
              <div>
                <h3 className="font-head font-semibold text-base tracking-tight mb-1.5">{s.h}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.p}</p>
                <span className="inline-block font-mono text-[11px] text-faint mt-1.5">{s.lat}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
