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
        xs: '320px',
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
      },
      animation: {
        'bounce-y': 'bounce-y 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
