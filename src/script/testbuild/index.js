// import i18n from '@locales/index'
import router from '@router/testbuild'
// import antModule from '@script/antd-module'
// import antModuleLocale from '@script/ant-module-locale'
// import util from '@util/util'
import main from './testbuild.vue'
// import store from '@store/index'

// Vue.config.productionTip = false
// console.log(antModule, antModuleLocale)
// Vue.prototype.$util = util
// antd 组件语言包
// Vue.prototype.$antModuleLocale = antModuleLocale

// 自定义引入文件
require('@assets/css/common.styl')
require('@assets/css/media.styl')

new Vue({
  // i18n,
  router,
  // store,
  render: h => h(main)
}).$mount('#main')
