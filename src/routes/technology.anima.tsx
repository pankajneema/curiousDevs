import { createFileRoute, redirect } from "@tanstack/react-router";
import { LayerPage } from "@/components/landing/LayerPage";

export const Route = createFileRoute("/technology/anima")({
  beforeLoad: () => {
    throw redirect({ to: "/technology/noema" });
  },
  component: () => <LayerPage layer="Noema" />,
});
