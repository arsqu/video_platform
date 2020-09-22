// import Vuex from 'vuex'
import { lang } from './modules/lang'

Vue.use(Vuex)

// console.log(lang)

export default new Vuex.Store({
  state: {
    locale: lang,
    curr: null,
    tags: [],
    svgLoad: false,
    menuList: [],
    breadData: [],
    collapse: false,
    step: 0,
    uname: '',
    userInfo: '',
    result: '',
    showStep: false
  },
  getters: {
    getLang: state => state.locale,
    getMenu: state => state.menuList,
    getTags: state => state.tags,
    getSvgLoad: state => state.svgLoad,
    getCurr: state => state.curr,
    getCollapse: state => state.collapse,
    getStep: state => state.step,
    getResult: state => state.result,
    getUname(state, getters) {
      return state.uname || getters.getUserInfo.account
    },
    getUserInfo(state) {
      var info = localStorage.getItem('userInfo')
      return state.userInfo || (typeof info === 'string' ? JSON.parse(info) : '')
    },
    getMapConfig: () => (key) => {
      if (!key) { return }
      return Vue.prototype.$vueI18n.t(key) || {}
    }
  },
  mutations: {
    setLang(state, locale) {
      state.locale = locale
    },
    breadcrumb(state, arr) { // 面包屑导航
      state.breadData = arr
    },
    setMenu(state, list) { // 菜单列表
      state.menuList = list
    },
    setCurr(state, curr) { // 当前便签下标
      state.curr = curr
    },
    setSvgLoad(state, svgLoad) {
      state.svgLoad = svgLoad
    },
    setTags(state, tag) { // 标签组
      state.tags.push(tag)
    },
    delTag(state, idx) { // 删除当前标签
      state.tags.splice(idx, 1)
    },
    setCollapse(state, collapse) {
      state.collapse = collapse
    },
    setUname(state, uname) {
      state.uname = uname
    },
    setResult(state, result) {
      state.result = result
    },
    setStep(state, step) {
      state.step = step
    }
  },
  actions: {
    setLang({ commit }, locale) {
      commit('setLang', locale)
    },
    breadcrumb({ commit }, arr) { // 面包屑导航
      commit('breadcrumb', arr)
    },
    setMenu({ commit }, list) {
      commit('setMenu', list)
    },
    setCurr({ commit }, curr) {
      commit('setCurr', curr)
    },
    setTags({ commit }, tag) {
      commit('setTags', tag)
    },
    delTag({ commit }, idx) {
      commit('delTag', idx)
    },
    setSvgLoad({ commit }, svgLoad) {
      commit('svgLoad', svgLoad)
    },
    setCollapse({ commit }, collapse) {
      commit('setCollapse', collapse)
    },
    setUname({ commit }, uname) {
      commit('setUname', uname)
    },
    setStep({ commit }, step) {
      commit('setStep', step)
    },
    setResult({ commit }, result) {
      commit('setResult', result)
    }
  },
  modules: {}
})
