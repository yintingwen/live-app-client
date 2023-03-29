import http from '../config/http'

export const getLiveList = () => http.get('/api/hall/hall/list')