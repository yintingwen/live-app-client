<script setup>
import { useUserStore } from '@stores/user'
const userStore = useUserStore()
const activeType = ref(1) // 1:登录 0:注册
const loginForm = ref({
  password: '',
  account: '',
  grantType: 'password',
  tenantId: '000001',
})
const registerForm = ref({
  password: '',
  account: '',
  phone: '',
  code: '',
})
// 点击切换登录或注册
function onTapSwitch(type) {
  activeType.value = type
}
// 点击登录或注册按钮
async function onTapButton() {
  const form = activeType.value ? loginForm.value : registerForm.value
  const result = checkForm(form)
  if (!result) return

  try {
    uni.showLoading({
      title: activeType.value ? '登录中...' : '注册中...',
      mask: true,
    })
    if (activeType.value) {
      await login()
    } else {
      await register()
    }
  } finally {
    uni.hideLoading()
  }
}

function checkForm(form) {
  const { account, password } = form
  let msg = ''
  if (!account.trim()) msg = '请输入手机号'
  else if (!uni.$u.test.mobile(account)) msg = '请输入正确的手机号'
  else if (!password.trim()) msg = '请输入密码'
  msg && uni.showToast({ title: msg, icon: 'none' })
  return !msg
}

async function login() {
  await userStore.userLogin(loginForm.value)
  uni.switchTab({
    url: '/pages/home/home',
  })
}

async function register() {
  registerForm.value.phone = register.value.phone
  await userStore.userRegister(registerForm.value)
  uni.switchTab({
    url: '/pages/home/home',
  })
}
</script>

<template>
  <co-page :pageFill="true" :isTabPage="false">
    <view class="login-page">
      <view class="form-container">
        <view class="title">
          {{ activeType ? '登录' : '注册' }}
        </view>
        <view v-if="activeType" class="form login-form">
          <view class="form-item">
            <view class="form-item-label">账号</view>
            <input
              v-model="loginForm.account"
              class="form-item-input"
              type="number"
              placeholder="请输入手机号"
            />
          </view>
          <view class="form-item">
            <view class="form-item-label">密码</view>
            <input
              v-model="loginForm.password"
              class="form-item-input"
              type="password"
              placeholder="请输入密码"
            />
          </view>
        </view>
        <view v-else class="form register-form">
          <view class="form-item">
            <view class="form-item-label">账号</view>
            <input
              v-model="registerForm.account"
              class="form-item-input"
              type="text"
              placeholder="请输入手机号"
            />
          </view>
          <view class="form-item">
            <view class="form-item-label">密码</view>
            <input
              v-model="registerForm.password"
              class="form-item-input"
              :password="true"
              placeholder="请输入密码"
            />
          </view>
          <view class="form-item">
            <view class="form-item-label">邀请码</view>
            <input
              v-model="registerForm.code"
              class="form-item-input"
              type="text"
              placeholder="请输入密码"
            />
          </view>
        </view>
        <button
          class="form-button flex-center"
          :style="{ marginTop: activeType ? '100rpx' : '0' }"
          @tap="onTapButton"
        >
          {{ activeType ? '登录' : '注册' }}
        </button>
        <view v-if="activeType" class="form-forget flex-center"> 忘记密码？ </view>
      </view>
      <view class="login-switch flex-center">
        <view class="flex" v-if="activeType">
          已有账号，去<view class="switch-btn" @tap="onTapSwitch('register')">注册</view>
        </view>
        <view class="flex" v-else>
          已有账号，去<view class="switch-btn" @tap="onTapSwitch('login')">登录</view>
        </view>
      </view>
      <u-safe-bottom />
    </view>
  </co-page>
</template>

<style lang="scss">
page {
  height: 100%;
}
.login-page {
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(239.18deg, rgba(184, 58, 243, 1) 0%, rgba(105, 80, 251, 1) 100%);
  padding-top: 226rpx;

  .form-container,
  .login-switch {
    position: relative;
    margin: 0 auto;
    border-radius: 26rpx;
    background-color: #fff;
    box-sizing: border-box;
  }

  .form-container {
    height: 948rpx;
    width: 686rpx;
    border-radius: 26rpx;
    box-shadow: 0 40rpx 40rpx 0 rgba(0, 0, 0, 0.08);
    z-index: 1;
    padding: 64rpx 67rpx 0;

    .title {
      font-size: 48rpx;
      font-weight: 600;
      line-height: 32rpx;
      color: rgba(43, 43, 43, 1);
      margin-bottom: 74rpx;
    }

    .form {
      .form-item {
        margin-bottom: 40rpx;

        .form-item-label {
          font-size: 30rpx;
          font-weight: 400;
          line-height: 42rpx;
          color: rgba(155, 155, 155, 1);
          margin-bottom: 16rpx;
        }

        .form-item-input {
          height: 100rpx;
          background-color: rgba(245, 245, 245, 1);
          padding: 0 58rpx;
          border-radius: 50rpx;
          font-size: 30rpx;
        }
      }
    }

    .form-button {
      height: 100rpx;
      background: linear-gradient(239.18deg, rgba(184, 58, 243, 1) 0%, rgba(105, 80, 251, 1) 100%);
      border-radius: 50rpx;
      font-size: 30rpx;
      color: #fff;
    }

    .form-forget {
      color: rgba(38, 38, 40, 1);
      font-size: 30rpx;
      line-height: 42rpx;
      margin-top: 78rpx;
    }
  }

  .login-switch {
    height: 112rpx;
    width: 646rpx;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-size: 30rpx;
    line-height: 42rpx;

    .switch-btn {
      color: rgba(130, 71, 243, 1);
    }
  }
}
</style>
