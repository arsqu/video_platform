// import i18n from '@locales/index'
// import router from '@router/index'
// import antdModule from '@script/antd-module'
// import antdModuleLocale from '@script/antd-module-locale'
// import util from '@util/util'
import main from './index.vue'
// import store from '@store/index'

// Vue.config.productionTip = false
// require('@script/antd-module')

// Vue.prototype.$util = util
// antd 组件语言包
// Vue.prototype.$antModuleLocale = antdModuleLocale

// 自定义引入文件
// require('@assets/css/common.styl')
// require('@assets/css/media.styl')

new Vue({
  // i18n,
  // router,
  // store,
  render: h => h(main)
}).$mount('#main')
