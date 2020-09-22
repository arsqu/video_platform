import { langConfig } from './config'
const _import = require('@/router/_import_' + process.env.NODE_ENV)// 获取组件的方法
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

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

// 转换路由
function loop(route, newArr, title) {
  route.map(res => {
    var path = res.url + '.html'
    if (res.url && (!res.children || res.children.length === 0)) {
      newArr.push({
        path,
        name: res.title || '',
        meta: res.meta || (title && { title }) || {},
        component: _import(res.url)
      })
    }
    if (res.children && res.children.length > 0) {
      loop(res.children, newArr, res.title)
    }
  })
  // console.log(newArr)
  return newArr
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
  localStorage.removeItem('menuList')
}

// 语言配置
function getLangConfig(k) {
  return !k ? langConfig : langConfig[k]
}

// 数组、对象的克隆
function loopMap(o, v) {
  for (var k in v) {
    if (v[k]) {
      if (getType(v[k]) === '[object Object]') {
        o[k] = o[k] || {}
        loopMap(o[k], v[k])
      } else if (getType(v[k]) === '[object Array]') {
        o[k] = Array.slice(v[k])
      } else if (typeof v[k] !== 'object') {
        o[k] = v[k]
      }
    } else if (typeof v[k] === 'number') {
      o[k] = v[k]
    } else { }
  }
  return o
}

// 深克隆
function deepClone(obj) {
  if (typeof obj !== 'object') { return obj }
  if (obj === null) { return obj }
  if (obj instanceof Date) { return new Date(obj) }
  if (obj instanceof RegExp) { return new RegExp(obj) }
  if (obj instanceof Function) { return obj }
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

// function createNewFormRule(res, hide) {
//   var name = res.prop // 校验的字段名
//   // 显示的字段
//   if (hide.indexOf(name) === -1) {
//     // 默认情况下 input 类型都会添加必填校验规则
//     if (!res.type || res.type === 'textarea' || res.type === 'password') {
//       if (res.valid !== false) {
//         return [
//           { required: true, message: '请输入' + res.label, trigger: 'blur' }
//         ]
//       }
//     } else if (res.type === 'select' && res.valid) {
//       // valid 为 true 表示select必填
//       return [
//         { required: true, message: '请选择', trigger: 'change' }
//       ]
//     } else if (res.type === 'number') {
//       // 数字框默认必填
//       return [
//         { required: true, message: '请输入' + res.label },
//         { type: 'number', message: res.label + '必须为数字' }
//       ]
//     } else {
//     }
//   }
// }

function getType(v) {
  return Object.prototype.toString.call(v)
}

// function getType(v) {
//   var type = {};
//   var typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Function', 'Null', 'Symbol'];
//   for (var i = 0; i < typeArr.length; i++) {
//     (function (name) {
//       type['Is' + name] = function (obj) {
//         return Object.prototype.toString.call(obj) == '[object ' + name + ']';
//       }
//     })(typeArr[i]);
//   }
//   return type;
// }

// 表单渲染规则
function createNewRule(opt) {
  var formRule = opt.tableRule || {}
  var hide = opt.formHide
  // var rules = {}
  var newForm = []
  formRule.forEach(res => {
    // 不生成的表单字段
    if (hide.indexOf(res.dataIndex) === -1) {
      console.log(res)
      var opt = {
        title: getType(res.title) === '[object Function]' ? res.title() : res.title, // 标签名
        dataIndex: res.dataIndex
      }
      // 生成表单校验规则
      // rules[res.dataIndex] = createNewFormRule(res, hide)
      newForm.push(opt)
    }
    // res.async && (opt.async = !0) // 是否异步加载
    // res.tips && (opt.tips = res.tips) // 是否有提示
    // res.type && (opt.type = res.type) // 表单类型
  })
  console.log(newForm)
  return {
    // rules,
    formRule: newForm
  }
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

// 屏幕可视区表格高度
function autoHet(baseHet) {
  baseHet = baseHet || 440
  return document.documentElement.clientHeight - baseHet + 48
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
  var result
  var text
  var space = ''
  var label = v + '.' + k + '.' + key.l // 显示的标签
  if (key[t]) {
    text = Vue.prototype.$vueI18n.t('formList.common.' + t)
    result = Vue.prototype.$vueI18n.t(v + '.' + k + '.' + key[t])
    result = result === (v + '.' + k + '.' + key[t]) ? '' : result
    var defLang = getLang()
    if (defLang === 'en') {
      space = ' '
    }
    if (t === 'p') {
      return result || text + space + Vue.prototype.$vueI18n.t(label)
    } else if (t === 'r' || t === 'v') {
      return result || Vue.prototype.$vueI18n.t(label) + space + text
    }
    return result
  }
}

export default {
  mWords,
  createNewRule,
  autoHet,
  getBase64,
  loopMap,
  formatNumber,
  exchMoney,
  getPublicPath,
  setPath,
  deepClone,
  loop,
  clearItem,
  toLogin,
  Message,
  getLang,
  getLangConfig
}
