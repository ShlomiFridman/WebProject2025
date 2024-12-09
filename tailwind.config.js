/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'light_BgColor' : 'antiquewhite',
        'dark_BgColor' : "#2f4f4f"
      }
    },
  },
  plugins: [],
}

