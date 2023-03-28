<template>
  <div class="home-header px-28">
    <view class="app-logo" :style="logoStyle"></view>
    <c-icon @tap="onTapSetting" name="setting-fill" size="35" class="c-primary"></c-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['appLogo']),
    logoStyle () {
      return {
        background: `url(${this.appLogo}) no-repeat center left/auto 100%`,
      }
    }
  },
  methods: {
    onTapSetting () {
      this.router.navigateTo('/pages/mine/system/index')
    }
  }
}
</script>
<style lang='scss' scoped>
.home-header {
  height: 85rpx;
  display: flex;
  align-items: center;

  .app-logo {
    height: 35rpx;
    flex: 1;
  }
}
</style>