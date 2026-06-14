import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers — CuriousDevs',
  description: "We're actively hiring. Join CuriousDevs and help build the AI infrastructure layer the world needs.",
  alternates: { canonical: 'https://curiousdevs.com/careers' },
}

const roles = [
  {
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    type: 'Full-time · Remote (India preferred)',
    level: 'Senior / Staff',
    icon: '💻',
    description: "You'll own end-to-end features across the TokenFin platform — from the SDK that wraps LLM calls to the dashboard where CTOs review spend. We move fast but we ship things that don't break.",
    stack: ['Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'ClickHouse', 'Kubernetes'],
    requirements: [
      '4+ years building production SaaS products',
      'Strong TypeScript across frontend and backend',
      'Experience with data-heavy dashboards (timeseries, aggregations)',
      'You write tests. Not because you have to. Because you care.',
    ],
    email: 'hello@curiousdevs.com',
    subject: 'Application: Senior Full-Stack Engineer',
    urgent: true,
  },
  {
    title: 'AI/ML Infrastructure Engineer',
    team: 'Infrastructure',
    type: 'Full-time · Remote',
    level: 'Mid / Senior',
    icon: '🧠',
    description: "TokenFin needs to ingest, process, and attribute billions of LLM telemetry events with sub-second latency. You'll design the pipelines that make that work — and build the ML models that detect cost anomalies before our users notice them.",
    stack: ['Python', 'ClickHouse', 'Apache Kafka', 'LLM APIs', 'PyTorch (optional)'],
    requirements: [
      'Experience building high-throughput data pipelines',
      'Strong understanding of LLM APIs and token economics',
      'Comfortable with distributed tracing and observability',
      'Ideally: experience with LLMOps or ML infrastructure in production',
    ],
    email: 'hello@curiousdevs.com',
    subject: 'Application: AI/ML Infrastructure Engineer',
    urgent: true,
  },
  {
    title: 'Product Designer',
    team: 'Design',
    type: 'Full-time · Remote',
    level: 'Mid / Senior',
    icon: '🎨',
    description: "TokenFin is a data-heavy product. Your job is to make complexity legible — and even delightful. You'll own the full design system, the dashboard experience, and help shape AgentOS's visual language before it ships.",
    stack: ['Figma', 'Framer', 'Design systems', 'Prototyping'],
    requirements: [
      'Portfolio demonstrating complex data visualization UI',
      'Experience designing for developer tools or analytics products',
      'You can design AND write basic frontend (HTML/CSS/Tailwind) — our eng team will thank you',
      'Strong opinions about typography, information density, and color',
    ],
    email: 'hello@curiousdevs.com',
    subject: 'Application: Product Designer',
    urgent: false,
  },
  {
    title: 'Developer Advocate',
    team: 'Growth',
    type: 'Full-time · Remote',
    level: 'Mid',
    icon: '📢',
    description: "You'll be the first person many developers meet from CuriousDevs. Your job is to make TokenFin the obvious tool AI engineers reach for when they care about cost. Blog posts, talks, Twitter threads, office hours, Discord — you're the bridge between what we build and the people who need it.",
    stack: ['Technical writing', 'API documentation', 'Public speaking'],
    requirements: [
      'You can write code (Python or JS) and explain it clearly',
      'Track record of technical content that engineers actually read',
      'Active presence in developer communities',
      'Ideally: have worked with LLM APIs in your own projects',
    ],
    email: 'hello@curiousdevs.com',
    subject: 'Application: Developer Advocate',
    urgent: false,
  },
]

const perks = [
  { icon: '🌍', label: 'Remote-first', desc: 'Work from anywhere in India (or world, for select roles)' },
  { icon: '💰', label: 'Competitive comp', desc: 'Market salary + meaningful equity at an early stage' },
  { icon: '🚀', label: 'Ship fast', desc: 'Two-week sprints. Real users. Real impact from week one.' },
  { icon: '📚', label: 'Learning budget', desc: '₹50,000/year for courses, books, conferences' },
  { icon: '🏥', label: 'Health insurance', desc: 'Group health coverage for you and dependents' },
  { icon: '🤝', label: 'Founder access', desc: 'Direct access to founders — no layers, no politics' },
]

export default function CareersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-midnight pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}/>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal/20 text-teal font-mono text-xs px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse"/>
            Actively hiring — {roles.filter(r => r.urgent).length} urgent roles open
          </div>
          <h1 className="font-head font-black text-5xl lg:text-6xl text-white mb-4">Build what the AI era is missing.</h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            We&apos;re a small team building AI infrastructure that enterprises desperately need. If you want to do the most important work of your career at an early stage — this is the place.
          </p>
        </div>
      </section>

      {/* Why join us */}
      <section className="py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-head font-bold text-2xl text-midnight mb-8 text-center">Why join CuriousDevs?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map(p => (
              <div key={p.label} className="bg-white rounded-2xl border border-border p-6">
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="font-head font-semibold text-midnight mb-1">{p.label}</h3>
                <p className="text-sub text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-head font-bold text-3xl text-midnight mb-2">Open roles.</h2>
          <p className="text-sub mb-10">All roles are remote-first unless noted. We hire on ability, not credentials.</p>

          <div className="flex flex-col gap-6">
            {roles.map(r => (
              <div key={r.title} className={`rounded-2xl border p-8 ${r.urgent ? 'border-coral/30 bg-coral/5' : 'border-border bg-surface'}`}>
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{r.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-head font-bold text-xl text-midnight">{r.title}</h3>
                        {r.urgent && (
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-coral text-white">
                            Hiring now
                          </span>
                        )}
                      </div>
                      <p className="text-sub text-sm mt-0.5">{r.team} · {r.type} · {r.level}</p>
                    </div>
                  </div>
                  <a href={`mailto:${r.email}?subject=${encodeURIComponent(r.subject)}`}
                    className="px-5 py-2.5 bg-midnight hover:bg-midnight/90 text-white font-semibold rounded-xl text-sm transition-all shrink-0">
                    Apply →
                  </a>
                </div>

                <p className="text-sub leading-relaxed mb-5">{r.description}</p>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <p className="font-mono text-[10px] text-sub uppercase tracking-widest mb-2">Stack / Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {r.stack.map(s => (
                        <span key={s} className="font-mono text-[10px] bg-white border border-border px-2.5 py-1 rounded-lg text-midnight">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-sub uppercase tracking-widest mb-2">Requirements</p>
                    <ul className="flex flex-col gap-1.5">
                      {r.requirements.map(req => (
                        <li key={req} className="text-sub text-xs flex items-start gap-2">
                          <span className="text-teal mt-0.5 shrink-0">✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't see your role */}
      <section className="py-16 bg-midnight text-center px-6">
        <h2 className="font-head font-bold text-3xl text-white mb-3">Don&apos;t see your role?</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          We&apos;re growing fast. If you&apos;re exceptional at something that would help us build better AI infrastructure — introduce yourself.
        </p>
        <a href="mailto:hello@curiousdevs.com?subject=General Application"
          className="inline-block px-8 py-4 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all">
          Send an open application →
        </a>
      </section>
    </main>
  )
}
