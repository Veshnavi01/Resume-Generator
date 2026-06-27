/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 1px 1px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
}
