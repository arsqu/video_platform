import $axios from './instance'
import util from '@util/util'
// var i18n = require('../locales/index.js').default

// 响应状态码
function statusCode(code) {
  var expires = [4019, 4020]
  // 登录过期
  if (expires.indexOf(code) !== -1) {
    Vue.prototype.$message.error(Vue.prototype.$vueI18n.t('statusCode.' + code))
    util.setPath(location.href)
    util.clearItem() // 清空
    util.toLogin()
    return
  }
  if (code !== 200 && code) {
    Vue.prototype.$message.destroy()
    // Vue.prototype.$message.error(i18n.t('statusCode.' + code))
    Vue.prototype.$message.error(Vue.prototype.$vueI18n.t('statusCode.' + code))
  }
}

// 服务端错误
function errCode() {
  Vue.prototype.$message.destroy()
  // Vue.prototype.$message.error(i18n.t('errCode'))
  Vue.prototype.$message.error(Vue.prototype.$vueI18n.t('errCode'))
}

// get
function getData(url, params) {
  return new Promise((resolve, reject) => {
    $axios.get(url, { params }).then(response => {
      statusCode(response.data.code)
      resolve(response.data)
    }).catch(err => {
      errCode(err)
      reject(err)
    })
  })
}

// post
function postData(url, data, config) {
  config = config || {}
  config.headers = config.headers || {
    'Content-Type': 'application/json'
  }
  return new Promise((resolve, reject) => {
    $axios.post(url, data, config).then(response => {
      console.log(response)
      statusCode(response.data.code)
      resolve(response.data)
    }).catch(err => {
      errCode(err)
      reject(err)
    })
  })
}

// download
function downFile(url, data, config) {
  config = config || {}
  config.headers = config.headers || {
    'Content-Type': 'application/json'
  }
  return new Promise((resolve, reject) => {
    $axios.post(url, data, config).then(response => {
      const r = new FileReader()
      r.onload = function () {
        var res
        try {
          // json
          res = this.result && typeof this.result === 'string' && JSON.parse(this.result)
          if (res && res.code) {
            statusCode(res.code)
          }
        } catch (err) {
          // 文件流
          resolve(response.data)
          console.log(err, 'err')
        }
      }
      r.readAsText(response.data) // blob 数据
    }).catch(err => {
      errCode(err)
      reject(err)
    })
  })
}

export default {
  getData,
  downFile,
  postData
}
