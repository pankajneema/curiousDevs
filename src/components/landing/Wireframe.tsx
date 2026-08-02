import { useEffect, useRef } from "react";

// A small set of points roughly describing a floating crystal — fixed, not
// random, so the shape reads as deliberate rather than noisy.
const points: [number, number, number][] = [
  [0.15, -0.95, 0.25],
  [-0.75, -0.55, -0.3],
  [-0.12, 0.02, 0.45],
  [-0.9, 0.4, -0.1],
  [-0.05, 0.9, 0.15],
  [0.8, 0.55, -0.4],
];

const edges: [number, number][] = [
  [2, 0],
  [2, 1],
  [2, 3],
  [2, 4],
  [2, 5],
  [0, 1],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 4],
  [1, 5],
];

export function Wireframe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let angleY = 0;
    let angleX = 0.3;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Read the token at runtime rather than duplicating its hex here.
    const signalHex = getComputedStyle(document.documentElement)
      .getPropertyValue("--signal")
      .trim();
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(signalHex.slice(i, i + 2), 16));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * dpr;
      height = canvas.height = rect.height * dpr;
    };

    const rotate = (p: [number, number, number], ay: number, ax: number) => {
      let [x, y, z] = p;
      const cosY = Math.cos(ay),
        sinY = Math.sin(ay);
      [x, z] = [x * cosY - z * sinY, x * sinY + z * cosY];
      const cosX = Math.cos(ax),
        sinX = Math.sin(ax);
      [y, z] = [y * cosX - z * sinX, y * sinX + z * cosX];
      return [x, y, z] as [number, number, number];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;
      const focal = 2.6;

      const projected = points.map((p) => {
        const [x, y, z] = rotate(p, angleY, angleX);
        const scale = focal / (focal - z);
        return { x: cx + x * radius * scale, y: cy + y * radius * scale, z, scale };
      });

      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.scale + pb.scale) / 2;
        const alpha = Math.min(0.32, Math.max(0.06, 0.16 * depth));
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = dpr;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      for (const p of projected) {
        const pointRadius = 2.4 * dpr * p.scale;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(0.9, 0.55 * p.scale)})`;
        ctx.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      angleY += 0.0022;
      angleX = 0.3 + Math.sin(angleY * 0.6) * 0.12;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        resize();
        draw();
      }, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
    />
  );
}
