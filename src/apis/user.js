import http from '../config/http'

// 登录
export const postUserLogin = params => http.post('/api/auth/token', null, { params })

// 注册
export const postUserRegister = data => http.post('/api/system/register', data)