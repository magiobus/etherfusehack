module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        happy: {
          yellow: {
            DEFAULT: "#FF9000",
            50: "#FFE0B8",
            100: "#FFD7A3",
            200: "#FFC57A",
            300: "#FFB452",
            400: "#FFA229",
            500: "#FF9000",
            600: "#C77000",
            700: "#8F5100",
            800: "#573100",
            900: "#1F1100",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
