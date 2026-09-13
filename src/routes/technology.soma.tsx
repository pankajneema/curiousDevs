import { createFileRoute } from "@tanstack/react-router";
import { LayerPage } from "@/components/landing/LayerPage";

export const Route = createFileRoute("/technology/soma")({
  head: () => ({ meta: [{ title: "Soma — Intelligence, embodied | CuriousDevs" }] }),
  component: () => <LayerPage layer="Soma" />,
});
