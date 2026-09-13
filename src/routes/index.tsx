import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { V3Home } from "@/components/landing/V3Home";
import { buildSeoHead, buildWebPageSchema, SITE_DESCRIPTION } from "@/lib/seo";

const TITLE = "CuriousDevs — From Research to Real-World Technology";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeoHead({
      path: "/",
      title: TITLE,
      description: SITE_DESCRIPTION,
      keywords: [
        "intelligent systems",
        "AI engineering",
        "production AI",
        "AI agents",
        "RAG",
        "computer vision",
        "edge AI",
        "robotics research",
        "DeepTech robotics intelligent systems",
      ],
      ogType: "website",
    }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema("/", TITLE, SITE_DESCRIPTION)),
        }}
      />
      <Nav />
      <V3Home />
    </div>
  );
}
