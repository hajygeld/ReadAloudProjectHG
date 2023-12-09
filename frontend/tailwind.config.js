/* eslint no-undef: 0 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      papyrus: {
        100: "var(--papyrus-100)",
        200: "var(--papyrus-200)",
        300: "var(--papyrus-300)",
      },
      brown: {
        700: "var(--brown-700)",
        800: "var(--brown-800)",
        900: "var(--brown-900)",
      },
      transparent: "rgba(0, 0, 0, 0)",
    },
    screens: {
      mdmax: { max: "767px" },
      mdmin: { min: "768px" },
    },
    extend: {},
  },
  plugins: [],
};
