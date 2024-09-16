const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
    ],
  },
  runtimeCompiler: true,
  productionSourceMap: false,

  publicPath: process.env.NODE_ENV === 'production'
    ? './' // Production base path
    : '/', // Development base path

  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/compat');
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        };
      });
  },
});