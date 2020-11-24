
import { localRequest } from './base.js'

export function getUser () {
  return localRequest({
    url: '/user/user.json',
    methods: 'get'
  })
}
