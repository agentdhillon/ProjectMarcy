import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — feel free to customise
        marcy: {
          50: "#f0f4ff",
          100: "#dce6ff",
          500: "#4f6ef7",
          600: "#3b56e8",
          900: "#1a1f3c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
