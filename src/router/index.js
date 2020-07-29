import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/index.html'
  },
  {
    path: '/index.html',
    name: 'Home',
    component: Home
  },
  {
    path: '/about.html',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: () => import(/* webpackChunkName: "myasyncRoute2" */ '@views/About.vue')
  },
  {
    path: '/test.html',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "test" */ /* webpackPrefetch: true */ '../views/test.vue')
    component: () => import(/* webpackChunkName: "myasyncRoute1" */ '@views/test.vue')
  }
]

// eslint-disable-next-line no-undef
const router = new VueRouter({
  mode: 'history',
  // base: process.env.publicPath,
  base: process.env.VUE_APP_PUBLIC_PATH,
  routes
})

export default router
