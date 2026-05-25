/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.4)',
        'neon-blue': '0 0 15px rgba(59, 130, 246, 0.4)',
        'neon-emerald': '0 0 15px rgba(16, 185, 129, 0.4)',
        'neon-amber': '0 0 15px rgba(245, 158, 11, 0.4)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}