import axios from 'axios'
import { Notification, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  // if (store.getters.token) {
  //   config.headers.Authorization = getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  // } else {
  //   config.headers.Authorization = 'Basic dnVlOnZ1ZQ==' // 增加客户端认证
  // }
  // config.headers['X-Tenant-Auth'] = getTenant() // 增加客户端认证
  // config.url = config.url.replace('{tenant}', getTenant())
  // return config
  // },
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code) {
      const { code, data } = res
      if (code !== 200) {
        if (code === 5001) { // session失效错误
          Notification.error({
            title: '错误',
            dangerouslyUseHTMLString: true,
            message: '<div><span style="color:red">登陆超时</span>，即将返回登陆界面</div>',
            duration: 2000,
            onClose: store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        } else if (code === 5002) { // 数据校验错误
          const mseArray = []
          for (let index = 0; index < data.validErrors.length; index++) {
            mseArray.push(`<div style="margin:0px 0px 5px;">${data.validErrors[index].defaultMessage}</div>`)
          }
          Message({
            dangerouslyUseHTMLString: true,
            message: mseArray.join(' '),
            type: 'warning',
            duration: 5 * 1000
          })
        } else { // 通用错误
          Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
        return Promise.reject('error')
      } else {
        if (res.message) {
          Message({
            message: res.message,
            type: 'success'
          })
        }
        return response.data
      }
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
