<template>
  <view class="login-header">
    <slot></slot>
    <view class="title">
      <slot name="title"></slot>
    </view>
    <view v-if="back" class="back" @tap.stop="goBack">
      <c-icon name="left" size="40" color="#fff"></c-icon>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    back: {type: Boolean, default: false}
  },
  data() {
    return {} 
  },
  methods: {
    goBack(){
      uni.navigateBack({})
    }
  }
}
</script>
<style lang='scss' scoped>
.login-header {
  padding-top: var(--status-bar-height);
  height: 282.9rpx;
  width: 100%;
  background: url('../../static/image/bg/login.jpg') 0 0 / cover no-repeat;
  background-origin: padding-box;
  position: relative;
  margin-bottom: 128rpx;

  .title {
    font-weight: 700;
    font-size: 46rpx;
    color: white;
    position: absolute;
    bottom: 53rpx;
    left: 52rpx;
  }
  .back{
    padding: 26rpx;
  }
}
</style>