/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#4b6cb7', // Example color, replace with your specific color code
        customPurple: '#182848', // Example color, replace with your specific color code
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(39,42,82,1) 0%, rgba(79,63,98,1) 100%)', // Adjust the colors as needed
      },
    },
  },
  plugins: [],
}

