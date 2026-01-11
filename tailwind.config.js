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
        'brand': {
          'black': '#000000',
          'dark-red': '#3D0000',
          'red': '#FF0000',
        }
      },
    },
  },
  plugins: [],
}
