import { localRequest } from './base.js'
//  商品分类数据列表
export function goodsCategoryList (options) {
  return localRequest({
    method: 'get',
    url: '/categories',
    params:options
  })
}
