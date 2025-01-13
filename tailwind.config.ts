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
        'primary': { 
          50: '#fcfcff', 
          100: '#f5f4fd', 
          200: '#e8e6fb', 
          300: '#d7d2f8', 
          400: '#c0b8f4', 
          500: '#a599ef', 
          600: '#8475e9', 
          700: '#5e4ae3', 
          800: '#26168c', 
          900: '#120b44', 
          950: '#0c072c', 
        },
        'gray': { 
          50: '#fcfcfc', 
          100: '#f3f3f3', 
          200: '#e3e3e3', 
          300: '#cecece', 
          400: '#b2b2b2', 
          500: '#919191', 
          600: '#696969', 
          700: '#3b3b3b', 
          800: '#282828', 
          900: '#1d1d1d', 
          950: '#1a1a1a', 
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
