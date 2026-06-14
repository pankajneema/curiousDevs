import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — CuriousDevs',
  description: 'CuriousDevs Privacy Policy — compliant with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.',
  alternates: { canonical: 'https://curiousdevs.com/privacy' },
}

const sections = [
  {
    id: 'overview',
    title: '1. Overview & Governing Law',
    content: `This Privacy Policy ("Policy") is published by CuriousDevs ("Company", "We", "Us") in compliance with:

• The Digital Personal Data Protection Act, 2023 (DPDP Act)
• The Information Technology Act, 2000 and IT (Amendment) Act, 2008
• The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 ("SPDI Rules")
• The Consumer Protection Act, 2019

CuriousDevs is a Data Fiduciary under the DPDP Act, 2023. We process personal data only with valid consent or for legitimate purposes permitted by law.`,
  },
  {
    id: 'data-collected',
    title: '2. Data We Collect and Why',
    content: `We collect the following categories of personal data:

**Account Data:** Name, work email address, company name, and password hash — collected when you create a TokenFin account. Purpose: account management, authentication, and service delivery.

**Usage Telemetry:** LLM call metadata — token counts, model names, latency in milliseconds, custom attribution tags you define, and timestamps. We do NOT collect your prompt content or model outputs unless you explicitly opt into Prompt Logging (a separate, optional feature). Purpose: providing the TokenFin cost attribution service.

**Payment Information:** For paid plans, billing name, email, and last 4 digits of card. Full card data is processed by our PCI-DSS compliant payment processor (Razorpay/Stripe) — we do not store raw card numbers. Purpose: subscription billing.

**Communications:** Emails and messages you send us via the contact form, support tickets, or directly. Purpose: responding to your queries.

**Cookies and Analytics:** See Section 9 (Cookies) below.

We do not collect sensitive personal data or information (SPDI) as defined under the SPDI Rules unless you voluntarily provide it in communications.`,
  },
  {
    id: 'legal-basis',
    title: '3. Legal Basis for Processing (DPDP Act, 2023)',
    content: `Under the Digital Personal Data Protection Act, 2023, we process your personal data on the following bases:

**Consent (Section 6, DPDP Act):** Where we request consent, we provide a clear, specific notice of the purpose before processing begins. You may withdraw consent at any time by emailing hello@curiousdevs.com — withdrawal does not affect processing prior to withdrawal.

**Legitimate Uses (Section 7, DPDP Act):** We process certain data without consent for legitimate purposes including: (a) performance of contracts to which you are a party, (b) complying with legal obligations under Indian law, (c) detecting and preventing fraud or security breaches, and (d) processing already lawfully available personal data.

**State Functions:** Not applicable to CuriousDevs.`,
  },
  {
    id: 'data-principal-rights',
    title: '4. Your Rights as a Data Principal (DPDP Act, 2023)',
    content: `Under the Digital Personal Data Protection Act, 2023, you have the following rights:

**Right to Access Information (Section 11):** You may request a summary of the personal data we process about you and the purposes for which it is processed.

**Right to Correction and Erasure (Section 12):** You may request correction of inaccurate or incomplete personal data, or erasure of personal data that is no longer necessary for the original purpose, subject to legal retention requirements.

**Right to Grievance Redressal (Section 13):** You may file a complaint with our Grievance Officer (see Section 11 below). If unresolved, you may approach the Data Protection Board of India.

**Right to Nominate (Section 14):** You may nominate another individual to exercise your rights in the event of your death or incapacity.

**Right to Withdraw Consent:** You may withdraw consent at any time where processing is based on consent.

To exercise any right, email our Grievance Officer at: grievance@curiousdevs.com. We will respond within 30 days.`,
  },
  {
    id: 'data-sharing',
    title: '5. Data Sharing and Processors',
    content: `We do not sell, rent, or trade your personal data to third parties for commercial purposes.

We engage Data Processors (sub-processors) to provide our services. All processors are bound by data processing agreements that comply with the DPDP Act, 2023:

• **Cloud Infrastructure:** AWS / GCP (hosting and data storage) — servers located in ap-south-1 (Mumbai) for Indian users
• **Payment Processor:** Razorpay Payments Pvt Ltd (billing) — PCI-DSS Level 1 certified
• **Email Delivery:** For transactional emails (account notifications, receipts)
• **Error Monitoring:** Aggregate, anonymized error tracking

We may disclose data to law enforcement or government authorities where required by Indian law, including under the IT Act, 2000 or any lawful court order.`,
  },
  {
    id: 'data-retention',
    title: '6. Data Retention',
    content: `Account data: Retained for the duration of your account plus 3 years post-closure for legal compliance.

Billing records: Retained for 8 years as required under the Companies Act, 2013 and GST laws.

Usage telemetry: Retained per your plan (3 days on Starter, 90 days on Pro, custom on Enterprise). You may request earlier deletion.

Support communications: Retained for 3 years from the date of resolution.

When data is no longer required, we securely delete or anonymize it.`,
  },
  {
    id: 'security',
    title: '7. Security Practices (IT Act & SPDI Rules)',
    content: `We implement the "reasonable security practices and procedures" required under Rule 8 of the SPDI Rules, 2011, which include:

• AES-256 encryption for data at rest
• TLS 1.3 for all data in transit
• Multi-factor authentication on all internal systems
• Role-based access control (RBAC) — least-privilege principle
• Regular security audits and penetration testing
• Incident response plan aligned with CERT-In (Computer Emergency Response Team India) guidelines

In the event of a personal data breach, we will notify affected Data Principals and the Data Protection Board as required by the DPDP Act, 2023.`,
  },
  {
    id: 'cross-border',
    title: '8. Cross-Border Data Transfers',
    content: `Our primary infrastructure is hosted in India (AWS ap-south-1, Mumbai). Where we transfer data outside India, we ensure appropriate safeguards are in place as required by Section 16 of the DPDP Act, 2023 and any rules notified by the Central Government thereunder.

We will update this section promptly if cross-border transfer restrictions change under applicable law.`,
  },
  {
    id: 'cookies',
    title: '9. Cookies and Tracking',
    content: `We use the following cookies:

**Essential Cookies:** Required for authentication, session management, and security. Cannot be disabled without breaking core functionality.

**Analytics Cookies:** Anonymized, aggregated data about how visitors use our website. We use privacy-first analytics that do not track individual users across sites. You may opt out by enabling "Do Not Track" in your browser.

**Preference Cookies:** Remember your settings (e.g., pricing toggle preference). Can be cleared by clearing browser cookies.

We do not use advertising cookies or third-party tracking pixels. We do not participate in behavioural advertising networks.`,
  },
  {
    id: 'children',
    title: "10. Children's Privacy",
    content: `Our services are not directed at children below the age of 18 years. We do not knowingly collect personal data from children. Under the DPDP Act, 2023, we will implement verifiable parental consent mechanisms before processing data of children if any such use case arises.

If you believe we have inadvertently collected data from a child, please contact our Grievance Officer immediately.`,
  },
  {
    id: 'grievance',
    title: '11. Grievance Officer',
    content: `In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, we have designated a Grievance Officer:

**Name:** Pankaj Kumar
**Designation:** Grievance Officer & Founder
**Organisation:** CuriousDevs
**Email:** grievance@curiousdevs.com
**Phone:** +91 8171268630
**Response Time:** Within 30 days of receipt of complaint

If your grievance is not resolved within 30 days, you may approach the Data Protection Board of India (once operationalized under the DPDP Act, 2023) or seek other legal remedies available under Indian law.`,
  },
  {
    id: 'changes',
    title: '12. Changes to This Policy',
    content: `We may update this Policy from time to time to reflect changes in law, our services, or our practices. We will notify registered users of material changes via email at least 30 days before the change takes effect, or obtain fresh consent where required. The "Last Updated" date at the top of this page reflects the most recent revision.`,
  },
]

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs text-teal uppercase tracking-widest mb-4">Legal</p>
          <h1 className="font-head font-black text-5xl text-white mb-4">Privacy Policy</h1>
          <div className="flex flex-wrap gap-4 text-white/50 text-sm font-mono">
            <span>Last Updated: June 14, 2025</span>
            <span>·</span>
            <span>Effective: June 14, 2025</span>
          </div>
          <div className="mt-6 p-4 bg-teal/10 border border-teal/30 rounded-xl">
            <p className="text-teal text-sm">
              <strong>Compliant with:</strong> Digital Personal Data Protection Act, 2023 (India) · IT Act, 2000 · SPDI Rules, 2011 · Consumer Protection Act, 2019
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
          <div className="flex flex-col gap-10">
            {sections.map(s => (
              <div key={s.id} id={s.id} className="bg-white rounded-2xl border border-border p-8">
                <h2 className="font-head font-bold text-xl text-midnight mb-4">{s.title}</h2>
                <div className="text-sub text-sm leading-relaxed whitespace-pre-line">{s.content}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sub text-sm mb-4">Questions about this policy?</p>
            <a href="mailto:grievance@curiousdevs.com"
              className="inline-block px-6 py-3 bg-midnight text-white font-semibold rounded-xl hover:bg-midnight/90 transition-all text-sm">
              Contact our Grievance Officer →
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
