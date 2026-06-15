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
      maxWidth: { content: '1280px' },
      animation: {
        'fade-in':  'fadeIn .4s ease-out forwards',
        'slide-up': 'slideUp .5s ease-out forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

export default config
