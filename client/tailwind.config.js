/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        bar1: {
          '0%, 100%': { height: '30%' },
          '50%': { height: '100%' },
        },
        bar2: {
          '0%, 100%': { height: '50%' },
          '50%': { height: '80%' },
        },
        bar3: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '90%' },
        },
      },
      animation: {
        bar1: 'bar1 1s ease-in-out infinite',
        bar2: 'bar2 1s ease-in-out infinite',
        bar3: 'bar3 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
