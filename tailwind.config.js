module.exports = {
  content: [
    './app/**/*.{vue,js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        teal: {
          950: '#052a2a',
          900: '#083534',
          800: '#0d5050',
          700: '#0d6b6b',
          600: '#1a8a8a',
          400: '#4db6b6',
          100: '#e0f2f2',
          50:  '#f0f9f9',
        },
        amber: {
          700: '#b45309',
          600: '#d97706',
          100: '#fef3c7',
          50:  '#fffbeb',
        },
      },
    },
  },
  plugins: [],
}
