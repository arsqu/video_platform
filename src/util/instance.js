// import util from '@util/util'

const instance = axios.create({
  withCredentials: true,
  timeout: 0 * 1000
})

// 请求拦截
instance.interceptors.request.use(request => {
  var token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = token
  }
  return request
}, err => {
  return Promise.reject(err)
})

// 响应拦截
instance.interceptors.response.use(response => {
  return response
}, err => {
  console.dir(err)
  return Promise.reject(err)
})

export default instance
