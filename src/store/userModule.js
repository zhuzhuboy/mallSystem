export default {
  namespaced:true,
  state: {
    centerDialogVisible:false,
    addFormRef:null
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    setDialogVisible(state, payload) {
      state.centerDialogVisible = payload
    },
    setAddFormRef(state, payload) {
      state.addFormRef = payload
    }
  }
}
