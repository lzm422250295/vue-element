import request from '@/utils/request'

export function getList(from, pageNum, pageSize, total) {
  return request({
    url: '/roleMage/list',
    method: 'post',
    data: {
      ...from,
      pageNum,
      pageSize,
      total
    }
  })
}
