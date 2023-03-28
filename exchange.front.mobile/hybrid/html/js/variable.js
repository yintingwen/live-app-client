var httpUrl = 'http://api.zcccoin.com:81'
var socketUrl = 'ws://api.zcccoin.com:2346'

/**
 * 按钮数组
 */
var buttonArr = [
  {
    value: "1", // 图表用
    text: "1m", // 显示用
    period: "1min", // 订阅用
    time: 60,
    chartType: 1 // 图标类型
  },
  {
    value: "5",
    text: "5m",
    period: "5min",
    time: 60 * 5,
    chartType: 1
  },
  {
    value: "15",
    text: "15m",
    period: "15min",
    time: 60 * 15,
    chartType: 1
  },
  {
    value: "30",
    text: "30m",
    period: "30min",
    time: 60 * 30,
    chartType: 1
  },
  {
    value: "60",
    text: "60m",
    period: "60min",
    time: 60 * 60,
    chartType: 1
  },
  {
    value: "1D",
    text: "1D",
    period: '1day',
    time: 60 * 60 * 24,
    chartType: 1
  }
  // {
  //   value: "1W",
  //   text: "1W",
  //   period: "1week",
  //   time: 60 * 60 * 24 * 7,
  //   chartType: 1
  // },
  // {
  //   value: "1M",
  //   text: "1M",
  //   period: "1mon",
  //   time: 60 * 60 * 24 * 30,
  //   chartType: 1
  // }
]

let style = {
  // up: "#589065",
  up: "rgba(2, 173, 143, 1)", // 涨
  // down: "#AE4E54",
  down: "rgba(216, 44, 76, 1)", // 跌
  bg: "#191a2c", // 背景
  grid: "#1E2740", // 网格
  cross: "#1E2740", // ?
  border: "#4e5b85", // 边框
  text: "#61688A", // 文字
  areatop: "rgba(122, 152, 247, .1)",
  areadown: "rgba(122, 152, 247, .02)"
}

var langs = {
  'zh-CN': 'zh',
  'zh-TW': 'zh-TW',
  'en-US': 'en'
}