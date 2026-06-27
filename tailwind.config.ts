import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "var(--font-poppins)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        accent: {
          orange: "var(--accent-orange)",
          blue: "var(--accent-blue)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        soft: "var(--shadow-sm)",
        medium: "var(--shadow-md)",
        strong: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ve-hub-breathe": {
          "0%, 100%": { opacity: "0.18" },
          "50%": { opacity: "0.24" },
        },
        "ve-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out forwards",
        "fade-in-up": "fade-in-up 0.9s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        scroll: "scroll 40s linear infinite",
        shimmer: "shimmer 8s linear infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "ve-hub-breathe": "ve-hub-breathe 6s ease-in-out infinite",
        "ve-float": "ve-float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
