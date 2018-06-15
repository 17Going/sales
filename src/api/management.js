import request from '@/utils/request'

export function departmentCreate(query) {
  return request({
    url: '/department/create',
    method: 'post',
    data: query
  })
}
