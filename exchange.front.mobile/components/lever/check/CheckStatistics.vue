<template>
  <view class="statistics">
    <view>
      <view>{{ $t('check.statistics.newWorth') }}</view>
      <view>{{ toFixed(tradeHistoryInfo.net_worth, 2) }}</view>
    </view>
    <view>
      <view>{{ $t('check.statistics.profitLoss') }}</view>
      <view>{{ toFixed(tradeHistoryInfo.profitloss, 2) }}</view>
    </view>
    <view>
      <view>{{ $t('check.statistics.riskRate') }}</view>
      <view>{{ toFixed(tradeHistoryInfo.riskrate, 2) }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tradeHistoryInfo: {
      default() {}
    }
  },
};
</script>

<style lang="scss" scoped>
.statistics {
  display: flex;
  padding: 0 46rpx;
  margin-bottom: 30rpx;
  & > view {
    @extend .fs-lg;
    flex: 1;
    text-align: center;
    view:first-child {
      margin-bottom: 23rpx;
    }
  }
}
</style>