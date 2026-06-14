export default function CTA() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-head font-bold text-4xl lg:text-5xl text-midnight mb-4">
          Ready to take control<br/>
          <span className="text-coral">of your AI costs?</span>
        </h2>
        <p className="text-sub text-lg mb-10 max-w-xl mx-auto">
          Join teams already saving 20–40% on their LLM bills. Free to start. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://tokenfin.curiousdevs.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all text-lg">
            Start free — it&apos;s instant →
          </a>
          <a href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-border hover:border-midnight text-midnight font-semibold rounded-xl transition-all text-lg">
            Talk to us
          </a>
        </div>
        <p className="text-sub text-sm mt-6">Free plan forever · No credit card · Setup in &lt;15 min</p>
      </div>
    </section>
  )
}
