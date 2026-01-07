import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20 lg:py-28">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
                Terms of Service
              </h1>
              <p className="text-muted-foreground mb-8">
                Last updated: January 2026
              </p>

              <div className="prose prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using any CuriousDevs platform, website, or service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    CuriousDevs provides technology platforms including but not limited to CyberSentinel (cybersecurity), AI/ML solutions, blockchain integration, IoT management, and cloud infrastructure services. Services may be updated, modified, or discontinued at our discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    When you create an account with us:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining the security of your account</li>
                    <li>You must notify us immediately of any unauthorized access</li>
                    <li>You may not transfer your account to another party</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Use our services for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the integrity of our services</li>
                    <li>Transmit any malicious code or harmful content</li>
                    <li>Violate any applicable laws or regulations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content, features, and functionality of our services are owned by CuriousDevs and are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To the fullest extent permitted by law, CuriousDevs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid by you for the services in the preceding twelve months.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Indemnification</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You agree to indemnify and hold harmless CuriousDevs and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to suspend or terminate your access to our services at any time, with or without cause, and with or without notice. Upon termination, your right to use our services will immediately cease.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may modify these Terms of Service at any time. We will notify you of any material changes by posting the new terms on this page. Your continued use of our services after changes constitutes acceptance of the modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at{" "}
                    <a href="mailto:hello@curiousdevs.com" className="text-primary hover:underline">
                      hello@curiousdevs.com
                    </a>
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
