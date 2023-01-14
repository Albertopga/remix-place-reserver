/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        warning: '#ff0000',
        primary: '#009ade',
        secondary: '#bce4f6',
        serbatic: {
          100: '#e2f3fb',
          200: '#bce4f6',
          300: '#9cd8f2',
          400: '#4bb8e8',
          500: '#009ade',
          600: '#007cba',
          700: '#01649d',
          800: '#014c80',
          900: '#013463'
        }
      }
    }
  },
  plugins: []
}
