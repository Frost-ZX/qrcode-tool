const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({

  assetsDir: 'static',
  outputDir: 'dist',
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: false,

  chainWebpack: function (config) {
    // 解决“You are running the esm-bundler build of vue-i18n”警告
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
  },

  devServer: {
    host: '127.0.0.1',
    port: 9000,
  },

});
