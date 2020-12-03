export default {
  namespaced: true,
  state: {
    modifyRoleDialogVisible: false, //修改角色对话框显示隐藏状态
    currentRoleInfo:null,//当前编辑的角色
    newPowerData:null,//是当前角色下最新的权限数据
    distributionPowerDialogVisible:false,//分配权限对话框显示与隐藏
    allPowerList:[],//所有权限列表
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
    },
    setNewPowerData(state, payload){
      state.newPowerData = payload
    },
    setDistributionPowerDialogVisible(state, payload){
      state.distributionPowerDialogVisible = payload
    },
    setAllPowerList(state, payload){
      state.allPowerList = payload
    },
  }
}
