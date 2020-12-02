export default {
  namespaced: true,
  state: {
    modifyRoleDialogVisible: false, //修改角色对话框显示隐藏状态
    currentRoleInfo:null,//当前编辑的角色
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    setModifyRoleDialog(state, payload) {
      state.modifyRoleDialogVisible = payload
    },
    setCurrentRoleInfo(state, payload){
      state.currentRoleInfo = payload
    }
  }
}
