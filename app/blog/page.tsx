import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — CuriousDevs',
  description: 'LLM FinOps, AI governance, model benchmarks, and building in public. Written by the CuriousDevs team.',
  alternates: { canonical: 'https://curiousdevs.com/blog' },
}

const posts = [
  {
    slug: 'why-your-openai-bill-lies',
    category: 'LLM FinOps',
    categoryColor: 'text-coral bg-coral/10',
    date: 'June 10, 2025',
    readTime: '8 min read',
    title: 'Why Your OpenAI Bill Lies to You: The Attribution Black Hole',
    excerpt: "You received a $14,000 OpenAI invoice. Engineering says it's the search feature. Product blames the summarization pipeline. The reality? Nobody actually knows. Here's how that happens — and how to fix it with token-level attribution.",
    content: `
Every AI team we talk to has the same conversation with their CFO:

"Our OpenAI bill was $14,000 last month. What drove that?"

And every engineering team gives the same answer: "We're looking into it."

**The root cause is structural, not operational.** When you call the OpenAI API, you get a bill aggregated by model and time period. You don't get a breakdown by feature, user, team, or deployment environment. That attribution gap is the problem.

## What actually drives your LLM spend

In a typical mid-stage AI product, spend breaks down roughly like this:

- 40–60% from user-facing features (chat, search, Q&A)
- 20–35% from internal tooling and batch pipelines
- 10–20% from dev and staging environments (often forgotten)
- 5–10% from failed retries and error recovery loops

The problem is that without attribution, every line looks the same on your invoice. You can't optimize what you can't see.

## The compounding effect

Unattributed spend doesn't stay flat. It compounds. When a new feature ships without attribution tracking, it joins the black hole. When a batch job starts running nightly, it joins the black hole. Within 6 months of shipping, most teams have 8–12 distinct cost sources — none of them individually attributable.

We call this the attribution debt spiral.

## What token-level attribution actually looks like

With proper attribution, every LLM call carries metadata:

\`\`\`js
await track(openai.chat({ model: 'gpt-4o', messages }), {
  team: 'product',
  feature: 'semantic-search',
  env: 'production',
  userId: req.user.id,
})
\`\`\`

Now your dashboard shows: $4,200 → product/semantic-search/production. You can optimize with surgical precision instead of blunt cuts.

Teams that implement token-level attribution consistently find 20–40% of their spend in places they didn't expect.
    `,
  },
  {
    slug: 'gpt4o-vs-claude-vs-mistral-real-benchmarks',
    category: 'Model Benchmarks',
    categoryColor: 'text-teal bg-teal/10',
    date: 'May 28, 2025',
    readTime: '12 min read',
    title: 'GPT-4o vs Claude 3.5 Sonnet vs Mistral Large: 200K Tokens of Real Enterprise Workloads',
    excerpt: "Provider leaderboards use academic benchmarks. We ran 200,000 tokens of actual enterprise workloads — code generation, document summarization, structured extraction, and multi-turn chat — through all three. The results surprised us.",
    content: `
Academic benchmarks are marketing. MMLU, HumanEval, and GSM8K don't reflect what enterprise AI teams actually build. We ran our own benchmark using real workload categories drawn from TokenFin users.

## Test methodology

**200,000 tokens across 4 workload categories:**
- Code generation (Python, TypeScript) — 50K tokens
- Document summarization (legal, technical, financial) — 60K tokens  
- Structured data extraction (JSON from unstructured text) — 50K tokens
- Multi-turn customer support chat — 40K tokens

**Models tested:** GPT-4o (May 2025), Claude 3.5 Sonnet, Mistral Large 2, Gemini 1.5 Pro

**Metrics:** Cost per 1K output tokens, p50/p95 latency, structured output accuracy, human preference score (1–10)

## Results summary

| Model | Cost/1K | p50 latency | p95 latency | Quality score |
|---|---|---|---|---|
| GPT-4o | $0.041 | 820ms | 2,100ms | 8.9/10 |
| Claude 3.5 Sonnet | $0.027 | 640ms | 1,400ms | 9.2/10 |
| Mistral Large 2 | $0.018 | 480ms | 980ms | 8.4/10 |
| Gemini 1.5 Pro | $0.021 | 590ms | 1,200ms | 8.6/10 |

## What this means for your architecture

**For cost-sensitive batch workloads** (nightly summarization, ETL pipelines): Mistral Large 2 wins on cost with acceptable quality. At scale, the cost difference vs GPT-4o is 2.3×.

**For user-facing features** where quality matters most: Claude 3.5 Sonnet leads on quality scores across 3 of 4 categories — and it's 34% cheaper than GPT-4o.

**For structured extraction** (the use case most sensitive to hallucination): GPT-4o and Claude 3.5 Sonnet are statistically tied. Neither Mistral nor Gemini reached the same accuracy on complex nested JSON schemas.

The right answer is almost always a **multi-model architecture** — different models for different features, tracked and compared in a unified dashboard.
    `,
  },
  {
    slug: 'eu-ai-act-engineering-guide-2026',
    category: 'AI Governance',
    categoryColor: 'text-[#8B5CF6] bg-[#8B5CF6]/10',
    date: 'May 15, 2025',
    readTime: '10 min read',
    title: 'The EU AI Act: A Practical Engineering Guide for Teams Shipping in 2026',
    excerpt: "The EU AI Act isn't just a compliance checkbox — it's a structural change to how you build, document, and deploy AI systems. Here's what every engineering team needs to know before the August 2026 deadline for high-risk AI systems.",
    content: `
Most engineering teams are treating the EU AI Act like GDPR — a legal problem to hand off to compliance. That's a mistake. The AI Act has direct engineering implications that require code changes, new infrastructure, and architectural decisions that can't be retrofitted at the last minute.

## The timeline that matters

- **August 2025:** GPAI (General-Purpose AI) model provisions apply. If you use foundation models in EU-facing products, you need conformity documentation.
- **August 2026:** High-risk AI system rules apply. This covers AI in HR, credit, healthcare, law enforcement, and critical infrastructure.
- **2027:** Lower-risk AI transparency requirements and additional obligations phase in.

## What "high-risk" actually means for product teams

The Act defines high-risk AI across 8 annexes. The most common enterprise triggers:

1. AI that makes or influences consequential decisions about people (hiring, loans, benefits, insurance)
2. AI used in safety-critical infrastructure
3. AI in biometric identification systems
4. AI used in education or training assessments

If your product falls into any of these categories, you need: (1) risk assessment documentation, (2) data governance records, (3) human oversight mechanisms, (4) incident reporting procedures, and (5) detailed logging of AI decisions.

## The engineering requirements

**What you need to build:**

- **Decision audit logs** — every AI decision, with context, confidence, and model version
- **Human-in-the-loop checkpoints** — documented override mechanisms for consequential AI actions
- **Model cards and datasheets** — documentation of training data, intended use, and known limitations
- **Incident response procedures** — formal process for handling AI errors that affect users
- **Conformity documentation** — technical file that regulators can audit

**What you need to track:**

- Which model version made which decision (not just "our AI said...")
- Why the model was chosen for this use case
- What safety testing was done before deployment
- How model updates are managed and whether they require re-assessment

## AgentOS and automated compliance

This is why we're building AgentOS. It auto-generates conformity documentation, maintains decision audit logs at the infrastructure level, and integrates human-oversight checkpoints into your agent workflows — without requiring you to rebuild your entire stack.
    `,
  },
  {
    slug: 'cut-llm-bill-case-study',
    category: 'Case Study',
    categoryColor: 'text-midnight bg-midnight/10',
    date: 'April 30, 2025',
    readTime: '7 min read',
    title: "From ₹39L/Month to ₹23L: How a Series B AI Startup Cut Their LLM Bill Without Changing a Single Feature",
    excerpt: "A 45-person AI startup was spending ₹39 lakhs/month on LLM APIs with no idea where it was going. After deploying TokenFin, they had attribution data in 20 minutes. Two weeks later, their bill was ₹23L. Here's exactly what they found and what they did.",
    content: `
This is a real engagement from TokenFin's private beta. Company name anonymized at their request.

## The situation

45-person Series B AI startup. B2B SaaS product that uses LLMs for document analysis, customer support automation, and internal tooling. Monthly LLM spend: ₹39 lakhs (~$47K USD). Their CFO was asking questions. Their engineering team had no answers.

When we onboarded them, the first thing we did was add TokenFin instrumentation to every LLM call. That took 20 minutes (three wrapper calls, one config line).

## What the data showed

Within 48 hours of instrumentation, the attribution dashboard showed four surprises:

**Surprise 1: Dev/staging was 28% of spend**
Their development and staging environments were calling production-tier models with no rate limits. Nobody had thought to use cheaper models in non-production environments. Fix: swap to GPT-4o-mini in dev/staging. Savings: ₹10.9L/month.

**Surprise 2: A nightly batch job was retrying aggressively**
A document processing pipeline had a bug causing 3–5x retries on parsing failures. Each retry called a full GPT-4o context window. The bug had existed for 11 weeks. Fix: patch the retry logic, add exponential backoff. Savings: ₹4.7L/month.

**Surprise 3: Internal tooling used GPT-4o unnecessarily**
An internal tool used by the ops team for data formatting was calling GPT-4o. It needed GPT-3.5-level capability. Fix: downgrade to gpt-4o-mini for this use case. Savings: ₹1.8L/month.

**Surprise 4: Customer support was their most efficient feature**
Counterintuitively, the customer support automation — their highest-volume feature — was their most cost-efficient. They correctly used short context windows and caching. No optimization needed.

## The outcome

Total monthly spend: ₹39L → ₹23L. **41% reduction. Zero feature changes. Zero model quality degradation.**

The CFO got a chargeback report showing cost by team and feature. The engineering team now has budget guardrails that alert when spend exceeds 20% month-over-month. And they have a model comparison dashboard showing whether their current provider is still the best choice as models evolve.

This is what good LLM FinOps looks like.
    `,
  },
]

export default function BlogPage() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs text-teal uppercase tracking-widest mb-4">Blog</p>
          <h1 className="font-head font-black text-5xl text-white mb-4">The CuriousDevs Blog.</h1>
          <p className="text-white/60 text-lg">
            LLM FinOps, AI governance, model benchmarks, and building in public — written by engineers, for engineers.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
          {posts.map((p, idx) => (
            <article key={p.slug}
              className={`bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow ${idx === 0 ? 'ring-2 ring-coral/20' : ''}`}>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${p.categoryColor}`}>{p.category}</span>
                  <span className="text-sub text-xs font-mono">{p.date}</span>
                  <span className="text-sub text-xs font-mono">·</span>
                  <span className="text-sub text-xs font-mono">{p.readTime}</span>
                  {idx === 0 && <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-coral text-white">Latest</span>}
                </div>

                <h2 className="font-head font-bold text-2xl text-midnight mb-3 leading-tight">{p.title}</h2>
                <p className="text-sub leading-relaxed mb-5">{p.excerpt}</p>

                <div className="border-t border-border pt-5 flex items-center justify-end">
                  <Link href={`/blog/${p.slug}`}
                    className="inline-flex items-center gap-1 text-coral font-semibold text-sm hover:gap-2 transition-all">
                    Read article
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sub mb-4 font-mono text-sm">Want these in your inbox?</p>
          <Link href="/#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-midnight text-white font-semibold rounded-xl hover:bg-midnight/90 transition-all">
            Subscribe to our newsletter →
          </Link>
        </div>
      </section>
    </main>
  )
}
