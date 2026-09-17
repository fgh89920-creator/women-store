import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-tajawal)", "sans-serif"],
      },
      colors: {
        "pink-blush": {
          50: "#fdf2f5",
          100: "#fce7ec",
          200: "#f9d0db",
          300: "#f4a9bb",
          400: "#ed7e98",
          500: "#e25a7d",
          600: "#cf3d65",
          700: "#ac3053",
          800: "#8b2b48",
          900: "#732640",
        },
        cream: {
          50: "#faf7f2",
          100: "#f5efe5",
          200: "#ede3d2",
          300: "#e1d1b6",
          400: "#cdb591",
          500: "#b6986c",
          600: "#9a7d54",
          700: "#7c6443",
          800: "#604c34",
          900: "#3f3122",
        },
      },
      borderRadius: {
        DEFAULT: "12px",
      },
      boxShadow: {
        soft: "0 4px 12px -2px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)",
        "soft-lg":
          "0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
}
export default config
