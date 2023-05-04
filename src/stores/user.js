import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { USER_TOKEN_STORAGE, USER_INFO_STORAGE } from '@/constants/user'
import * as userApi from '@apis/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(uni.getStorageSync(USER_INFO_STORAGE) || {})
  const userToken = ref(uni.getStorageSync(USER_TOKEN_STORAGE) || null)
  // if (import.meta.env.DEV) {
  //   userToken.value = import.meta.env.VITE_TOKEN_TEST
  // } else {
  //   userToken.value = uni.getStorageSync(USER_TOKEN_STORAGE) || null
  // }
  const userIsLogin = computed(() => !!userToken)

  // 用户登录
  async function userLogin (form) {
    const res = await userApi.postUserLogin(form)
    setUserToken(res.accessToken)
    await getUserInfo()
  }

  // 用户注册
  async function userRegister (form) {
    await userApi.postUserRegister(form)
    await userLogin({
      password: form.password,
      account: form.account,
      grantType: 'password',
      tenantId: '000001'
    })
  }

  // 设置用户信息
  function setUserInfo (info) {
    userInfo.value = info
    uni.setStorageSync(USER_INFO_STORAGE, info)
  }
  // 获取用户信息
  async function getUserInfo () {
    const data = await userApi.getUserInfo()
    setUserInfo(data)
    return userInfo.value
  }
  // 移除用户信息
  function removeUserInfo () {
    userInfo.value = null
    uni.removeStorageSync(USER_INFO_STORAGE)
  }

  // 设置用户token
  function setUserToken (token) {
    userToken.value = token
    uni.setStorageSync(USER_TOKEN_STORAGE, token)
  }
  // 移除用户token
  function removeUserToken () {
    userToken.value = null
    uni.removeStorageSync(USER_TOKEN_STORAGE)
  }

  return {
    userInfo,
    userToken,
    userIsLogin,
    userLogin,
    userRegister,
    getUserInfo,
    setUserInfo,
    removeUserInfo,
    setUserToken,
    removeUserToken
  }
})