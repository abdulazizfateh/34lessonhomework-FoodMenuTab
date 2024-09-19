/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container:{
        padding: "52px",
        center: true,
        screens:{
          lg: "1300px"
        }
      },
    },
  },
  plugins: [],
}

