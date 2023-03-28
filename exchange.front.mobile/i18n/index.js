import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

Vue.use(VueI18n)

const defaultLanguage = 'zh-CN' // 默认语言
const currentLanguage = uni.getStorageSync('lang') || defaultLanguage // 当前语言
const languageInfo = {
  'zh-CN': {
    name: '简体中文',
  },
  'en-US': {
    name: '英语'
  }
}

// 创建i18n实例
const i18n = new VueI18n({
  locale: currentLanguage,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})
Vue.prototype._i18n = i18n

// 设置i18n函数
function setI18n (lang) {
  uni.setStorageSync('lang', lang)
  i18n.locale = lang
}

export {
  currentLanguage,
  languageInfo,
  setI18n
}

export default i18n