import http from '../utils/http'

// 商家发布的交易信息
export const dealList = params => http.get('/legal_deal_platform', params)
// 发布的交易的详情
export const dealInfo = params => http.get('/legal_deal_info', params)
// 法币交易下单
export const doDeal = params => http.post('/do_legal_deal', params)

// 用户订单历史
export const userRecord = params => http.get('/legal_user_deal', params)
// 商铺订单交易记录
export const sellerRecord = params => http.get('/legal_send_deal_list', params)
// 发布订单
export const send = params => http.post('/legal_send', params)

// 订单记录详情
export const orderDetail = params => http.get('/legal_deal', params)
// 取消交易
export const cancelDeal = params => http.post('/user_legal_pay_cancel', params)
// 确认交易已付款
export const confirmPay = params => http.post('/user_legal_pay', params)
// 用户确认已收款
export const userSure = params => http.post('/legal_deal_user_sure', params)
// 商家确认已收款
export const sellerSure = params => http.post('/legal_deal_sure', params)
// 用户申诉
export const userAppeal = params => http.post('/appeal', params)



