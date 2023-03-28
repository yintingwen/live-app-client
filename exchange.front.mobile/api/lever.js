import http from '../utils/http'

// 获取杠杆交易信息
export const info = params => http.post(`/lever/deal`, params)

// 获取交易记录信息
export const tradeHistory = params => http.post(`/lever/my_trade`, params)

// 提交合约下单
export const submit = params => http.post(`/lever/submit`, params)

// 取消挂单
export const cancel = params => http.post(`/lever/cancel`, params)

// 平仓
export const close = params => http.post(`/lever/close`, params)

// 一键平仓
export const batchClose = params => http.post(`/lever/batch_close`, params)

// 设置止盈止损
export const setstop = params => http.post(`/lever/setstop`, params)
