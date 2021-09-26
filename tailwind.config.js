module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      primary: {
        light: '#FF906B',
        DEFAULT: '#FF855D',
      },
      secondary: {
        dark: '#9E68B0',
        DEFAULT: '#9E79AA',
      },
      dark: {
        highlight: '#384152',
        selected: '#2e344a',
        DEFAULT: '#161B2E',
      },
      light: '#F0F0F0',
      white: '#FFFFFF',
      black: '#000000',
      muted: '#989A9E',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};
