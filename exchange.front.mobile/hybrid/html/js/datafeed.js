function FeedBase () { }
// 记录是否还有历史记录
FeedBase.prototype.hasHistory = false
// 是否正在请求
FeedBase.prototype.isRequest = false
// 第一条数据的时间戳s
FeedBase.prototype.startTime = 0
// 最后一条的时间戳s
FeedBase.prototype.endTime = 0
// 上一次k线的产品
FeedBase.prototype.lastSymbol = ''
// 上一次k线的周期
FeedBase.prototype.lastResolution = ''


// 获取跨域的时间秒数
FeedBase.prototype.getTimeRange = function () {
  var count = 300
  var time = buttonArr.find(item => item.value === this.lastResolution).time
  return count * time
}
// 计算HTTP请求时使用的起始/终结时间
FeedBase.prototype.setNextTime = function (type = 'next') {
  if (type === 'next') {
    this.endTime = this.startTime ? this.startTime - 1 : Math.floor(Date.now() / 1000)
  } else {
    this.endTime = Math.floor(Date.now() / 1000)
  }
  this.startTime = this.endTime - this.getTimeRange()
}
// 获取配置对象
FeedBase.prototype.getConfiguration = function () {
  this._configuration = {
    supported_resolutions: buttonArr.map(item => item.value)
  }
}

// trading切换时自动调用-------------------------------------------------------------

// 0.准备好了, 可以设置支持的配置项, 这些数据会影响图表, 必须使用回调来传递datafeed的 configurationData参数。
FeedBase.prototype.onReady = function (callback) {
  this.getConfiguration()

  setTimeout(() => {
    callback(this._configuration)
  }, 0)
}

// 1.切换产品周期 或者 切换产品 会执行这个函数
FeedBase.prototype.getBars = async function (symbolInfo, resolution, from, to, onResult, onError) {
  /*
    !startTime 如果没请请求过这个产品或者这个周期的历史数据
    resolution !== this.lastResolution 是否更换了产品周期
    this.listSymbol !== symbolInfo.name
  */
  // 是第一次 || 切换了周期 || 切换了产品
  // if (!this.startTime || (resolution !== this.lastResolution) || (symbolInfo.name !== this.lastSymbol)) {
  if (!this.startTime || (resolution !== this.lastResolution)) {

    // 记录产品
    this.lastSymbol = symbolInfo.name.split('/')[0].toLowerCase() + symbolInfo.name.split('/')[1].toLowerCase()
    // 记录周期
    // this.lastResolution = resolution === 'D' ? '1D' : resolution
    this.lastResolution = resolution
    // 初始化起始/终结时间
    this.setNextTime('init')
    // 设置还有历史记录
    this.hasHistory = true
  }

  // 是否还有数据
  if (!this.hasHistory) return
  // 暂时锁死
  this.hasHistory = false

  // 收集参数
  var currency = this.lastSymbol
  var time = buttonArr.find(item => item.value === this.lastResolution).period
  var params = {
    currency, // 交易对
    time, // 周期
    start_time: this.startTime, // 起始时间
    end_time: this.endTime // 终结事件
  }
  // 发送请求
  var res = await window.axios.get(httpUrl + '/api/currency/market_kline', { params })
  // 获取数据
  const { message } = res.data
  // 设置是否有数据
  var meta = { noData: !message.length }
  // 数据
  var data = []
  if (message.length) { // 有数据
    data = message.map(item => {
      return {
        time: item.addtime * 1000,
        close: item.close,
        open: item.open,
        high: item.high,
        low: item.low,
        volume: item.vol
      }
    })
    this.setNextTime()
  }
  onResult(data, meta)
  this.hasHistory = !!message.length
}

// 2.订阅K线数据
FeedBase.prototype.subscribeBars = function (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
  const subStr = `market.${this.lastSymbol}.kline.${buttonArr.find(item => item.value === this.lastResolution).period}`
  socket.sub(subStr, (data) => {
    if (!Object.keys(data).length) return
    onTick({
      time: data.id * 1000,
      close: data.close,
      open: data.open,
      high: data.high,
      low: data.low,
      volume: data.vol
    })
  })
}

// 3.取消订阅
FeedBase.prototype.unsubscribeBars = function (listenerGuid) {
  // 取消订阅产品的callback
  const subStr = `market.${this.lastSymbol}.kline.${buttonArr.find(item => item.value === this.lastResolution).period}`
  socket.unsub(subStr)
}

// 通过商品名解析商品信息
FeedBase.prototype.resolveSymbol = function (symbolName, onResolve, onError) {
  const pricescale = 1 * 10 ** parseInt(params.price_digit)

  setTimeout(() => {
    onResolve({
      "name": symbolName,
      "timezone": "Asia/Shanghai",
      "pricescale": pricescale,
      "minmov": 1,
      "minmov2": 0,
      "ticker": symbolName,
      "description": "",
      "session": "24x7",
      "type": "bitcoin",
      "volume_precision": 10,
      "has_intraday": true,
      "intraday_multipliers": ['1', '3', '5', '15', '30', '60'], // 时间
      "has_weekly_and_monthly": false,
      "has_no_volume": false,
      "regular_session": "24x7"
    })
  }, 0)
}
