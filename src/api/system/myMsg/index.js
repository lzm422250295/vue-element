import request from '@/utils/request'

export function getUserMsg() {
  return request({
    url: '/menu/myMsg',
    method: 'get'
  })
}
