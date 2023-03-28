import http from '../utils/http'

// 发送手机验证码
export const mobileSMS = params => http.post(`/sms_send`, params)
// 发送邮箱验证码
export const emailSMS = params => http.post(`/sms_mail`, params)
// 校验手机验证码
export const checkMobile = params => http.post(`/user/check_mobile`, params)
// 校验有限验证码
export const checkEmail = params => http.post(`/user/check_email`, params)
// 获取首页信息
export const getHomeInfo = () => http.get('/get_advertise')
// 获取全局配置信息
export const getSettings = () => http.get('/site_settings_list')
