// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}","./public/index.html"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        background: "#0B0F19",
        foreground: "#F8FAFC",
        brand: {
          DEFAULT: "#15C6FF",
          50: "#E6F9FF",
          100: "#C8F2FF",
          200: "#99E7FF",
          300: "#6ADAFD",
          400: "#39CBFA",
          500: "#15C6FF",
          600: "#0EA6D4",
          700: "#0C86AA",
          800: "#0B6A88",
          900: "#08485D",
        },
        accent: { DEFAULT: "#B5FF3D" },
        muted: "#0F1524",
        card: "#0E1422",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.25)",
        glow: "0 0 30px rgba(21,198,255,.35)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
