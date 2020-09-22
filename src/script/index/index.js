// import 'ant-design-vue/dist/antd.less'
import i18n from '@locales/index' // 多语言切换挂载到vue上
import router from '@router/index'
// eslint-disable-next-line no-unused-vars
import permission from '@router/permission'
import antdModuleLocale from '@script/antd-module-locale'
import util from '@util/util'
import main from './index.vue'
import store from '@store/index'
import axios from '@util/action'
import moment from 'moment'
// eslint-disable-next-line no-unused-vars
import plugin from '@/plugins'
import simpleTable from '@components/table/simpleTable'
Vue.use(simpleTable)

window.moment = moment
require('./antd-module')
Vue.prototype.$util = util // 通用方法
Vue.prototype.$axios = axios
Vue.prototype.$antModuleLocale = antdModuleLocale // 组件语言

require('@assets/css/common.styl')
require('@assets/css/resetui.styl')
require('@assets/css/media.styl')

// Vue.config.productionTip = false
new Vue({
  store,
  i18n,
  router,
  render: h => h(main)
}).$mount('#main')
