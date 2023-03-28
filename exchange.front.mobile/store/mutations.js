import { LANGUAGE, FULL_LOADING, MOBILE_SMS, EMAIL_SMS, FORGET_SMS, SETTINES } from './mutations-type'

export default {
  [FULL_LOADING] (state, status) {
    state.fullLoading = status
  },
  // 切换语言
  [LANGUAGE] (state, lang) {
    state.lang = lang
  },
  // 短信验证码间隔
  [MOBILE_SMS] (state, timeout) {
    state.mobileSMS = timeout
  },
  // 邮箱验证码间隔
  [EMAIL_SMS] (state, timeout) {
    state.emailSMS = timeout
  },
  [FORGET_SMS] (state, timeout) {
    state.forgetSMS = timeout
  },
  [SETTINES] (state, val) {
    state.settings = val
  }
}
