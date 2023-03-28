import marketSuber from '../api/market'

export default {
  data () {
    return {
      marketData: []
    }
  },
  methods: {
    /**
     * 订阅行情数据
     */
    subMarket () {
      marketSuber.sub()
    },
    /**
     * 取消订阅
     */
    unSubMarket () {
      marketSuber.unsub()
    },
    /**
     * 基于模板设置初始数据
     */
    bindData (data) {
      data.forEach(base => {
        const baseCurrency = {
          name: base.name,
          id: base.id
        }
        this.$set(baseCurrency, 'value', base.value)
        this.marketData.push(baseCurrency)
      })
    }
  },
  onLoad () {
    marketSuber.bind(this.bindData)
  }
}