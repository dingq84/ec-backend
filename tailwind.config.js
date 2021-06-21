const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.tsx', './src/**/*.tsx'],
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
        12: '3rem',
        tighter: '1.167'
      },
      colors: {
        primary: '#2757ff',
        'white-1': '#f5f7fa',
        'white-2': '#e4e7ed',
        'white-3': '#f5f5f5',
        'purple-1': '#E9EBF6',
        'blue-1': '#8A8EA1',
        'blue-2': '#687193',
        'gray-1': '#e0e0e0',
        'black-1': '#0e1726',
        // 'blue-1': '#404E67',
        // 'blue-2': '#2c3648',
        'green-1': '#227949',
        'green-2': '#4D886A',
        'green-3': '#72A28B',
        'green-4': '#E8F3EE',
        'brown-1': '#C4863B',
        'brown-2': '#E4C385',
        'brown-3': '#F9E6B3',
        // 'gray-1': '#333333',
        'gray-2': '#666666',
        'gray-3': '#999999',
        'gray-4': '#CCCCCC',
        'gray-5': '#F2F2F2',
        'gray-6': '#FAFAFA'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
