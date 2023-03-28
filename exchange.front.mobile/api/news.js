import http from '../utils/http'

// 获取指定分类的文章
export const list = params => http.post(`/news/list`, params)
// 获取文章详情
export const detail = params => http.post('/news/detail', params)
// 获取最新资讯列表
export const latestNews = params => http.get('/latest_news', { params })
// 最新资讯详情
export const latestNewsDetail = params => http.post('/latest_news_detail', params)