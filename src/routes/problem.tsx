import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired in Website V2 — permanent redirect to its V2 equivalent.
export const Route = createFileRoute("/problem")({
  beforeLoad: () => {
    throw redirect({ to: "/systems", statusCode: 301 });
  },
});
