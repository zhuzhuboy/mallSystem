import {
  localRequest
} from './base.js'
//  商品分类数据列表
export function goodsCategoryList(options) {
  return localRequest({
    method: 'get',
    url: '/categories',
    params: options
  })
}

//  添加分类
export function addGoodsCategory(options) {
  console.log(options)
  return localRequest({
    method: 'post',
    url: '/categories',
    data: options
  })
}

// 编辑分类
export function editGoodsCategory(options) {
  return localRequest({
    method: 'put',
    url: `categories/${options.cat_id}`,
    data: options
  })
}

// 删除分类
export function deleteGoodsCategory(options) {
  return localRequest({
    method: 'delete',
    url: `categories/${options.cat_id}`
  })
}

// 参数列表

export function paramsList(options) {
  return localRequest({
    method: 'get',
    url: `categories/${options.id}/attributes`,
    params: options
  })
}

// 添加动态参数或者静态属性

export function addPropsOrParams(options) {
  return localRequest({
    method: 'post',
    url: `categories/${options.id}/attributes`,
    params: options
  })
}

// 根据 ID 查询参数
export function searchParamsByID(options) {
  return localRequest({
    method: 'get',
    url: `categories/${options.id}/attributes/${options.attrId}`,
    params: options
  })
}

//  编辑提交参数

export function modifyParamsOrProps(options) {
  return localRequest({
    method: 'put',
    url: `categories/${options.id}/attributes/${options.attrId}`,
    data: options
  })
}

// 删除参数
export function deleteParamsOrProps(options) {
  return localRequest({
    method: 'delete',
    url: `categories/${options.id}/attributes/${options.attrid}`,
  })
}


// 编辑提交参数
export function editSubmitParams(options) {
  console.log(options)
  return localRequest({
    method: 'put',
    url: `categories/${options.id}/attributes/${options.attrId}`,
    data: options
  })
}
