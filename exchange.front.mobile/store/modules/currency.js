import * as currencyApi from '../../api/currency'

const state = {
  list: {},
  logo: [],
  digit: [],
  cnyPrice: ''
}
const getters = {
  // 货币列表
  currencyList (state) {
    return state.list.currency
  },
  // 法币列表
  legalList (state) {
    return state.list.legal
  },
  // logo对象
  logoObject (state) {
    return state.logo.reduce((obj, item) => {
      obj[item.name] = {
        id: item.id,
        img: item.logo
      }
      return obj
    }, {})
  },
  symbolDigitData (state) {
    return state.digit.length ? state.digit.reduce((total, item) => {
      total[`${item.currency_name}/${item.legal_name}`] = item
      return total
    }, {}) : {}
  },
  cnyPrice (state) {
    return parseFloat(state.cnyPrice) || 1
  }
}
const mutations = {
  currencyList (state, payload) {
    state.list = payload
  },
  currencyLogo (state, payload) {
    state.logo = payload
  },
  symbolDigit (state, payload) {
    state.digit = payload
  },
  cnyPrice (state, payload) {
    state.cnyPrice = payload
  }
}
const actions = {
  /**
   * 获取货币列表
   */
  async getCurrencyList ({ commit }) {
    const message = await currencyApi.list()
    commit('currencyList', message)
  },
  /**
   * 获取货币logo
   */
  async getCurrencyLogo ({ commit }) {
    const message = await currencyApi.logo()
    commit('currencyLogo', message)
  },
  /**
 * 获取交易对小数位
 */
  async getSymbolDigit ({ commit }) {
    const message = await currencyApi.symbolDigit()
    commit('symbolDigit', message)
  },
  /**
   * 获取汇率
   */
  async getCnyPrice ({ commit, dispatch }) {
    const handler = async () => {
      try {
        const message = await currencyApi.cnyPrice()
        commit('cnyPrice', message)
      } catch { }
    }
    handler()
    setInterval(handler, 6000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}