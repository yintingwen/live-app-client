<script setup>
import { onLaunch } from '@dcloudio/uni-app'
import { useSystemStore } from '@stores/system'
import { useUserStore } from '@stores/user'
const system = useSystemStore()
const user = useUserStore()

onLaunch(() => {
  system.getSystemInfo()
  if (user.userIsLogin) {
    user.getUserInfo()
  } else {
    uni.reLaunch({ url: '/pages/login/login' })
  }
})
</script>

<style lang="scss">
@import "uview-plus/index.scss";
@import "~@/styles/utils.scss";
/*每个页面公共css */
page {
  height: 100%;
  width: 100%;
}
</style>
