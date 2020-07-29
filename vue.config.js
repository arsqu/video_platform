'use strict'

// cdn 配置
const cdnConfig = require('./config/cdn.config')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")

const externals = {
  vue: 'Vue',
  vueRouter: 'VueRouter',
  Axios: 'axios',
  // antd: 'antd',
  vuex: 'Vuex',
  VueI18n: 'VueI18n',
  moment: 'moment' // (如果不使用cdn moment会把语言文件一起打包(500k+))[http://momentjs.cn/docs/]
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

function htmlWebPack(config, str) {
  config.plugin('html-' + str).tap(args => {
    if (str === 'login') {
      str = 'open'
    }
    args[0].cdn = cdnConfig[str]
    return args
  })
}

function delPrefetch(config, str) {
  config.plugins.delete('prefetch-' + str)
}

function delPreload(config, str) {
  config.plugins.delete('preload-' + str)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist/' + process.env.VUE_APP_PUBLIC_DOC,
  css: {
    extract: process.env.NODE_ENV === 'production'
  },
  pages: {
    // index: {
    //   entry: './src/script/index/index.js',
    //   title: '商户平台',
    //   template: 'public/index.html'
    // },
    login: {
      entry: './src/script/open/index.js',
      title: '商户登录',
      template: 'public/login.html'
    },
    account: {
      entry: './src/script/account/index.js',
      title: '商户中心',
      template: 'public/account.html'
    }
    // ,
    // testbuild: {
    //   entry: './src/script/testbuild/index.js',
    //   title: '商户测试',
    //   template: 'public/testbuild.html'
    // }
  },
  chainWebpack: config => {
    config.externals(externals)
    if (process.env.packView) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    // config.module.rule('less').use('less').loader('less-loader').options({
    //   lessOptions: {
    //     javascriptEnabled: true
    //   }
    // })
    // config.module.rule('js').use('babel').loader('babel-loader').options({
    //   presets: ['@vue/cli-plugin-babel/preset'],
    //   plugins: [
    //     ['@babel/plugin-syntax-dynamic-import'],
    //     ['import', {
    //       libraryName: 'ant-design-vue',
    //       libraryDirectory: 'es',
    //       style: 'css'
    //     }]
    //   ]
    // })
    // htmlWebPack(config, 'index')
    htmlWebPack(config, 'login')
    htmlWebPack(config, 'account')
    // 彻底删除prefetch
    // delPrefetch(config, 'index')
    delPrefetch(config, 'login')
    delPrefetch(config, 'account')
    // 彻底删除preload
    // delPreload(config, 'index')
    delPreload(config, 'login')
    delPreload(config, 'account')

    // 含有myasyncRoute名字的路由会加入白名单
    // config.plugin('prefetch-index').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
    // config.output.filename = 'js/[name].js?version=' + process.env.VUE_APP_VERSION
    // config.output.chunkFilename = 'js/[name].js?version=' + process.env.VUE_APP_VERSION
    config.resolve.alias
      .set('@assets', '@/assets')
      .set('@util', '@/util')
      .set('@script', '@/script')
      .set('@router', '@/router')
      .set('@store', '@/store')
      .set('@locales', '@/locales')
      .set('@components', '@/components')
      .set('@src', '@/src')
      .set('@views', '@/views')
      .set('@ant-design/icons/lib/dist$', resolve('./src/script/antd-module-icon.js'))
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  productionSourceMap: false,
  configureWebpack: config => {
    // 开发环境下打包gzip
    if (process.env.NODE_ENV === 'production') {
      // 版本号
      const fileName = `js/[name].[contenthash:8].js?version=${process.env.VUE_APP_VERSION}`
      config.output.filename = fileName
      config.output.chunkFilename = fileName
      // gzip
      const plugins = [
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          // test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')'),
          filename: '[path].gz[query]',
          threshold: 10240,
          minRatio: 0.8
          // deleteOriginalAssets:false
        })
      ]
      config.plugins = [...config.plugins, ...plugins]
      // 删除注释和console输出
      var tersetOptions = config.optimization.minimizer[0].options.terserOptions
      tersetOptions.compress = {
        drop_console: true,
        warnings: false,
        collapse_vars: false,
        reduce_vars: false,
        pure_funcs: ['console.log']
      }
      tersetOptions.output = {
        comments: false
      }
    }
    // config.optimization.splitChunks.cacheGroups = {
    //   vendors: {
    //     name: 'chunk-vendors',
    //     test: /[\\/]node_modules[\\/]/,
    //     priority: -20,
    //     chunks: 'all'
    //   },
    //   common: {
    //     name: 'chunk-common',
    //     minChunks: 2,
    //     priority: -20,
    //     chunks: 'all',
    //     reuseExistingChunk: true
    //   }
    // }
  },
  devServer: {
    host: '192.168.1.103',
    port: 8083,
    https: false,
    open: false,
    historyApiFallback: {
      verbose: true,
      rewrites: [
        { from: /^\/open\/.*$/, to: '/login.html' },
        { from: /^\/account\/.*$/, to: '/account.html' },
        // { from: /^\/testbuild\/.*$/, to: '/testbuild.html' },
        // { from: /^\/.*/, to: '/index.html' }
        { from: /^\/.*/, to: '/login.html' } // 暂时修改
      ]
    },
    proxy: {
      '/api': {
        target: 'http://192.168.1.106:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
