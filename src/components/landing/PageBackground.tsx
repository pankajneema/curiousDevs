import { EngineeringGrid } from "./EngineeringGrid";

// Mounted once in the root layout, behind every route. `site-backdrop`
// paints the flat paper ground and the rule-coloured dot grid (::after);
// this sits on top of that as a sparse, deterministic engineering-diagram
// layer — no randomness, no motion loop, so it costs nothing after first
// paint and never differs between server and client.
export function PageBackground() {
  return (
    <div className="site-backdrop">
      <EngineeringGrid
        seed={4242}
        density="sparse"
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full opacity-35"
      />
    </div>
  );
}
