// 图标实例化的对象
var widget = null
// 默认的产品交易对
var params = getAllParams()
// 展示的产品
var symbol = params.currency_name + '/' + params.legal_name
// 图表的语言
var lang = params.lang
console.log(params);

// 默认的周期
var index_activeCycle = '5'
var currency_activeCycle = '5m'
// i18n
setI18n(lang)
// 建立socket连接
socket.connect()
// 订阅行情
socket.sub(`market.${(params.currency_name + params.legal_name).toLowerCase()}.detail`, window.handleMarketMessage)
// 绑定出售购买点击事件
document.querySelector('.buy').addEventListener('click', window.handleClickBuy)
document.querySelector('.sell').addEventListener('click', window.handleClickSell)

// window.TradingView.onready 确保在html的dom加载完成后在调用
// window.TradingView.onready(function () {
chartConfig.interval = index_activeCycle // 设置展示的周期
chartConfig.symbol = symbol // 设置展示的产品
chartConfig.locale = langs[lang] // 设置图标的语言
// 初始化 TradingView
widget = new window.TradingView.widget(chartConfig)

widget.MAStudies = []
widget.selectedIntervalButton = null
// 监听图标准备完成事件
widget.onChartReady(function () {
  // 这是k线图 展示的 7日均线和30日均线。
  widget.chart().createStudy('Moving Average', false, false, [7], null, { 'Plot.linewidth': 2, 'Plot.color': '#2ba7d6' })
  widget.chart().createStudy('Moving Average', false, false, [30], null, { 'Plot.linewidth': 2, 'Plot.color': '#de9f66' })
  // 添加周期按钮
  buttonArr.forEach(item => {

    // 创建按钮
    var button = widget.createButton()
    // 添加属性
    button.innerText = item.text

    if (item.text === currency_activeCycle) {
      button.classList.add('active')
    }
    // 添加点击事件
    button.addEventListener('click', (e) => {
      currency_activeCycle = e.text
      const buttons = e.target.parentNode.parentNode.parentNode.children // 获取曾爷爷
      for (let index = 0; index < buttons.length; index++) {
        const child = buttons[index].children[0]
        child && child.children[0].classList.remove('active')
      }
      e.target.classList.add('active')
      widget.chart().setChartType(item.chartType) // 设置图标类型
      widget.chart().setResolution(item.value) // 改变分辨率
    })
  })
})
// })

window.addEventListener('unload', window.handleWebUnload)