import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "cd-theme";

/** The site ships light. A visitor's own choice is the only thing that changes it. */
export const DEFAULT_THEME: Theme = "light";

/**
 * Runs before first paint, inlined in the document head.
 *
 * The server already renders `data-theme="light"`, so this only has to
 * upgrade the document when a visitor has chosen otherwise — doing it before
 * paint rather than at hydration avoids a full-screen flash. Kept as a string
 * so it can be injected verbatim, and wrapped in try/catch because storage
 * throws in private mode.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=${JSON.stringify(DEFAULT_THEME)}}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(DEFAULT_THEME)})}})();`;

function readTheme(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  // The document already carries the right theme from the init script; this
  // state only mirrors it, and is read after mount so the server and client
  // markup agree.
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setReady(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* the choice just will not persist */
    }
  };

  const goingTo = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${goingTo} theme`}
      title={`Switch to ${goingTo} theme`}
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full border border-line",
        "text-muted-foreground transition-colors duration-200",
        "hover:border-line-strong hover:text-foreground",
        className,
      )}
    >
      {/* Until the mirror settles, render neither icon rather than the wrong one. */}
      <span aria-hidden className={cn("transition-opacity", ready ? "opacity-100" : "opacity-0")}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line
          key={a}
          x1="8"
          y1="1.4"
          x2="8"
          y2="3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          transform={`rotate(${a} 8 8)`}
        />
      ))}
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13.2 9.6A5.8 5.8 0 0 1 6.4 2.8a5.8 5.8 0 1 0 6.8 6.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
