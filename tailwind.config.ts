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
        primary: '#67c',
        success: '#63e2b7',
        warning: '#f2c97d',
        danger: '#e88080',
        info: '#70c0e8'
      },
    },
  },
  plugins: [],
} satisfies Config;
