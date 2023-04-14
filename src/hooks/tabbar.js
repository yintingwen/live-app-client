import { onShow } from '@dcloudio/uni-app'

export const tabbarItemName = ['home', 'movie', 'recharge', 'mime']
export const tabbarThemeColor = {
  bright: '#4A4A4A',
  dark: '#FFFFFF',
}
export const tabbarThemeBgc = {
  bright: '#FFFFFF',
  dark: '#000000',
}
export let tabbarThemeCache = ''

export function useTabbarTheme(theme) {
  onShow(() => {
    if (tabbarThemeCache !== theme) {
      tabbarThemeCache = theme
      changeIcon()
      changeStyle()
    }
  })

  function changeIcon() {
    tabbarItemName.forEach((name, index) => {
      uni.setTabBarItem({
        index,
        iconPath: `static/images/tabbar/${name}_${theme}.png`,
        selectedIconPath: `static/images/tabbar/${name}@active.png`,
      })
    })
  }
  function changeStyle() {
    uni.setTabBarStyle({
      color: tabbarThemeColor[theme],
      selectedColor: tabbarThemeColor[theme],
      backgroundColor: tabbarThemeBgc[theme],
    })
  }
}
