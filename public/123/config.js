// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false
  },
  dev: {
    port: 8088,
    proxyTable: {
      '/api': {
		target: 'http://manage-dev.xiaoyezi.com',
		//  target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
          // '^/api': ''
        }
      },
    }
  }
}
