import { useEffect } from "react";

/**
 * Pointer-tracking light for `.spotlight` surfaces, attached once in the root
 * layout: sets --mx / --my on the hovered surface. Scroll reveal is pure CSS
 * (scroll-driven animations in styles.css), so nothing here touches markup
 * React is hydrating.
 */
export function SiteEffects() {
  useEffect(() => {
    let frame = 0;
    const onPointer = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!target) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        target.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    document.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
