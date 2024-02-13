import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "neon-glow": {
          from: {
            "text-shadow":
              "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #F6C90E, 0 0 20px #F6C90E, 0 0 25px #F6C90E, 0 0 30px #F6C90E, 0 0 35px #F6C90E",
          },
          to: {
            "text-shadow":
              "0 0 8px #fff, 0 0 15px #fff, 0 0 23px #F6C90E, 0 0 30px #F6C90E, 0 0 40px #F6C90E, 0 0 45px #F6C90E, 0 0 53px #F6C90E",
          },
        },
      },
      animation: {
        "neon-glow": "neon-glow 1.5s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
