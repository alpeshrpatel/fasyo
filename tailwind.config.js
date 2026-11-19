/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: '#526b59',
        paper: '#f6f5ef',
      },
    },
  },
  plugins: [],
};