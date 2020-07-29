
// 地址栏做了rewrite处理
const routes = [
  {
    path: '/login.html',
    redirect: '/open/signin.html'
  },
  {
    path: '/open/signin.html',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '@views/open/signin.vue')
  },
  {
    path: '/open/signup.html',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '@views/open/signup.vue')
  },
  {
    path: '/open/*',
    redirect: '/404.html'
  },
  {
    path: '*',
    redirect: '/login.html'
  },
  {
    path: '/404.html',
    name: '404',
    component: () => import('@views/module/404')
  }
]

// eslint-disable-next-line no-undef
const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes
})

export default router
