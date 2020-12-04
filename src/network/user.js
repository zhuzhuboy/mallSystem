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
    data: {
      username: data.user,
      password: data.password,
      email: data.email,
      mobile: data.phone,

    }
  })
}

// 根据 ID 查询用户信息
export function queryUserInfo(id) {
  return localRequest({
    method: 'get',
    url: `users/${id}`,

  })
}

//  编辑用户提交
export function editUserInfo(option) {
  return localRequest({
    method: 'put',
    url: `users/${option.id}`,
    data: option
  })
}

//  删除用户提交
export function deleteUserInfo(option) {
  return localRequest({
    method: 'delete',
    url: `users/${option.id}`,
    data: option
  })
}

//  分配角色
export function assignUserRole(option) {
  console.log(option)
  console.log(`users/${option.id}/role`)
  return localRequest({
    method: 'delete',

    url: `users/${option.id}/role`,
    data: option
  })
}

//角色列表
export function roleList(option) {

  return localRequest({
    method: 'get',
    url: `roles`,
  })
}

//分配用户角色


export function distributionUserRole(option) {
  return localRequest({
    method: 'put',
    url: `users/${option.id}/role`,
    data:option
  })
}
