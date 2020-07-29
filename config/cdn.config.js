const common = {
  js: [
    {
      key: 'Observable',
      url: [
        'https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.min.js',
        ''
      ]
    },
    {
      key: 'Vue',
      url: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        '/static/js/vue.min.js'
      ]
    },
    {
      key: 'VueRouter',
      url: [
        'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
        '/static/js/vue-router.min.js'
      ]
    },
    {
      key: 'VueI18n',
      url: [
        'https://cdn.bootcdn.net/ajax/libs/vue-i18n/8.17.3/vue-i18n.min.js',
        '/static/js/vue-i18n.min.js'
      ]
    },
    {
      key: 'Vuex',
      url: [
        'https://cdn.bootcdn.net/ajax/libs/vuex/3.2.0/vuex.min.js',
        '/static/js/vuex.min.js'
      ]
    },
    {
      key: 'axios',
      url: [
        'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
        '/static/js/axios.min.js'
      ]
    },
    {
      key: 'moment',
      url: [
        'http://cdn.staticfile.org/moment.js/2.24.0/moment.min.js',
        '/static/js/moment.min.js'
      ]
    }
    // ,
    // {
    //   key: 'antd',
    //   url: [
    //     'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/2.0.0-beta.1/antd.min.js',
    //     '/static/js/antd.min.js'
    //   ]
    // }
  ],
  css: [
    'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/2.0.0-beta.1/antd.min.css'
  ]
}

// 匹配cdn
function matchCdn(obj, keyArr, type) {
  var cdnArr = []
  if (type) {
    obj = obj[type]
    for (var i = 0; i < obj.length; i++) {
      if (keyArr.indexOf(obj[i].key) !== -1 || type === 'css') {
        cdnArr.push(obj[i])
      }
    }
  }
  return cdnArr
}

const index = {
  js: matchCdn(common, ['Observable', 'Vue', 'VueI18n', 'VueRouter', 'Vuex', 'axios', 'moment'], 'js'),
  css: matchCdn(common, [], 'css')
}

const open = {
  js: matchCdn(common, ['Observable', 'Vue', 'VueI18n', 'VueRouter', 'Vuex', 'axios', 'moment'], 'js'),
  css: matchCdn(common, [], 'css')
}

// , 'antd'
const account = {
  js: matchCdn(common, ['Observable', 'Vue', 'VueI18n', 'VueRouter', 'Vuex', 'axios', 'moment'], 'js'),
  css: matchCdn(common, [], 'css')
}

module.exports = {
  index,
  open,
  account
}
