/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Roboto"', '"Oxygen"', '"Ubuntu"', '"Cantarell"', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', 'sans-serif']
      }
    }
  },
  plugins: []
}
