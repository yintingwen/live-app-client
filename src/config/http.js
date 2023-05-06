import httpToastConfg from './apiToast'
import { log } from '@utils/dev'
import { useUserStore } from '@stores/user'
import Request from 'luch-request'

const http = new Request({
  baseURL: import.meta.env.VITE_HTTP_URL,
  header: {
    Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
  },
})

http.interceptors.request.use(
  (config) => {
    const user = useUserStore()

    config.header['kg-framework-auth'] = `bearer ${user.userToken || ''}`

    return config
  },
  (config) => {
    return Promise.reject(config)
  }
)

// 响应拦截
http.interceptors.response.use(
  (response) => {
    /* 对响应成功做点什么 可使用async await 做异步操作*/
    const {
      data: { code, msg, data },
    } = response
    log('response success', response)
    if (code !== 200) {
      uni.showToast({
        title: msg,
        icon: 'error',
        duration: 2000,
      })
      return Promise.reject(msg)
    }

    return data
  },
  (error) => {
    const { data = {} } = error
    log('response error', error)
    uni.showToast({
      title: data.message || error.message || '网络异常',
      icon: 'error',
      duration: 2000,
    })
    return Promise.reject(error)
  }
)

export default http
