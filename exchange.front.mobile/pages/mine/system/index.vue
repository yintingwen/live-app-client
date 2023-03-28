<template>
  <view class="system-page">
    <page-layout>
      <navigator url="/pages/mine/system/language" class="system-item">
        <view>{{ $t('mine.system.lang') }}</view>
        <view>{{ $t(`language.${lang}`) }}</view>
      </navigator>
    </page-layout>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      pageTitle: 'mine.system.title'
    }
  },
  computed: {
    ...mapState(['lang'])
  }
}
</script>

<style lang="scss" scoped>
.system-page {
  padding: 0 28rpx;
  .system-item {
    @extend .bb-g0, .flex-between;
    height: 74rpx;
  }
}
</style>
 