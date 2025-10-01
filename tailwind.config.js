/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Cairo"', "sans-serif"],
      mono: ['"Space Mono"', "monospace"],
      heading: ["Rajdhani", "sans-serif"],
    },
    extend: {
      borderRadius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      colors: {
        primary: {
          50: "oklch(0.984 0.014 180.72)",
          100: "oklch(0.953 0.051 180.801)",
          200: "oklch(0.91 0.096 180.426)",
          300: "oklch(0.855 0.138 181.071)",
          400: "oklch(0.777 0.152 181.912)",
          500: "oklch(0.704 0.14 182.503)",
          600: "oklch(0.6 0.118 184.704)",
          700: "oklch(0.511 0.096 186.391)",
          800: "oklch(0.437 0.078 188.216)",
          900: "oklch(0.386 0.063 188.416)",
          950: "oklch(0.277 0.046 192.524)",
        },
      },
    },
  },
  plugins: [],
};
