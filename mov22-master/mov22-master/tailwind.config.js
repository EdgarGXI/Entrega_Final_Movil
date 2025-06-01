/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.{js,jsx,ts,tsx}", 
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/navigation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        semistrong: ['Nunito_700Bold'],   // Default font
        strong: ['Nunito_900Black'],    // Bold variant
        semibold: ['Nunito_700Bold'],
        bold: ['Nunito_900Black'],
      },
    },
  },
  plugins: [],
}

