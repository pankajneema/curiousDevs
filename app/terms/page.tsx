import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — CuriousDevs',
  description: 'CuriousDevs Terms of Service — governed by the laws of India.',
  alternates: { canonical: 'https://curiousdevs.com/terms' },
}

const sections = [
  {
    id: 'parties',
    title: '1. Parties and Acceptance',
    content: `These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "Customer") and CuriousDevs ("Company", "We", "Us"), a business entity registered in India.

By accessing or using any CuriousDevs product or service (including TokenFin and AgentOS), you confirm that you have read, understood, and agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity.

If you do not agree to these Terms, you must immediately cease use of our services.`,
  },
  {
    id: 'services',
    title: '2. Description of Services',
    content: `CuriousDevs provides:

**TokenFin:** An AI/LLM cost attribution and financial operations (FinOps) platform that enables teams to track, attribute, and optimize AI infrastructure spend. TokenFin is currently available in private beta.

**AgentOS:** An enterprise AI agent governance platform (product roadmap — not yet generally available).

We reserve the right to modify, suspend, or discontinue any service (in whole or in part) at any time with reasonable advance notice, except in cases of emergency or legal obligation.`,
  },
  {
    id: 'accounts',
    title: '3. User Accounts',
    content: `You must create an account to use TokenFin. You agree to:

• Provide accurate and complete registration information
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized access at hello@curiousdevs.com
• Be responsible for all activities that occur under your account

You must be at least 18 years old to create an account. If you are creating an account on behalf of an organization, you represent that you are duly authorized to do so.

We reserve the right to suspend or terminate accounts that violate these Terms or are reasonably suspected of fraudulent activity.`,
  },
  {
    id: 'payment',
    title: '4. Payment, Billing, and Refunds',
    content: `**Pricing:** Current pricing is displayed on our Pricing page. We may change prices with 30 days' notice to registered users.

**Billing:** Subscriptions are billed in advance on a monthly or annual basis (as selected). All amounts are in Indian Rupees (INR) or US Dollars (USD) as displayed.

**GST:** Prices are exclusive of Goods and Services Tax (GST). Applicable GST will be charged at the prevailing rate under Indian law.

**Payment Methods:** We accept payments via Razorpay, Stripe, and other processors displayed at checkout.

**Refund Policy:** You may request a refund within 14 days of any charge if you have not used the paid features during that period. Refund requests must be made in writing to hello@curiousdevs.com. Partial refunds for annual plans may be granted at our discretion on a pro-rated basis.

**Failed Payments:** If a payment fails, we will retry up to 3 times over 7 days. After that, your account will be downgraded to the free tier.`,
  },
  {
    id: 'acceptable-use',
    title: '5. Acceptable Use Policy',
    content: `You agree NOT to use our services to:

• Violate any applicable Indian law or international law
• Infringe upon the intellectual property rights of any third party
• Transmit malware, viruses, or other malicious code
• Attempt to gain unauthorized access to our systems or another user's account
• Use our services to build a competing product or service without our written consent
• Reverse engineer, decompile, or disassemble our software except as permitted by applicable law
• Engage in any activity that unreasonably burdens our infrastructure
• Circumvent usage limits or access controls

We reserve the right to investigate any suspected violation and to take appropriate action, including service suspension and reporting to law enforcement.`,
  },
  {
    id: 'ip',
    title: '6. Intellectual Property',
    content: `**Our IP:** TokenFin, AgentOS, the CuriousDevs platform, our software, documentation, and all related intellectual property are owned by CuriousDevs and are protected under the Copyright Act, 1957 (India) and applicable international intellectual property laws.

**License to You:** Subject to these Terms and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, revocable license to use our services for your internal business purposes only.

**Your Data:** You retain ownership of all data, including LLM telemetry and attribution data, that you input into or generate through our services ("Your Data"). You grant us a limited license to process Your Data solely to provide the services you have subscribed to.

**Feedback:** Any feedback, suggestions, or ideas you provide about our services may be used by us without restriction or compensation.`,
  },
  {
    id: 'confidentiality',
    title: '7. Confidentiality',
    content: `Each party may have access to the other's confidential information in connection with these Terms. Both parties agree to:

• Hold the other's confidential information in strict confidence
• Not disclose confidential information to third parties without prior written consent
• Use confidential information only for purposes of these Terms

This obligation survives termination of these Terms for a period of 3 years. Confidentiality obligations do not apply to information that: (a) becomes publicly known through no fault of the receiving party; (b) was already known to the receiving party; (c) is independently developed by the receiving party; or (d) must be disclosed by law.`,
  },
  {
    id: 'warranty',
    title: '8. Warranties and Disclaimers',
    content: `**Our Warranties:** We warrant that (a) we have the authority to enter into these Terms; (b) the services will perform materially as described in our documentation; and (c) we will not knowingly introduce malicious code into our software.

**Disclaimers:** TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE INDIAN LAW, THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED. We do not make warranties regarding cost savings, cost reduction percentages, or business outcomes — these depend on your specific use case and implementation.`,
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE INDIAN LAW:

(a) NEITHER PARTY WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, LOSS OF PROFITS, LOSS OF DATA, OR BUSINESS INTERRUPTION.

(b) OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING UNDER THESE TERMS WILL NOT EXCEED THE GREATER OF: (i) THE FEES YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (ii) ₹5,000 (FIVE THOUSAND INDIAN RUPEES).

Nothing in these Terms limits liability for death, personal injury, or fraudulent misrepresentation caused by our negligence, or any other liability that cannot be excluded under applicable Indian law, including the Consumer Protection Act, 2019.`,
  },
  {
    id: 'termination',
    title: '10. Termination',
    content: `**By You:** You may terminate your account at any time through account settings or by emailing hello@curiousdevs.com. Termination takes effect at the end of the current billing period. We do not prorate monthly fees on cancellation.

**By Us:** We may terminate or suspend your account immediately if you materially breach these Terms, if we are required to do so by law, or if we discontinue the service (with 30 days' notice unless legally precluded).

**Effect of Termination:** Upon termination, your license to use the services ends. We will make your data available for export for 30 days following termination, after which it will be securely deleted unless retention is required by law.`,
  },
  {
    id: 'governing-law',
    title: '11. Governing Law and Dispute Resolution',
    content: `**Governing Law:** These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.

**Jurisdiction:** Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts at [City], India.

**Consumer Disputes:** If you are a consumer as defined under the Consumer Protection Act, 2019, you may also raise a dispute with the National Consumer Helpline (1800-11-4000) or file a complaint with the appropriate Consumer Disputes Redressal Commission.

**Arbitration:** For business-to-business disputes, the parties agree to first attempt resolution through good-faith negotiation for 30 days. If unresolved, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996 (as amended), with a sole arbitrator appointed by mutual agreement. The place of arbitration shall be India, and proceedings shall be in English.`,
  },
  {
    id: 'general',
    title: '12. General Provisions',
    content: `**Entire Agreement:** These Terms, together with our Privacy Policy, constitute the entire agreement between you and CuriousDevs regarding the services.

**Severability:** If any provision of these Terms is found invalid or unenforceable, the remaining provisions shall continue in full force and effect.

**Waiver:** Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.

**Assignment:** You may not assign these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of substantially all our assets.

**Force Majeure:** Neither party shall be liable for delay or failure to perform due to causes beyond their reasonable control, including acts of God, war, terrorism, government actions, internet outages, or pandemic.

**Language:** These Terms are drafted in English. In case of any conflict with a translated version, the English version shall prevail.

**Contact Us:** For any questions about these Terms, contact us at: hello@curiousdevs.com`,
  },
]

export default function TermsPage() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-teal uppercase tracking-widest mb-4">Legal</p>
          <h1 className="font-head font-black text-5xl text-white mb-4">Terms of Service</h1>
          <div className="flex flex-wrap gap-4 text-white/50 text-sm font-mono">
            <span>Last Updated: June 14, 2025</span>
            <span>·</span>
            <span>Effective: June 14, 2025</span>
          </div>
          <div className="mt-6 p-4 bg-coral/10 border border-coral/30 rounded-xl">
            <p className="text-coral/90 text-sm">
              <strong>Governed by Indian Law:</strong> These Terms are governed by the laws of India, including the Information Technology Act, 2000, the Consumer Protection Act, 2019, and the Digital Personal Data Protection Act, 2023.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          {/* TOC */}
          <div className="bg-white rounded-2xl border border-border p-6 mb-10">
            <p className="font-head font-bold text-midnight mb-4">Table of Contents</p>
            <ol className="flex flex-col gap-2">
              {sections.map(s => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-coral hover:underline">{s.title}</a>
                </li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-8">
            {sections.map(s => (
              <div key={s.id} id={s.id} className="bg-white rounded-2xl border border-border p-8">
                <h2 className="font-head font-bold text-xl text-midnight mb-4">{s.title}</h2>
                <div className="text-sub text-sm leading-relaxed whitespace-pre-line">{s.content}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-midnight rounded-2xl text-center">
            <p className="text-white/70 text-sm mb-3">Questions about these Terms?</p>
            <a href="mailto:hello@curiousdevs.com?subject=Terms of Service Query"
              className="inline-block px-6 py-3 bg-coral text-white font-semibold rounded-xl hover:bg-coral/90 transition-all text-sm">
              Email us →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
