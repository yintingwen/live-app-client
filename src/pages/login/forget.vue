<template>
  <view class="forget-page">
    <login-header>
      <block slot="title">{{$t('login.title.forget')}}</block>
    </login-header>
    <view class="forget-body">
      <view class="c-form">
        <view class="c-form-item">
          <c-icon class="c-input-left" name="account" size="32"></c-icon>
          <input
            type="text"
            v-model="user_string"
            :placeholder="$t('login.placehold.account')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
        </view>
        <view class="c-form-item">
          <c-icon class="c-input-left" name="lock" size="32"></c-icon>
          <input
            type="text"
            v-model="password"
            password
            :placeholder="$t('login.placehold.new_password')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
        </view>
        <view class="c-form-item">
          <c-icon class="c-input-left" name="lock" size="32"></c-icon>
          <input
            type="text"
            v-model="re_password"
            password
            :placeholder="$t('login.placehold.re_password')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
        </view>
        <view class="c-form-item">
          <input
            type="text"
            v-model="code"
            :placeholder="$t('login.placehold.sms')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
          <view @tap="onTapSend" class="c-primary">{{sms}}</view>
        </view>
      </view>
      <view class="mt-70 pt-15">
        <button @tap="onTapConfirm" class="c-button mx-30">{{$t('common.confirm')}}</button>
      </view>
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
      type: 'forget',
      user_string: '',
      password: '',
      re_password: '',
      code: ''
    }
  },
  computed: {
    ...mapState(['forgetSMS']),
    forgetForm () {
      return {
        user_string: this.user_string,
        password: this.password,
        re_password: this.re_password,
        code: this.code
      }
    },
    // 验证码表单
    SMSForm () {
      return {
        type: 'forget',
        user_string: this.user_string
      }
    },
    // 验证码提示
    sms () {
      return this.forgetSMS ? `${this.forgetSMS}s` : this.$t('login.sms')
    },
    // 是否是手机
    isMobile () {
      return this.user_string.indexOf('@') === -1
    }
  },
  methods: {
    ...mapActions(['setSMS']),
    /**
     * 点击获取验证码
     */
    onTapSend () {
      if (this.forgetSMS) return
      if (!this.user_string) return this.toast('login.placehold.account')
      const result = this.checkUserString()
      if (!result) return this.toast(graceChecker.error)
      this.sendSMS()
    },
    /**
     * 点击确认
     */
    onTapConfirm () {
      const result = this.checkForm()
      if (!result) return this.toast(graceChecker.error)
      this.forget()
    },
    /**
     * 发送验证码
     */
    async sendSMS () {
      const apiType = this.isMobile ? 'mobile' : 'email'

      this.showFullLoading()
      try {
        const message = await this.api.common[`${apiType}SMS`](this.SMSForm)
        this.toast('login.toast.send_success')
        this.setSMS({ type: this.type, time: 60 })
      } catch (error) { }
      this.hideFullLoading()
    },
    checkUserString () {
      const rules = [
        {
          name: 'user_string',
          checkType: this.isMobile ? 'phoneno' : 'email',
          errorMsg: this.isMobile ? 'login.error.inputMobile' : 'login.error.inputEmail'
        }
      ]
      return graceChecker.check(this.forgetForm, rules)
    },
    /**
     * 校验表单
     */
    checkForm () {
      const rules = [
        {
          name: 'user_string',
          checkType: 'notnull',
          errorMsg: 'login.placehold.account'
        },
        {
          name: 'user_string',
          checkType: this.isMobile ? 'phoneno' : 'email',
          errorMsg: this.isMobile ? 'login.error.inputMobile' : 'login.error.inputEmail'
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
          checkRule: this.forgetForm.password,
          errorMsg: 'login.error.password_no_same'
        },
        {
          name: 'code',
          checkType: 'notnull',
          errorMsg: 'login.placehold.sms'
        }
      ]

      return graceChecker.check(this.forgetForm, rules)
    },
    /**
     * 发送表单忘记密码
     */
    async forget () {
      this.showFullLoading()
      try {
        await this.api.user.forget(this.forgetForm)
        this.router.reLaunch('/pages/login/index')
        this.toast('common.success')
      } catch (error) { }
      this.hideFullLoading()
    }
  },
  components: {
    LoginHeader
  }
}
</script>

<style lang="scss" scoped>
.forget-page {
}
</style>
