const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  [
    optimizedImages,
    {
      optimizeImagesInDev: true,
      env: {
        API_URL: 'https://jsonplaceholder.typicode.com/'
      }
    }
  ]
])
