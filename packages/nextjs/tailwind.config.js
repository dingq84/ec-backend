module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      transitionProperty: {
        width: 'width'
      },
      lineHeight: {
        tighter: '1.167'
      },
      spacing: {
        4.5: '18px',
        15: '60px',
        50: '200px'
      },
      colors: {
        primary: '#393091',
        'gray-1': '#E0E0E0',
        'gray-2': '#828282',
        'gray-3': '#8A8EA1',
        'purple-1': '#8153E9',
        'purple-2': '#393091',
        'purple-3': '#C0BFF6',
        'purple-blue-1': '#5C5EEE',
        'blue-purple-1': '#161054',
        'blue-green-1': '#42E8E0',
        'blue-gray-1': '#D5D6DF',
        'blue-gray-2': '#687193',
        'blue-gray-3': '#3D4254',
        'blue-gray-4': '#A7A9B8',
        'blue-gray-5': '#858793',
        'blue-1': '#F7F7FA',
        'blue-2': '#E9EBF6',
        'blue-3': '#DDE2F6',
        'blue-4': '#B9C6FB',
        'blue-5': '#2757FF',
        'blue-6': '#4B47C0',
        'blue-7': '#18173B',
        'blue-8': '#191B2C',
        'blue-9': '#E7EFF9',
        'blue-10': '#276FE0',
        'green-1': '#EDF7EF',
        'green-2': '#66BA6B',
        'yellow-1': '#FDF8EB',
        'yellow-2': '#E39836',
        'red-1': '#F16e6e',
        'red-2': '#F8ECEA',
        'red-3': '#DB593B'
      }
    }
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')]
}
