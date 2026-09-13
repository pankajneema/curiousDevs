/**
 * Small geometric line-icon set for the four technology domains — part of
 * the "new generation" visual pass (brief: use technical/geometric marks,
 * never a generic AI-brain or robot glyph). Stroke-only, single accent
 * colour via currentColor, so callers set colour with a text-* class.
 */
type IconProps = { className?: string };

export function AiEngineeringIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="18" width="8" height="8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="12" y="10" width="8" height="8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="20" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 18 L16 14" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 10 L24 8" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
    </svg>
  );
}

export function IntelligentSystemsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="16" cy="7" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function RoboticsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M6 26 L14 18" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 18 L20 20 L26 8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="18" r="2" fill="currentColor" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
      <circle cx="6" cy="26" r="1.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="26" cy="8" r="1.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function DeepTechIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 3 L27 9.5 V22.5 L16 29 L5 22.5 V9.5 Z" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M16 3 V29 M5 9.5 L27 22.5 M27 9.5 L5 22.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}
