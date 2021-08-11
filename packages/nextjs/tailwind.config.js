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
      spacing: {
        15: '60px',
        50: '200px'
      },
      colors: {
        primary: '#2757ff',
        'white-1': '#F7F7FA',
        'white-2': '#e4e7ed',
        'white-3': '#f5f5f5',
        'blue-2': '#687193',
        'blue-3': '#3d4254',
        'gray-2': '#828282',
        'gray-3': '#4f4f4f',
        'black-1': '#0e1726',
        'purple-1': '#8153E9',

        'gray-1': '#e0e0e0',
        'blue-1': '#8A8EA1',
        p1: '#8153E9',
        p2: '#393091',
        pb: '#5C5EEE',
        db1: '#191B2C',
        db2: '#18173B',
        dp: '#161054',
        tiffany: '#42E8E0',
        gb1: '#D5D6DF',
        gb2: '#687193',
        gb3: '#3D4254',
        b0: '#F7F7FA',
        b1: '#E9EBF6',
        b2: '#DDE2F6',
        b4: '#B9C6FB',
        b5: '#2757FF'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
