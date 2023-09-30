import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'accent-blue': 'var(--color-accent-blue)',
        'accent-gold': 'var(--color-accent-gold)',
        text: 'var(--color-text)',
      },
      fontFamily: {
        rubik: ['var(--font-rubik)'],
        inter: ['var(--font-inter)'],
        gluten: 'Gluten',
        marker: 'var(--font-permanent-marker)',
        kanit: 'var(--font-kanit)',
      },
      keyframes: {
        'bounce-y': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(20px)',
          },
        },
        opacity: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        translateX: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        translateY: {
          '0%': {
            transform: 'translateY(120%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        _translateY: {
          '0%': {
            transform: 'translateY(240%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'bounce-y': 'bounce-y 2s infinite ease-in-out',
        opacity: 'opacity 1s ease-in-out',
        'translate-x': 'translateX 1s ease-in-out',
        'translate-y': 'translateY 0.6s ease-in-out',
        'translate-y-late': '_translateY 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
