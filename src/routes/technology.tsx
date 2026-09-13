import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { LayerPage } from "@/components/landing/LayerPage";
import { V3Technology } from "@/components/landing/V3Technology";
import { buildSeoHead } from "@/lib/seo";

const TITLE = "Technology — AI Engineering, Intelligent Systems, DeepTech, Robotics";
const DESCRIPTION =
  "Four connected areas within one intelligent-systems thesis: AI Engineering, Intelligent Systems, DeepTech and Robotics.";

export const Route = createFileRoute("/technology")({
  head: () =>
    buildSeoHead({
      path: "/technology",
      title: TITLE,
      description: DESCRIPTION,
      keywords: ["AI engineering", "intelligent systems", "robotics", "DeepTech", "AI hardware"],
      ogType: "website",
    }),
  component: TechnologyPage,
});

function TechnologyPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/technology/noema") return <LayerPage layer="Noema" />;
  if (pathname === "/technology/soma") return <LayerPage layer="Soma" />;
  return <V3Technology />;
}
