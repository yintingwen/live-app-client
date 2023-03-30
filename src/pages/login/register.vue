<template>
  <view class="register-page">
    <login-header>
      <view @tap="onTapToggle" class="pt-20 pr-40 c-white ta-right fw">{{$t(toggleName)}}</view>
      <block slot="title">{{$t(currentName)}}</block>
    </login-header>
    <view class="register-body">
      <view class="c-form">
        <!-- 手机号或者账号 -->
        <block>
          <view v-if="isMobile" class="c-form-item">
            <view class="c-input-left">+86</view>
            <input
              v-model="mobile"
              type="number"
              :placeholder="$t('login.placehold.mobile')"
              class="c-input"
              placeholder-class="c-input-placehold"
            />
            <view @tap="onTapSend" class="c-primary">{{ sms }}</view>
          </view>
          <view v-else class="c-form-item">
            <c-icon class="c-input-left" name="email" size="32"></c-icon>
            <input
              type="text"
              v-model="email"
              :placeholder="$t('login.placehold.email')"
              class="c-input"
              placeholder-class="c-input-placehold"
            />
            <view @tap="onTapSend" class="c-primary">{{ sms }}</view>
          </view>
        </block>
        <!-- 验证码 -->
        <view class="c-form-item">
          <c-icon class="c-input-left" name="safety" size="32"></c-icon>
          <input
            v-model="code"
            :placeholder="$t('login.placehold.sms')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
        </view>
        <!-- 邀请码 -->
        <view class="c-form-item">
          <c-icon class="c-input-left fw" name="yqm" size="32"></c-icon>
          <input
            v-model="extension_code"
            :placeholder="$t('login.placehold.yqm')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
        </view>
        <!-- 密码 -->
        <view class="c-form-item">
          <c-icon class="c-input-left" name="lock" size="32"></c-icon>
          <input
            type="password"
            v-model="password"
            :placeholder="$t('login.placehold.password')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
        </view>
        <!-- 重复密码 -->
        <view class="c-form-item">
          <c-icon class="c-input-left" name="lock" size="32"></c-icon>
          <input
            type="password"
            v-model="re_password"
            :placeholder="$t('login.placehold.re_password')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
        </view>
      </view>
      <view class="pb-65 pt-45 c-warning ta-center c-xxs">{{$t('login.tip.register')}}</view>
      <button class="c-button mx-30" @tap="onTapNext">{{$t('common.next')}}</button>
    </view>
  </view>
</template>

<script>
import LoginHeader from '../../components/login/LoginHeader'

import graceChecker from '../../utils/graceUI/jsTools/graceChecker.js'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      type: 'mobile',
      mobile: '', // 手机
      email: '', // 邮箱
      extension_code: '', // 邀请码
      password: '', // 密码
      re_password: '', // 重复密码
      code: '' // 验证码
    }
  },
  computed: {
    ...mapState(['mobileSMS', 'emailSMS']),
    isMobile () {
      return this.type === 'mobile'
    },
    toggleName () {
      return this.isMobile ? 'login.title.register.email' : 'login.title.register.mobile'
    },
    currentName () {
      return this.isMobile ? 'login.title.register.mobile' : 'login.title.register.email'
    },
    sms () {
      const type = this.isMobile ? this.mobileSMS : this.emailSMS
      return type ? `${type}s` : this.$t('login.sms')
    },
    // 注册表单
    registerForm () {
      return {
        type: this.isMobile ? 'mobile' : '',
        user_string: this.isMobile ? this.mobile : this.email,
        password: this.password,
        re_password: this.re_password,
        code: this.code,
        extension_code: this.extension_code
      }
    },
    // 验证码表单
    SMSFrom () {
      return {
        type: '',
        user_string: this.registerForm.user_string
      }
    }
  },
  methods: {
    ...mapActions(['setSMS']),
    /**
     * 点击切换注册方式
     */
    onTapToggle () {
      this.type = this.isMobile ? 'email' : 'mobile'
    },
    /**
     * 点击下一步
     */
    onTapNext () {
      const result = this.checkForm()
      if (!result) {
        return this.toast(graceChecker.error)
      }
      this.router.navigateTo('/pages/login/password', this.registerForm)
    },
    /**
     * 点击发送验证码
     */
    onTapSend () {
      if (this[`${this.type}SMS`]) return
      const rules = [
        {
          name: 'user_string',
          checkType: 'notnull',
          errorMsg: this.isMobile ? 'login.placehold.mobile' : 'login.placehold.email'
        },
        {
          name: 'user_string',
          checkType: this.isMobile ? 'phoneno' : 'email',
          errorMsg: this.isMobile ? 'login.error.inputMobile' : 'login.error.inputEmail'
        }
      ]
      const result = graceChecker.check(this.registerForm, rules)
      if (!result) {
        return this.toast(graceChecker.error)
      }
      this.sendSMS()
    },
    /**
     * 校验表单
     */
    checkForm () {
      const rules = [
        {
          name: 'user_string',
          checkType: 'notnull',
          errorMsg: this.isMobile ? 'login.placehold.mobile' : 'login.placehold.email'
        },
        {
          name: 'user_string',
          checkType: this.isMobile ? 'phoneno' : 'email',
          errorMsg: this.isMobile ? 'login.error.inputMobile' : 'login.error.inputEmail'
        },
        {
          name: 'code',
          checkType: 'notnull',
          errorMsg: 'login.placehold.sms'
        },
        {
          name: 'password',
          checkType: 'notnull',
          errorMsg: 'login.placehold.password'
        },
        {
          name: 'password',
          checkType: 'string',
          checkRule: '6,16',
          errorMsg: 'login.placehold.password_limit'
        },
        {
          name: 're_password',
          checkType: 'same',
          checkRule: this.registerForm.password,
          errorMsg: 'login.error.password_no_same'
        },
        {
          name: 'extension_code',
          checkType: 'notnull',
          errorMsg: 'login.placehold.yqm'
        }
      ]

      return graceChecker.check(this.registerForm, rules)
    },
    /**
     * 发送验证码
     */
    async sendSMS () {
      this.showFullLoading()
      try {
        const message = await this.api.common[`${this.type}SMS`](this.SMSFrom)
        this.toast('login.toast.send_success')
        this.setSMS({ type: this.type, time: 60 })
      } catch (error) { }
      this.hideFullLoading()
    }
  },
  onLoad (e) {
    this.extension_code = e.extension_code || ''
  },
  components: {
    LoginHeader
  }
}
</script>

<style lang="scss" scoped>
.register-page {
}
</style>
 ·