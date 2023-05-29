/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#303042",
        back: "#1B1B24",
        secondary: "#6D6D8F",
        card: "#2A2A38",
        bright: "#bdbdcd",
        white: "white",
        green: "#43E5AB",
        transparent: "transparent",
        tomato: "tomato",
        indigo: "#5b6af3",
        indigoBright: "#543ae3",
        indigoDark: "#322b6c",
        cyan: "#55efff",
      },
    },
  },
  plugins: [],
};
