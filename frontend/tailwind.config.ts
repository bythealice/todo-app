import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7c3aed", // violet-600
          dark: "#6d28d9",    // violet-700
          light: "#a78bfa",   // violet-400
        },
        secondary: "#ec4899",  // pink-500
        accent: "#8b5cf6",     // purple-500
      },
    },
  },
  plugins: [],
};

export default config;
