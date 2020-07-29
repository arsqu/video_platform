import fetch from './fetch'
import { crossUrl } from './api'
// import qs from 'qs'

// const publicUrl = '/manage'
const publicUrl = ''
const baseUrl = process.env.VUE_APP_API_URL

function getUrl(obj, key, val) {
  // eslint-disable-next-line no-new-func
  return new Function('a', 'return null ==' + val + '?a.' + key + ':(a.' + key + '=' + val + ',a)')(obj)
}

function getData(key, param, config) {
  var url = publicUrl + getUrl(crossUrl, key)
  return fetch.getData(baseUrl + url, param, config)
}

function postData(key, param, config) {
  var url = publicUrl + getUrl(crossUrl, key)
  return fetch.postData(baseUrl + url, param, config)
}

// 上传文件
function postFile(key, param, config) {
  var url = publicUrl + getUrl(crossUrl, key)
  return fetch.postData(baseUrl + url, param, config)
}

// 下载文件
function downFile(key, param, config) {
  var url = publicUrl + getUrl(crossUrl, key)
  return fetch.downFile(baseUrl + url, param, config)
}

function specPost(key, opt, param, config) {
  var url = publicUrl + getUrl(crossUrl, key)
  var k = Object.keys(opt)
  k = k.length > 0 ? k[0] : ''
  url = url.replace(new RegExp('\\{' + k + '\\}'), opt[k])
  return fetch.postData(baseUrl + url, param, config)
}

// formdata上传
function addApp(key, param, config) {
  var url = publicUrl + getUrl(crossUrl, key)
  var type
  if (Object.prototype.toString.call(param) === '[object FormData]') {
    type = param.get('type')
  } else {
    type = param.type
  }
  url = url.replace(/\{.+\}/, type)
  return fetch.postData(baseUrl + url, param, config)
}

export default {
  getData,
  downFile,
  postFile,
  specPost,
  postData,
  addApp
}
