import type { CSSProperties } from "react";

/**
 * Stagger for [data-reveal] blocks. Reveal is scroll-driven, so the "delay"
 * becomes a later start within the element's entry range (80ms ≈ 4%).
 */
export const revealDelay = (ms: number) =>
  ({ "--reveal-start": `${Math.round(ms / 20)}%` }) as CSSProperties;

/** Stagger for the on-load `rise-in` entrance used in page heroes. */
export const riseDelay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;
