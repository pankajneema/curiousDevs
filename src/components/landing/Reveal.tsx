import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Unused — kept so existing call sites don't need to change. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Renders its children directly. Marketing pages don't animate on scroll —
 * no fade-in, no parallax, no ticking counters (Design System, Motion).
 * Kept as a pass-through wrapper rather than removed from every call site.
 */
export function Reveal({ children, className = "", as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={className}>{children}</Tag>;
}
