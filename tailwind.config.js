/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      offWhite: "#ebe6de",
      lightGreyBlue: "#7d8c92",
      darkBlue: "#1c293c",
      white: "#fff"
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "4rem",
        lg: "10rem",
        xl: "18rem",
        '2xl': "18rem",
      }
    },
    extend: {
    },
  },
  daisyui: {
    themes: ["corporate"]
  },
  plugins: [
    require("daisyui")
  ],
}
