import { loginWhitePages } from '@/config/auth'

export function usePageCheckLogin (isTabPage) {
  const page = getCurrentPages()[0]

  function authToLogin (path) {
    if (import.meta.env.DEV || loginWhitePages.includes(path)) return
    const redirect = encodeURIComponent(page.$page.fullPath)
    uni.navigateTo({
      url: `/pages/login/login?redirect=${redirect}`,
    })
  }
 
  onLoad(() => {
    authToLogin(page.route)
  })

  isTabPage && onTabItemTap((e) => {
    authToLogin(e.pagePath)
  })
}