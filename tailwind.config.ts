import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "interV-font": ["InterV"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        home_page: "#1A1A1A",
        main_color: "#E1FADC",
        stone: "#004132",
        ton: "#C8FFC8",
        secondary_color: "#34C457",
      },
      colors: {
        home_page: "#1A1A1A",
        main_color: "#E1FADC",
        stone: "#004132",
        ton: "#C8FFC8",
        secondary_color: "#34C457",
      },
    },
    screens: {
      // DESKTOP 1280px - 1366px - 1920px
      // => @media (max-width: 1279px) { ... }
      // TABLET 768px - 834px - 1279px
      md: { max: "1279px" },

      // => @media (max-width: 767px) { ... }
      // MOBILE 320px - 430px - 767px
      sm: { max: "767px" },
    },
  },
  plugins: [],
}
export default config
