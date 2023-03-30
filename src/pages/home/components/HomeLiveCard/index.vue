<template>
  <view class="home-live-card">
    <image class="cover h-100% w-100%" :src="cover"/>
    <!-- {{  }} -->
  </view>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  cover: { type: String, default: '' },
  title: { type: String, default: '' },
  viewNum: { type: [ String, Number ], default: 0 },
})
</script>
<style lang="scss">
.home-live-card {
  width: 356rpx;
  height: 384rpx;
  border-radius: 16rpx;
  background-color: red;
  
  .cover {
    height: 100%;
    width: 100%;
  }
}
</style>