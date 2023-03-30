import http from '../config/http'

// 获取直播列表
export const getLiveList = () => http.get('/api/hall/hall/list')