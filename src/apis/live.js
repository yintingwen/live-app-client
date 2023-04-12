import http from '../config/http'

// 获取直播列表
export const getLiveList = () => http.get('/api/hall/hall/list')
// 获取直播轮播列表
export const getGiftList = () => http.post('/api/user/gift/list')