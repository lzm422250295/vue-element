import request from '@/utils/request'

export function getSysUser(from, pageNum, pageSize, total) {
  return request({
    url: '/departmentMage/list',
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
    url: '/departmentMage/init',
    method: 'post'
  })
}
export function getCheck() {
  return request({
    url: '/departmentMage/check',
    method: 'post'
  })
}
export function edit() {
  return request({
    url: '/departmentMage/edit',
    method: 'post'
  })
}
