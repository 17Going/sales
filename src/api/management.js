import request from '@/utils/request'

/* BEGIN: 部门API接口 */
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
/* END: 部门API接口 */

/* BEGIN: 用户API接口 */
// 用户列表数据接口
export function userGetAll(query) {
  return request({
    url: '/user/getAll',
    method: 'get',
    data: query
  })
}
/* END: 用户API接口 */
