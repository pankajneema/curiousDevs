import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What does CuriousDevs do?",
    answer: "CuriousDevs is a technology company that builds deep-tech platforms in cybersecurity, AI/ML, blockchain, IoT, and cloud infrastructure. We focus on creating production-ready products, not client services or consulting."
  },
  {
    question: "Is CyberSentinel available now?",
    answer: "Yes! CyberSentinel is our first live platform. It's a proactive cybersecurity solution focused on Attack Surface Management, continuous asset discovery, risk visibility, and early threat awareness."
  },
  {
    question: "Are other platforms open for early access?",
    answer: "Our AI/ML, Blockchain, IoT, and Cloud platforms are currently in development. Subscribe to our newsletter to be notified when early access becomes available."
  },
  {
    question: "Is CuriousDevs a services company?",
    answer: "No. CuriousDevs is a product company. We build platforms that we own and operate. We don't offer freelance services, custom development, or consulting. Our focus is entirely on building scalable, production-ready technology products."
  },
  {
    question: "How can I collaborate or stay informed?",
    answer: "You can subscribe to our newsletter for updates, follow our blog for technical insights, or reach out directly through our contact form. We're always open to meaningful conversations about technology and potential collaborations."
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-24 relative section-line">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Common questions about CuriousDevs and our platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 data-[state=open]:bg-card transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
