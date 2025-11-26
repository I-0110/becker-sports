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
