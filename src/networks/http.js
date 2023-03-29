uni.$u.http.setConfig((config) => {
  config.baseUrl = import.meta.env.VITE_HTTP_SERVER
  config.showLoading = true
  config.loadingText = '努力加载中~'
  config.loadingTime = 800
  config.originalData = true
  config.loadingMask = true
  config.header = {
    'content-type': 'application/json;charset=UTF-8'
  }
  return config
})