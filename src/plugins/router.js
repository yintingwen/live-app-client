import { loginWhitePages } from '@/config/auth'
const routerMethods = ['navigateTo', 'redirectTo', 'reLaunch', 'swichTab']

class UseRouter {
  constructor() {
    routerMethods.forEach((method) => {
      this[method] = (url, params) => {
        const useUrl = typeof url === 'string' ? url : url.url
        const useParams = typeof url === 'string' ? params : url.data

        const path = useUrl.slice(1)
        if (import.meta.env.DEV || loginWhitePages.includes(path)) {
          uni[method]({
            url: url + this.dataToString(useParams),
          })
        } else {
          const page = getCurrentPages()[0]
          const redirect = encodeURIComponent(page.$page.fullPath)
          uni.navigateTo({
            url: `/pages/login/login?redirect=${redirect}`,
          })
        }
      }
    })
  }

  navigateBack (delta = 1) {
    uni.navigateBack({
      delta
    })
  }

  dataToString(data = {}) {
    const str = ''
    Object.keys(data).forEach((key) => {
      str += `${key}=${data[key]}`
    })
    return str ? `?${str}` : ''
  }
}

uni.$router = new UseRouter()
