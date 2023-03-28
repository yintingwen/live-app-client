import http from '../utils/http'

// 注册
export const register = params => http.post(`/user/register`, params)
// 登录
export const login = params => http.post('/user/login', params)
// 登出
export const logout = params => http.get('/user/logout', params)
// 忘记密码
export const forget = params => http.post(`/user/forget`, params)
// 忘记资金密码
export const forgetFund = params => http.post(`/user/forget_fund`, params)


// 用户信息
export const info = params => http.get('/user/info', params)
// 邀请记录
export const inviteList = params => http.post('/user/my_invite_list', params)

// 身份验证
export const realName = params => http.post('/user/real_name', params)
// 获取用户收款信息
export const cashInfo = params => http.post('/user/cash_info_list', params)
// 删除收款账户
export const delCash = params => http.post('user/cash_info_list_delete', params)
// 获取推广码
export const promoCode = params => http.get('user/my_share', params)

// 获取用户商铺列表
export const shopList = params => http.get('/my_seller', params)
// 获取指定商铺信息
export const shopInfo = params => http.get('/seller_info', params)
