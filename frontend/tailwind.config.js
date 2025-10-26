// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [ // Or 'purge' in older versions
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}