/**
 * The C mark — the founder's actual artwork, used directly rather than
 * hand-traced as SVG. Source cropped tight and knocked out to a transparent
 * background (see /Users/mac/curiousDevs/public/brand/curiousdevs-mark.png,
 * native 670x658). A vector re-trace was tried first and rejected as not a
 * faithful match — this is the real asset.
 *
 * `variant="light"` swaps in a recoloured copy (navy → paper, orange
 * unchanged) for use inside `.on-dark` sections, where the default navy
 * mark would be invisible against the near-black background.
 */
const SRC = {
  default: "/brand/curiousdevs-mark.png",
  light: "/brand/curiousdevs-mark-light.png",
} as const;

export function Logo({
  size = 26,
  variant = "default",
}: {
  size?: number;
  variant?: keyof typeof SRC;
}) {
  return (
    <img
      src={SRC[variant]}
      alt=""
      width={size}
      height={(size * 658) / 670}
      className="inline-block object-contain"
      aria-hidden="true"
    />
  );
}

/** Loader variant — the whole mark pulses in place of a dot orbiting a
 * ring. Used for loading states; reuses the existing live-dot opacity
 * animation rather than introducing a new timing value. */
export function LogoLoader({
  size = 26,
  variant = "default",
}: {
  size?: number;
  variant?: keyof typeof SRC;
}) {
  return (
    <img
      src={SRC[variant]}
      alt=""
      width={size}
      height={(size * 658) / 670}
      className="live-dot inline-block object-contain"
      aria-hidden="true"
    />
  );
}

export function Wordmark({
  variant = "default",
  size = "sm",
}: {
  variant?: keyof typeof SRC;
  size?: "sm" | "lg";
}) {
  return (
    <span
      className={`${size === "lg" ? "text-[20px]" : "text-[15px]"} font-bold tracking-[-0.02em] ${variant === "light" ? "text-[var(--paper)]" : "text-foreground"}`}
    >
      Curious<span className="text-amber-accent">Devs</span>
    </span>
  );
}
