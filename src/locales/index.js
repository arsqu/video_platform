// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
import { langConfig } from '@util/config'
// import util from '@util/util'

const config = getLangConfig()
const lang = config.lang

function getLangConfig(k) {
  return !k ? langConfig : langConfig[k]
}

// const _import = require('@/locales/_import_lang') // 获取组件,只有一个的情况下不需要单独写文件
const _import = lang => require(`@locales/lang/${lang}.js`).default // 获取组件的方法

Vue.use(VueI18n)

function exchange(opt) {
  var lang = {}
  for (var k in opt) { lang[k] = _import(k) }
  return lang
}

/**
 * locale         当前显示的语言
 * fallbackLocale 默认显示语言
 */

const i18n = new VueI18n({
  locale: localStorage.getItem('language') ||
    (navigator.language || navigator.browserLanguage).toLowerCase().substr(0, 2), // 语言
  fallbackLocale: langConfig.defLocale || 'en',
  silentTranslationWarn: true,
  messages: exchange(lang)
})

Vue.prototype.$vueI18n = i18n

export default i18n
