module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,

    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',

    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/themes/green/variable";`,
            },
        },
    },
}