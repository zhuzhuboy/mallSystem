import {
  localRequest
} from './base.js'
//所有权限列表
export function getPowerList(type) {
  return localRequest({
    method: 'get',
    url: `rights/${type}`,
  })
}


//  角色列表
export function roleList(option) {

  return localRequest({
    method: 'get',
    url: `roles`,
  })
}

// 根据 ID 查询角色

export function queryRoleById(id) {
  return localRequest({
    method: 'get',
    url: `roles/${id}`,
  })
}
// 编辑提交角色
export function modifyRole(option) {
  return localRequest({
    method: 'put',
    url: `roles/${option.id}`,
    data:option
  })
}

// 删除角色

export function deleteRole(id) {

  return localRequest({
    method: 'delete',
    url: `roles/${id}`,

  })
}
