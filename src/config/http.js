import httpToastConfg from "./httpToast"
import { useUserStore } from '@stores/user'
import Request from 'luch-request' 

const http = new Request({
  baseURL: import.meta.env.VITE_HTTP_URL,
  header: {
    Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0'
  }
})


http.interceptors.request.use(
  (config) => {
    const user = useUserStore()

    if (import.meta.env.DEV) {
      config.header[import.meta.env.VITE_TOKEN_HEAD_KEY] = `${import.meta.env.VITE_TOKEN_PREFIX} ${import.meta.env.VITE_TOKEN_TEST}`
    } else {
      config.header[import.meta.env.VITE_TOKEN_HEAD_KEY] = `${import.meta.env.VITE_TOKEN_PREFIX} ${user.userToken || ''}`
    }

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
    const { data: { code, msg, data } } = response

    if (code !== 200) {
      uni.showToast({
        title: msg,
        icon: 'error',
        mask: true
      })
      return Promise.reject(msg)
    }

    return data
  },
  (error) => {
    uni.showToast({
      title: '网络异常',
      icon: 'error',
      mask: true
    })
    return Promise.reject(error)
  }
)

export default http
