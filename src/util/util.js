import { langConfig } from './config'
// var i18n = require('../locales/index.js').default

// 默认语言
function getLang() {
  return localStorage.getItem('language') || langConfig.defLocale
}

// 目录前缀
function getPublicPath() {
  return process.env.VUE_APP_PUBLIC_PATH
}

// 缓存登录前的地址
function setPath(v, k) {
  k = k || 'path'
  sessionStorage.setItem(k, v)
}

function exchMoney(v) {
  var unit = 100
  return formatNumber(v / unit)
}

function formatNumber(num) {
  return (+num).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}

function toLogin() {
  setTimeout(_ => {
    location.href = getPublicPath() + 'login.html'
  }, 300)
}

// 清空缓存
function clearItem() {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('token')
}

// 语言配置
function getLangConfig(k) {
  return !k ? langConfig : langConfig[k]
}

// 深克隆
function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (!obj) { // obj 是 null的情况
    return obj
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if (obj instanceof Function) {
    return obj
  }
  let newObj
  if (obj instanceof Array) {
    newObj = []
    for (let i = 0, len = obj.length; i < len; i++) {
      newObj.push(deepClone(obj[i]))
    }
    return newObj
  }
  newObj = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] !== 'object') {
        newObj[key] = obj[key]
      } else {
        newObj[key] = deepClone(obj[key])
      }
    }
  }
  return newObj
}

function Message(type, text) {
  var opt = {}
  if (type === 'destroy') {
    Vue.prototype.$message.destroy()
    return
  }
  if (typeof type !== 'object') {
    if (type && !text) {
      text = type
      type = 'info'
    } else {
      type = type || 'info'
      text = text || '...'
    }
    Vue.prototype.$message[type](text)
  } else {
    opt = type
    type = opt.type || 'info'
    Vue.prototype.$message[type](opt)
  }
}

function mWords(v, k, t) {
  if (!k) {
    return ''
  }
  var key = {
    l: 'label',
    p: 'placeholder',
    r: 'tips.req',
    v: 'tips.err'
  }
  var result, text
  var label = v + '.' + k + '.' + key.l // 显示的标签
  if (key[t]) {
    text = Vue.prototype.$vueI18n.t('formList.common.' + t)
    result = Vue.prototype.$vueI18n.t(v + '.' + k + '.' + key[t])
    if (t === 'p') {
      return result || text + Vue.prototype.$vueI18n.t(label)
    } else if (t === 'r' || t === 'v') {
      return result || Vue.prototype.$vueI18n.t(label) + text
    }
    return result
  }
}

export default {
  mWords,
  formatNumber,
  exchMoney,
  getPublicPath,
  setPath,
  deepClone,
  clearItem,
  toLogin,
  Message,
  getLang,
  getLangConfig
}
