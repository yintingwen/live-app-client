/**
 * lever页面 webSocket 数据
 * 
 * 深度/交易 数据逻辑
 *  创建两个值负责往组件内填充(sellData, buyData)
 *  创建一个值记录当前是深度数据类型还是交易数据类型(moreIsOrder)
 *  获取到数据后先将数据存放到对应的位置,并做些数据处理(wsData)
 *  然后根据当前记录值赋值(sellData/buyData)
 */
import ws from '../../utils/websocket'

export default {
  data() {
    return {
      moreIsOrder: 'more',
      wsData: {
        moreSellData: [],
        moreBuyData: [],
        dataHistory: 'btcusdt',
        dataChange: 0,
        orderSellData: [
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0]
        ],
        orderBuyData: [
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0],
          ['----', 0.0]
        ]
      }
    }
  },
  watch: {
    /**
     * 监听实时价格  发生改变就给到市价
     */
    entrustHandPrice(val) {
      this.marketPriceInput.price = val
    }
  },
  computed: {
    allData() {
      return this.wsData.moreSellData.concat(this.wsData.moreBuyData)
    },
    /**
     * 赋值实时 深度/交易 卖出 数据
     */
    sellData() {
        // 得到一屏最高值
        let numArray = []
        this.allData.forEach(item => {
          numArray = numArray.concat(item[1])
        });
        let maxNum = Math.max(...numArray)

        // 给数据填充百分比
        let newSellData = JSON.parse(JSON.stringify(this.wsData.moreSellData))
        newSellData.forEach(item => {
          let addData = (item[1] / maxNum).toFixed(2) * 100 + '%'
          item.push(addData)
        })

        return newSellData
    },
    /**
     * 赋值实时 深度/交易 买入 数据
     */
    buyData() {
      // 得到一屏最高值
      let numArray = []
      this.allData.forEach(item => {
        numArray = numArray.concat(item[1])
      });
      let maxNum = Math.max(...numArray)

      // 给数据填充百分比
      let newBuyData = JSON.parse(JSON.stringify(this.wsData.moreBuyData))
      newBuyData.forEach(item => {
        let addData = (item[1] / maxNum).toFixed(2) * 100 + '%'
        item.push(addData)
      })

      return newBuyData
    },
    /**
     * 给持仓价格加上实时更新
     */
    entrustHandPrice() {
      const legal = this.amonntHead.split('/')[1]
      const currency = this.amonntHead.split('/')[0]
      const legalObj = this.marketData.find(item => item.name === legal)
      return legalObj
        ? Number(
          legalObj.value.find(item => item.currencyName === currency).close
        ).toFixed(4)
        : 0
    }
  },
  methods: {
    /**
     * 获取 webSoket 数据(适用右侧深度数据, 右侧交易数据)
     * 首次进入页面触发
     */
    getMarketMore() {
      this.unSubMarketLever()
      let value = (
        this.leverStorage.currencyName + this.leverStorage.legalName
      ).toLowerCase()
      this.wsData.dataHistory = value

      switch (this.moreIsOrder) {
        case 'more':
          console.log('深度数据')
          ws.sub('market.' + value + '.depth.step0', data => {
            this.wsData.moreBuyData = data.tick.bids.slice(0, 7)
            this.wsData.moreSellData = data.tick.asks.slice(0, 7)
          })
          break
        case 'order':
          console.log('交易数据')
          ws.sub('market.' + value + '.trade.detail', data => {
            this.actionTrade(data)
          })
          break
      }
    },
    /**
     * 右侧实时数据切换
     * 用户点击 深度数据/交易数据 触发此方法
     * value 为子组件返回用户要获取的是哪种数据
     */
    onMarketBtn(value) {
      this.moreIsOrder = value ? 'more' : 'order'
      this.getMarketMore()
    },
    /**
     * 断开 websoket 链接(适用右侧深度数据, 右侧交易数据的关闭)
     * 用户点击 深度数据/交易数据 触发此方法
     */
    unSubMarketLever() {
      const value = this.wsData.dataHistory
      ws.unsub('market.' + value + '.trade.detail', this.getMarketMore)
      ws.unsub('market.' + value + '.depth.step0', this.getMarketMore)
    },
    /**
     * 对获取到的实时交易订单格式处理
     */
    actionTrade(data) {
      let market = this.wsData
      let arrPrice = data.tick.data[0].price
      let arrNum = data.tick.data[0].amount
      let direction = data.tick.data[0].direction

      if (direction === 'sell') {
        market.orderSellData = market.orderSellData.concat([[arrPrice, arrNum]])
      } else {
        market.orderBuyData = market.orderBuyData.concat([[arrPrice, arrNum]])
      }
      if (market.orderSellData.length > 7) {
        market.orderSellData = market.orderSellData.slice(-7)
      }
      if (market.orderBuyData.length > 7) {
        market.orderBuyData = market.orderBuyData.slice(-7)
      }
    },
  },
  onHide() {
    this.unSubMarketLever()
    this.unSubMarket()
  },
  onShow () {
    this.subMarket()
  }
}