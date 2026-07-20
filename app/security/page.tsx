import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Security',
  description: 'How CuriosDevs approaches security — and how to report a vulnerability.',
  alternates: { canonical: 'https://curiousdevs.com/security' },
}

export default function SecurityPage() {
  return (
    <LegalPage title="Security" updated="July 2026">
      <p>Security is the whole company. We build every product security-first, and we hold ourselves to the same standard we ask of our customers.</p>

      <div><h2>Our practices</h2>
      <p>Least-privilege access, encrypted data in transit and at rest, short-lived credentials, and tamper-evident audit logging across our own systems. We are working toward SOC 2 and ISO 27001 as we mature.</p></div>

      <div><h2>Responsible disclosure</h2>
      <p>Found a vulnerability in our site or products? We want to hear from you. Email <a href="mailto:security@curiousdevs.com">security@curiousdevs.com</a> with details and steps to reproduce. Please give us reasonable time to fix issues before public disclosure — we will keep you updated and credit your finding.</p></div>

      <div><h2>Scope</h2>
      <p>curiousdevs.com and our published open-source repositories are in scope. Social engineering, physical attacks, and denial-of-service testing are out of scope.</p></div>

      <div><h2>Contact</h2>
      <p>Security team: <a href="mailto:security@curiousdevs.com">security@curiousdevs.com</a>.</p></div>
    </LegalPage>
  )
}
