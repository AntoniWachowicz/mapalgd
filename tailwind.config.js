/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'finance': '#4CAF50',
        'social': '#2196F3',
        'health': '#F44336',
      },
    },
  },
  plugins: [],
}