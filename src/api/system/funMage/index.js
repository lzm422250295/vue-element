import request from '@/utils/request'

export function getSysUser(from, pageNum, pageSize, total) {
  return request({
    url: '/funMage/list',
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
    url: '/funMage/init',
    method: 'post'
  })
}
export function getCheck() {
  return request({
    url: '/funMage/check',
    method: 'post'
  })
}
export function edit() {
  return request({
    url: '/funMage/edit',
    method: 'post'
  })
}
