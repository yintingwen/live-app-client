<template>
  <view class="demo">
    <view class="title">{{ $t('check.demo.title') }}</view>
    <view class="content">
      <view>
        <view class="num">{{ toFixed(tradeHistoryInfo.lever_balance, 2) }}</view>
        <view>{{ `${$t('check.demo.balance')}USDT` }}</view>
      </view>
      <view>
        <view class="num">{{ toFixed(tradeHistoryInfo.lock_lever_balance, 4) }}</view>
        <view>{{ `${$t('check.demo.user')}USDT` }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tradeHistoryInfo: {
      default() {}
    }
  }
};
</script>

<style lang="scss" scoped>
.demo {
  @include size(694, 176);
  @extend .bgc-primary, .c-white;
  box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(0, 73, 7, 0.35);
  border-top: 1rpx solid #4f5cd1;
  border-radius: 10rpx;
  margin: 0 auto;
  margin-bottom: 52rpx;
  .title {
    @extend .fs-sm;
    margin: 26rpx 0 31rpx 28rpx;
  }
  .content {
    display: flex;
    & > view {
      @extend .fs-md;
      width: 50%;
      height: 131rpx;
      font-size: 18rpx;
      text-align: center;
      .num {
        margin-bottom: 21rpx;
        font-size: 32rpx;
      }
    }
  }
}
</style>