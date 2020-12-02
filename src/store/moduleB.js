import {
  userList
} from 'network/user.js'
export default {
  namespaced: true,
  state: {
    name: "jasonDoggett",
    age: 18
  },
  getters: {

  },
  actions: {
    setNameAsync({
      commit
    }, payload) {
      // 返回一个promise。dispatch结果就是这个promise结果。可以在then中commit
      return new Promise(async (res, rej) => {
        let result = await userList(payload)
        if (result.meta.status === 200) {
          commit('setName', result.data.users)
          res('成功')
        } else {
          rej('失败')
        }

      })
    }
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
