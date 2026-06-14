import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'From ₹39L to ₹23L: How a Series B AI Startup Cut LLM Costs 41% — CuriousDevs',
  description: 'A real TokenFin beta engagement. 45-person AI startup, ₹39L/month LLM bill, no attribution, CFO asking questions. Two weeks later: ₹23L. Here is every finding and every fix.',
  alternates: { canonical: 'https://curiousdevs.com/blog/cut-llm-bill-case-study' },
}

export default function Post() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-midnight bg-midnight/10 border border-midnight/20">Case Study</span>
            <span className="text-white/40 text-xs font-mono">April 30, 2025</span>
            <span className="text-white/40 text-xs font-mono">·</span>
            <span className="text-white/40 text-xs font-mono">9 min read</span>
          </div>
          <h1 className="font-head font-black text-4xl lg:text-5xl text-white leading-tight mb-6">
            From ₹39L to ₹23L/Month:<br/>How a Series B AI Startup Cut<br/>Their LLM Bill 41% in Two Weeks
          </h1>
          <p className="text-white/60 text-xl leading-relaxed">
            Zero feature changes. Zero model quality degradation. Zero additional engineers. Just attribution data and two weeks of surgical fixes. Here is the full breakdown.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10 text-sub leading-relaxed">

          <div className="bg-border/30 border border-border rounded-2xl p-6">
            <p className="text-midnight font-semibold text-sm mb-2">About this case study</p>
            <p className="text-sub text-sm">This is a real TokenFin private beta engagement. The company name and identifiable details have been anonymised at their request. All numbers are real and unrounded. The CFO reviewed this post before publication.</p>
          </div>

          {/* Before state */}
          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-5">The situation on day 1</h2>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Team size', value: '45 people', sub: 'Series B, B2B SaaS' },
                { label: 'Monthly LLM spend', value: '₹39.2L', sub: '~$47,000 USD' },
                { label: 'Attribution visibility', value: '0%', sub: 'No breakdown by feature' },
              ].map(item => (
                <div key={item.label} className="bg-white border border-border rounded-xl p-5 text-center">
                  <p className="font-head font-black text-2xl text-midnight">{item.value}</p>
                  <p className="text-xs text-sub mt-1">{item.label}</p>
                  <p className="text-[10px] text-sub/60 font-mono mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>

            <p>The product is a B2B SaaS tool that uses LLMs across three distinct surfaces: document analysis for enterprise customers, a customer support chatbot, and an internal operations layer for their own team.</p>
            <p className="mt-4">Their LLM bill had grown 4.3× in 8 months — from ₹9.1L/month at launch to ₹39.2L/month. The CEO was tracking revenue growth (healthy). The CFO was tracking cost growth (alarming). The gap between the two was closing.</p>
            <p className="mt-4">When we asked their CTO to explain where the ₹39.2L was going, the honest answer was: <em>"GPT-4o, mostly. Some Anthropic. Our document feature is the biggest driver, we think."</em></p>
            <p className="mt-4">"We think" is not a FinOps posture.</p>
          </div>

          {/* Instrumentation */}
          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-4">Day 1: Instrumentation — 20 minutes</h2>
            <p>We added TokenFin instrumentation to every LLM call in their codebase. The team had 3 developers on a call. It took 20 minutes. Every existing call path was wrapped with attribution metadata:</p>

            <div className="bg-[#0E0E1C] rounded-xl p-5 mt-4 font-mono text-xs leading-relaxed">
              <p className="text-white/30 mb-2">{'// Before: no attribution'}</p>
              <p><span className="text-teal">const</span> <span className="text-white">result</span> <span className="text-white/50">=</span> <span className="text-teal">await</span> <span className="text-white">openai.chat.completions.create({'({model, messages})'}</span></p>
              <br/>
              <p className="text-white/30 mb-2">{'// After: 3 attribution tags added'}</p>
              <p><span className="text-teal">const</span> <span className="text-white">result</span> <span className="text-white/50">=</span> <span className="text-teal">await</span> <span className="text-coral">track</span><span className="text-white">({'('}openai.chat.completions.create({'({model, messages})'}),</span></p>
              <p className="pl-4"><span className="text-white">{'{'}</span> <span className="text-[#F59E0B]">feature</span><span className="text-white">: </span><span className="text-green-400">'document-analysis'</span><span className="text-white">, <span className="text-[#F59E0B]">env</span>: process.env.NODE_ENV,</span></p>
              <p className="pl-4"><span className="text-[#F59E0B]">team</span><span className="text-white">: </span><span className="text-green-400">'product'</span> <span className="text-white">{'}'}</span></p>
              <p><span className="text-white">{')'}</span></p>
            </div>

            <p className="mt-4 text-sm">Within 48 hours of instrumentation, the attribution dashboard had real data on every call path. What it showed was not what anyone expected.</p>
          </div>

          {/* Findings */}
          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-5">The 4 findings (and how much each cost)</h2>

            <div className="space-y-6">

              <div className="bg-white border-l-4 border-l-[#F59E0B] border border-border rounded-xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <span className="font-mono text-[10px] bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-0.5 rounded-full font-bold">FINDING 01</span>
                    <h3 className="font-head font-bold text-midnight text-lg mt-2">Dev and staging were running production models</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-head font-black text-2xl text-midnight">₹10.9L</p>
                    <p className="text-xs text-sub">monthly waste</p>
                  </div>
                </div>

                <p className="text-sub text-sm leading-relaxed mb-4">The attribution data showed that <strong>28% of total API spend</strong> was tagged with <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">env: development</code> or <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">env: staging</code>. These environments were calling <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">gpt-4o</code> — the most expensive model — with no rate limiting.</p>

                <div className="bg-surface/50 rounded-lg p-4 mb-4">
                  <p className="font-mono text-xs text-sub mb-2">Cost breakdown: dev/staging vs production (before)</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Production (revenue-generating)', pct: 72, spend: '₹28.2L', color: 'bg-teal' },
                      { label: 'Dev + staging (no revenue)', pct: 28, spend: '₹11.0L', color: 'bg-[#F59E0B]' },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-sub">{item.label}</span>
                          <span className="font-mono text-midnight font-bold">{item.spend} ({item.pct}%)</span>
                        </div>
                        <div className="h-2 bg-border rounded-full">
                          <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0E0E1C] rounded-lg p-4 font-mono text-xs">
                  <p className="text-white/30 mb-1">{'// The fix: 4 lines of config'}</p>
                  <p><span className="text-teal">const</span> <span className="text-white">model</span> <span className="text-white/50">=</span></p>
                  <p className="pl-4"><span className="text-white">process.env.NODE_ENV</span> <span className="text-white/50">===</span> <span className="text-green-400">'production'</span></p>
                  <p className="pl-6"><span className="text-white/50">?</span> <span className="text-green-400">'gpt-4o'</span></p>
                  <p className="pl-6"><span className="text-white/50">:</span> <span className="text-green-400">'gpt-4o-mini'</span>  <span className="text-white/30">{'// 16.7× cheaper'}</span></p>
                </div>
                <p className="text-xs text-sub mt-3">GPT-4o-mini is <strong>16.7× cheaper</strong> than GPT-4o on input tokens. Developers testing against it in dev/staging get functionally identical results for 95% of use cases. Saving: <strong>₹10.9L/month</strong>.</p>
              </div>

              <div className="bg-white border-l-4 border-l-coral border border-border rounded-xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <span className="font-mono text-[10px] bg-coral/10 text-coral px-2 py-0.5 rounded-full font-bold">FINDING 02</span>
                    <h3 className="font-head font-bold text-midnight text-lg mt-2">A batch pipeline had been silently retrying for 11 weeks</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-head font-black text-2xl text-midnight">₹4.7L</p>
                    <p className="text-xs text-sub">monthly waste</p>
                  </div>
                </div>

                <p className="text-sub text-sm leading-relaxed mb-4">The document analysis pipeline had a JSON parsing bug. When the LLM returned malformed JSON (roughly 12% of calls due to context truncation), the retry logic fired immediately — up to 5 times — with the full context window each time. Each retry cost the same as the original call. The bug had been live for <strong>11 weeks</strong> before anyone noticed, because nobody was looking at call volume vs expected call volume.</p>

                <div className="bg-surface/50 rounded-lg p-4 mb-4 font-mono text-xs">
                  <p className="text-sub mb-2">Pipeline retry analysis</p>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span className="text-midnight">Documents processed / day</span><span className="text-teal">2,840</span></div>
                    <div className="flex justify-between"><span className="text-midnight">Parse failure rate</span><span className="text-coral">12.3%</span></div>
                    <div className="flex justify-between"><span className="text-midnight">Avg retries per failure</span><span className="text-coral">3.8×</span></div>
                    <div className="flex justify-between"><span className="text-midnight">Effective API calls / day</span><span className="text-coral">4,174 (not 2,840)</span></div>
                    <div className="flex justify-between"><span className="text-midnight">Wasted calls / day</span><span className="text-coral">1,334</span></div>
                    <div className="flex justify-between font-bold"><span className="text-midnight">Monthly wasted spend</span><span className="text-coral">₹4.7L</span></div>
                  </div>
                </div>

                <p className="text-xs text-sub">Fixes: (1) Add explicit JSON mode to the API call to force valid JSON output. (2) Add exponential backoff with max 2 retries. (3) Log parse failure rate as a dashboard metric so it is visible. Result: parse failure rate dropped to 1.2%, retry cost dropped to near-zero.</p>
              </div>

              <div className="bg-white border-l-4 border-l-teal border border-border rounded-xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <span className="font-mono text-[10px] bg-teal/10 text-teal px-2 py-0.5 rounded-full font-bold">FINDING 03</span>
                    <h3 className="font-head font-bold text-midnight text-lg mt-2">Internal ops tooling ran GPT-4o for formatting tasks</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-head font-black text-2xl text-midnight">₹1.8L</p>
                    <p className="text-xs text-sub">monthly waste</p>
                  </div>
                </div>
                <p className="text-sub text-sm leading-relaxed">Their ops team used an internal tool to reformat customer data exports — a task that requires GPT-3.5-level intelligence at best. The tool was configured to use <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">gpt-4o</code> because that was the company default. No engineer had explicitly chosen it — it was inherited from a config file written in month 1. Downgrading this tool to <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">gpt-4o-mini</code>: zero functional change, ₹1.8L/month saving.</p>
              </div>

              <div className="bg-white border-l-4 border-l-[#8B5CF6] border border-border rounded-xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <span className="font-mono text-[10px] bg-[#8B5CF6]/10 text-[#8B5CF6] px-2 py-0.5 rounded-full font-bold">FINDING 04</span>
                    <h3 className="font-head font-bold text-midnight text-lg mt-2">Customer support was already efficient — leave it alone</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-head font-black text-2xl text-midnight">₹0</p>
                    <p className="text-xs text-sub">no change needed</p>
                  </div>
                </div>
                <p className="text-sub text-sm leading-relaxed">The chatbot, which was the highest-volume feature, was already well-optimised. Short system prompts (280 tokens). Conversation history truncated to last 6 turns. Response caching for repeated intents (covering ~31% of calls). This was their most cost-efficient feature at <strong>₹0.0019/conversation</strong>. The right call: document it, set a budget alert, and leave it alone.</p>
                <p className="text-sub text-sm mt-3">This is an important lesson. Attribution data does not just reveal waste — it also reveals what your team is doing right. Knowing that your support feature is efficient lets you invest confidently in scaling it.</p>
              </div>

            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-5">The outcome — day 14</h2>

            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-sub text-xs font-mono mb-1">BEFORE</p>
                  <p className="font-head font-black text-4xl text-sub line-through">₹39.2L</p>
                </div>
                <div className="text-4xl text-teal font-bold">→</div>
                <div className="text-center">
                  <p className="text-sub text-xs font-mono mb-1">AFTER</p>
                  <p className="font-head font-black text-4xl text-teal">₹23.0L</p>
                </div>
                <div className="text-center">
                  <p className="text-sub text-xs font-mono mb-1">SAVED</p>
                  <p className="font-head font-black text-4xl text-midnight">₹16.2L/mo</p>
                  <p className="text-xs text-coral font-mono font-bold">-41.3%</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-midnight text-white">
                    <th className="text-left p-3 rounded-tl-lg">Finding</th>
                    <th className="text-right p-3">Monthly saving</th>
                    <th className="text-right p-3">Effort</th>
                    <th className="text-right p-3 rounded-tr-lg">Time to fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Dev/staging model swap', '₹10.9L', '4 lines of config', '1 hour'],
                    ['Retry loop fix + JSON mode', '₹4.7L', '~50 lines of code', '1 day'],
                    ['Internal tooling downgrade', '₹1.8L', '1 config change', '20 minutes'],
                    ['Support feature (no change)', '—', '—', '—'],
                  ].map(([f, s, e, t]) => (
                    <tr key={f} className="bg-white hover:bg-surface/50">
                      <td className="p-3 text-midnight text-sm">{f}</td>
                      <td className="p-3 text-right font-mono text-sm font-bold text-teal">{s}</td>
                      <td className="p-3 text-right text-xs text-sub">{e}</td>
                      <td className="p-3 text-right font-mono text-xs text-sub">{t}</td>
                    </tr>
                  ))}
                  <tr className="bg-midnight text-white font-bold">
                    <td className="p-3 rounded-bl-lg">Total</td>
                    <td className="p-3 text-right text-teal">₹17.4L</td>
                    <td className="p-3 text-right text-white/60 text-xs">~1.5 engineer-days</td>
                    <td className="p-3 text-right rounded-br-lg text-white/60 text-xs">14 days to full effect</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-sub mt-3">Note: actual saving is ₹16.2L due to some natural volume growth during the period. The optimisations themselves saved ₹17.4L.</p>
          </div>

          {/* What they did next */}
          <div>
            <h2 className="font-head font-bold text-2xl text-midnight mb-4">What they built after</h2>
            <p>With attribution data live, they built three operational practices they now run permanently:</p>

            <div className="space-y-4 mt-4">
              {[
                {
                  title: 'Monthly model review',
                  desc: 'Every month, pull the cost-per-feature-per-model report. Ask: has this feature\'s quality requirement changed? Has a cheaper model improved enough to handle it? The LLM market moves fast — what was true in January may not be true in July.'
                },
                {
                  title: 'Budget alerts per feature',
                  desc: 'Set a spend threshold for each feature in TokenFin. If document-analysis exceeds ₹12L in a month, the on-call engineer gets a Slack alert. Not the CFO asking questions after the invoice — an alert when there is still time to act.'
                },
                {
                  title: 'Cost review in every feature spec',
                  desc: 'Before any new LLM feature ships, the spec now includes: estimated calls/day, model choice justification, expected monthly cost, and whether dev/staging will use a cheaper model. Takes 10 minutes to write. Prevents months of unattributed spend.'
                },
              ].map(item => (
                <div key={item.title} className="bg-white border border-border rounded-xl p-5">
                  <p className="font-head font-semibold text-midnight mb-2">{item.title}</p>
                  <p className="text-sub text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-midnight rounded-2xl p-8 text-white">
            <p className="font-mono text-xs text-coral uppercase tracking-widest mb-3">What this actually means</p>
            <p className="text-xl font-head font-bold mb-4">₹16.2L/month saved is ₹1.94 crore per year. That is a mid-level engineer in India. It is 3 months of runway for a seed-stage startup.</p>
            <p className="text-white/60 text-sm leading-relaxed mb-4">None of these optimisations required a new engineering hire, a vendor change, or a product decision. They required <strong>visibility</strong>. The waste was always there. Attribution just made it visible.</p>
            <p className="text-white/60 text-sm leading-relaxed">Every AI team we onboard finds something in the first 48 hours. The question is not whether the waste exists. The question is how long you want to keep funding it.</p>
            <Link href="https://tokenfin.curiousdevs.com"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-semibold rounded-xl hover:bg-coral/90 transition-all text-sm">
              Start your free TokenFin trial — attribution in 5 minutes →
            </Link>
          </div>

        </div>

        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border flex justify-between items-center flex-wrap gap-4">
          <Link href="/blog" className="text-sm text-sub hover:text-midnight transition-colors">← All posts</Link>
          <Link href="/blog/why-your-openai-bill-lies" className="text-sm font-semibold text-coral hover:underline">Read: Why your OpenAI bill lies →</Link>
        </div>
      </section>
    </main>
  )
}
