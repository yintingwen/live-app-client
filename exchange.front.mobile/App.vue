<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ws from './utils/websocket'

export default {
  methods: {
    ...mapActions(['getSettings']),
    ...mapMutations('user', ['loginStatus']),
    ...mapActions('user', ['getUserInfo']),
    ...mapActions('currency', ['getCurrencyList', 'getCurrencyLogo', 'getCnyPrice', 'getSymbolDigit']),
    async isLogin () {
      this.loginStatus(true)
      try {
        await this.getUserInfo()
      } catch (err) { }
    }
  },
  async onLaunch () {
    // 查看是否有登录有token
    const result = uni.getStorageSync('token')
    if (result) {
      // 有,修改状态获取信息
      this.isLogin()
    }
    this.getSettings()
    this.getCurrencyList()
    this.getCurrencyLogo()
    this.getSymbolDigit()
    this.getCnyPrice()
  },
  onShow: function () {
    ws.connect()
    console.log('App Show');

  },
  onHide: function () {
    ws.close()
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/* 每个页面都能使用的公共css */
// @import './utils/graceUI/graceUI.css';
// @import './utils/graceUI/graceIcons.css';
@import "./assets/style/base"; /* 页面基础样式 */
@import "./assets/font/iconfont"; /* iconfont字体 */
@import "./assets/font/icons"; /* iconfont图标 */
</style>
