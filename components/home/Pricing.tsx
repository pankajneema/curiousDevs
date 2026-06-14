"use client"
import { useState } from 'react'

type Product = 'tokenfin' | 'agentos' | 'both'
type Cycle = 'monthly' | 'annual'

const tokefinPlans = [
  {
    name: 'Starter',
    monthly: 0,
    annual: 0,
    sub: 'Free forever',
    desc: 'Perfect for solo developers and small experiments.',
    cta: 'Start free — no card',
    href: 'https://tokenfin.curiousdevs.com',
    highlight: false,
    features: [
      '50,000 tokens tracked / month',
      '1 project',
      '3-day data retention',
      'Basic cost dashboard',
      'OpenAI + Anthropic',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    monthly: 5,
    annual: 4,
    sub: 'per month',
    desc: 'For growing teams that need attribution, alerts, and multi-model analytics.',
    cta: 'Start 14-day free trial',
    href: 'https://tokenfin.curiousdevs.com',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Unlimited tokens tracked',
      'Up to 10 projects',
      '90-day data retention',
      'Full attribution & chargebacks',
      'All providers incl. Bedrock, Mistral, Groq',
      'Budget guardrails & alerts',
      'Model comparison analytics',
      'Slack + email notifications',
      'Priority email support',
    ],
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    sub: 'Contact us',
    desc: 'For large teams needing SSO, SLAs, VPC deployment, and custom retention.',
    cta: 'Contact sales',
    href: 'mailto:hello@curiousdevs.com?subject=Enterprise%20Pricing',
    highlight: false,
    features: [
      'Everything in Pro',
      'Unlimited projects & seats',
      'Custom data retention',
      'SSO / SAML',
      'Custom SLA & uptime guarantee',
      'Dedicated success manager',
      'On-prem / VPC deployment',
      'Early AgentOS access',
    ],
  },
]

const bothPlans = [
  {
    name: 'Growth Bundle',
    monthly: 5,
    annual: 4,
    sub: 'per month · TokenFin Pro included',
    desc: 'Full TokenFin Pro + early AgentOS design-partner access bundled together.',
    cta: 'Join bundle waitlist',
    href: 'mailto:hello@curiousdevs.com?subject=Growth%20Bundle',
    highlight: true,
    badge: 'Best value',
    features: [
      'Everything in TokenFin Pro',
      'AgentOS early design-partner access',
      'Policy engine preview (Q4 2025)',
      'Priority onboarding call',
      'Direct Slack channel with founders',
    ],
  },
]

export default function Pricing() {
  const [product, setProduct] = useState<Product>('tokenfin')
  const [cycle, setCycle] = useState<Cycle>('monthly')

  const plans = product === 'both' ? bothPlans : tokefinPlans

  return (
    <section className="py-24 bg-surface" id="pricing">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="font-head font-bold text-4xl lg:text-5xl text-midnight">Simple, transparent pricing.</h2>
          <p className="mt-3 text-sub text-lg">Start free. No credit card. Upgrade when you need more.</p>
        </div>

        {/* Product selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-1 bg-white border border-border rounded-2xl p-1.5 shadow-sm">
            {([['tokenfin','TokenFin','Live ✓'], ['agentos','AgentOS','2026'], ['both','Both Products','Bundle']] as [Product,string,string][]).map(([v,l,tag]) => (
              <button
                key={v}
                onClick={() => v !== 'agentos' && setProduct(v)}
                disabled={v === 'agentos'}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${product === v ? 'bg-midnight text-white shadow-sm' : 'text-sub hover:text-midnight'}
                  ${v === 'agentos' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {l}
                <span className={`ml-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full
                  ${v === 'tokenfin' ? 'bg-teal/20 text-teal' : v === 'agentos' ? 'bg-sub/20 text-sub' : 'bg-coral/20 text-coral'}
                `}>{tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AgentOS notice */}
        {product === 'agentos' && (
          <div className="max-w-lg mx-auto mb-8 bg-midnight rounded-2xl border border-coral/30 p-6 text-center">
            <p className="text-coral font-semibold mb-1">AgentOS — Coming 2026</p>
            <p className="text-white/60 text-sm">AgentOS pricing will be announced when we enter public beta. Join the waitlist for early-access pricing.</p>
            <a href="/products/agentos" className="mt-4 inline-block px-6 py-2.5 bg-coral text-white font-semibold rounded-xl text-sm hover:bg-coral/90 transition-all">
              Join AgentOS waitlist →
            </a>
          </div>
        )}

        {/* Billing toggle — only when tokenfin or both */}
        {product !== 'agentos' && (
          <>
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-3 bg-white border border-border rounded-full px-4 py-2 shadow-sm">
                <button onClick={() => setCycle('monthly')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${cycle === 'monthly' ? 'bg-midnight text-white' : 'text-sub'}`}>
                  Monthly
                </button>
                <button onClick={() => setCycle('annual')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${cycle === 'annual' ? 'bg-midnight text-white' : 'text-sub'}`}>
                  Annual <span className="text-teal font-bold ml-1">Save 20%</span>
                </button>
              </div>
            </div>

            <div className={`grid gap-6 items-stretch ${plans.length === 1 ? 'max-w-sm mx-auto' : 'md:grid-cols-3'}`}>
              {plans.map(p => (
                <div key={p.name}
                  className={`rounded-2xl border flex flex-col gap-6 p-8 relative transition-transform
                    ${p.highlight ? 'bg-midnight border-midnight text-white shadow-2xl scale-[1.02]' : 'bg-white border-border'}`}>
                  {p.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-white text-xs font-bold px-4 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <div>
                    <p className={`font-mono text-xs uppercase tracking-widest mb-2 ${p.highlight ? 'text-white/40' : 'text-sub'}`}>{p.name}</p>
                    <div className="flex items-end gap-1">
                      {p.monthly === null ? (
                        <span className={`font-head font-black text-3xl ${p.highlight ? 'text-white' : 'text-midnight'}`}>Custom</span>
                      ) : p.monthly === 0 ? (
                        <span className={`font-head font-black text-4xl ${p.highlight ? 'text-white' : 'text-midnight'}`}>Free</span>
                      ) : (
                        <>
                          <span className={`font-head font-black text-4xl ${p.highlight ? 'text-white' : 'text-midnight'}`}>
                            ${cycle === 'annual' ? p.annual : p.monthly}
                          </span>
                          <span className={`text-sm mb-1 ${p.highlight ? 'text-white/50' : 'text-sub'}`}>/mo</span>
                          {cycle === 'annual' && <span className="text-xs text-teal mb-1 ml-1">billed annually</span>}
                        </>
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${p.highlight ? 'text-white/40' : 'text-sub'}`}>{p.sub}</p>
                    <p className={`text-sm mt-3 leading-relaxed ${p.highlight ? 'text-white/60' : 'text-sub'}`}>{p.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2 flex-1">
                    {p.features.map(feat => (
                      <li key={feat} className="flex items-start gap-2 text-sm">
                        <span className="text-teal mt-0.5 shrink-0 font-bold">✓</span>
                        <span className={p.highlight ? 'text-white/80' : 'text-midnight/80'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={p.href}
                    className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all
                      ${p.highlight ? 'bg-coral text-white hover:bg-coral/90' : 'bg-midnight text-white hover:bg-midnight/90'}`}>
                    {p.cta}
                  </a>
                </div>
              ))}
            </div>

            <p className="text-center text-sub text-sm mt-8 font-mono tracking-wider">
              All plans include: AES-256 encryption · HTTPS/TLS 1.3 · GDPR + DPDP Act compliant · 99.9% uptime
            </p>
          </>
        )}
      </div>
    </section>
  )
}
