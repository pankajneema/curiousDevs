import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How CuriosDevs collects, uses and protects your personal data.',
  alternates: { canonical: 'https://curiousdevs.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>At CuriosDevs, privacy is not a footnote — it is the business we are in. This policy explains what we collect, why, and the choices you have. We collect the minimum needed to run our products and reply to you, and we never sell your data.</p>

      <div><h2>Information we collect</h2>
      <p>When you contact us, subscribe to our newsletter, or apply for a role, we collect the details you provide — such as your name, email, company, message, and (for applications) your resume. We also collect basic, anonymised usage analytics to improve the site.</p></div>

      <div><h2>How we use it</h2>
      <p>To respond to your enquiry, deliver the newsletter you asked for, evaluate job applications, and operate and improve our services. We process personal data on the basis of your consent and our legitimate interest in running the business.</p></div>

      <div><h2>Sharing</h2>
      <p>We do not sell personal data. We share it only with service providers that help us operate (for example, email delivery and database hosting), under contract and only as needed.</p></div>

      <div><h2>Your rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data at any time. Email <a href="mailto:hello@curiousdevs.com">hello@curiousdevs.com</a> and we will action your request.</p></div>

      <div><h2>Contact</h2>
      <p>Questions about this policy? Write to <a href="mailto:hello@curiousdevs.com">hello@curiousdevs.com</a>.</p></div>

      <p className="text-faint text-xs">This is a summary policy for an early-stage product. A full, counsel-reviewed policy will replace it before general availability.</p>
    </LegalPage>
  )
}
