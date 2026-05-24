import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F7FA",
        olive: "#4A5240",
        navy: "#E8EEF8",
        accent: "#2563EB",
        "accent-hover": "#1D4ED8",
        surface: "#FFFFFF",
        "surface-raised": "#F0F4F9",
        border: "#D1DAE8",
        "border-subtle": "#E5EBF5",
        muted: "#64748B",
        foreground: "#0D1117",
        brass: "#8B6A3E",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        display: ["Syne", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
