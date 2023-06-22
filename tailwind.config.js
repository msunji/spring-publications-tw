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
        DEFAULT: "1.8rem",
        sm: "2rem",
        md: "2rem",
        lg: "2rem"
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
