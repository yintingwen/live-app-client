<template>
  <view class="home-live-card overflow-hidden" @tap="emits('tap', $event)">
    <image class="h-100% w-100%" :src="cover" mode="aspectFill"/>
    <view class="position-absolute top-0 left-0 h-100% w-100%">
      <view class="card-label">{{ label }}</view>
      <view class="card-base-info">
        <view class="h-42rpx truncate">{{ title }}</view>
        <view class="flex items-center justify-between">
          <view class="card-area"></view>
          <view class="flex items-center line-1 h-42rpx">
            <view class="num-dot"></view>
            <view>{{ viewNum }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  cover: { type: String, default: '' },
  title: { type: String, default: '' },
  label: { type: String, default: '' },
  viewNum: { type: [ String, Number ], default: 0 },
})
const emits = defineEmits(['tap'])
</script>
<style lang="scss">
.home-live-card {
  width: 356rpx;
  height: 384rpx;
  border-radius: 16rpx;
  position: relative;

  .card-label {
    position: absolute;
    top: 10rpx;
    left: 8rpx;
    background-image: url('~@/static/images/home/card_label.png');
    background-size: 100% 100%;
    padding: 0 42rpx;
    color: #FFFFFF;
    height: 42rpx;
    line-height: 42rpx;
    font-size: 24rpx;
  }

  .card-base-info{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 16rpx 10rpx 22rpx;
    color: #FFFFFF;
    font-size: 28rpx;
    line-height: 42rpx;

    .num-dot {
      height: 42rpx;
      height: 12rpx;
      width: 12rpx;
      background-color: #F7368A;
      margin-right: 6rpx;
      border-radius: 50%;
    }
  }

}
</style>