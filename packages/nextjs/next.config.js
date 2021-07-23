const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
  env: {
    API_URL: 'https://jsonplaceholder.typicode.com/'
  }
}

const nextOptimizedImage = [
  optimizedImages,
  {
    optimizeImagesInDev: true
  }
]

module.exports = withPlugins([nextConfig, nextOptimizedImage])
