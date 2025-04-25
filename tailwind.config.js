/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        // Primary palette
        primary: {
          50: '#f0f6ff',
          100: '#e0ebfe',
          200: '#bfd5fd',
          300: '#8eb4fb',
          400: '#598df7',
          500: '#3b6ef2',
          600: '#2653e6',
          700: '#2042d3',
          800: '#2038ab',
          900: '#203486',
          950: '#182152',
        },
        // Custom gradients for weather states
        weather: {
          clear: {
            from: '#1e40af',
            to: '#7e22ce',
          },
          cloudy: {
            from: '#1e293b',
            to: '#334155',
          },
          rainy: {
            from: '#0f172a',
            to: '#1e3a8a',
          },
          storm: {
            from: '#0f172a',
            to: '#312e81',
          },
          snow: {
            from: '#1e293b',
            to: '#0f172a',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};