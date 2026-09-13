import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired in Website V2 — permanent redirect to its V2 equivalent.
export const Route = createFileRoute("/pricing")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", statusCode: 301 });
  },
});
