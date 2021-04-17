module.exports = {
  purge: ['./pages/**/*.tsx', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'cursive', 'Helvetica', 'Arial', 'sans-serif']
      },
      transitionProperty: {
        width: 'width'
      },
      lineHeight: {
        12: '3rem'
      },
      colors: {
        primary: '#209A66',
        'dark-blue-1': '#222d32', // rgb(34, 45, 50)
        'dark-blue-2': '#374850', // rgb(55, 72, 80)
        'dark-gray-1': '#444444', // rgb(68, 68, 68)
        'light-blue-1': '#8aa4af', // rgb(138, 164, 175)
        'light-blue-2': '#3c8dbc', // rgb(60, 141, 188)
        'light-blue-3': '#367fa9', // rgb(54, 127, 169)
        'light-gray-1': '#ecf0f5', // rgb(236, 240, 245)
        'light-gray-2': '#666666' // rgb(102, 102, 102)
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
