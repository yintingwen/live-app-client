/***
 * 获取url中所有参数
 * 返回参数键值对 对象
 */
function getAllParams () {
  var url = location.href;
  var paraString = url.split('?')[1].split("&")

  return paraString.reduce((prev, item) => {
    var key = item.split('=')[0]
    var value = item.split('=')[1]
    prev[key] = value
    return prev
  }, {})
}

/**
 * 周期按钮点击处理函数
 * @param {*} e 事件对象
 * @param {*} period 周期对象
 */
function handleButtonClick (e, period) {
  const buttons = this.parentNode.parentNode.parentNode.children // 获取曾爷爷
  for (let index = 0; index < buttons.length; index++) {
    const child = buttons[index].children[0]
    child && child.children[0].classList.remove('active')
  }
  this.classList.add('active')
  widget.chart().setChartType(period.chartType) // 设置图标类型
  widget.chart().setResolution(period.value) // 改变分辨率
}

/**
 * socket周期处理函数
 * @param {*} data 
 */
function handleMarketMessage (data) {
  var hightDom = document.querySelector('.high .num')
  var lowDom = document.querySelector('.low .num')
  var amountDom = document.querySelector('.amount .num')
  var closeDom = document.querySelector('.close')
  var isUp = (data.close - data.open) > 0

  hightDom.innerHTML = data.high.toFixed(params.price_digit)
  lowDom.innerHTML = data.low.toFixed(params.price_digit)
  amountDom.innerHTML = data.amount.toFixed(2)
  closeDom.innerHTML = data.close.toFixed(params.price_digit)

  closeDom.classList.remove('c-green')
  closeDom.classList.remove('c-red')
  closeDom.classList.add(isUp ? 'c-green' : 'c-red')
}

/**
 * 购买按钮点击函数
 * @param {*} e 
 */
function handleClickBuy (e) {
  uni.postMessage({
    data: {
      type: 'buy'
    }
  })
  localStorage.lever_type = 'buy'
  uni.switchTab({
    url: '/pages/lever/index'
  })
}

/**
 * 出售按钮点击函数
 * @param {*} e 
 */
function handleClickSell (e) {
  uni.postMessage({
    data: {
      type: 'sell'
    }
  })
  localStorage.lever_type = 'sell'
  uni.switchTab({
    url: '/pages/lever/index'
  })
}

/**
 * 记录订单点击函数
 */
function handleWebUnload () {
  socket.close()
}