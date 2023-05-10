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
            DEFAULT: "#9a44ff",
          },
          text: {
            DEFAULT: "#ffffff",
          },
          cloralex: {
            DEFAULT: "#09fea9",
          },
          middark: {
            DEFAULT: "#231f27",
          },
        },
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
