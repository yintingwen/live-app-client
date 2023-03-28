import router from '../../utils/router'
import { user as userApi } from '../../api'

export default {
  namespaced: true,
  state: {
    info: {}, // 用户信息
    login: false // 登录状态
  },
  getters: {
    // 是否是商铺
    isSeller (state) {
      return !!state.info.is_seller
    },
    // 是否登录
    isLogin (state) {
      return state.login
    },
    // 是否是代理
    isAgent (state) {
      return state.agent_id > 0
    }
  },
  mutations: {
    loginStatus (state, status) {
      state.login = status
    },
    userInfo (state, info) {
      state.info = info
    }
  },
  actions: {
    /**
     * 获取用户信息
     */
    async getUserInfo ({ commit }) {
      const message = await userApi.info()
      commit('userInfo', message)
    },
    /**
     * 清楚用户信息
     * @param {*} param0 
     */
    clearUserInfo ({ commit }) {
      commit('userInfo', {})
    },
    /**
     * 登录
     */
    async login ({ commit, dispatch }, data) {
      try {
        const message = await userApi.login(data) // 登录
        uni.setStorageSync('token', message) // 存储token
        commit('loginStatus', true) // 修改状态
        dispatch('getUserInfo') // 获取用户信息
        router.switchTab('/pages/home/index') // 跳转登录页
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * 登出
     */
    async logout ({ commit, dispatch }) {
      await userApi.logout() // 退出
      uni.removeStorageSync('token') // 删除token
      commit('loginStatus', false)  // 修改状态
      dispatch('clearUserInfo') // 清除用户信息
      router.navigateTo('/pages/login/index') // 跳转登录页
    }
  }
}