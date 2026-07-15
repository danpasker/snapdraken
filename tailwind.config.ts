import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F0E6D2",
        surface: "#E5D8BE",
        "paper-shadow": "#C9B896",
        ink: "#1A1613",
        "ink-muted": "#4A403A",
        ember: "#B04A1F",
        "ember-deep": "#6B2A10",
        "ember-glow": "#E8A25C",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Cinzel", "Trajan Pro", "serif"],
        body: ["var(--font-inter-tight)", "Inter Tight", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      maxWidth: {
        site: "1440px",
      },
      boxShadow: {
        paper: "0 18px 42px rgba(74,64,58,.18)",
        scorch: "0 8px 0 rgba(107,42,16,.35)",
      },
    },
  },
  plugins: [],
};

export default config;
