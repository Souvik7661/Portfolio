/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        dark: {
          900: '#0A0A0A',
          800: '#111111',
          700: '#171717',
          600: '#222222',
        },
        light: {
          50: '#FFFFFF',
          100: '#F7F7F5',
          200: '#F1F1EE',
          300: '#FAFBF9',
          400: '#EAECE9',
        },
        accent: {
          DEFAULT: '#E8702A',
          hover: '#D2611F',
        },
        moss: {
          dark: '#1C2E1E',
          mid: '#4D6D47',
          light: '#738273',
          border: '#F1F3F1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
