/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EF',
        espresso: '#12181F',
        ink: '#1C2530',
        parchment: '#E8E4DA',
        mist: '#8B95A1',
        chai: {
          50: '#FDFBF7',
          100: '#FAF3E8',
          200: '#F3E2CC',
          300: '#E9CA9F',
          400: '#DCAB72',
          500: '#C88B4A', // warm caramel core
          600: '#B4753A',
          700: '#965F2F',
          800: '#7A4C26',
          900: '#5E3A1D',
        },
        brew: {
          50: '#F2F6FA',
          100: '#E1ECF5',
          200: '#BBD5EC',
          300: '#8BB6DE',
          400: '#5A94D0',
          500: '#3568A8', // muted blue core
          600: '#2A5489',
          700: '#21416B',
          800: '#182F4D',
          900: '#101F33',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
