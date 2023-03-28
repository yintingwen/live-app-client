<template>
  <view class="asset-detail">
    <view v-for="asset in balance" :key="asset.id" class="item">
      <view class="f-1">{{ asset.currency_name }}</view>
      <view class="f-1">{{ toFixed(asset.legal_balance, 4) }}</view>
      <view class="f-1">{{ toFixed(asset.lock_legal_balance, 4) }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    balance: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.asset-detail {
  .item {
    display: flex;
    height: 74rpx;
    line-height: 74rpx;
    text-align: center;
    border-top: 1rpx solid #e2e2e2;

    &:first-child {
      border: none;
    }
  }
}
</style>