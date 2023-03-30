import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { USER_TOKEN_STORAGE } from '@/constants/user'
import { postUserLogin } from '@apis/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const userToken = ref(uni.getStorageSync(USER_TOKEN_STORAGE) || null)
  const userIsLogin = computed(() => !!userToken)

  async function login (form) {
    form = { account: '17779100409', password: '123456', grantType: 'password', tenantId: VITE_USER_TENANT_ID }
    const res = await postUserLogin(form)
    
  }

  // 设置用户信息
  function setUserInfo (info) {
    userInfo.value = info
  }
  // 获取用户信息
  function getUserInfo () {
    if (userInfo.value === null) {
      // userInfo.value = uni.getStorageSync('userInfo')
    }
    return userInfo.value
  }
  // 移除用户信息
  function removeUserInfo () {
    userInfo.value = null
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
    getUserInfo,
    setUserInfo,
    removeUserInfo,
    setUserToken,
    removeUserToken
  }
})