import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired in Website V2 — permanent redirect to its V2 equivalent.
export const Route = createFileRoute("/how-it-works")({
  beforeLoad: () => {
    throw redirect({ to: "/research", statusCode: 301 });
  },
});
