import request from '@/utils/request'

export function getList(from, pageNum, pageSize, total) {
  return request({
    url: '/rolePerMage/list',
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
    url: '/rolePerMage/init',
    method: 'post'
  })
}
// export function getCheck() {
//   return request({
//     url: '/rolePerMage/check',
//     method: 'post'
//   })
// }
// export function edit() {
//   return request({
//     url: '/rolePerMage/edit',
//     method: 'post'
//   })
// }
