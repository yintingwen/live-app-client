import http from '../config/http'

// 登录
export const postUserLogin = data => http.post('/api/auth/token', data)

// 注册
export const postUserRegister = data => http.post('/api/system/register', data)