/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        backgroundAnimation: {
          "0%": { backgroundColor: "red" },
          "25%": { backgroundColor: "yellow" },
          "50%": { backgroundColor: "green" },
          "75%": { backgroundColor: "blue" },
          "100%": { backgroundColor: "red" },
        },
      },
      animation: {
        backgroundAnimation: "backgroundAnimation 4s linear infinite",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
