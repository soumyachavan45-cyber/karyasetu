/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        skybrand: {
          50: "#F0F7FF",
          100: "#E0EFFE",
          200: "#BAE0FD",
          300: "#7DC4FC",
          400: "#4A90E2",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#003366",
        },
        worker: {
          light: "#E8F8F0",
          DEFAULT: "#2ECC71",
          dark: "#16A34A",
          hover: "#15803D",
        },
        consumer: {
          light: "#EEF4FF",
          DEFAULT: "#4A90E2",
          dark: "#2563EB",
          hover: "#1D4ED8",
        },
        saffron: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        devanagari: ["'Noto Sans Devanagari'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
        "glass-hover": "0 14px 40px 0 rgba(31, 38, 135, 0.14)",
        glossy: "inset 0 1px 0 0 rgba(255, 255, 255, 0.6), 0 4px 14px 0 rgba(37, 99, 235, 0.3)",
        "glossy-green": "inset 0 1px 0 0 rgba(255, 255, 255, 0.6), 0 4px 14px 0 rgba(16, 185, 129, 0.35)",
        "card-soft": "0 2px 12px -2px rgba(0, 0, 0, 0.05), 0 4px 20px -2px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
