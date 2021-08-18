module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      primary: {
        DEFAULT: '#FF855D',
      },
      secondary: {
        DEFAULT: '#9E79AA',
      },
      dark: {
        fg: '#FFF8FF',
        muted: '#613F6A',
        DEFAULT: '#381841',
      },
      light: '#F8F8F8',
      white: '#FFFFFF',
      black: '#000000',
      muted: '#989A9E',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
