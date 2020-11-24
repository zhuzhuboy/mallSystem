import { localRequest } from './base.js'

export function isValidate () {
  return localRequest({
    url: '/user/goon.json',
    methods: 'get'
  })
}
