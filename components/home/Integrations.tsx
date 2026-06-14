
/* All brand icons are inline SVG paths — no external deps */
const integrations = [
  {
    name: 'OpenAI',
    bg: '#000',
    svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M22.28 9.75a5.87 5.87 0 0 0-.5-4.82 6.1 6.1 0 0 0-6.57-2.92A5.85 5.85 0 0 0 10.8.26 6.1 6.1 0 0 0 4.97 3.9a5.87 5.87 0 0 0-3.93 2.85 6.1 6.1 0 0 0 .75 7.13 5.87 5.87 0 0 0 .5 4.82 6.1 6.1 0 0 0 6.57 2.92 5.85 5.85 0 0 0 4.41 1.75 6.1 6.1 0 0 0 5.83-3.63 5.87 5.87 0 0 0 3.93-2.85 6.1 6.1 0 0 0-.75-7.13z"/></svg>,
  },
  {
    name: 'Anthropic',
    bg: '#CC785C',
    svg: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="white">
        <path d="M28.07 7.2h-8.33L8 40.8h8.5l2.3-6.7h10.44l2.3 6.7H40L28.07 7.2zm-6.96 20.1 3.53-10.3h.02l3.53 10.3h-7.08z"/>
      </svg>
    ),
  },
  {
    name: 'AWS Bedrock',
    bg: '#232F3E',
    svg: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" fill="#FF9900"/>
        <path d="M24 4v30M4 14l20 10 20-10" stroke="#232F3E" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'LangChain',
    bg: '#1C3C3C',
    svg: (
      <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
        <circle cx="12" cy="20" r="6" stroke="#00D4AA" strokeWidth="2.5"/>
        <circle cx="28" cy="20" r="6" stroke="#00D4AA" strokeWidth="2.5"/>
        <path d="M18 20h4" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'LlamaIndex',
    bg: '#6929C4',
    svg: (
      <svg width="20" height="20" viewBox="0 0 40 40" fill="white">
        <ellipse cx="20" cy="22" rx="10" ry="12" fill="white" opacity="0.9"/>
        <circle cx="16" cy="18" r="2" fill="#6929C4"/>
        <circle cx="24" cy="18" r="2" fill="#6929C4"/>
        <path d="M14 28 C14 34 26 34 26 28" stroke="#6929C4" strokeWidth="1.5" fill="none"/>
        <path d="M10 14 L14 10 M30 14 L26 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Mistral AI',
    bg: '#FF7000',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
        <rect x="2" y="2" width="8" height="8" rx="1"/>
        <rect x="12" y="2" width="8" height="8" rx="1"/>
        <rect x="22" y="2" width="8" height="8" rx="1"/>
        <rect x="2" y="12" width="8" height="8" rx="1"/>
        <rect x="22" y="12" width="8" height="8" rx="1"/>
        <rect x="2" y="22" width="8" height="8" rx="1"/>
        <rect x="12" y="22" width="8" height="8" rx="1"/>
        <rect x="22" y="22" width="8" height="8" rx="1"/>
      </svg>
    ),
  },
  {
    name: 'ClickHouse',
    bg: '#FFCC00',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="#1A1A2E">
        <rect x="2" y="2" width="5" height="28" rx="1.5"/>
        <rect x="9" y="2" width="5" height="28" rx="1.5"/>
        <rect x="16" y="2" width="5" height="28" rx="1.5"/>
        <rect x="23" y="9" width="5" height="14" rx="1.5"/>
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    bg: '#336791',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="8" rx="10" ry="5" stroke="white" strokeWidth="1.5"/>
        <path d="M6 8v12c0 2.76 4.48 5 10 5s10-2.24 10-5V8" stroke="white" strokeWidth="1.5"/>
        <path d="M6 14c0 2.76 4.48 5 10 5s10-2.24 10-5" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Grafana',
    bg: '#1A1A1A',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke="#F46800" strokeWidth="2"/>
        <path d="M8 22 L12 16 L16 18 L20 11 L24 14" stroke="#F46800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    bg: '#161B22',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
      </svg>
    ),
  },
  {
    name: 'Slack',
    bg: '#4A154B',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
      </svg>
    ),
  },
  {
    name: 'Groq',
    bg: '#F55036',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
        <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 22a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/>
        <circle cx="16" cy="16" r="4" fill="white"/>
      </svg>
    ),
  },
]

export default function Integrations() {
  return (
    <section className="py-24 bg-white" id="integrations">
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-sub uppercase tracking-widest mb-3">Integrations</p>
          <h2 className="font-head font-bold text-4xl lg:text-5xl text-midnight">
            Works with the AI stack<br/>
            <span className="text-coral">you&apos;re already running.</span>
          </h2>
          <p className="mt-4 text-sub max-w-xl mx-auto text-lg">
            One SDK. Zero rip-and-replace. TokenFin wraps your existing providers — instrument in minutes, not months.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
          {integrations.map(i => (
            <div key={i.name}
              className="bg-surface rounded-2xl border border-border p-4 flex flex-col items-center gap-3
                         hover:shadow-lg hover:-translate-y-1 hover:border-midnight/20 transition-all duration-200 cursor-default group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
                style={{ background: i.bg }}>
                {i.svg}
              </div>
              <span className="font-mono text-[9px] text-sub uppercase tracking-wider text-center leading-tight">{i.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center font-mono text-xs text-sub mt-8 tracking-wider">
          + HuggingFace, Cohere, Azure OpenAI, Vertex AI — and more added every sprint
        </p>
      </div>
    </section>
  )
}
