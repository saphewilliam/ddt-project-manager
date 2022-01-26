// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

const addKeys = (color) => ({ ...color, DEFAULT: color[400], light: color[300], dark: color[500] });

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: addKeys(colors.slate),
      primary: addKeys(colors.amber),
      ddt: {
        purple: '#411F5E',
        blue: '#171A75',
        lightblue: '#2C8DDA',
        green: '#0D774B',
        lightgreen: '#3CA737',
        yellow: '#DBDA45',
        orange: '#FA9E34',
        red: '#C6293F',
        bordeaux: '#922352',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};
