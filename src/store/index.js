import Vue from 'vue'
import Vuex from 'vuex'

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
  }
})
