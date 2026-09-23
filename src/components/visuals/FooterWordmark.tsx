import { cn } from "@/lib/utils";

/**
 * The brand name set enormous in the floor of the footer.
 *
 * It hangs past the footer's bottom edge and is cropped by the footer's own
 * `overflow: hidden`, so only the upper part of the letters is ever visible —
 * the wordmark reads as something the page is standing on rather than as a
 * line of text. It is decorative, so it is hidden from assistive technology
 * and cannot be selected or clicked; the real wordmark stays in the footer's
 * lock-up above it.
 *
 * Presentation lives in the `footer-wordmark` utility in styles.css.
 */
export function FooterWordmark({ text, className }: { text: string; className?: string }) {
  return (
    <p aria-hidden className={cn("footer-wordmark", className)}>
      {text}
    </p>
  );
}
