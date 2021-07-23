const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: ['Roboto', 'ui-sans-serif', 'system-ui']
      },
      transitionProperty: {
        width: 'width'
      },
      lineHeight: {
        tighter: '1.167'
      },
      colors: {
        primary: '#2757ff',
        'white-1': '#F7F7FA',
        'white-2': '#e4e7ed',
        'white-3': '#f5f5f5',
        'purple-1': '#E9EBF6',
        'blue-1': '#8A8EA1',
        'blue-2': '#687193',
        'blue-3': '#3d4254',
        'gray-1': '#e0e0e0',
        'gray-2': '#828282',
        'gray-3': '#4f4f4f',
        'black-1': '#0e1726'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
