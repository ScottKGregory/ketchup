/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Tajawal"', "sans-serif"],
      mono: ['"Space Mono"', "monospace"],
      heading: ["Rajdhani", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
