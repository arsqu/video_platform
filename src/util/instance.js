const instance = axios.create({
  withCredentials: true, // 允许跨域携带cookie
  timeout: 15 * 1000 // 允许超时时间 10s
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
  return Promise.reject(err)
})

export default instance
