import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { constantRoutes } from '../../router/index'

const state = {
  token: getToken(),
  name: '',
  routes: [], // 动态路由
  username: '',
  btnPermission: []
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROUTER: (state, routes) => {
    state.routes = routes
  },
  SET_BTNS: (state, btnPermission) => {
    state.btnPermission = btnPermission
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password, captcha, hasImg } = userInfo
    return new Promise((resolve, reject) => {
      login(username, password, captcha, hasImg).then(response => {
        const data = response.data
        // 设置 sessionStorage-用户名
        sessionStorage.setItem('name', data.trueName)
        // 设置 store-用户名
        commit('SET_NAME', data.trueName)
        // 设置 sessionStorage-账号
        sessionStorage.setItem('username', data.username)
        // 设置 store-账号
        commit('SET_USERNAME', data.username)
        // 设置 store-token
        commit('SET_TOKEN', data.userId)
        // 设置 cookie-token
        setToken(data.userId)
        // 设置 sessionStorage-权限码
        sessionStorage.setItem('btnPermission', JSON.stringify(data.functionCodes))
        // 设置 store-权限码
        commit('SET_BTNS', data.functionCodes)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then((res) => {
        sessionStorage.clear()
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      sessionStorage.clear()
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 动态设置路由 此为设置设置途径
  setRouterList({ commit }, routes) {
    commit('SET_ROUTER', constantRoutes.concat(routes)) // 进行路由拼接并存储
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

