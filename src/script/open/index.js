import i18n from '@locales/index'
import router from '@router/open'
import util from '@util/util'
import open from './open.vue'
import store from '@store/index'
import axios from '@util/action'
import moment from 'moment'

window.moment = moment
require('./antd-module')

Vue.prototype.$util = util
Vue.prototype.$axios = axios
Vue.prototype.$vueI18n = i18n
// 自定义引入文件
require('@assets/css/common.styl')
require('@assets/css/media.styl')

// import moment from 'moment'
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')

new Vue({
  store,
  i18n,
  router,
  render: h => h(open)
}).$mount('#open')
