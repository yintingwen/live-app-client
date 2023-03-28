import { quotation } from './currency'
import ws from '../utils/websocket'


class MarketSuber {
  // 行情货币
  quotationData = []
  // 交易对分类
  topics = []
  // 行情数据
  marketData = []
  // 绑定函数
  bandFunction = null

  constructor() { }

  /**
  * 订阅主题
  */
  async sub () {
    if (!this.quotationData.length) {
      await this._getQuotation()
    }
    if (!this.topics.length) {
      await this._setTopics()
      this.bandFunction && this.bandFunction(this.marketData)
    }
    // 发送订阅
    this._sendSub()
  }

  /**
   * 取消订阅主题
   */
  unsub () {
    this.topics.forEach(item => {
      item.value.forEach(topic => {
        ws.unsub(topic.value, topic.listener)
        topic.listener = null
      })
    })
  }

  bind (callback) {
    this.bandFunction = callback || null

    if (this.marketData.length) {
      this.bandFunction && this.bandFunction(this.marketData)
    }
  }

  /**
   * 获取行情信息
   */
  async _getQuotation () {
    const message = await quotation()
    this.quotationData = message
  }

  /**
   * 设置交易对
   */
  _setTopics () {
    this.quotationData.forEach(base => {
      const topic = {
        id: base.id,
        name: base.name,
        value: []
      }
      const baseCurrency = {
        id: base.id,
        name: base.name,
        value: [],
        range: 0,
        close: 0
      }

      base.quotation.forEach(currency => {
        if (currency.is_display) {
          const baseName = currency.legal_name.toLowerCase()      // 法币名
          const currencyName = currency.currency_name.toLowerCase() // 货币名
          const symbol = `market.${currencyName}${baseName}.detail` // 订阅信息
          const topicItem = {
            id: currency.currency_id,
            name: currency.currency_name,
            value: symbol,
            listener: null
          }
          const currencyItem = {
            id: currency.currency_id,
            currencyName: currency.currency_name,
            baseCurrencyName: base.name,
            range: 0,
            close: 0
          }
          topic.value.push(topicItem)
          baseCurrency.value.push(currencyItem)
        }
      })
      this.topics.push(topic)
      this.marketData.push(baseCurrency)
    })
  }

  /**
  * 发送订阅
  * @param {*} param0 
  */
  _sendSub () {
    // 遍历基础货币
    this.topics.forEach(baseCurrency => {
      // 遍历交易对字符串
      baseCurrency.value.forEach(topic => {
        // 订阅函数
        const listener = message => {
          const { tick, ch } = message
          const range = (message.tick.close - message.tick.open) / message.tick.open * 100 // 涨跌幅度
          const id = topic.id
          const baseCurrencyName = baseCurrency.name // 基础货币名
          const currencyName = ch.split('.')[1].toUpperCase().split(baseCurrencyName)[0] // 交易货币名
          const data = { ...tick, ch, range, baseCurrencyName, currencyName, id } // 新的单个数据
          this._handleMessage(data)
        }
        topic.listener = listener
        // 进行订阅
        ws.sub(topic.value, listener)
      })
    })
  }

  _handleMessage (data) {
    const baseCurrency = this.marketData.find(item => item.name === data.baseCurrencyName)
    const index = baseCurrency.value.findIndex(item => item.currencyName === data.currencyName)
    baseCurrency.value.splice(index, 1, data)
  }
}

export default new MarketSuber()