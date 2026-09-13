import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired in Website V2 — permanent redirect to its V2 equivalent.
export const Route = createFileRoute("/solutions")({
  beforeLoad: () => {
    throw redirect({ to: "/technology", statusCode: 301 });
  },
});
