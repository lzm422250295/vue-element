import request from '@/utils/request'

export function getSysUser(from, pageNum, pageSize, total) {
  return request({
    url: '/compUser/list',
    method: 'post',
    data: {
      ...from,
      pageNum,
      pageSize,
      total
    }
  })
}
export function getCheck() {
  return request({
    url: '/compUser/check',
    method: 'post'
  })
}
export function edit() {
  return request({
    url: '/compUser/edit',
    method: 'post'
  })
}
