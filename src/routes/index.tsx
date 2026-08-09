import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Roadmap } from "@/components/landing/Roadmap";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Reveal } from "@/components/landing/Reveal";
import { Footer } from "@/components/landing/Footer";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeoHead({
      path: "/",
      title: "CuriousDevs — AI Engineering Studio for Production Systems",
      description:
        "CuriousDevs builds AI-native products and makes existing AI systems reliable, secure, measurable, and production-ready.",
      keywords: [
        "AI engineering services",
        "AI-native development",
        "AI audit",
        "AI reliability",
        "MLOps",
      ],
      ogType: "website",
    }),
  component: Index,
});

function Index() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/",
              "CuriousDevs — AI Engineering Studio for Production Systems",
              "AI-native development, reliability engineering, security, optimization, and production infrastructure.",
            ),
          ),
        }}
      />
      <Nav />
      <Hero />
      <Reveal>
        <Problem />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Roadmap />
      </Reveal>
      <Reveal>
        <FaqAndCta schema />
      </Reveal>
      <Footer />
    </main>
  );
}
