const path = require('path')
module.exports = {
  // 配置别名
  configureWebpack: {
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        views: path.resolve(__dirname, 'src/views'),
        common: path.resolve(__dirname, 'src/common'),
        network: path.resolve(__dirname, 'src/network'),
        assets: path.resolve(__dirname, 'src/assets')
      }
    }
  },
  // 关闭eslint
  lintOnSave: false
}
