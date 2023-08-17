/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        in: {
          "0%": { transform: "translateY(18px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        in: "in .6s both",
      },
      fontFamily: {
    'iowan': ["Iowan Old Style","Iowan","Georgia", "serif"],
    // 'calibre': ["CalibreWeb-Regular", "sans-serif"]
  },
  fontSize: {
    '10xl': ['12rem', { lineHeight: '1' }],
  },
  letterSpacing: {
    extra: '0.5em',
  },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};