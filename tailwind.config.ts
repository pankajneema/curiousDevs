import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── New CuriosDevs (dark, security) palette ──
        ink:     '#07090E',
        'ink-2': '#0B0E15',
        'ink-3': '#10141D',
        'ink-4': '#161B26',
        brd:     '#1B2230',
        'brd-2': '#28303F',
        tx:      '#EEF1F7',
        muted:   '#98A0B0',
        faint:   '#616A7C',
        accent:  '#38BDF8',
        'accent-2': '#7C8BFF',
        'accent-deep': '#2E9BD8',
        p1: '#38BDF8',   // AgentGuard
        p2: '#34E39B',   // CurioComply
        p3: '#FFB020',   // AeroOS
        // ── Legacy tokens kept so any leftover page still compiles ──
        midnight: '#1A1A2E',
        coral:    '#E8533A',
        teal:     '#00C48C',
        surface:    '#F9F8F5',
        'surface-2': '#F1EFE9',
        sub:        '#6B6B8A',
        border:   '#E8E6E0',
      },
      fontFamily: {
        head: ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)',   'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)',    'monospace'],
      },
      maxWidth: { content: '1160px' },
      animation: {
        'fade-in':  'fadeIn .4s ease-out forwards',
        'slide-up': 'slideUp .5s ease-out forwards',
        'drift1':   'drift1 22s ease-in-out infinite',
        'drift2':   'drift2 26s ease-in-out infinite',
        'drift3':   'drift3 30s ease-in-out infinite',
        'blink':    'blink 1.8s infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        drift1:  { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(80px,60px) scale(1.12)' } },
        drift2:  { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(-70px,50px) scale(1.08)' } },
        drift3:  { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(50px,-60px) scale(1.14)' } },
        blink:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
      },
    },
  },
  plugins: [],
}

export default config
