/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "z-white": "#FFFFFF",
        "z-gray": "#5A5A5A",
        "z-black": "#121212",
        "z-light-black": "#202020",
        "z-green": "#66DF48",
        "z-red": "#FF4545",
        "z-neon": "#CFFF50",
      },
    },
  },
  plugins: [],
};
