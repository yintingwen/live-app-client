<template>
  <view class="co-vip-level">
    <image class="level-icon" src="/static/images/common/vip_level.png" />
    <view class="level-num">
      {{ level }}
    </view>
  </view>
</template>
<script setup>
defineProps({
  level: { type: Number, default: 0 },
})
</script>
<style lang="scss">
.co-vip-level {
  position: relative;
  left: 12rpx;
  height: 42rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 12rpx;

  .level-icon {
    position: absolute;
    height: 42rpx;
    width: 42rpx;
    left: -10rpx;
    z-index: 1;
  }

  .level-num {
    height: 26rpx;
    line-height: 26rpx;
    background-color: #1e6ff5;
    border-radius: 13rpx;
    padding-left: 40rpx;
    padding-right: 20rpx;
    font-size: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    .level-text {
      background-color: red;
      text-align: center;
    }
  }
}
</style>
