import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll entrances.
 *
 * Everything here is progressive: the server renders the real markup with
 * a `data-reveal` attribute, and only the `.js` class that the inline
 * boot script in __root.tsx adds before first paint makes that attribute
 * mean "hidden". Without JavaScript — or before hydration — the page is a
 * complete, readable document with no animation at all. See the
 * `.js [data-reveal]` rule in styles.css.
 *
 * An element settles once and stays settled. Nothing re-animates on the
 * way back up the page; a reader scrolling to re-read a paragraph should
 * not have to wait for it a second time.
 */

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  // Fire slightly before the element reaches the fold, so the motion has
  // finished by the time it is properly in the reading area.
  rootMargin: "0px 0px -12% 0px",
  threshold: 0.08,
};

/** Observes a node once and reports when it has entered the viewport. */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      }
    }, OBSERVER_OPTIONS);

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={inView ? "shown" : ""}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * A display heading that rises line by line out of its own baseline.
 *
 * Lines are authored explicitly rather than measured at runtime: the copy
 * in content/site.ts is written to break in specific places, and a
 * measured split would fight the `text-wrap: balance` the headings use.
 * Each line is still real text in the DOM, so the heading reads normally
 * to a screen reader and to search.
 */
export function MaskLines({
  lines,
  as: Tag = "h2",
  className,
  stagger = 90,
  delay = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>();

  return (
    <Tag ref={ref} className={className} data-reveal={inView ? "shown" : ""}>
      {lines.map((line, i) => (
        <span
          key={line}
          className="line-mask"
          style={{ "--reveal-delay": `${delay + i * stagger}ms` } as React.CSSProperties}
        >
          <span>{line}</span>
          {/* Keeps the lines as separate words for copy-paste and a11y. */}
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
