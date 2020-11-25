
import { localRequest } from './base.js'

export function userLogin (data) {
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

export function userList (data) {
  return localRequest({
    method: 'get',
    url: '/users',
    params: data
  })
}
