import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS重置方案

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制

import vuescroll from 'vuescroll'// VUE滚动条
Vue.use(vuescroll, {
  ops: {
    bar: {
      showDelay: 500,
      background: '#1389fd',
      size: '5px'
    },
    rail: {
      size: '5px',
      background: '#cecece',
      gutterOfSide: '0px',
      opacity: 0.2
    },
    scrollPanel: {
      scrollingX: false
    }
  }
})

import { mockXHR } from '../mock'// 生产环境需删除
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
