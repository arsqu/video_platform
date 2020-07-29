// import Vuex from 'vuex'
import { lang } from './modules/lang'

Vue.use(Vuex)

// console.log(lang)

export default new Vuex.Store({
  state: {
    step: 0,
    locale: lang,
    uname: '',
    userInfo: '',
    result: '',
    showStep: false
  },
  getters: {
    getLang(state) {
      return state.locale
    },
    getUname(state, getters) {
      return state.uname || getters.getUserInfo.account
    },
    getUserInfo(state) {
      var info = localStorage.getItem('userInfo')
      return state.userInfo || (typeof info === 'string' ? JSON.parse(info) : '')
    },
    getStep(state) {
      return state.step
    },
    getResult(state) {
      return state.result
    },
    getMapConfig: () => (key) => {
      if (!key) { return }
      return Vue.prototype.$vueI18n.t(key) || {}
    },
    getShowStep(state) {
      return state.showStep
    }
  },
  mutations: {
    setLang(state, locale) {
      state.locale = locale
    },
    setUname(state, uname) {
      state.uname = uname
    },
    setResult(state, result) {
      state.result = result
    },
    setStep(state, step) {
      state.step = step
    },
    setShowStep(state, showStep) {
      state.showStep = showStep
    }
  },
  actions: {
    setLang({ commit }, locale) {
      commit('setLang', locale)
    },
    setUname({ commit }, uname) {
      commit('setUname', uname)
    },
    setStep({ commit }, step) {
      commit('setStep', step)
    },
    setResult({ commit }, result) {
      commit('setResult', result)
    },
    setShowStep({ commit }, showStep) {
      commit('setShowStep', showStep)
    }
  },
  modules: {}
})
