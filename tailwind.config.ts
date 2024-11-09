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
        "dark-red": "#DE283B",
        "light-pink": "#FFCCC4",
        "dark-blue": "#0F1C2E",
        "midnight-blue": "#1F2B3E",
        "light-blue": "#374357",
        silver: "#ACACAC",
        "lime-green": "#1AA428",
        "light-silver": "#E1E1E1",
        "dark-purple": "#8D28AD",
        "light-purple": "#EEDFF3",
        white: "#fff",
        "light-light-silver": "#F0F0F0",
        "light-ligth-purple": "#FCF8FD",
        "dark-dark-purple": "#5C067C",
        "darkest-purple": "#310043",
        purple: "#C50EFF",
        red: "#FF6366",
      },

      fontFamily: {
        shabnam: ["Shabnam", "sans-serif"],
        sahel: ["Sahel", "sans-serif"],
      },
      backgroundImage: {
        book_404: "./images/book_404.svg",
      },
    },
  },
  plugins: [],
};
export default config;
