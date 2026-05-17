/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nm: {
          bg:      '#e8f2f7',   // base surface
          alt:     '#f0f7fb',   // slightly lighter alt sections
          dark:    '#b8ccd8',   // dark shadow
          light:   '#ffffff',   // light shadow
          blue:    '#0077b6',   // primary pool blue
          teal:    '#00b4d8',   // secondary teal
          sky:     '#90e0ef',   // light accent
          navy:    '#0d2a3d',   // heading text / dark footer bg
          body:    '#3d6070',   // body text
          muted:   '#7a9fb0',   // muted / placeholder text
          faint:   '#b0c8d4',   // very faint text / dividers
          footer:  '#0d2a3d',   // footer background
        },
      },
      fontFamily: {
        sans:    ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Raised neumorphic
        'nm':    '7px 7px 15px #b8ccd8, -7px -7px 15px #ffffff',
        'nm-sm': '4px 4px 9px #b8ccd8, -4px -4px 9px #ffffff',
        'nm-lg': '12px 12px 24px #b8ccd8, -12px -12px 24px #ffffff',
        'nm-xl': '18px 18px 36px #aac0cc, -18px -18px 36px #ffffff',
        // Inset neumorphic
        'nm-inset':    'inset 5px 5px 10px #b8ccd8, inset -5px -5px 10px #ffffff',
        'nm-inset-sm': 'inset 3px 3px 6px #b8ccd8, inset -3px -3px 6px #ffffff',
        'nm-inset-lg': 'inset 7px 7px 15px #aac0cc, inset -7px -7px 15px #ffffff',
        // Blue button (filled, colored shadow)
        'nm-blue':     '5px 5px 12px #005f94, -5px -5px 12px #0099e0',
        'nm-blue-sm':  '3px 3px 7px #005f94, -3px -3px 7px #0099e0',
      },
      letterSpacing: { widest2: '0.18em' },
    },
  },
  plugins: [],
}
