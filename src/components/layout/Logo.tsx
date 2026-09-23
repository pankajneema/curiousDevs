/**
 * The CuriousDevs mark: four identical hooks, each turned a quarter turn,
 * locked into one diamond-shaped knot. Single ink (currentColor) — set it in
 * `foreground` on the dark ground and never tint it with the accent.
 * Geometry matches the design system's Mark: one hook, rotated 0/90/180/270
 * inside a frame turned 45 degrees.
 */
const HOOK = "M-44.5-20.5V20.5H10.1V13.4H-37.4V-13.4H-24.15V-20.5Z";

export function Logo({ size = 24, title }: { size?: number; title?: string }) {
  return (
    <svg
      viewBox="4 4 92 92"
      width={size}
      height={size}
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className="shrink-0 text-foreground"
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(50 50) rotate(45)">
        {[0, 90, 180, 270].map((r) => (
          <path key={r} d={HOOK} transform={r ? `rotate(${r})` : undefined} />
        ))}
      </g>
    </svg>
  );
}

/** "Curious" and "Devs" in Archivo 400, "Devs" at 60% opacity. */
export function Wordmark({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <span
      className={`font-display font-normal leading-none tracking-[-0.015em] whitespace-nowrap text-foreground ${
        size === "lg" ? "text-lg" : "text-base"
      }`}
    >
      Curious<span className="opacity-60">Devs</span>
    </span>
  );
}
