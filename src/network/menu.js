import { localRequest } from './base.js'

export function menuList (data) {
  console.log(data)
  return localRequest({
    method: 'get',
    url: '/menus'
  })
}
