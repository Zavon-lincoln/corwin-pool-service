/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#004E98',
          'blue-dark': '#003570',
          cyan: '#00C4F0',
          cream: '#FFFDF5',
          black: '#0D0D0D',
          yellow: '#FFE156',
          'gray-light': '#F4F4F0',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neo': '4px 4px 0px #0D0D0D',
        'neo-lg': '6px 6px 0px #0D0D0D',
        'neo-xl': '8px 8px 0px #0D0D0D',
        'neo-blue': '4px 4px 0px #004E98',
        'neo-cyan': '4px 4px 0px #00C4F0',
      },
      borderWidth: {
        '3': '3px',
      },
      letterSpacing: {
        'widest2': '0.2em',
      }
    },
  },
  plugins: [],
}
