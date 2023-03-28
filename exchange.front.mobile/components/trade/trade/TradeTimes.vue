<template>
  <view class="trade-times">
    <view>杠杆倍数</view>
    <view class="times-num" v-for="(item, index) in timesData" :key="index">{{ `${item}X` }}</view>
  </view>
</template>

<script>
export default {
  props: {
    timesData: {
      type: Array,
      default() {}
    }
  }
}
</script>

<style lang="scss" scoped>
.trade-times {
  @extend .bd-b;
  display: flex;
  justify-content: left;
  .times-num {
    @extend .bd;
    @include size(72, 36, '%');
    text-align: center;
    line-height: 36rpx;
  }
}
</style>