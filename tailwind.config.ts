import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        chief: {
          50: '#f9f9f9', // light - almost white = light mode background, dark mode text
          100: '#ffb612', // bright yellow = accent colors (buttons, highlights, hover)
          200: '#bbbbbb', // medium gray = borders, subtle dividers, disable states
          300: '#ca2430', // deep red = primary brand color (header, links)
          400: '#000000', // darkest - black = light mode text, dark mode background
        },
        badge: { 
          50: '#002752', // prussian blue = '101'
          100: '#2990FF', // dodger blue = ' text 101'
          200: '#ca2430', // deep red = 'Chiefs'
          300: '#A01C25', // darker red = 'text Chiefs'
          400: '#0081c5', // steel blue = 'Draft'
          500: '#00669C', // baltic blue = 'text Draft' 
          600: '#0eb049', // medium jungle = 'Fantasy'
          700: '#0B8939', // forrest green = 'text Fantasy'
          800: '#c49328', // dark goldenrod = 'Hall of Fame'
          900: '#9a7227', // golden earth = 'text Hall of Fame'
        }
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
