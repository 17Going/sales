import request from '@/utils/request'

// 部门列表
export function departmentGetAll() {
  return request({
    url: '/department/getAll',
    method: 'get'
  })
}
// 创建部门
export function departmentCreate(query) {
  return request({
    url: '/department/create',
    method: 'post',
    data: query
  })
}
// 修改部门
export function departmentEdit(params) {
  return request({
    url: '/department/update',
    method: 'put',
    data: params
  })
}
// 移动部门
export function departmentMove(params) {
  return request({
    url: '/department/create',
    method: 'post',
    data: params
  })
}
// 删除部门
export function departmentDelte(params) {
  return request({
    url: '/department/delete',
    method: 'delete',
    data: params
  })
}