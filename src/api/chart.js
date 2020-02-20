import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/chart/list',
    method: 'get',
    params
  })
}
