// import Vue from 'vue'
// import VueRouter from 'vue-router'

// 地址栏做了rewrite处理
const routes = [
  {
    path: '/testbuild/1.html',
    name: 'test1',
    component: () => import(/* webpackChunkName: "test11" */ '@views/testbuild/test1.vue')
  },
  {
    path: '/testbuild/2.html',
    name: 'test2',
    component: () => import(/* webpackChunkName: "test22" */ '@views/testbuild/test2.vue')
  }
]

// eslint-disable-next-line no-undef
const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_PUBLIC_PATH,
  // base: '/testbuild',
  routes
})

export default router
