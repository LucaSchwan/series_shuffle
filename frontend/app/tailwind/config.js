const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('tailwindcss-ember-power-select').plugin(({ theme }) => {
      return {
        // backgroundColor: theme('color.gray.600'),
        selectedTextColor: theme('color.white'),
        borderColor: theme('color.gray.600'),
      };
    }),
  ],
};
