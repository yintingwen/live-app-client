class Router {
  navigateTo (path, params = {}) {
    const url = path + this._getQueryString(params)
    uni.navigateTo({
      url
    })
  }

  redirectTo (path, params = {}) {
    const url = path + this._getQueryString(params)
    uni.redirectTo({
      url
    })
  }

  navigateBack (delta = 1) {
    uni.navigateBack({
      delta
    })
  }

  reLaunch (path, params = {}) {
    const url = path + this._getQueryString(params)
    uni.reLaunch({
      url
    })
  }

  switchTab (path) {
    uni.switchTab({
      url: path
    })
  }

  _getQueryString (params) {
    const keyList = Object.keys(params)
    const length = keyList.length
    let queryString = ''
    if (length) {
      queryString = '?'
      for (const item of keyList) {
        queryString += `${item}=${params[item]}&`
      }
      return queryString.slice(0, -1)
    }
    return queryString
  }
}

export default new Router