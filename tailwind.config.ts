import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Instrument Serif'", "'Source Han Serif SC'", "Georgia", "serif"],
        body:    ["'Inter'", "'Source Han Sans SC'", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          50: "#fafaf8", 100: "#eeeeea", 200: "#d4d4cf",
          400: "#76766f", 500: "#54544e", 600: "#363632",
          800: "#1a1a17", 900: "#0e0e0c", 950: "#050504",
        },
      },
      animation: {
        "drift":     "drift 22s ease-in-out infinite",
        "halo":      "halo 6s ease-in-out infinite",
        "ticker":    "ticker 28s linear infinite",
      },
      keyframes: {
        drift: { "0%,100%": { transform: "translate3d(0,0,0)" }, "50%": { transform: "translate3d(20px,-30px,0)" } },
        halo:  { "0%,100%": { opacity: "0.45" }, "50%": { opacity: "0.85" } },
        ticker:{ "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
    },
  },
  plugins: [],
};
export default config;
