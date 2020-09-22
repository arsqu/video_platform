import Main from '../views/main.vue'

const routes = [
  {
    path: '/',
    redirect: 'index.html'
  },
  {
    path: '/index.html',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: Main
  }, {
    path: '/404.html',
    name: '404',
    component: () => import('@views/module/404')
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes
})
