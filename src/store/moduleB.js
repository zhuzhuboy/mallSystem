export default {
  namespaced:true,
  state: {
    name:"cuizhuo",
    age:18
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    setName(state, payload) {
      state.name = payload
    },
    setAge(state, payload) {
      state.age = payload
    }
  }
}
