import i18n from '@locales/index' // 多语言切换挂载到vue上
import router from '@router/account'
import antdModuleLocale from '@script/antd-module-locale'
import util from '@util/util'
import account from './account.vue'
import store from '@store/index'
import axios from '@util/action'
import { NProgress } from '@util/nprogress'

import simpleTable from '@components/table/simpleTable'

Vue.use(simpleTable)

router.beforeEach((to, from, next) => {
  // 未获取到则跳转登录页
  if (!localStorage.getItem('token')) {
    Vue.prototype.$message.error(i18n.t('statusCode.4019'))
    NProgress.start()
    util.setPath(from.fullPath)
    util.clearItem() // 清除storage
    util.toLogin()
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

require('@script/antd-module')

Vue.prototype.$util = util // 通用方法
Vue.prototype.$axios = axios
Vue.prototype.$antModuleLocale = antdModuleLocale // 组件语言

require('@assets/css/common.styl')
require('@assets/css/media.styl')

// Vue.config.productionTip = false
new Vue({
  store,
  i18n,
  router,
  render: h => h(account)
}).$mount('#account')
