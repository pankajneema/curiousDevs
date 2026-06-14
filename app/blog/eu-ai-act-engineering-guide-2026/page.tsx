import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'EU AI Act: Practical Engineering Guide 2026 — CuriousDevs',
  description: 'The EU AI Act is not just a legal checkbox. It has direct engineering implications. Here is what every team building AI products needs to implement before August 2026.',
  alternates: { canonical: 'https://curiousdevs.com/blog/eu-ai-act-engineering-guide-2026' },
}

export default function Post() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-[#8B5CF6] bg-[#8B5CF6]/10">AI Governance</span>
            <span className="text-white/40 text-xs font-mono">May 15, 2025</span>
            <span className="text-white/40 text-xs font-mono">·</span>
            <span className="text-white/40 text-xs font-mono">13 min read</span>
          </div>
          <h1 className="font-head font-black text-4xl lg:text-5xl text-white leading-tight mb-6">
            The EU AI Act: A Practical<br/>Engineering Guide for 2026
          </h1>
          <p className="text-white/60 text-xl leading-relaxed">
            Most teams are treating this like GDPR — hand it to legal and move on. That is a mistake. The AI Act has direct implications for your code, your infrastructure, and your deployment pipeline. Here is what you actually need to build.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10 text-sub leading-relaxed">

          <div className="bg-[#8B5CF6]/8 border border-[#8B5CF6]/25 rounded-2xl p-6">
            <p className="text-midnight font-semibold text-sm mb-2">This is not legal advice</p>
            <p className="text-sub text-sm">This is an engineering interpretation of publicly available EU AI Act text (Regulation (EU) 2024/1689, published June 12, 2024 in the Official Journal of the European Union). Consult legal counsel for compliance decisions. This post focuses on what the Act requires engineers to <em>build</em>, not on legal strategy.</p>
          </div>

          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-5">The exact timeline — dates that matter</h2>
            <div className="space-y-3">
              {[
                {
                  date: 'Feb 2, 2025',
                  title: 'Prohibited AI Practices — enforcement began',
                  desc: 'Article 5 bans are live. Prohibited: subliminal manipulation, social scoring by public authorities, real-time remote biometric ID in public spaces (with narrow exceptions), AI that exploits vulnerable groups. If your product does any of these, you needed to stop before this date.',
                  status: 'PAST',
                  color: 'border-coral bg-coral/5',
                  badgeColor: 'bg-coral text-white',
                },
                {
                  date: 'Aug 2, 2025',
                  title: 'GPAI Model Obligations — active now',
                  desc: 'General-Purpose AI providers (OpenAI, Anthropic, Google, Mistral) must publish technical documentation, maintain training data policies, and comply with copyright law. If you fine-tune a GPAI model and distribute it, these obligations extend to you. For most teams: you just need to ensure your GPAI provider is compliant — check their documentation.',
                  status: 'LIVE',
                  color: 'border-[#F59E0B] bg-[#F59E0B]/5',
                  badgeColor: 'bg-[#F59E0B] text-white',
                },
                {
                  date: 'Aug 2, 2026',
                  title: 'High-Risk AI Systems — 14 months away',
                  desc: 'The one that impacts most enterprise AI products. Full conformity assessment, technical documentation, human oversight requirements, audit logs, incident reporting. This is what this article is about.',
                  status: 'UPCOMING',
                  color: 'border-[#8B5CF6] bg-[#8B5CF6]/5',
                  badgeColor: 'bg-[#8B5CF6] text-white',
                },
                {
                  date: 'Aug 2, 2027',
                  title: 'Lower-Risk AI — transparency layer',
                  desc: 'Transparency obligations for chatbots, deepfake detection requirements, limited-risk AI systems must inform users they are interacting with AI.',
                  status: 'FUTURE',
                  color: 'border-border bg-white',
                  badgeColor: 'bg-border text-sub',
                },
              ].map(item => (
                <div key={item.date} className={`border ${item.color} rounded-xl p-5`}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <span className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.badgeColor} mr-2`}>{item.status}</span>
                      <span className="font-mono text-xs text-sub">{item.date}</span>
                      <p className="font-head font-bold text-midnight mt-1">{item.title}</p>
                    </div>
                  </div>
                  <p className="text-sub text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-4">What "high-risk" actually means — the engineering trigger list</h2>
            <p>Annex III of the Regulation lists the high-risk categories. The ones most likely to affect software companies:</p>

            <div className="mt-4 space-y-3">
              {[
                { trigger: 'AI that influences hiring or HR decisions', detail: 'CV screening, candidate ranking, interview assessment, promotion decisions, performance evaluation. If your AI scores, ranks, or filters job applicants — this is you.' },
                { trigger: 'AI in credit or insurance underwriting', detail: 'Loan scoring, fraud detection systems that block access to financial services, insurance risk models that set premiums.' },
                { trigger: 'AI used in access to essential services', detail: 'Social benefit eligibility, housing access, utilities. Less common in SaaS but watch for adjacent products.' },
                { trigger: 'AI in biometric categorisation', detail: 'Any system that infers sensitive attributes (gender, race, political opinion, health status) from biometric data.' },
                { trigger: 'AI in education or training assessment', detail: 'Automated grading systems, exam proctoring, student assessment tools that materially affect educational access.' },
                { trigger: 'AI in law enforcement', detail: 'Predictive policing, risk assessment in criminal proceedings, evidence evaluation.' },
              ].map(item => (
                <div key={item.trigger} className="bg-white border border-border rounded-xl p-5 flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0 mt-2" />
                  <div>
                    <p className="font-head font-semibold text-midnight text-sm">{item.trigger}</p>
                    <p className="text-sub text-xs mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-sub mt-4 bg-[#8B5CF6]/8 border border-[#8B5CF6]/20 rounded-xl p-4">If you are a general B2B SaaS product that uses LLMs for search, summarisation, or chatbots — you are <strong>probably not high-risk</strong> under Annex III. But you need to confirm this with a documented risk assessment. "Probably not" is not a compliance posture.</p>
          </div>

          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-4">What you actually need to build (for high-risk systems)</h2>
            <p>Article 9–17 of the Regulation specifies the technical requirements. Here is the engineering translation:</p>

            <div className="space-y-6 mt-4">

              <div className="bg-white border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center font-bold text-sm">01</span>
                  <h3 className="font-head font-semibold text-midnight">Decision Audit Logs (Article 12)</h3>
                </div>
                <p className="text-sub text-sm mb-4">Every AI decision that affects a person must be logged with sufficient detail to audit after the fact. The Act does not specify a schema, but best practice (and what regulators will expect):</p>
                <div className="bg-[#0E0E1C] rounded-xl p-4 font-mono text-xs text-white/80">
                  <p className="text-white/30 mb-2">{'// Minimum required audit log entry'}</p>
                  <p>{`{`}</p>
                  <p className="pl-4 text-green-400">{`"decision_id": "dec_01HWXYZ...",`}</p>
                  <p className="pl-4 text-green-400">{`"timestamp": "2025-08-02T14:32:11Z",`}</p>
                  <p className="pl-4 text-green-400">{`"model_id": "gpt-4o-2024-05-13",`}</p>
                  <p className="pl-4 text-green-400">{`"model_version": "2024-05-13",`}</p>
                  <p className="pl-4 text-green-400">{`"input_hash": "sha256:a3b4c5...",`}</p>
                  <p className="pl-4 text-green-400">{`"output_summary": "application_rejected",`}</p>
                  <p className="pl-4 text-green-400">{`"confidence_score": 0.87,`}</p>
                  <p className="pl-4 text-green-400">{`"feature_weights": {...},`}</p>
                  <p className="pl-4 text-green-400">{`"human_reviewed": false,`}</p>
                  <p className="pl-4 text-green-400">{`"data_sources": ["credit_bureau", "bank_statement"],`}</p>
                  <p className="pl-4 text-green-400">{`"system_version": "v2.4.1",`}</p>
                  <p className="pl-4 text-green-400">{`"jurisdiction": "EU"`}</p>
                  <p>{`}`}</p>
                </div>
                <p className="text-xs text-sub mt-3">Logs must be retained for <strong>at least 6 months post-decision</strong>, and up to 10 years for law enforcement applications (Article 12.1). Store in append-only, tamper-evident storage (AWS S3 Object Lock, GCS Bucket Lock, or equivalent).</p>
              </div>

              <div className="bg-white border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center font-bold text-sm">02</span>
                  <h3 className="font-head font-semibold text-midnight">Human-in-the-Loop Checkpoints (Article 14)</h3>
                </div>
                <p className="text-sub text-sm mb-3">High-risk AI must allow humans to override, intervene, or stop the system. This is not a UI checkbox. It requires:</p>
                <div className="space-y-2">
                  {[
                    'A documented override mechanism with access controls (who can override, how, under what conditions)',
                    'The override event must be logged with timestamp and reviewer identity',
                    'The system must be able to halt operation if anomalies are detected (Article 14.4e)',
                    'Meaningful interpretability — the human reviewer must be able to understand what the AI decided and why',
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-xs text-sub">
                      <span className="text-[#8B5CF6] shrink-0 mt-0.5">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center font-bold text-sm">03</span>
                  <h3 className="font-head font-semibold text-midnight">Technical Documentation File (Article 11 + Annex IV)</h3>
                </div>
                <p className="text-sub text-sm mb-3">You must maintain a technical file that regulators can audit. Annex IV specifies what it must contain:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'General description of the AI system and its intended purpose',
                    'Description of the elements of the AI system and how they interact',
                    'Design specifications (architecture, training methodology, objectives)',
                    'Training, validation, and testing datasets used',
                    'Known limitations and foreseeable risks with mitigations',
                    'Details of human oversight mechanisms',
                    'List of standards applied (ISO, IEEE, national standards)',
                    'Post-market monitoring plan',
                  ].map((item, i) => (
                    <div key={i} className="bg-surface/50 rounded-lg p-3 text-xs text-sub flex gap-2">
                      <span className="text-[#8B5CF6] shrink-0">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-border rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center font-bold text-sm">04</span>
                  <h3 className="font-head font-semibold text-midnight">Incident Reporting (Article 73)</h3>
                </div>
                <p className="text-sub text-sm">Serious incidents — defined as events causing death, serious harm, property damage, or fundamental rights violations — must be reported to national authorities. Timeline:</p>
                <div className="mt-3 space-y-2">
                  {[
                    { time: '72 hours', event: 'Report serious incidents (death, serious injury)' },
                    { time: '15 days', event: 'Report serious malfunctions in high-risk systems' },
                    { time: '30 days', event: 'Full incident analysis report' },
                  ].map(item => (
                    <div key={item.time} className="flex gap-4 items-center text-xs">
                      <span className="font-mono text-[#8B5CF6] font-bold w-20 shrink-0">{item.time}</span>
                      <span className="text-sub">{item.event}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-4">The fines — why this is not optional</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { amount: '€35M or 7% global turnover', label: 'Prohibited AI violations (Article 5)', color: 'bg-coral/10 border-coral/30' },
                { amount: '€15M or 3% global turnover', label: 'Other non-compliance including high-risk system requirements', color: 'bg-[#F59E0B]/10 border-[#F59E0B]/30' },
                { amount: '€7.5M or 1.5% global turnover', label: 'Supplying incorrect information to authorities', color: 'bg-[#8B5CF6]/10 border-[#8B5CF6]/30' },
              ].map(item => (
                <div key={item.amount} className={`border rounded-xl p-5 ${item.color}`}>
                  <p className="font-head font-bold text-midnight text-lg leading-tight">{item.amount}</p>
                  <p className="text-sub text-xs mt-2">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-sub mt-4">Whichever is higher applies. For a startup with €10M ARR, a 3% violation is €300K. For a Series C with €50M ARR, it is €1.5M. These are not theoretical — GDPR enforcement generated <strong>€4.18 billion in fines</strong> between 2018 and 2023. The EU has demonstrated it enforces these regulations.</p>
          </div>

          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-4">The 90-day engineering sprint to compliance</h2>
            <div className="space-y-3">
              {[
                { week: 'Week 1–2', title: 'Risk classification audit', tasks: ['Map all AI systems in your product', 'Classify each against Annex III', 'Document which are high-risk, limited-risk, or minimal-risk', 'Assign owners'] },
                { week: 'Week 3–4', title: 'Audit log infrastructure', tasks: ['Implement append-only audit log storage', 'Define log schema (see above)', 'Add logging hooks to all high-risk decision paths', 'Set up retention policies'] },
                { week: 'Week 5–6', title: 'Human oversight mechanisms', tasks: ['Build override UI for reviewers', 'Implement override logging', 'Define escalation policies and document them', 'Test halt/pause mechanisms'] },
                { week: 'Week 7–8', title: 'Technical documentation', tasks: ['Write Annex IV technical file (at least a first draft)', 'Document model cards for all models in use', 'Document training data sources and limitations', 'Assign compliance owner'] },
                { week: 'Week 9–12', title: 'Testing and validation', tasks: ['Run bias and fairness testing on high-risk decision outputs', 'Document known limitations', 'Penetration test the override mechanism', 'External legal review of technical file'] },
              ].map(sprint => (
                <div key={sprint.week} className="bg-white border border-border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full font-bold">{sprint.week}</span>
                    <p className="font-head font-semibold text-midnight text-sm">{sprint.title}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1">
                    {sprint.tasks.map(t => (
                      <p key={t} className="text-xs text-sub flex gap-2"><span className="text-[#8B5CF6] shrink-0">→</span>{t}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-midnight rounded-2xl p-8 text-white">
            <p className="font-mono text-xs text-[#8B5CF6] uppercase tracking-widest mb-3">The honest assessment</p>
            <p className="text-xl font-head font-bold mb-4">14 months is not a lot of time if you start now. It is zero time if you start in 2026.</p>
            <p className="text-white/60 text-sm leading-relaxed mb-6">The teams that will struggle are not the ones building obviously high-risk AI. They are the ones who built general-purpose AI products that crept into high-risk territory as their features expanded — and never noticed the classification change. Do the audit now.</p>
            <p className="text-white/60 text-sm leading-relaxed">AgentOS is being built specifically to automate the decision logging, human oversight checkpoints, and conformity documentation described above. If you want early access, join the waitlist below.</p>
            <Link href="/products/agentos"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white font-semibold rounded-xl hover:bg-[#7C3AED] transition-all text-sm">
              Join AgentOS waitlist →
            </Link>
          </div>

        </div>

        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border flex justify-between items-center flex-wrap gap-4">
          <Link href="/blog" className="text-sm text-sub hover:text-midnight transition-colors">← All posts</Link>
          <Link href="/blog/cut-llm-bill-case-study" className="text-sm font-semibold text-coral hover:underline">Next: ₹39L → ₹23L case study →</Link>
        </div>
      </section>
    </main>
  )
}
