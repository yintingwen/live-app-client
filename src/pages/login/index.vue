<template>
  <view class="login-page">
    <login-header>
      <view @tap="onTapToggle" class="pt-20 pr-40 c-white ta-right fw">{{$t(toggleName)}}</view>
      <block slot="title">{{$t(currentName)}}</block>
    </login-header>
    <view class="login-body">
      <view class="c-form mb-70">
        <block>
          <view v-if="isMobile" class="c-form-item">
            <view class="c-input-left">+86</view>
            <input
              type="number"
              class="c-input"
              v-model="mobile"
              :placeholder="$t('login.placehold.mobile')"
              placeholder-class="c-input-placehold"
            />
          </view>
          <view v-else class="c-form-item">
            <c-icon class="c-input-left" name="email" size="32"></c-icon>
            <input
              class="c-input"
              v-model="email"
              :placeholder="$t('login.placehold.email')"
              placeholder-class="c-input-placehold"
            />
          </view>
        </block>
        <view class="c-form-item">
          <c-icon class="c-input-left" name="lock" size="32"></c-icon>
          <input
            v-model="password"
            :password="!showPassword"
            :placeholder="$t('login.placehold.password')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
          <view @tap="onTapEye" class="c-input-right">
            <c-icon :name="eye" size="32"></c-icon>
          </view>
        </view>
      </view>
      <view class="px-30 mb-45 pt-15">
        <button @tap="onTapLogin" class="c-button">{{$t('login.index')}}</button>
      </view>
      <view class="c-primary flex-between px-35">
        <navigator url="/pages/login/register">{{$t('login.register')}}</navigator>
        <navigator url="/pages/login/forget">{{$t('login.forget')}}</navigator>
      </view>
    </view>
  </view>
</template>

<script>
import LoginHeader from '../../components/login/LoginHeader'

import graceChecker from '../../utils/graceUI/jsTools/graceChecker.js'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      type: 'mobile',
      mobile: '',
      email: '',
      password: '',
      showPassword: false
    }
  },
  computed: {
    isMobile() {
      return this.type === 'mobile'
    },
    toggleName() {
      return this.isMobile ? 'login.title.login.email' : 'login.title.login.mobile'
    },
    currentName() {
      return this.isMobile ? 'login.title.login.mobile' : 'login.title.login.email'
    },
    form() {
      return {
        user_string: this.isMobile ? this.mobile : this.email,
        password: this.password
      }
    },
    eye() {
      return this.showPassword ? 'eye-open' : 'eye-close'
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    /**
     * 切换登录方式
     */
    onTapToggle() {
      this.type = this.isMobile ? 'email' : 'mobile'
    },
    /**
     * 点击登录
     */
    async onTapLogin() {
      const result = this.checkForm()
      if (!result) {
        return this.toast(graceChecker.error)
      }
      this.showFullLoading()
      try {
        const message = await this.login(this.form)
      } catch (error) {}
      this.hideFullLoading()
    },
    /**
     * 检验表单
     */
    checkForm() {
      const rules = [
        {
          name: 'user_string',
          checkType: 'notnull',
          errorMsg: this.isMobile ? 'login.placehold.mobile' : 'login.placehold.email'
        },
        {
          name: 'password',
          checkType: 'notnull',
          errorMsg: 'login.placehold.password'
        }
      ]

      return graceChecker.check(this.form, rules)
    },
    onTapEye() {
      this.showPassword = !this.showPassword
    }
  },
  components: {
    LoginHeader
  }
}
</script>

<style lang="scss">
.login-page {
}
</style>