export default {
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    /**
     * 格式化小数位数
     * @param {*} value 要格式化的值
     * @param {*} num 保留位数
     */
    toFixed (value, num) {
      const newValue = parseFloat(value)
      return Number.isNaN(newValue) ? value : newValue.toFixed(num)
    },
    /**
     * 设置页面标题
     */
    setPageTitle () {
      uni.setNavigationBarTitle({
        title: this.$t(`${this.pageTitle}`)
      })
    },
    /**
     * 设置tabBar字体
     */
    setTabBar () {
      const arr = ['home', 'legal', 'lever', 'mine']
      arr.forEach((item, index) => {
        uni.setTabBarItem({
          index,
          text: this.$t(`tabbar.${item}`)
        })
      })
    },
    /**
     * 提示框
     * @param {*} title 内容 
     * @param {*} icon 图标
     * @param {*} duration 时间
     */
    toast (title, icon = 'none', duration = 2000) {
      uni.showToast({
        title: this.$t(title),
        duration,
        icon
      });
    },
    /**
     * 开启全屏loading
     * @param {*} title 文字
     * @param {*} mask 遮罩层
     */
    showFullLoading (title = '', mask = true) {
      uni.showLoading({
        title,
        mask
      })
    },
    /**
     * 隐藏全屏loading
     */
    hideFullLoading () {
      uni.hideLoading()
    }
  },
  onShow () {
    this.pageTitle && this.setPageTitle()
    this.tabBar && this.setTabBar()
  }
}