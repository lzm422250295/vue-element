import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { addRouter } from '@/router/addRouter'
import { getRouter } from './api/user'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist
var data = false // 是否获取路由

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 设置标题
  document.title = getPageTitle(to.meta.title)

  // 判断cookie是否存在，存在即已登陆
  const hasToken = getToken()

  if (hasToken) {
    if (to.path !== '/login') {
      // 前往非白名单页面判断是否获取了路由
      if (data) {
        next()
      } else {
        // 获取路由
        gotRouter(to, next)
      }
    } else {
      // 登陆页重定向到首页
      Message({ message: '您已经登录', type: 'info' })
      next('/')
    }
  } else {
    // cookie不在，则未登陆
    if (to.path !== '/login') {
      // cookie不在，则未登陆
      data = false
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    } else {
      next()
    }
  }
  router.afterEach(() => {
    NProgress.done() // 结束Progress
  })
})

function gotRouter(to, next) {
  if (sessionStorage['router']) { // 刷新页面从缓存种获取路由
    new Promise((resolve) => {
      const asyncRouter = addRouter(JSON.parse(sessionStorage.getItem('router')))
      resolve(asyncRouter)
    })
      .then(asyncRouter => {
        router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
        data = true // 记录路由获取状态
        store.dispatch('user/setRouterList', asyncRouter) // 存储到vuex
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
      })
  } else {
    getRouter(store.getters.token) // 获取路由
      .then(res => {
        // 第一次获取存到sessionStorage
        sessionStorage.setItem('router', JSON.stringify(res.data))
        const asyncRouter = addRouter(res.data) // 进行递归解析
        console.log(asyncRouter)
        // store.dispatch('setroles', res.data.data.permit)  颗粒权限控制
        // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
        asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
        return asyncRouter
      })
      .then(asyncRouter => {
        router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
        data = true // 记录路由获取状态
        store.dispatch('user/setRouterList', asyncRouter) // 存储到vuex
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
      })
      .catch(e => {
        removeToken()
      })
  }
}
