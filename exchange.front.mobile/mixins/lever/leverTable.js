/**
 * lever页面 表格 数据
 * 
 * 委托表格逻辑:
 *  进入页面先请求 挂单 数据显示
 *  将表格内点击显示新数据的方法集中管理(onHistoryTitle)
 *  同时创建值记录当前显示哪种类型的数据(entrustDataType)
 *  同时创建值传入组件内显示 这个值会一直更改内容(setEntrustData)
 *  监听记录值, 发生改变就调用相对应的方法更新setEntrustData
 * 
 * 注意:
 *  因为委托表格数据的显示也受到币种类型的影响
 *  所以加个方法来判断当前显示类型是什么, 然后运行相对于方法更新数据(toCutCoins)
 *  这个方法是在用户选择币种后触发, 因为更新数据的方法需要最新的币种ID, 在这之前要更新ID
 * 
 * 其他:
 *  表格内其他可点击方法单独拎出来, 提交完请求后直接运行对应的方法更新数据
 */

export default {
  data() {
    return {
      entrustDataType: 'entrust',
      setEntrustData: [],
      hanlderStorArray: [],
      historyIndex: 0,
      setAllTradeHistory: 0
    }
  },
  watch: {
    /**
     * 监听委托区当前显示数据类型(挂单 持仓 平仓记录 委托中 已取消)
     * 显示类型发生改变时 运行相对于的方法填充数据
     * 
     * 判断 isOnLoad是为了第一次进入合约账单页面不重复调用接口
     */
    entrustDataType() {
			this.isOnLoad ? this.isOnLoad = false : this.toCutCoins()
    },
    /**
     * 给持仓价格加上实时更新
     */
    marketData: {
      handler() {
        this.marketData.forEach(item => {
          item.value.forEach( items => {
            // num = 0 代表没有找到目标对象， num = 1 代表找到了
            let num = 0
            let conis = items.currencyName + '/' + item.name
            // 如果找到了目标对象  赋给它最新价格
            this.hanlderStorArray.forEach( hanlderItem => {
              if(hanlderItem.name === conis) {
                hanlderItem.val = items.close
                num = 1
              }
            })
            // 如果没有找到就新加一个
            if( num === 0 ){
              this.hanlderStorArray = this.hanlderStorArray.concat({
                name: conis,
                val: items.close
              })
            }
          })
        })

        // 给 setEntrustData赋值
        if(this.setEntrustData.length > 0 && this.setEntrustData[0].status === 1) {
          this.setEntrustData.forEach( item => {
            this.hanlderStorArray.forEach(hanlderItem => {
              if( hanlderItem.name === item.symbol ) {
                item.update_price = Number(hanlderItem.val).toFixed(4)
              }
            })
          })
        }
      },
      deep: true
    },
    /**
     * 监听是否显示所有交易对信息
     */
    setAllTradeHistory() {
      this.toCutCoins()
    }
  },
  methods: {
    /**
     * 切换底部委托数据
     * 首次进入页面触发  后续也可点击触发
     */
    toCutCoins() {
      switch (this.setAllTradeHistory) {
        case 0:
          switch (this.entrustDataType) {
            case 'putLever':
              this.getEntrustData()
              break
            case 'entrust':
              this.getEntrustData()
              break
            case 'cancel':
              this.getCancelData()
              break
            case 'handStorage':
              this.getHandStorData()
              break
            case 'flatStorageHt':
              this.getFlatStorData()
              break
          }
          break
        case 1:
          switch (this.entrustDataType) {
            case 'putLever':
              this.getAllEntrustData()
              break
            case 'entrust':
              this.getAllEntrustData()
              break
            case 'cancel':
              this.getAllCancelData()
              break
            case 'handStorage':
              this.getAllHandStorData()
              break
            case 'flatStorageHt':
              this.getAllFlatStorData()
              break
          }
          break
      }
    },
    /**
     * 获取挂单 委托中信息
     * 首次进入页面触发
     */
    async getEntrustData() {
      const params = {
        page: 1,
        status: 0,
        currency_id: this.leverStorage.currencyId,
        legal_id: this.leverStorage.legalId
      }
      this.showFullLoading()
      const entrustHistory = await this.api.lever.tradeHistory(params)
      this.setEntrustData = entrustHistory.data
      this.hideFullLoading()
    },
    /**
     * 获取挂单 已取消信息
     * 手动点击触发
     */
    async getCancelData() {
      const params = {
        page: 1,
        status: 4,
        currency_id: this.leverStorage.currencyId,
        legal_id: this.leverStorage.legalId
      }
      this.showFullLoading()
      const cancelHistory = await this.api.lever.tradeHistory(params)
      this.setEntrustData = cancelHistory.data
      this.hideFullLoading()
    },
    /**
     * 获取持仓信息
     * 手动点击触发
     */
    async getHandStorData() {
      const params = {
        page: 1,
        status: 1,
        currency_id: this.leverStorage.currencyId,
        legal_id: this.leverStorage.legalId
      }
      this.showFullLoading()
      const flatStorageHt = await this.api.lever.tradeHistory(params)
      this.setEntrustData = flatStorageHt.data
      this.hideFullLoading()
    },
    /**
     * 获取平仓记录信息
     * 手动点击触发
     */
    async getFlatStorData() {
      const params = {
        page: 1,
        status: 3,
        currency_id: this.leverStorage.currencyId,
        legal_id: this.leverStorage.legalId
      }
      this.showFullLoading()
      const handStorage = await this.api.lever.tradeHistory(params)
      this.setEntrustData = handStorage.data
      this.hideFullLoading()
    },
    /**
     * 获取所有持仓交易对信息
     */
    async getAllHandStorData() {
      const params = {
        page: 1,
        status: 1,
      }
      this.showFullLoading()
      const flatStorageHt = await this.api.lever.tradeHistory(params)
      this.setEntrustData = flatStorageHt.data
      this.hideFullLoading()
    },
      /**
     * 获取所有挂单 委托中交易对信息
     */
    async getAllEntrustData() {
      const params = {
        page: 1,
        status: 0,
      }
      this.showFullLoading()
      const flatStorageHt = await this.api.lever.tradeHistory(params)
      this.setEntrustData = flatStorageHt.data
      this.hideFullLoading()
    },
    /**
     * 获取所有挂单 已取消交易对信息
     */
    async getAllCancelData() {
      const params = {
        page: 1,
        status: 4,
      }
      this.showFullLoading()
      const flatStorageHt = await this.api.lever.tradeHistory(params)
      this.setEntrustData = flatStorageHt.data
      this.hideFullLoading()
    },
    /**
     * 获取所有平仓记录信息
     */
    async getAllFlatStorData() {
      const params = {
        page: 1,
        status: 3,
      }
      this.showFullLoading()
      const handStorage = await this.api.lever.tradeHistory(params)
      this.setEntrustData = handStorage.data
      this.hideFullLoading()
    },
    /**
     * 撤销挂单
     * 手动触发
     */
    async onTableRemove(leverId) {
      try {
        this.showFullLoading()
        await this.api.lever.cancel({ id: leverId })
        if(this.getCurrencyDetail){
          this.getCurrencyDetail()
        }
        this.toCutCoins()
        this.toast('lever.trade.toast.remove')
      } catch (error) {
        console.log('onTableRemove失败')
        console.log(error)
      }
    },
    /**
     * 平仓
     * 手动触发
     */
    async onFlatStorage(leverId) {
      try {
        this.showFullLoading()
        await this.api.lever.close({ id: leverId })
        if(this.getCurrencyDetail){
          this.getCurrencyDetail()
        }
        this.toCutCoins()
        this.toast('lever.trade.toast.flatStorage')
				this.router.navigateTo('/pages/lever/check', {type: 2})
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 一键平仓
     * 手动触发
     */
    async onOnceFlatStorage() {
      let params = Object.create({})
      switch (this.setAllTradeHistory) {
        case 0:
          params = {
            type: 0,
            currency_id: this.leverStorage.currencyId,
            legal_id: this.leverStorage.legalId
          }
          break
        case 1:
          params = { type: 0 }
          break
      }
      try {
        this.showFullLoading()
        await this.api.lever.batchClose(params)
        if(this.getCurrencyDetail){
          this.getCurrencyDetail()
        }
        this.toCutCoins()
        this.toast('lever.trade.toast.onceFlatStorage')
				this.router.navigateTo('/pages/lever/check', {type: 2})
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 设置止盈止损
     * 手动触发
     */
    async onCheckStop(item) {
      const params = {
        id: item.dataId,
        target_profit_price: item.updateCheck,
        stop_loss_price: item.updateStop
      }
      try {
        this.showFullLoading()
        await this.api.lever.setstop(params)
        if(this.getCurrencyDetail){
          this.getCurrencyDetail()
        }
        this.toast('lever.trade.toast.checkStop')
      } catch (error) { }
      this.hideFullLoading()
    },
    /**
     * 数组倒置
     * 点击 我的委托内时间样式
     */
    onTimeReverse() {
      this.setEntrustData.reverse()
    },
    /**
     * 历史记录内某些可点击情况 更改数据 触发数据动态
     */
    onHistoryTitle(type) {
      switch (type) {
        case 'putLever':
          // 点击 挂单
          this.entrustDataType = 'putLever'
          this.historyIndex = 0
          break
        case 'handStorage':
          // 点击 持仓
          this.entrustDataType = 'handStorage'
          this.historyIndex = 1
          break
        case 'flatStorageHt':
          // 点击 平仓记录
          this.entrustDataType = 'flatStorageHt'
          this.historyIndex = 2
          break
        case 'entrusting':
          // 点击 委托中
          this.entrustDataType = 'entrust'
          break
        case 'cancel':
          // 点击 已取消
          this.entrustDataType = 'cancel'
          break
        case 'showAll':
          // 点击 显示所有数据
          this.setAllTradeHistory === 1 ?
          this.setAllTradeHistory = 0 :
          this.setAllTradeHistory = 1
          break
        default:
          break
      }
    }
  }
}