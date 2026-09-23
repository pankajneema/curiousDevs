import { useEffect, useState } from "react";
import { useInView } from "./Reveal";

/**
 * A mono micro-label that resolves out of noise the first time it scrolls
 * into view — the instrument settling on a reading.
 *
 * The real string is always present for assistive technology and for
 * search; only an aria-hidden copy is scrambled, so nothing ever
 * announces or indexes the garbled intermediate state. Under
 * prefers-reduced-motion the label simply appears.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#%";
const STEP_MS = 34;
/** Frames each character spends scrambling before it locks. */
const LOCK_EVERY = 2;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

export function Scramble({ text, className }: { text: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setShown(text);
      return;
    }

    const noise = (from: number) =>
      text
        .split("")
        .map((char, i) => {
          if (i < from || char === " ") return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

    // Drop straight to noise rather than holding the real string for a
    // frame — otherwise the label visibly un-resolves before it resolves.
    setShown(noise(0));

    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const locked = Math.floor(frame / LOCK_EVERY);

      if (locked >= text.length) {
        setShown(text);
        window.clearInterval(id);
        return;
      }

      setShown(noise(locked));
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
