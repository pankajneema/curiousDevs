export function CyberSentinelLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E3A5F" />
        </linearGradient>
      </defs>
      
      {/* Shield shape */}
      <path
        d="M 50 5 L 90 20 L 90 50 C 90 75 50 95 50 95 C 50 95 10 75 10 50 L 10 20 Z"
        fill="url(#shieldGradient)"
        stroke="#0EA5E9"
        strokeWidth="2"
      />
      
      {/* Inner shield darker half */}
      <path
        d="M 50 5 L 50 95 C 50 95 10 75 10 50 L 10 20 Z"
        fill="#1E3A8A"
        opacity="0.4"
      />
      
      {/* Eye shape container */}
      <ellipse
        cx="50"
        cy="50"
        rx="28"
        ry="18"
        fill="#0F172A"
        opacity="0.8"
      />
      
      {/* Eye outline */}
      <ellipse
        cx="50"
        cy="50"
        rx="28"
        ry="18"
        fill="none"
        stroke="#06B6D4"
        strokeWidth="2"
      />
      
      {/* Iris */}
      <circle cx="50" cy="50" r="12" fill="#1E40AF" />
      
      {/* Pupil */}
      <circle cx="50" cy="50" r="6" fill="#0F172A" />
      
      {/* Eye highlight */}
      <circle cx="46" cy="46" r="3" fill="#60A5FA" opacity="0.8" />
      
      {/* Iris ring detail */}
      <circle cx="50" cy="50" r="10" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
