import { createFileRoute, redirect } from "@tanstack/react-router";

/* Folded into the Physical AI Lab. The URL stays live as a permanent redirect. */
export const Route = createFileRoute("/intelligence")({
  beforeLoad: () => {
    throw redirect({ to: "/lab", hash: "stack", statusCode: 301 });
  },
});
