import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Why Your OpenAI Bill Lies to You — CuriousDevs Blog',
  description: 'Your OpenAI invoice shows a total. It hides everything else. Here is the anatomy of the LLM attribution black hole, with real numbers and a fix.',
  alternates: { canonical: 'https://curiousdevs.com/blog/why-your-openai-bill-lies' },
}

export default function Post() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-coral bg-coral/10">LLM FinOps</span>
            <span className="text-white/40 text-xs font-mono">June 10, 2025</span>
            <span className="text-white/40 text-xs font-mono">·</span>
            <span className="text-white/40 text-xs font-mono">11 min read</span>
          </div>
          <h1 className="font-head font-black text-4xl lg:text-5xl text-white leading-tight mb-6">
            Why Your OpenAI Bill Lies to You:<br/>The Attribution Black Hole
          </h1>
          <p className="text-white/60 text-xl leading-relaxed">
            Your invoice shows a total. It hides your biggest cost driver, your most wasteful feature, and the staging environment nobody remembered to throttle. Here is how that happens — and how to fix it permanently.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none text-sub leading-relaxed space-y-8">

            {/* Callout */}
            <div className="bg-coral/8 border border-coral/25 rounded-2xl p-6">
              <p className="text-midnight font-semibold text-sm mb-1">The situation every engineering team recognises</p>
              <p className="text-sub text-sm">CFO pings on Slack: <em>"Our OpenAI spend jumped 34% last month. What happened?"</em> Engineering lead checks the dashboard. Sees one number: $18,400. Opens a spreadsheet. Types team names. Guesses percentages. Sends the reply. Nobody is confident it is accurate.</p>
            </div>

            <div>
              <h2 className="font-head font-bold text-2xl text-midnight mb-4">What OpenAI actually gives you</h2>
              <p>OpenAI's usage dashboard shows you spend broken down by <strong>model</strong> and <strong>time period</strong>. That is it. There is no concept of feature, team, product line, deployment environment, or user cohort in the API response or the invoice.</p>
              <p className="mt-4">Here is a real OpenAI API response object:</p>
              <div className="bg-[#0E0E1C] rounded-xl p-5 font-mono text-xs text-white/80 leading-relaxed overflow-x-auto mt-4">
                <p className="text-white/30">{'// What you get from /v1/usage'}</p>
                <p>{`{`}</p>
                <p className="pl-4">{`"object": "list",`}</p>
                <p className="pl-4">{`"data": [`}</p>
                <p className="pl-8">{`{ "aggregation_timestamp": 1717977600,`}</p>
                <p className="pl-10">{`"n_requests": 14820,`}</p>
                <p className="pl-10">{`"operation": "completion",`}</p>
                <p className="pl-10">{`"snapshot_id": "gpt-4o-2024-05-13",`}</p>
                <p className="pl-10">{`"n_context_tokens_total": 48291004,`}</p>
                <p className="pl-10">{`"n_generated_tokens_total": 9182330 }`}</p>
                <p className="pl-4">{`]`}</p>
                <p>{`}`}</p>
              </div>
              <p className="mt-4 text-sm text-sub">Notice what is missing: <strong>zero</strong> context about why those 14,820 requests happened. Which product feature triggered them. Which team owns them. Which environment they ran in. You have aggregate counts and token totals. Nothing else.</p>
            </div>

            <div>
              <h2 className="font-head font-bold text-2xl text-midnight mb-4">The real pricing breakdown (June 2025)</h2>
              <p>Before we get to attribution, understand why this matters at scale. The cost spread across OpenAI models alone is <strong>17×</strong>:</p>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-midnight text-white">
                      <th className="text-left p-3 rounded-tl-lg">Model</th>
                      <th className="text-right p-3">Input / 1M tokens</th>
                      <th className="text-right p-3">Output / 1M tokens</th>
                      <th className="text-right p-3 rounded-tr-lg">Context window</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ['GPT-4o (May 2025)', '$2.50', '$10.00', '128K'],
                      ['GPT-4o-mini', '$0.15', '$0.60', '128K'],
                      ['GPT-4-turbo', '$10.00', '$30.00', '128K'],
                      ['GPT-3.5-turbo', '$0.50', '$1.50', '16K'],
                      ['o1-preview', '$15.00', '$60.00', '128K'],
                      ['o1-mini', '$3.00', '$12.00', '128K'],
                    ].map(([model, input, output, ctx]) => (
                      <tr key={model} className="bg-white hover:bg-surface/50">
                        <td className="p-3 font-mono text-xs text-midnight">{model}</td>
                        <td className="p-3 text-right font-mono text-xs text-coral">{input}</td>
                        <td className="p-3 text-right font-mono text-xs text-coral">{output}</td>
                        <td className="p-3 text-right font-mono text-xs text-sub">{ctx}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-sub">The difference between GPT-4o and GPT-4o-mini is <strong>16.7× on input, 16.7× on output</strong>. If your staging environment runs GPT-4o when it only needs GPT-4o-mini, you are burning money in a silent background process that nobody looks at.</p>
            </div>

            <div>
              <h2 className="font-head font-bold text-2xl text-midnight mb-4">Where the money actually goes (real distribution)</h2>
              <p>Across TokenFin beta users, after adding attribution instrumentation, the average spend distribution looked like this:</p>

              <div className="mt-4 space-y-3">
                {[
                  { label: 'User-facing product features', pct: 48, color: 'bg-coral' },
                  { label: 'Batch processing pipelines', pct: 22, color: 'bg-teal' },
                  { label: 'Dev + staging environments', pct: 19, color: 'bg-[#F59E0B]' },
                  { label: 'Retry loops & error recovery', pct: 7, color: 'bg-[#8B5CF6]' },
                  { label: 'Internal tooling', pct: 4, color: 'bg-[#6B7280]' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-midnight font-medium">{item.label}</span>
                      <span className="font-mono text-sub">{item.pct}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full">
                      <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm text-sub">The <strong>dev/staging 19%</strong> is the one that shocks every team. These environments run the same GPT-4o calls as production. They generate no revenue. And because nobody watches them closely, inefficiencies compound undetected for months.</p>
            </div>

            <div>
              <h2 className="font-head font-bold text-2xl text-midnight mb-4">The attribution debt spiral — how it compounds</h2>
              <p>This is not a one-time problem. It compounds.</p>
              <p className="mt-3">Month 1: You ship a chat feature. One LLM call path. Easy to reason about mentally.</p>
              <p className="mt-2">Month 3: Summarization pipeline added. Batch job added. New team starts using the API. Mental model breaks.</p>
              <p className="mt-2">Month 6: 8–14 distinct call paths. Multiple models. Dev/staging/prod all hitting the same billing account. The invoice is now a black box.</p>
              <p className="mt-2">Month 9: CFO asks for a cost forecast. Engineering produces a number with error bars of ±40%. Trust collapses.</p>

              <div className="bg-[#0E0E1C] rounded-xl p-5 mt-5">
                <p className="text-teal font-mono text-xs mb-3">// Real cost curve from a TokenFin beta user (anonymised)</p>
                <div className="space-y-2 font-mono text-xs">
                  {[
                    { month: 'Jan 2025', spend: '$4,200', calls: '28K', label: 'Launch month — 1 feature' },
                    { month: 'Feb 2025', spend: '$6,800', calls: '46K', label: '+Summarisation pipeline' },
                    { month: 'Mar 2025', spend: '$11,200', calls: '74K', label: '+Batch job, +1 team' },
                    { month: 'Apr 2025', spend: '$18,400', calls: '121K', label: 'Unknown drivers — panic' },
                    { month: 'May 2025', spend: '$11,600', calls: '128K', label: 'TokenFin added → found waste' },
                  ].map(row => (
                    <div key={row.month} className="flex gap-4 items-start">
                      <span className="text-white/40 w-20 shrink-0">{row.month}</span>
                      <span className="text-coral w-16 shrink-0">{row.spend}</span>
                      <span className="text-teal w-16 shrink-0">{row.calls}</span>
                      <span className="text-white/60">{row.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-sub">Note: call volume went from 121K to 128K (up) while spend dropped from $18.4K to $11.6K (down 37%). The waste was in model selection and retry logic, not volume.</p>
            </div>

            <div>
              <h2 className="font-head font-bold text-2xl text-midnight mb-4">What token-level attribution actually looks like</h2>
              <p>The fix is to attach metadata to every LLM call at the point of invocation. Not post-hoc analysis — at call time.</p>

              <div className="bg-[#0E0E1C] rounded-xl p-5 mt-4 font-mono text-xs leading-relaxed">
                <p className="text-white/30 mb-2">{'// Without attribution (before)'}</p>
                <p><span className="text-teal">const</span> <span className="text-white">response</span> <span className="text-white/50">=</span> <span className="text-teal">await</span> <span className="text-white">openai.chat.completions.create({'({'}</span></p>
                <p className="pl-4"><span className="text-[#F59E0B]">model</span><span className="text-white">: </span><span className="text-green-400">'gpt-4o'</span><span className="text-white">,</span></p>
                <p className="pl-4"><span className="text-[#F59E0B]">messages</span><span className="text-white">: messages</span></p>
                <p><span className="text-white">{'})'}</span></p>

                <p className="text-white/30 mt-6 mb-2">{'// With TokenFin attribution (after) — one line change'}</p>
                <p><span className="text-teal">const</span> <span className="text-white">response</span> <span className="text-white/50">=</span> <span className="text-teal">await</span> <span className="text-coral">track</span><span className="text-white">(</span></p>
                <p className="pl-4"><span className="text-white">openai.chat.completions.create({'({'})</span></p>
                <p className="pl-6"><span className="text-[#F59E0B]">model</span><span className="text-white">: </span><span className="text-green-400">'gpt-4o'</span><span className="text-white">,</span></p>
                <p className="pl-6"><span className="text-[#F59E0B]">messages</span><span className="text-white">: messages</span></p>
                <p className="pl-4"><span className="text-white">{'}),'})</span></p>
                <p className="pl-4"><span className="text-white">{'{ '}</span><span className="text-[#F59E0B]">team</span><span className="text-white">: </span><span className="text-green-400">'ml-infra'</span><span className="text-white">, </span><span className="text-[#F59E0B]">feature</span><span className="text-white">: </span><span className="text-green-400">'semantic-search'</span><span className="text-white">,</span></p>
                <p className="pl-4"><span className="text-[#F59E0B]">env</span><span className="text-white">: </span><span className="text-green-400">'production'</span><span className="text-white">, </span><span className="text-[#F59E0B]">userId</span><span className="text-white">: req.user.id </span><span className="text-white">{'}'}</span></p>
                <p><span className="text-white">)</span></p>
              </div>

              <p className="mt-5">Now every call in your dashboard shows exactly what it cost and why it ran. You can filter by team, feature, environment, model. You can set budget alerts per feature. You can compare cost-per-output-token across models for the same feature.</p>
            </div>

            <div>
              <h2 className="font-head font-bold text-2xl text-midnight mb-4">The five optimisations attribution unlocks</h2>

              <div className="space-y-4 mt-2">
                {[
                  {
                    n: '01', title: 'Model right-sizing',
                    body: 'Identify every feature running GPT-4o that only needs GPT-4o-mini. Average team finds 2–3 such features. Savings: 60–80% on those call paths.'
                  },
                  {
                    n: '02', title: 'Environment throttling',
                    body: 'Add a config flag: if (env !== "production") use("gpt-4o-mini"). Average dev/staging saving: 85% reduction on those environments.'
                  },
                  {
                    n: '03', title: 'Retry loop surgery',
                    body: 'Aggressive retry logic on expensive models compounds fast. Attribution reveals which pipeline has the highest retry rate. Fixing retry logic + exponential backoff typically saves 10–18% total spend.'
                  },
                  {
                    n: '04', title: 'Prompt compression',
                    body: 'Average enterprise prompt has 800–1,200 tokens of system prompt. After attribution you can see cost per call clearly. Compressing system prompts by 40% saves 40% on input costs for that feature.'
                  },
                  {
                    n: '05', title: 'Caching layer identification',
                    body: 'Attribution shows which features have repetitive, near-identical prompts. These are candidates for semantic caching (e.g., GPTCache). Average cacheable call rate: 22–35% of total calls in customer support features.'
                  },
                ].map(item => (
                  <div key={item.n} className="flex gap-4 bg-white border border-border rounded-xl p-5">
                    <span className="font-mono text-xs text-coral font-bold shrink-0 mt-0.5">{item.n}</span>
                    <div>
                      <p className="font-head font-semibold text-midnight mb-1">{item.title}</p>
                      <p className="text-sub text-sm">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-midnight rounded-2xl p-8 text-white">
              <p className="font-mono text-xs text-teal uppercase tracking-widest mb-3">Bottom line</p>
              <p className="text-xl font-head font-bold mb-4">The invoice is not lying. The API just never asked you the right questions at call time.</p>
              <p className="text-white/60 text-sm leading-relaxed">Token-level attribution is not a reporting feature. It is the foundation of every cost optimisation you will make on your AI stack. Teams that instrument it in week 1 spend 30–45% less at month 6 than teams that do it reactively. The debt compounds in both directions.</p>
              <Link href="https://tokenfin.curiousdevs.com"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-coral text-white font-semibold rounded-xl hover:bg-coral/90 transition-all text-sm">
                Try TokenFin free — add attribution in 5 minutes →
              </Link>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center flex-wrap gap-4">
            <Link href="/blog" className="text-sm text-sub hover:text-midnight transition-colors">← All posts</Link>
            <Link href="/blog/gpt4o-vs-claude-vs-mistral-real-benchmarks"
              className="text-sm font-semibold text-coral hover:underline">
              Next: GPT-4o vs Claude vs Mistral benchmarks →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
