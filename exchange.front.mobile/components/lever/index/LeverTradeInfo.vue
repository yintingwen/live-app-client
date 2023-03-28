<template>
  <view class="lever-tradeinfo">
    <view>
      <view>{{ $t('lever.trade.info.marketPrice') }}</view>
      <view>{{ `≈${actionInfo.marketPrice} ${leverStorage.legalName}` }}</view>
    </view>
    <view>
      <view>{{ $t('lever.trade.info.marginPrice') }}</view>
      <view>{{ `≈${actionInfo.marginPrice} ${leverStorage.legalName}` }}</view>
    </view>
    <view>
      <view>{{ $t('lever.trade.info.reservePrice') }}</view>
      <view>{{ `≈${actionInfo.reservePrice} ${leverStorage.legalName}` }}</view>
    </view>
    <view>
      <view>{{ $t('lever.trade.info.balance') }}</view>
      <view>{{ `≈${actionInfo.balance} ${leverStorage.legalName}` }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    actionInfo: {
      default() {}
    },
    leverStorage: {
      default() {}
    }
  }
}
</script>

<style lang="scss" scoped>
.lever-tradeinfo {
  margin-top: 22rpx;
  margin-bottom: 27rpx;
  & > view {
    display: flex;
    justify-content: space-between;
    margin-bottom: 17rpx;
    view {
      @extend .fs-xxs, .c-text;
    }
  }
}
</style>