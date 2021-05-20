/**
 * @author Dean Chen 2021-05-10
 * 透過 storybook 的指令產出，但是和 tailwind jit complier 有衝突，
 * 參照 github 的方案，新增 story/addon-postcss 的設定，
 * https://github.com/wagerfield/storybook-tailwind
 * 然而上述 repository 未遇到的情況是：原本產出檔案是帶有 @storybook/addon-links 的設定，
 * 這會造成執行 yarn storybook 時，出現 "cannot get /" 的錯誤，
 * 研究了一下 repository 發現並未有此設定，因此暫時先行移除
 */

const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  webpackFinal: config => {
    config.resolve.plugins = config.resolve.plugins || []
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json')
      })
    )
    return config
  }
}
