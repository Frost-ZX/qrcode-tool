const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({

  assetsDir: 'static',
  outputDir: 'dist',
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: false,

  devServer: {
    host: '127.0.0.1',
    port: 9000,
  },

});
