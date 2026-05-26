/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f172a',
          sub: '#0a1628',
          border: '#1e3a5f',
        },
      },
    },
  },
  plugins: [],
};
