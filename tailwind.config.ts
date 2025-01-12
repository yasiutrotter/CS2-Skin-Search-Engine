import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ciemny: {
          100: "#525252",
          200: "#373737",
          300: "#262626",
          400: "#171717",
          500: "#1A1A1A",
          600: "#000000"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
