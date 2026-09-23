import { useEffect } from "react";

declare global {
  interface Window {
    Intercom?: ((...args: unknown[]) => void) & { q?: unknown[]; c?: (args: unknown) => void };
    intercomSettings?: Record<string, unknown>;
  }
}

/**
 * Isolated Intercom integration.
 *
 * - Configured entirely through VITE_INTERCOM_APP_ID (a publishable workspace
 *   id, not a secret). With no id set — the default in development — nothing
 *   loads and no network request is made.
 * - Loaded after hydration and after the window load event, so it never blocks
 *   rendering or competes with the page's own resources.
 * - Nothing else in the UI references Intercom; swap this component to swap the
 *   provider.
 */
export function IntercomMessenger() {
  useEffect(() => {
    const appId = import.meta.env["VITE_INTERCOM_APP_ID"] as string | undefined;
    if (!appId) return;

    window.intercomSettings = { api_base: "https://api-iam.intercom.io", app_id: appId };

    const boot = () => {
      if (window.Intercom) {
        window.Intercom("reattach_activator");
        window.Intercom("update", window.intercomSettings);
        return;
      }
      const shim = ((...args: unknown[]) => {
        shim.q?.push(args);
      }) as NonNullable<Window["Intercom"]>;
      shim.q = [];
      window.Intercom = shim;

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://widget.intercom.io/widget/${appId}`;
      document.head.appendChild(script);
    };

    if (document.readyState === "complete") boot();
    else window.addEventListener("load", boot, { once: true });

    return () => window.removeEventListener("load", boot);
  }, []);

  return null;
}
