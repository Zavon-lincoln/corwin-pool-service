/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nm: {
          bg:      '#1a3a6e',
          dark:    '#0f2440',
          light:   '#254f9e',
          surface: '#1e4080',
          deep:    '#162f5a',
          deeper:  '#0f2440',
          cyan:    '#00C4F0',
          yellow:  '#FFE156',
        },
        // Keep legacy brand colors used in JSX
        brand: {
          blue:       '#004E98',
          'blue-dark':'#003570',
          cyan:       '#00C4F0',
          cream:      '#FFFDF5',
          black:      '#0D0D0D',
          yellow:     '#FFE156',
          'gray-light':'#F4F4F0',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Neumorphic shadows — raised
        'nm':    '6px 6px 14px #0f2440, -6px -6px 14px #254f9e',
        'nm-sm': '3px 3px 8px #0f2440, -3px -3px 8px #254f9e',
        'nm-lg': '10px 10px 22px #0f2440, -10px -10px 22px #254f9e',
        'nm-xl': '14px 14px 30px #0f2440, -14px -14px 30px #254f9e',
        // Neumorphic shadows — inset (pressed)
        'nm-inset':    'inset 4px 4px 10px #0f2440, inset -4px -4px 10px #254f9e',
        'nm-inset-sm': 'inset 2px 2px 6px #0f2440, inset -2px -2px 6px #254f9e',
        'nm-inset-lg': 'inset 6px 6px 16px #0f2440, inset -6px -6px 16px #254f9e',
        // Glow accents
        'nm-cyan':   '6px 6px 14px #0f2440, -6px -6px 14px #254f9e, 0 0 24px rgba(0,196,240,0.15)',
        'nm-yellow': '6px 6px 14px #0f2440, -6px -6px 14px #254f9e, 0 0 24px rgba(255,225,86,0.12)',
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
}
