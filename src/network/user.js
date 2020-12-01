import {
  localRequest
} from './base.js'

export function userLogin(data) {
  console.log(data)
  return localRequest({
    method: 'post',
    url: '/login',
    data: {
      username: data.user,
      password: data.password
    }
  })
}
// 用户列表
export function userList(data) {
  return localRequest({
    method: 'get',
    url: '/users',
    params: data
  })
}
// 修改用户状态
export function modifyUserState(url) {
  // 把参数写在了路径里面
  return localRequest({
    method: 'put',
    url: url,
  })
}
// 添加用户
export function addUserRequest(data) {
  return localRequest({
    method: 'post',
    url: '/users',
    data:{
      username:data.user,
      password:data.password,
      email:data.email,
      mobile:data.phone,

    }
  })
}
