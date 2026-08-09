import { useEffect, useState } from "react";
import robotSvg from "./robot-original-style.svg?raw";

type MascotProps = {
  seated?: boolean;
};

export function Mascot({ seated = false }: MascotProps) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 220);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={`mascot-source ${seated ? "mascot-source-seated" : ""}`} aria-hidden="true">
      <span dangerouslySetInnerHTML={{ __html: robotSvg }} />
      <svg className="mascot-eye-overlay" viewBox="0 0 174 204" role="presentation">
        <g className="mascot-eye-blink">
          <path className="mascot-eye-mark" d={blink ? "M69 83h12" : "M69 83c3-6 9-6 12 0"} />
          <path className="mascot-eye-mark" d={blink ? "M93 83h12" : "M93 83c3-6 9-6 12 0"} />
        </g>
      </svg>
      {seated && (
        <svg className="mascot-computer" viewBox="0 0 174 204" role="presentation">
          <path className="mascot-computer-screen mascot-computer-outline" d="M88 91h72v49H88Z" />
          <path className="mascot-computer-glint" d="M95 98h57v3H95Z" />
          <path className="mascot-computer-mark" d="m117 108 10 8-10 8" />
          <path
            className="mascot-computer-base mascot-computer-outline"
            d="M80 140h83l-10 10H91Z"
          />
          <path className="mascot-computer-key" d="M103 144h37" />
        </svg>
      )}
    </span>
  );
}
