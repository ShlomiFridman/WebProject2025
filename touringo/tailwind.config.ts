import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // TODO add default dark and light colors
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        // TODO make it work
        screenWidthPercent: "40%"
      }
    },
  },
  plugins: [],
} satisfies Config;
