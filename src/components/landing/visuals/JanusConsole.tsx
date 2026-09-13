import {
  BookOpen,
  Bot,
  Boxes,
  Cpu,
  FlaskConical,
  Rocket,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { janus } from "@/content/site";

const ICONS: Record<string, LucideIcon> = {
  Systems: Boxes,
  Models: Cpu,
  Knowledge: BookOpen,
  Agents: Bot,
  Workflows: Workflow,
  Evaluation: FlaskConical,
  Security: ShieldCheck,
  Deploy: Rocket,
};

function Node({
  x,
  y,
  label,
  w = 78,
  tone = "default",
}: {
  x: number;
  y: number;
  label: string;
  w?: number;
  tone?: "default" | "hot" | "ghost";
}) {
  const h = tone === "ghost" ? 24 : 30;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx="4"
        fill={tone === "hot" ? "var(--iso-core)" : "var(--iso-top)"}
        stroke={tone === "hot" ? "var(--iso-accent)" : "var(--iso-edge)"}
        strokeDasharray={tone === "ghost" ? "3 3" : undefined}
      />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={tone === "ghost" ? 8.5 : 9.5}
        letterSpacing="0.8"
        fill={tone === "ghost" ? "var(--technical-gray)" : "var(--paper)"}
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function JanusGraph({ className = "" }: { className?: string }) {
  const y = 112;
  const xs = [48, 144, 240, 336, 432];
  const main = `M${xs[0]} ${y} L${xs[4]} ${y}`;
  return (
    <svg
      viewBox="0 0 480 224"
      className={className}
      role="img"
      aria-label="Concept system graph: Documents to RAG to Agent to Tools to Action, with a model and memory attached to the agent and a policy check on tools."
    >
      <path d={main} stroke="var(--iso-edge)" />
      <path d="M240 46 L240 97" stroke="var(--iso-edge)" strokeDasharray="3 3" />
      <path d="M240 127 L240 178" stroke="var(--iso-edge)" strokeDasharray="3 3" />
      <path
        d="M336 127 L336 178"
        stroke="var(--iso-accent)"
        strokeOpacity="0.6"
        strokeDasharray="3 3"
      />
      <circle r="3" fill="var(--iso-accent)" className="anim-signal">
        <animateMotion dur="3.6s" repeatCount="indefinite" path={main} />
      </circle>
      {xs.map((x, i) => (
        <Node
          key={x}
          x={x}
          y={y}
          label={janus.graph[i]}
          tone={i === 2 || i === 4 ? "hot" : "default"}
        />
      ))}
      <Node x={240} y={34} label="Model" tone="ghost" w={70} />
      <Node x={240} y={190} label="Memory" tone="ghost" w={70} />
      <Node x={336} y={190} label="Policy" tone="ghost" w={70} />
    </svg>
  );
}

/**
 * Janus UI concept — "an engineering workspace, not a generic SaaS
 * dashboard" (V2 brief §08). Every metric is an em dash on purpose: this is
 * a concept, not a product screenshot, and shows no invented numbers.
 */
export function JanusConsole({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`on-dark @container overflow-hidden rounded-[10px] border border-hairline bg-night shadow-[var(--shadow-3)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-[var(--border-dark)]" />
          ))}
        </div>
        <p className="truncate font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
          janus / systems / customer-agent
        </p>
        <span className="ml-auto shrink-0 rounded-full border border-hairline px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
          Concept
        </span>
      </div>

      {/* Layout follows the console's own width (container queries), so it
          reads the same in the homepage's half column and full-width on /janus. */}
      <div className="grid @2xl:grid-cols-[150px_minmax(0,1fr)] @5xl:grid-cols-[150px_minmax(0,1fr)_190px]">
        <nav
          aria-label="Janus workspace (concept)"
          className="hidden border-r border-hairline p-3 @2xl:block"
        >
          <p className="eyebrow px-2 pb-2 text-[9px]">Workspace</p>
          <ul className="space-y-0.5">
            {janus.workspace.map((item, i) => {
              const Icon = ICONS[item] ?? Boxes;
              return (
                <li
                  key={item}
                  className={`flex items-center gap-2 rounded-[var(--radius)] px-2 py-1.5 text-[12px] ${i === 0 ? "bg-surface-2 text-foreground" : "text-muted-foreground"}`}
                >
                  <Icon className={`size-3.5 ${i === 0 ? "text-orange" : ""}`} strokeWidth={1.6} />
                  {item}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0 p-4 @5xl:border-r @5xl:border-hairline">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">
              Customer Agent
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] text-foreground uppercase">
              <span className="live-dot size-1.5 rounded-full bg-orange-bright" />
              Active
            </span>
          </div>
          <div className="mt-3 flex gap-5 border-b border-hairline text-[11px]" aria-hidden="true">
            {["Graph", "Traces", "Evaluation", "Security"].map((t, i) => (
              <span
                key={t}
                className={`-mb-px pb-2 ${i === 0 ? "border-b border-orange-bright text-foreground" : "text-muted-foreground"}`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 overflow-x-auto">
            <JanusGraph className="w-full min-w-[420px]" />
          </div>
          <p className="mt-2 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
            Documents → RAG → Agent → Tools → Action · live node graph
          </p>
        </div>

        <aside className="border-t border-hairline p-4 @2xl:col-span-2 @5xl:col-span-1 @5xl:border-t-0">
          <p className="eyebrow text-[9px]">Inspector</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-[11px] uppercase @xl:grid-cols-4 @5xl:grid-cols-1">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="flex items-center gap-1.5 text-foreground">
                <span className="size-1.5 rounded-full bg-orange-bright" />
                Active
              </dd>
            </div>
            {janus.inspector.map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between gap-3 @5xl:border-t @5xl:border-hairline @5xl:pt-2.5"
              >
                <dt className="text-muted-foreground">{k}</dt>
                <dd className={v === "Active" ? "text-amber-accent" : "text-foreground"}>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </figure>
  );
}
