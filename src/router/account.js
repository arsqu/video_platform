const routes = [
  {
    path: '/account.html',
    redirect: '/account/apply.html'
  },
  {
    path: '/account',
    name: 'accIndex',
    component: () => import(/* webpackChunkName: "accIndex" */ '@views/account/index.vue'),
    children: [
      {
        path: 'apply.html',
        name: 'accMain',
        component: () => import(/* webpackChunkName: "accMain" */ '@views/account/main.vue')
      },
      {
        path: 'transaction.html',
        name: 'accRecord',
        component: () => import(/* webpackChunkName: "accTransaction" */ '@views/account/transaction.vue')
      },
      {
        path: 'settlement.html',
        name: 'accSettle',
        component: () => import(/* webpackChunkName: "accSettle" */ '@views/account/settlement.vue')
      },
      {
        path: 'summary.html',
        name: 'accRate',
        component: () => import(/* webpackChunkName: "accSummary" */ '@views/account/summary.vue')
      },
      {
        path: 'withdrawal.html',
        name: 'accWithdrawal',
        component: () => import(/* webpackChunkName: "accWithdrawal" */ '@views/account/withdrawal.vue')
      },
      {
        path: 'balanceWithdrawal.html',
        name: 'accBalanceWithdrawal',
        component: () => import(/* webpackChunkName: "accBalanceWithdrawal" */ '@views/account/balanceWithdrawal.vue')
      },
      {
        path: 'formStep.html/:type?',
        name: 'accFormStep',
        component: () => import(/* webpackChunkName: "accFormStep" */ '@views/account/formStep.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404.html'
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
  // base: '/account',
  routes
})

export default router
