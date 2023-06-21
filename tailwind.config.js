/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      lightGreyBlue: "#7d8c92",
      darkBlue: "#1c293c",
      white: "#fff"
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "4rem",
        lg: "6rem",
        xl: "10rem",
        '2xl': "10rem",
      }
    },
    extend: {
    },
  },
  daisyui: {
    themes: ["cupcake"]
  },
  plugins: [
    require("daisyui")
  ],
}
