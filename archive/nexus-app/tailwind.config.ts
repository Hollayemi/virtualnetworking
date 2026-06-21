import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary:   '#4F6EF7',
          secondary: '#7C3AED',
          accent:    '#06B6D4',
          purple:    '#A855F7',
        },
        bg: {
          base:    '#080E1F',
          surface: '#0D1530',
          subtle:  '#0F1728',
        },
      },
      backgroundImage: {
        'gradient-brand':  'linear-gradient(135deg, #4F6EF7 0%, #7C3AED 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #4F6EF7 0%, #7C3AED 50%, #06B6D4 100%)',
        'gradient-text':   'linear-gradient(135deg, #6B87FF 0%, #A855F7 60%, #06B6D4 100%)',
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '28px',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'marquee':    'marquee 30s linear infinite',
        'spin-slow':  'spin-slow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(79,110,247,0.25), 0 0 80px rgba(79,110,247,0.08)',
        'glow-accent':  '0 0 30px rgba(6,182,212,0.2)',
        'card':         '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset',
      },
    },
  },
  plugins: [],
}

export default config
