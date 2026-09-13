/**
 * Isometric projection helpers for the V2 technical illustrations.
 *
 * World axes: x runs down-right, y runs down-left, z runs up. Everything is
 * deterministic plain SVG — renders in the SSR payload, no canvas, no WebGL.
 */
export const COS30 = Math.cos(Math.PI / 6);

export type P3 = readonly [number, number, number];

export function project([x, y, z]: P3, s: number, ox: number, oy: number): [number, number] {
  return [ox + (x - y) * COS30 * s, oy + (x + y) * 0.5 * s - z * s];
}

export function poly(points: readonly P3[], s: number, ox: number, oy: number) {
  return points
    .map((p) =>
      project(p, s, ox, oy)
        .map((n) => n.toFixed(2))
        .join(","),
    )
    .join(" ");
}

/**
 * SVG transform that maps a flat drawing in (x, y) world units onto the
 * horizontal plane at height z — so a <circle> becomes an iso ellipse and a
 * <rect> becomes a rhombus. Pair with vectorEffect="non-scaling-stroke".
 */
export function planeMatrix(s: number, ox: number, oy: number, z = 0) {
  const a = (COS30 * s).toFixed(4);
  const b = (0.5 * s).toFixed(4);
  return `matrix(${a} ${b} ${-(COS30 * s).toFixed(4)} ${b} ${ox.toFixed(2)} ${(oy - z * s).toFixed(2)})`;
}

export function boxFaces(x: number, y: number, z: number, w: number, d: number, h: number) {
  const top: P3[] = [
    [x, y, z + h],
    [x + w, y, z + h],
    [x + w, y + d, z + h],
    [x, y + d, z + h],
  ];
  const left: P3[] = [
    [x, y + d, z + h],
    [x + w, y + d, z + h],
    [x + w, y + d, z],
    [x, y + d, z],
  ];
  const right: P3[] = [
    [x + w, y, z + h],
    [x + w, y + d, z + h],
    [x + w, y + d, z],
    [x + w, y, z],
  ];
  return { top, left, right };
}

// mulberry32 — same seed, same sequence on server and client.
export function createRng(seed: number) {
  let a = seed | 0;
  return function rng() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
