import { localRequest } from './base.js'
// 获取菜单列表
export function menuList () {
  return localRequest({
    method: 'get',
    url: '/menus'
  })
}
