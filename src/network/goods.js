import { localRequest } from './base.js'
//  商品分类数据列表
export function goodsCategoryList (options) {
  return localRequest({
    method: 'get',
    url: '/categories',
    params:options
  })
}

//  添加分类
export function addGoodsCategory (options) {
  console.log(options)
  return localRequest({
    method: 'post',
    url: '/categories',
    data:options
  })
}

// 编辑分类
export function editGoodsCategory (options) {
  return localRequest({
    method: 'put',
    url: `categories/${options.cat_id}`,
    data:options
  })
}

// 删除分类
export function deleteGoodsCategory (options) {
  return localRequest({
    method: 'delete',
    url: `categories/${options.cat_id}`
  })
}


