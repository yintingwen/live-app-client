<script setup>
import { onLaunch } from '@dcloudio/uni-app'
import { userSystemStore } from '@stores/system'
import { useUserStore } from '@stores/user'
const system = userSystemStore()
const user = useUserStore()

onLaunch(() => {
  system.getSystemInfo()
  user.getUserInfo()
})
</script>

<style lang="scss">
@import "uview-plus/index.scss";
/*每个页面公共css */
page {
  height: 100%;
  width: 100%;
}
</style>
