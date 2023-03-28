import { FULL_LOADING, LANGUAGE, MOBILE_SMS, EMAIL_SMS, SETTINES } from './mutations-type'
import { getSettings } from '../api/common'
import { setI18n } from '../i18n'


export default {
  toggleFullLoding ({ commit }, status) {
    commit(FULL_LOADING, status)
  },
  // 获取配置文件 ios Android Windows 邮箱 logo 这些地址
  async getSettings ({ commit }) {
    const settings = await getSettings()
    commit(SETTINES, settings)
  },
  // 切换语言
  setLanguage ({ commit, state }, lang) {
    if (state.lang === lang) return
    setI18n(lang)
    commit(LANGUAGE, lang)
  },
  // 设置 手机/邮箱 验证码时间
  async setSMS ({ commit }, { time, type }) {
    const mutation = `${type.toUpperCase()}_SMS`

    commit(mutation, time)
    const timer = setInterval(() => {
      commit(mutation, --time)
      if (time === 0) {
        clearInterval(timer)
      }
    }, 950)
  }
}