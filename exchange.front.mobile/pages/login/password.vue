<template>
  <view class="asset-password-page">
    <login-header>
      <block slot="title">{{$t('login.title.password')}}</block>
    </login-header>
    <view class="password-body">
      <view class="c-form">
        <view class="c-form-item">
          <c-icon class="c-input-left" name="lock" size="32"></c-icon>
          <input
            type="number"
            password
            v-model="pay_password"
            :placeholder="$t('login.placehold.pay_password')"
            class="c-input"
            placeholder-class="c-input-placehold"
            maxlength="6"
          />
          <view class="tip" v-if="$t._i18n === 'en-US'">6位数字</view>
        </view>
        <view class="c-form-item">
          <c-icon class="c-input-left" name="lock" size="32"></c-icon>
          <input
            type="number"
            password
            v-model="re_pay_password"
            :placeholder="$t('login.placehold.re_pay_password')"
            class="c-input"
            placeholder-class="c-input-placehold"
          />
        </view>
      </view>
      <view class="p-30">
        <button @tap="onTapRegister" class="c-button">{{$t('login.register')}}</button>
      </view>
    </view>
  </view>
</template>

<script>
import LoginHeader from '../../components/login/LoginHeader'
import graceChecker from '../../utils/graceUI/jsTools/graceChecker'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      userInfo: {},
      pay_password: '',
      re_pay_password: ''
    }
  },
  computed: {
    form () {
      return {
        ...this.userInfo,
        pay_password: `${parseInt(this.pay_password) || ''}`,
        re_pay_password: `${parseInt(this.re_pay_password) || ''}`
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    onTapRegister () {
      const result = this.checkForm()
      if (!result) {
        return this.toast(graceChecker.error)
      }
      this.register()
    },
    /**
     * 校验表单
     */
    checkForm () {
      const rules = [
        { name: 'pay_password', checkType: 'notnull', errorMsg: 'login.placehold.pay_password' },
        { name: 'pay_password', checkType: 'string', checkRule: '6', errorMsg: 'login.error.pay_password_limit' },
        { name: 're_pay_password', checkType: 'notnull', errorMsg: 'login.placehold.re_pay_password' },
        {
          name: 're_pay_password',
          checkType: 'same',
          checkRule: this.form.pay_password,
          errorMsg: 'login.error.password_no_same'
        }
      ]

      return graceChecker.check(this.form, rules)
    },
    /**
     * 注册
     */
    async register () {
      this.showFullLoading('')
      try {
        await this.api.user.register(this.form)
        this.hideFullLoading()
				
				// #ifdef  APP-PLUS
				this.toast('注册成功, 正在登陆')
				this.showFullLoading()
        await this.login(this.form)
				// #endif
				
				// #ifdef H5
				this.router.navigateTo('/pages/download/download')
				// #endif
				
      } catch (error) { }
      this.hideFullLoading()
    }
  },
  onLoad (e) {
    this.userInfo = e
  },
  components: {
    LoginHeader
  }
}
</script>

<style lang="scss" scoped >
.asset-password-page {
  .tip {
    margin-left: 25rpx;
    background: #e0e0e0;
    color: white;
    @include size(137, 42);
    line-height: 42rpx;
    text-align: center;
    border-radius: 10rpx;
  }
}
</style>
