import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }
export function login(username, password, captcha, hasImg) {
  return request({
    // url: '/user/login',
    url: '/user/login',
    method: 'post',
    data: hasImg ? { username, password, captcha } : { username, password },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getImgCode() {
  return request({
    url: '/user/imgCode',
    // url: '/captcha',
    method: 'get'
  })
}

export function getRouter() {
  return request({
    url: '/user/router',
    method: 'get'
    // url: '/config/cmenu',
    // method: 'get'
  })
}
