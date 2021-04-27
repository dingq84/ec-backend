module.exports = {
  purge: ['./pages/**/*.tsx', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
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
        'dark-blue-3': '#1a2226', // rgb(26, 34, 38)
        'dark-blue-4': '#1e282c', // rgb(30, 40, 44)
        'dark-blue-5': '#2c3b41', // rgb(44, 59, 65)
        'dark-gray-1': '#444444', // rgb(68, 68, 68)
        'light-blue-1': '#8aa4af', // rgb(138, 164, 175)
        'light-blue-2': '#3c8dbc', // rgb(60, 141, 188)
        'light-blue-3': '#367fa9', // rgb(54, 127, 169)
        'light-blue-4': '#b8c7ce', // rgb(184, 199, 206)
        'light-gray-1': '#ecf0f5', // rgb(236, 240, 245)
        'light-gray-2': '#666666', // rgb(102, 102, 102)
        'light-gray-3': '#f9f9f9', // rgb(249, 249, 249)
        'light-gray-4': '#e7e7e7' // rgb(231, 231, 231)
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
