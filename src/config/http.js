import httpToastConfg from "./httpToast"
const http = uni.$u.http

http.setConfig((config) => {
  config.baseUrl = import.meta.VITE_HTTP_URL
  return config
})

http.interceptors.request.use(
  (config) => {
    config.headers["kg-framework-auth"] = uni.getStorageSync('token') || ''
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
    const { data: { data } } = response

    // 自定义参数
    const custom = response.config?.custom
    if (data.code !== 0) {
      // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
      if (custom.toast !== false) {
        uni.$u.toast(data.message)
      }

      // 如果需要catch返回，则进行reject
      if (custom?.catch) {
        return Promise.reject(data)
      } else {
        // 否则返回一个pending中的promise，请求不会进入catch中
        return new Promise(() => {})
      }
    }
    return data.data === undefined ? {} : data.data
  },
  (response) => {
    // 对响应错误做点什么 （statusCode !== 200）
    uni.showToast({
      title: '网络异常',
      icon: 'error',
      mask: true
    })
    return Promise.reject(response)
  }
)

export default http
