import http from '../utils/http'

// 货币列表
export const list = params => http.get('/currency/list', params)
// 币种图标
export const logo = params => http.get('/currency/currency_logo', params)
// 币种列表 + 行情数据
export const quotation = params => http.get('/currency/quotation_new', params)
// 交易对对应小数位数
export const symbolDigit = params => http.get('/get_currency_matches_digit')
// USDT和人民币汇率
export const cnyPrice = params => http.get('/cny_price', params)
