/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        background: "#FAFAFA",
        black: "#000000",
        lightGreen: "#25D366",
        darkGreen: "#075E54",
        lightGold: "#FFD700",
        darkGold: "#CCAC00",
        lightGray: "#F9F9F9",
      },
      fontFamily: {
        titles: ["Old Standard TT", "serif"],
        playFair: ["Playfair Display", "serif"],
        navBarTexts: ["Cormorant Garamond", "serif"],
      },
    },
  },

};
