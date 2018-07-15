import request from '@/utils/request'

export function getAll(query) {
  return request({
    url: '/salesManagement/list',
    method: 'get',
    params: query
  })
}
