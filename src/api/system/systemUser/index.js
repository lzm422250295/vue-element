import request from '@/utils/request'

export function getSysUser(from, pageNum, pageSize, total) {
  return request({
    url: '/systemUser/list',
    method: 'post',
    data: {
      ...from,
      pageNum,
      pageSize,
      total
    }
  })
}
export function init() {
  return request({
    url: '/systemUser/init',
    method: 'post'
  })
}
export function getCheck() {
  return request({
    url: '/systemUser/check',
    method: 'post'
  })
}
export function edit() {
  return request({
    url: '/systemUser/edit',
    method: 'post'
  })
}
