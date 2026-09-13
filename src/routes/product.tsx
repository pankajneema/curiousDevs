import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired in Website V2 — permanent redirect to its V2 equivalent.
export const Route = createFileRoute("/product")({
  beforeLoad: () => {
    throw redirect({ to: "/janus", statusCode: 301 });
  },
});
