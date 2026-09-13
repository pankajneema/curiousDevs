import { createFileRoute, redirect } from "@tanstack/react-router";
import { LayerPage } from "@/components/landing/LayerPage";

export const Route = createFileRoute("/technology/corpus")({
  beforeLoad: () => {
    throw redirect({ to: "/technology/soma" });
  },
  component: () => <LayerPage layer="Soma" />,
});
