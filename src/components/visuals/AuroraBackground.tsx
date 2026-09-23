import { useRouterState } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

/**
 * Ambient light behind the page.
 *
 * Four soft blobs drift on independent paths at different speeds, blended
 * with `screen` so they read as light falling on the graphite ground rather
 * than as coloured shapes sitting on it. A fine grain sits on top: large soft
 * gradients band badly on 8-bit displays, and the noise hides it.
 *
 * The layer is mounted once in the root, so the arrangement is chosen from
 * the current pathname rather than at random — every page gets its own
 * composition, but a given page always looks the same, which keeps the
 * server and client renders identical and stops the light jumping when a
 * route re-renders.
 *
 * The layer is fixed, inert and contained, so it never affects layout or
 * interaction. Motion is suppressed under `prefers-reduced-motion` (see the
 * rule beside the keyframes in styles.css) and the blobs simply hold still,
 * which keeps the atmosphere without the movement.
 */

type Placement = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

/** Colour, softness and timing are fixed per blob; only where it sits moves. */
const BLOBS = [
  {
    color: "var(--aurora-magenta)",
    size: "clamp(10rem, 21vw, 19rem)",
    blur: "80px",
    strength: "52%",
    animation: "cd-aurora-a",
    duration: "26s",
    delay: "0s",
  },
  {
    color: "var(--aurora-violet)",
    size: "clamp(9rem, 19vw, 17rem)",
    blur: "85px",
    strength: "44%",
    animation: "cd-aurora-b",
    duration: "30s",
    delay: "-6s",
  },
  {
    color: "var(--aurora-blue)",
    size: "clamp(9.5rem, 20vw, 18rem)",
    blur: "80px",
    strength: "38%",
    animation: "cd-aurora-c",
    duration: "23s",
    delay: "-12s",
  },
  {
    color: "var(--aurora-magenta)",
    size: "clamp(8rem, 15vw, 13rem)",
    blur: "65px",
    strength: "34%",
    animation: "cd-aurora-d",
    duration: "21s",
    delay: "-3s",
  },
] as const;

/**
 * Five arrangements. Each spreads the four blobs across different edges so no
 * two pages open with the light in the same place; within a layout they stay
 * far enough apart not to pool into one bright patch.
 */
const LAYOUTS: Placement[][] = [
  [
    { top: "-6%", left: "-4%" },
    { top: "18%", right: "-6%" },
    { bottom: "-8%", left: "22%" },
    { bottom: "12%", right: "10%" },
  ],
  [
    { top: "-4%", right: "8%" },
    { top: "34%", left: "-8%" },
    { bottom: "-6%", right: "18%" },
    { bottom: "26%", left: "26%" },
  ],
  [
    { top: "10%", left: "12%" },
    { top: "-8%", right: "-4%" },
    { bottom: "14%", left: "-6%" },
    { bottom: "-4%", right: "28%" },
  ],
  [
    { top: "-10%", left: "30%" },
    { top: "26%", right: "-8%" },
    { bottom: "-10%", left: "6%" },
    { bottom: "20%", right: "32%" },
  ],
  [
    { top: "6%", right: "22%" },
    { top: "-6%", left: "-6%" },
    { bottom: "4%", right: "-6%" },
    { bottom: "-8%", left: "34%" },
  ],
];

/** Small deterministic hash, so a path always maps to the same arrangement. */
function layoutFor(pathname: string) {
  let h = 0;
  for (let i = 0; i < pathname.length; i += 1) {
    h = (h * 31 + pathname.charCodeAt(i)) % 100000;
  }
  return LAYOUTS[h % LAYOUTS.length]!;
}

export function AuroraBackground({ className }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const layout = layoutFor(pathname);

  return (
    <div aria-hidden className={cn("aurora-layer", className)}>
      {BLOBS.map((b, i) => {
        const at = layout[i]!;
        return (
          <span
            key={b.animation}
            className="aurora-blob"
            style={{
              top: at.top,
              left: at.left,
              right: at.right,
              bottom: at.bottom,
              width: b.size,
              height: b.size,
              filter: `blur(${b.blur})`,
              backgroundImage: `radial-gradient(circle at 50% 50%, color-mix(in oklab, ${b.color} ${b.strength}, transparent), transparent 68%)`,
              animationName: b.animation,
              animationDuration: b.duration,
              animationDelay: b.delay,
            }}
          />
        );
      })}
      <span className="aurora-grain" />
    </div>
  );
}
