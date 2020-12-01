import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './userModule.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    changeToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    commitChangeToken ({
      state,
      commit
    }, payload) {
      commit('changeToken', payload)
    }
  },
  modules: {
    userModule,
  }
})
