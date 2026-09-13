import { createFileRoute } from "@tanstack/react-router";
import { LayerPage } from "@/components/landing/LayerPage";

export const Route = createFileRoute("/technology/noema")({
  head: () => ({ meta: [{ title: "Noema — Intelligence that understands | CuriousDevs" }] }),
  component: () => <LayerPage layer="Noema" />,
});
