/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        "dark-gray": "#3D3B40",
        "dark-blue": "#525CEB",
        "light-blue": "#BFCFE7",
        "light-purple": "#F8EDFF",
      },
    },
  },
  plugins: [],
};
