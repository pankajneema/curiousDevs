import type { Metadata } from 'next'
import ApplyForm from '@/components/careers/ApplyForm'

export const metadata: Metadata = {
  title: 'Careers — Security Team',
  description: 'Join CuriosDevs and build the security layer for the autonomous era. We are hiring security engineers, researchers and AI/ML security specialists. Remote-first, India.',
  alternates: { canonical: 'https://curiousdevs.com/careers' },
}

const roles = [
  {
    title: 'Founding Security Engineer — Agent Gateway',
    focus: 'Core product · Rust / Go',
    level: 'Senior / Staff',
    desc: 'Build the inline gateway that intercepts, authorises and audits every AI-agent action at sub-10ms. You own the policy engine and the enforcement path — the heart of AgentGuard.',
    must: ['Strong systems programming (Rust or Go)', 'Experience with proxies, gateways or high-throughput services', 'Care deeply about latency and correctness'],
  },
  {
    title: 'AI/ML Security Engineer',
    focus: 'Threat detection · Python',
    level: 'Mid / Senior',
    desc: 'Design the models that catch prompt injection, goal drift and data exfiltration in real time — fast enough to run on every single tool-call.',
    must: ['ML in production (classification, NER, anomaly detection)', 'Understanding of LLM/agent attack surfaces', 'Pragmatic: small fast models over heavyweight pipelines'],
  },
  {
    title: 'Security Researcher (Offensive)',
    focus: 'Research · Red-team',
    level: 'Mid / Senior',
    desc: 'Break agents before attackers do. Reproduce real injection-to-tool-call attack chains, responsibly disclose, and turn findings into published research that builds our reputation.',
    must: ['Hands-on offensive security / red-teaming', 'Familiarity with LangChain / MCP / agent frameworks', 'You write clearly — research is a product'],
  },
  {
    title: 'Application Security Engineer',
    focus: 'AppSec · Cloud',
    level: 'Mid / Senior',
    desc: 'Own the security posture of our own platform and cloud — threat modelling, secure SDLC, and the SOC 2 / ISO path that unlocks enterprise deals.',
    must: ['AppSec / cloud security experience (AWS/GCP)', 'Threat modelling and secure code review', 'Bonus: compliance frameworks (SOC 2, ISO 27001)'],
  },
]

const culture = [
  { h: 'Remote-first', p: 'Work from anywhere in India. Async by default, deep-work respected.' },
  { h: 'Equity-heavy', p: 'Founding-team equity. You build it, you own a real piece of it.' },
  { h: 'Research-led', p: 'We publish. Your work becomes the reputation that recruits the next hire.' },
  { h: 'High agency', p: 'Small team, real ownership. Ship fast, decide fast, no bureaucracy.' },
]

export default function CareersPage() {
  return (
    <>
      <section className="max-w-content mx-auto px-6 pt-20 pb-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Careers · Security team</span>
        <h1 className="font-head font-bold text-4xl md:text-5xl mt-4 max-w-[20ch] tracking-tight">
          Build the security layer for the autonomous era.
        </h1>
        <p className="text-muted mt-5 text-lg max-w-[62ch]">
          We&apos;re hiring security people only — engineers and researchers who want their work to protect real companies.
          Early enough that what you build defines the product. Remote-first across India, research-led, equity-heavy.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {culture.map(c => (
            <div key={c.h} className="card-grad rounded-xl p-4">
              <h3 className="font-head font-semibold text-sm">{c.h}</h3>
              <p className="text-muted text-xs mt-1 leading-relaxed">{c.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-content mx-auto px-6 pb-16">
        <h2 className="font-head font-bold text-2xl mb-6 tracking-tight">Open roles</h2>
        <div className="flex flex-col gap-4">
          {roles.map(r => (
            <div key={r.title} className="card-grad rounded-2xl p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-head font-semibold text-lg">{r.title}</h3>
                <span className="font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent">{r.level}</span>
              </div>
              <div className="font-mono text-xs text-faint mt-1">{r.focus}</div>
              <p className="text-muted text-sm mt-3 max-w-[70ch]">{r.desc}</p>
              <ul className="flex flex-col gap-1.5 mt-4">
                {r.must.map(m => (
                  <li key={m} className="flex gap-2 text-[13.5px] text-tx">
                    <svg className="shrink-0 mt-1 text-p2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="max-w-content mx-auto px-6 pb-24">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Apply</span>
            <h2 className="font-head font-bold text-3xl mt-3 tracking-tight">Send us your application.</h2>
            <p className="text-muted mt-3 text-[15px]">Attach your resume and tell us your experience. We read every application and reply.</p>
          </div>
          <ApplyForm roles={roles.map(r => r.title)} />
        </div>
      </section>
    </>
  )
}
