import http from '../utils/http'

// 资产信息
export const info = params => http.post('/wallet/list', params)
// 资金划转
export const transfer = params => http.post('/wallet/change', params)
// 划转记录
export const transferRecord = params => http.post('/wallet/hzhistory', params)
// 币种详情
export const currencyDetail = params => http.post('/wallet/detail', params)
// 财务记录
export const financeRecord = params => http.post('/wallet/legal_log', params)

// 币种列表
export const currencyList = params => http.get('/wallet/currencylist', params)
// 提币信息
export const mentionInfo = params => http.post('/wallet/get_info', params)
// 提交提币信息
export const mentionCoin = params => http.post('/wallet/out', params)
// 充币地址
export const chargeAddress = params => http.post('/wallet/get_in_address', params)
// 提币地址
export const mentionAddress = params => http.post('/wallet/get_address', params)
// 添加提币地址
export const addAddress = params => http.post('/wallet/addaddress', params)
// 删除提币地址
export const delAddress = params => http.post('/wallet/deladdress', params)
// 充币记录
export const chargeRecord = params => http.post('/wallet/user_in_log', params)
// 提币记录
export const mentionRecord = params => http.post('/wallet/user_out_log', params)
// 币兑交易
export const exchange = params => http.post('/user/currency_exchange', params)
// 币兑交易记录
export const exchangeRecord = params => http.post('/user/currency_exchange_log', params)

// 阿里云返回oss
export const oss = params => http.get('/wallet/oss', params)
// 支付方式设置
export const payment = params => http.post('/wallet/user_payment_method', params)

