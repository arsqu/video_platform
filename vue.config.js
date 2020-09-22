'use strict'

// cdn 配置
const cdnConfig = require('./config/cdn.config')
const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const externals = {
  vue: 'Vue',
  vueRouter: 'VueRouter',
  Axios: 'axios',
  // antd: 'antd',
  vuex: 'Vuex',
  VueI18n: 'VueI18n'
}

// moment: 'moment' // (如果不使用cdn moment会把语言文件一起打包(500k+))[http://momentjs.cn/docs/]

function resolve(dir) {
  return path.join(__dirname, dir)
}

function htmlWebPack(config, str) {
  config.plugin('html-' + str).tap(args => {
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

const isProd = process.env.NODE_ENV === 'production'

const vueConfig = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  // assetsDir: 'pub', // 指定静态资源的输出目录默认为public文件夹,优先级最低
  outputDir: `dist/${process.env.VUE_APP_PUBLIC_DOC}`, // 文件输出的目录
  // filenameHashing: false, //文件名是否使用hash
  css: {
    extract: !!isProd
  },
  pages: {
    login: {
      entry: './src/script/open/index.js',
      title: '视频后台登录',
      template: 'public/login.html',
      // chunks: ['chunk-antdv', 'chunk-common', 'login']
      chunksSortMode: 'dependency',
      chunks: ['chunk-vendors', 'chunk-ui', 'chunk-common', 'login']
      // chunks: ['chunk-vendors', 'chunk-common', 'login']
    },
    index: {
      entry: './src/script/index/index.js',
      title: '视频后台',
      chunksSortMode: 'dependency',
      template: 'public/index.html',
      // chunks: ['chunk-vendors', 'chunk-antdv', 'chunk-common', 'index']
      chunks: ['chunk-vendors', 'chunk-ui', 'chunk-common', 'index']
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  chainWebpack: config => {
    config.externals(externals)
    config.resolve.alias
      .set('@assets', '@/assets')
      .set('@components', '@/components')
      .set('@util', '@/util')
      .set('@script', '@/script')
      .set('@router', '@/router')
      .set('@store', '@/store')
      .set('@locales', '@/locales')
      .set('@views', '@/views')
      .set('@mixin', '@/mixin')
      .set('@ant-design/icons/lib/dist$', resolve('./src/script/antd-module-icon.js'))
    config.module.rule('less').oneOf('normal').use('less-loader')
      .options({
        sourceMap: false,
        lessOptions: {
          modifyVars: {
            'primary-color': '#256BFF'
          },
          javascriptEnabled: true
        }
      })
    // 指定css文件输出目录
    // config.plugin('extract-css').tap(args => {
    //   return [{
    //     filename: 'lass/[name].[contenthash:8].css',
    //     chunkFilename: 'lass/[name].[contenthash:8].css'
    //   }]
    // })
    // config.module.rule('js').use('babel').loader('babel-loader').options({
    //   presets: ['@vue/cli-plugin-babel/preset'],
    //   plugins: [
    //     ['@babel/plugin-syntax-dynamic-import'],
    //     ['import', {
    //       libraryName: 'ant-design-vue',
    //       libraryDirectory: 'es',
    //       style: 'css' // true 为 less 文件
    //     }]
    //   ]
    // })
    htmlWebPack(config, 'index')
    htmlWebPack(config, 'login')
    // 彻底删除prefetch
    delPrefetch(config, 'index')
    delPrefetch(config, 'login')
    // 彻底删除preload
    delPreload(config, 'index')
    delPreload(config, 'login')

    // 含有myasyncRoute名字的路由会加入白名单
    // config.plugin('prefetch-index').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
    if (process.env.VUE_APP_PREVIEW) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
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
    if (isProd) {
      // 版本号
      const fileName = `js/[name].[contenthash:8].js?version=${process.env.VUE_APP_VERSION}`
      config.output.filename = fileName
      config.output.chunkFilename = fileName
      // gzip
      const plugins = [
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
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
    // 屏蔽moment語言包
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    config.optimization.splitChunks.cacheGroups = {
      ui: {
        name: 'chunk-ui',
        test: /[\\/]node_modules[\\/](ant-design-vue|moment)[\\/]/,
        priority: -5,
        chunks: 'initial'
      },
      vendors: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all'
      },
      common: {
        name: 'chunk-common',
        minChunks: 2,
        reuseExistingChunk: true,
        priority: -20,
        chunks: 'initial'
      }
    }
  },
  devServer: {
    // host: '192.168.1.112',
    host: '192.168.31.25',
    port: 8085,
    https: false,
    open: false,
    historyApiFallback: {
      verbose: true,
      rewrites: [
        { from: /^\/open\/.*$/, to: '/login.html' },
        { from: /^\/.*/, to: '/index.html' }
      ]
    },
    proxy: {
      '/api': {
        target: 'http://192.168.31.76:8071',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/svga': {
        target: 'http://img.schat.club',
        changeOrigin: true,
        pathRewrite: {
          '^/svga': ''
        }
      },
      '/csvga': {
        target: 'https://video-bored.oss-cn-hangzhou.aliyuncs.com',
        changeOrigin: true,
        pathRewrite: {
          '^/csvga': ''
        }
      }
    }
  }
}

module.exports = vueConfig
