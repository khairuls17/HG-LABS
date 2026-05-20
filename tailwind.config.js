/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './features/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          900: '#0b0c0f',
          800: '#0f1114',
        },
        accent: {
          1: '#6ee7b7',
          2: '#7c5cff',
          3: '#00d1ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(110, 231, 183, 0.12)',
      },
    },
  },
  plugins: [],
}
