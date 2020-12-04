export default {
  namespaced: true,
  state: {
    centerDialogVisible: false, //新增用户对话框的显示和隐藏
    addFormRef: null, //保存的form实例
    modifyDialogVisible: false,
    currentUserInfo: null, //当前激活的用户（用于修改）
    distributionRoleDialogVisible: false, //分配角色对话框显示与隐藏
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    setDialogVisible(state, payload) {
      state.centerDialogVisible = payload
    },
    setModifyDialogVisible(state, payload) {
      state.modifyDialogVisible = payload
    },
    setAddFormRef(state, payload) {
      state.addFormRef = payload
    },
    setCurrentUserInfo(state, payload) {
      state.currentUserInfo = payload
    },
    setDistributionRoleDialogVisible(state, payload) {
      state.distributionRoleDialogVisible = payload
    },
  }
}
