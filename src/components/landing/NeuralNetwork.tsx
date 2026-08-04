import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

export function NeuralNetwork() {
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
    let nodes: Node[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Read the token at runtime rather than duplicating its hex here —
    // --slate is the only colour this restrained, low-opacity texture uses.
    const slateHex = getComputedStyle(document.documentElement).getPropertyValue("--slate").trim();
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(slateHex.slice(i, i + 2), 16));

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * dpr;
      height = canvas.height = rect.height * dpr;
      const area = rect.width * rect.height;
      const count = Math.max(28, Math.min(72, Math.round(area / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.06 * dpr,
        vy: (Math.random() - 0.5) * 0.06 * dpr,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = Math.min(width, height) * 0.16;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j];
          const dx = n.x - o.x;
          const dy = n.y - o.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.08;
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = dpr * 0.55;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},0.22)`;
        ctx.arc(n.x, n.y, 1.05 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    seed();
    draw();

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        seed();
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

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
