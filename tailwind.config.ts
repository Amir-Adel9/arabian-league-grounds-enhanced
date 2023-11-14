/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        rubik: ['var(--font-rubik)'],
        inter: ['var(--font-inter)'],
        gluten: 'Gluten',
        marker: 'var(--font-permanent-marker)',
        kanit: 'var(--font-kanit)',
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'accent-blue': 'var(--color-accent-blue)',
        'accent-gold': 'var(--color-accent-gold)',
        text: 'var(--color-text)',
        _primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        _secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        xs: '400px',
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
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bounce-y': 'bounce-y 2s infinite ease-in-out',
        opacity: 'opacity 1s ease-in-out',
        'translate-x': 'translateX 1s ease-in-out',
        'translate-y': 'translateY 0.6s ease-in-out',
        'translate-y-late': '_translateY 1s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
