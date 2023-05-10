import http from '../config/http'

export const getVideoList = () => http.get('/api/index/videos/index')