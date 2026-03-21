/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        sidebar: {
          bg: '#1e3448',
          active: '#4CAF82',
          text: '#8fa8bc',
          hover: '#26405a',
        },
        primary: {
          50:  '#f0faf5',
          100: '#d6f2e3',
          200: '#aee4c8',
          300: '#77ceaa',
          400: '#4CAF82',
          500: '#4CAF82',
          600: '#3d9670',
          700: '#2f7558',
        },
        kpi: {
          green: '#4CAF82',
          orange: '#E8846A',
          teal: '#5BB8AE',
        },
        page: '#F9F6EA',
        content: '#ffffff',
      }
    },
  },
  plugins: [],
}
