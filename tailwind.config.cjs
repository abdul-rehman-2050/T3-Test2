/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
     
      {
        mytheme: {
          primary: "#e3ed7d",
          secondary: "#edbb1a",
          accent: "#c5d611",
          neutral: "#1A1A29",
          "base-100": "#373958",
          info: "#A9E3EF",
          success: "#1DB498",
          warning: "#EFA743",
          error: "#F76E90",
        },
      },

      "forest",
      "light",
      "dark",

      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "aqua",
      "lofi",

      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
  plugins: [require("daisyui")],
};
