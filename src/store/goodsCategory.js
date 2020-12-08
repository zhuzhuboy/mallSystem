export default {
  namespaced: true,
  state: {

    addGoodsCategoryDialogVisible:false,//添加商品分类对话框的显示和隐藏
    editGoodsCategoryDialogVisible:false,//编辑修改商品分类对话框的显示和隐藏
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    setAddGoodsCategoryDialogVisible(state, payload) {
      state.addGoodsCategoryDialogVisible = payload
    },
    setEditGoodsCategoryDialogVisible(state, payload) {
      state.editGoodsCategoryDialogVisible = payload
    },
  }
}
