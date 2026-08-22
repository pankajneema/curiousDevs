import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { BookingDialog } from "@/components/landing/BookingDialog";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/janus")({
  head: () =>
    buildSeoHead({
      path: "/janus",
      title: "Janus — AI-Native Customer Operations Platform | CuriousDevs",
      description:
        "Janus connects lead capture, CRM, communication, support, automation, knowledge and analytics into one AI-native customer operations platform. Built by CuriousDevs.",
      keywords: ["AI CRM", "customer operations platform", "AI-native CRM", "unified inbox AI"],
      ogType: "website",
    }),
  component: JanusPage,
});

const features: {
  image: string;
  alt: string;
  title: string;
  body: string;
}[] = [
  {
    image: "/janus/janus-dashboard.png",
    alt: "Janus overview dashboard showing pipeline, open support and AI operations",
    title: "One dashboard, what actually needs attention",
    body: "New leads, pipeline value, open support and AI resolution rate in one view — with a prioritized queue of what needs a human decision next.",
  },
  {
    image: "/janus/janus-inbox.png",
    alt: "Janus unified inbox with an AI-drafted reply and human handoff",
    title: "Every channel, one thread",
    body: "WhatsApp, email and chat unified per customer. AI drafts replies grounded in context, and hands off to a human the moment it should.",
  },
  {
    image: "/janus/janus-customer.png",
    alt: "Janus customer profile with AI summary and health breakdown",
    title: "One page per customer, not five tabs",
    body: "Identity, timeline, health score and an embedded AI assistant on a single screen — the same customer story everywhere it shows up.",
  },
  {
    image: "/janus/janus-tickets.png",
    alt: "Janus support ticket with AI replies, confidence scores and human takeover",
    title: "AI support that hands off cleanly",
    body: "Every AI reply carries a confidence score and the sources it used. When it's not sure, it escalates with a reason instead of guessing.",
  },
  {
    image: "/janus/janus-automations.png",
    alt: "Janus automation library with run counts and success rates",
    title: "Automations you can actually audit",
    body: "Visual workflows for lead routing, follow-ups and escalations — each one showing real run counts and success rates, not just an on/off toggle.",
  },
  {
    image: "/janus/janus-ai.png",
    alt: "Janus Ask Your Business panel answering a question with a chart and cited data",
    title: "Answers grounded in your own data",
    body: "Ask a plain-language question about leads, pipeline or support. Every answer cites the records it used — never invented.",
  },
];

function JanusPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/janus",
              "Janus — AI-Native Customer Operations Platform",
              "Janus connects lead capture, CRM, communication, support, automation, knowledge and analytics into one AI-native customer operations platform.",
            ),
          ),
        }}
      />
      <Nav />
      <section className="relative border-b border-hairline pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <p className="eyebrow flex items-center gap-2">
            <span className="live-dot inline-block size-1.5 rounded-none bg-amber-accent" />
            Product · Built by CuriousDevs
          </p>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] sm:mt-4">
            Janus <span className="text-aurora">connects your customer lifecycle.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:mt-5">
            An AI-native customer operations platform that connects lead capture, CRM,
            communication, support, automation, knowledge and analytics into one connected customer
            lifecycle — instead of eight disconnected tools.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-accent/40 bg-amber-accent/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-amber-accent uppercase">
              Demo
            </span>
            <p className="text-xs text-muted-foreground">
              Working prototype, running on realistic mock data — every screen below is real.
            </p>
          </div>
          <BookingDialog>
            <button className="btn-shine mt-6 rounded-none bg-amber-accent px-6 py-3 text-sm font-semibold text-background">
              Talk to us about Janus
            </button>
          </BookingDialog>

          <div className="mt-12 overflow-hidden border border-hairline bg-surface shadow-[0_20px_50px_rgba(10,20,36,0.08)] sm:mt-14">
            <img
              src="/janus/janus-hero.png"
              alt="Janus dashboard showing pipeline, open support, AI resolution rate and the queue of items needing a human decision"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-hairline py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <article key={f.title} className="cell-hover flex flex-col bg-surface">
                <img
                  src={f.image}
                  alt={f.alt}
                  loading="lazy"
                  className="aspect-[21/10] w-full border-b border-hairline object-cover object-left-top"
                />
                <div className="p-6">
                  <h2 className="text-base font-bold tracking-tight">{f.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center sm:py-20">
        <div className="mx-auto max-w-xl px-6 sm:px-8">
          <p className="eyebrow">From the studio that builds this for clients</p>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Janus is CuriousDevs' own AI engineering, built on itself.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            The same evaluation, grounding and production discipline we bring to client engagements
            — Build, Audit, Fix, and Scale — went into Janus. If you want that for your own AI
            systems, that's what we do.
          </p>
          <BookingDialog>
            <button className="btn-shine mt-6 rounded-none bg-foreground px-6 py-3 text-sm font-semibold text-background">
              Start a conversation
            </button>
          </BookingDialog>
        </div>
      </section>
      <Footer />
    </main>
  );
}
