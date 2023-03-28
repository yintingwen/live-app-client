var langPackage = {
  'zh-CN': {
    buy: '买入',
    sell: '卖出',
    high: '24H最低',
    low: '24H最低',
    amount: '24H量',
    history: '记录订单'
  },
  'en-US': {
    buy: 'buy',
    sell: 'sell',
    high: '24H high',
    low: '24H low',
    amount: '24H amount',
    history: 'history'
  }
}

/**
 * 设置I18N
 * @param {*} lang 语言标识
 */
function setI18n (lang) {
  var buyDom = document.querySelector('.buy')
  var sellDom = document.querySelector('.sell')
  var highDom = document.querySelector('.high .title')
  var lowDom = document.querySelector('.low .title')
  var amountDom = document.querySelector('.amount .title')

  var currentLang = langPackage[lang]

  buyDom.innerHTML = currentLang[buyDom.innerHTML.trim()]
  sellDom.innerHTML = currentLang[sellDom.innerHTML.trim()]
  highDom.innerHTML = currentLang[highDom.innerHTML.trim()]
  lowDom.innerHTML = currentLang[lowDom.innerHTML.trim()]
  amountDom.innerHTML = currentLang[amountDom.innerHTML.trim()]
}
