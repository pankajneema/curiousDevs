import { boxFaces, poly } from "./iso";

/** A solid isometric box using the theme-aware --iso-* surface tokens. */
export function IsoBox({
  x,
  y,
  z,
  w,
  d,
  h,
  s,
  ox,
  oy,
  accent = false,
  dashed = false,
  hollow = false,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  s: number;
  ox: number;
  oy: number;
  accent?: boolean;
  dashed?: boolean;
  hollow?: boolean;
}) {
  const f = boxFaces(x, y, z, w, d, h);
  const edge = accent ? "var(--iso-accent)" : "var(--iso-edge)";
  const common = {
    stroke: edge,
    strokeWidth: 1,
    strokeLinejoin: "round" as const,
    strokeDasharray: dashed ? "3 3" : undefined,
  };
  return (
    <g>
      <polygon
        points={poly(f.left, s, ox, oy)}
        fill={hollow ? "none" : "var(--iso-left)"}
        {...common}
      />
      <polygon
        points={poly(f.right, s, ox, oy)}
        fill={hollow ? "none" : "var(--iso-right)"}
        {...common}
      />
      <polygon
        points={poly(f.top, s, ox, oy)}
        fill={hollow ? "none" : "var(--iso-top)"}
        {...common}
      />
    </g>
  );
}

/** An isometric cylinder standing on the plane z (circle of radius r). */
export function IsoCylinder({
  cx,
  cy,
  z,
  r,
  h,
  s,
  ox,
  oy,
  accentTop = false,
}: {
  cx: number;
  cy: number;
  z: number;
  r: number;
  h: number;
  s: number;
  ox: number;
  oy: number;
  accentTop?: boolean;
}) {
  // Iso circle -> ellipse with semi-axes r·s·√2·cos30 and r·s·√2·0.5.
  const rx = r * s * Math.SQRT2 * Math.cos(Math.PI / 6);
  const ry = r * s * Math.SQRT2 * 0.5;
  const sx = ox + (cx - cy) * Math.cos(Math.PI / 6) * s;
  const syBase = oy + (cx + cy) * 0.5 * s - z * s;
  const syTop = syBase - h * s;
  return (
    <g>
      <path
        d={`M ${sx - rx} ${syTop} L ${sx - rx} ${syBase} A ${rx} ${ry} 0 0 0 ${sx + rx} ${syBase} L ${sx + rx} ${syTop} Z`}
        fill="var(--iso-left)"
        stroke="var(--iso-edge)"
        strokeWidth="1"
      />
      <ellipse
        cx={sx}
        cy={syTop}
        rx={rx}
        ry={ry}
        fill="var(--iso-top)"
        stroke={accentTop ? "var(--iso-accent)" : "var(--iso-edge)"}
        strokeWidth="1"
      />
    </g>
  );
}
