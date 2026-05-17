/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        s: {
          bg:     '#e8eff4',
          alt:    '#f2f6f9',
          dark:   '#c0ccd8',
          blue:   '#0077b6',
          orange: '#f0820f',
          teal:   '#009fb5',
          ink:    '#0c2640',
          body:   '#375570',
          muted:  '#6b92a8',
          faint:  '#b4c8d8',
        }
      },
      fontFamily: {
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'nm':       '6px 6px 14px #c0ccd8, -6px -6px 14px #ffffff',
        'nm-sm':    '3px 3px 8px #c0ccd8, -3px -3px 8px #ffffff',
        'nm-lg':    '10px 10px 22px #b8c8d5, -10px -10px 22px #ffffff',
        'nm-in':    'inset 4px 4px 9px #c0ccd8, inset -4px -4px 9px #ffffff',
        'nm-in-sm': 'inset 2px 2px 5px #c0ccd8, inset -2px -2px 5px #ffffff',
      },
      borderRadius: {
        'card': '1.25rem',
        'btn':  '0.625rem',
      }
    }
  },
  plugins: [],
}
