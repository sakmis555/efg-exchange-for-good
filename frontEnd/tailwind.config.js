/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        primary : "#222831",
        lightGray : "#393E46",
        whiteLike : "#EEEEEE",
        secondary : "#00ADB5"
      }
    },
  },
  plugins: [],
  corePlugins : {
    preflight : false,
  }, 
}