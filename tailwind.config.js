module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textStroke: {
        1: "1px black",
        2: "5px black",
      },
      fontFamily: {
        "jacquard-12": ['"Jacquard 12"', "system-ui"],
        grenze: ["Grenze", "serif"],
      },
      textShadow: {
        glow: "0 0 8px rgba(255, 255, 255, 0.8)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%": {
            textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
          },
          "50%": {
            textShadow: "0 0 16px rgba(255, 255, 255, 1)",
          },
          "100%": {
            textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-stroke-1": {
          "-webkit-text-stroke": "1px red",
          "paint-order": "stroke fill",
        },
        ".text-stroke-2": {
          "-webkit-text-stroke": "5px black",
          "paint-order": "stroke fill",
        },
        ".text-shadow": {
          textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
        },
        ".text-shadow-glow": {
          textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
