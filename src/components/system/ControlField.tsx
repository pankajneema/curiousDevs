import { useEffect, useRef } from "react";

/**
 * ControlField — the homepage's ambient visual.
 *
 * A perspective ground plane receding to a horizon, lit by a soft wedge that
 * drifts slowly across it: sensing the physical world, drawn rather than
 * decorated. The grid stays; the sweep is light only, with no hard leading
 * edge, so nothing draws a line across the headline.
 * Plain 2D canvas, cheap on every device, and it renders a single static frame
 * when the visitor prefers reduced motion.
 *
 * Colours are read from the theme on every frame rather than once at mount.
 * Reading them once meant the canvas kept whichever theme happened to be
 * active when it mounted, so switching themes left the plane painted in the
 * other theme's ink.
 */
export function ControlField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /** The two real tokens — not the shadcn `--accent` alias, which is a surface. */
    const palette = () => {
      const style = getComputedStyle(document.documentElement);
      return {
        signal: style.getPropertyValue("--signal").trim() || "oklch(0.66 0.242 3)",
        rule: style.getPropertyValue("--rule-2").trim() || "oklch(0.4 0.035 290)",
      };
    };

    /** One full out-and-back pass of the sweep. Slow on purpose: it sits
     *  behind the headline and must never pull the eye off it. */
    const SWEEP_PERIOD_MS = 40000;

    let width = 0;
    let height = 0;
    let raf = 0;
    let startedAt = 0;
    let alive = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Project a ground-plane coordinate to screen space. */
    const project = (u: number, v: number) => {
      const horizon = height * 0.18;
      const depth = 1 - v; // 1 = nearest, 0 = at the horizon
      const y = horizon + (height - horizon) * depth * 0.96;
      const x = width * 0.5 + u * width * (0.08 + depth * 0.95);
      return { x, y, depth };
    };

    const draw = (now?: number) => {
      if (!alive) return;
      const ts = now ?? performance.now();
      if (!startedAt) startedAt = ts;
      const phase = ((ts - startedAt) / SWEEP_PERIOD_MS) * Math.PI * 2;

      const { signal, rule } = palette();
      ctx.clearRect(0, 0, width, height);
      const sweep = reduce ? 0.55 : (Math.sin(phase) * 0.5 + 0.5) * 0.9 + 0.05;

      // Depth lines running away from the viewer.
      ctx.save();
      ctx.lineWidth = 0.75;
      for (let i = -6; i <= 6; i++) {
        const u = i / 6;
        const near = project(u, 0.06);
        const far = project(u, 1);
        const grad = ctx.createLinearGradient(near.x, near.y, far.x, far.y);
        grad.addColorStop(0, rule);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.globalAlpha = 0.62;
        ctx.beginPath();
        ctx.moveTo(near.x, near.y);
        ctx.lineTo(far.x, far.y);
        ctx.stroke();
      }

      // Cross bands, denser toward the horizon.
      for (let i = 1; i <= 11; i++) {
        const v = Math.pow(i / 11, 1.5);
        const a = project(-1, v);
        const b = project(1, v);
        const near = 1 - v;
        ctx.globalAlpha = 0.1 + near * 0.38;
        ctx.strokeStyle = rule;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.restore();

      // A soft wedge of light drifting across the plane. No leading edge: the
      // travelling line read as a hard rule crossing the headline.
      ctx.save();
      const bandV = sweep;
      const bA = project(-1, Math.max(0.02, bandV - 0.05));
      const bB = project(1, Math.max(0.02, bandV - 0.05));
      const bC = project(1, Math.min(1, bandV + 0.05));
      const bD = project(-1, Math.min(1, bandV + 0.05));
      const bandGrad = ctx.createLinearGradient(0, bC.y, 0, bA.y);
      bandGrad.addColorStop(0, "transparent");
      bandGrad.addColorStop(1, signal);
      ctx.globalAlpha = 0.26;
      ctx.fillStyle = bandGrad;
      ctx.beginPath();
      ctx.moveTo(bA.x, bA.y);
      ctx.lineTo(bB.x, bB.y);
      ctx.lineTo(bC.x, bC.y);
      ctx.lineTo(bD.x, bD.y);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    // A ResizeObserver rather than a window listener: the canvas can mount at
    // zero width (a hidden pane, an offscreen tab, layout not yet settled) and
    // a window resize may never fire to correct it, leaving it blank for good.
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);

    // A static frame has to be repainted when the theme changes; an animating
    // one picks the new colours up on its next frame.
    const themeWatch = new MutationObserver(() => {
      if (reduce) draw();
    });
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeWatch.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Diagram: a perspective ground plane with a slow scan sweep moving across it."
    />
  );
}
