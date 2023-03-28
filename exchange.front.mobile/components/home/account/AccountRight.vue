<template>
  <view class="account-right">
    <view v-for="right in balance" :key="right.id" class="p-28 bb-g1 right">
      <view class="c-tip2 fs-sm">{{$t('home.account.order_id')}}：{{ right.order_id }}</view>
      <view>{{$t('home.account.currency')}}：{{right.symbol}}</view>
      <view>{{$t('home.account.close')}}：{{right.fact_profits}}</view>
      <view class="c-tip2 fs-sm">{{$t('common.time')}}：{{right.time}}</view>
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
.account-right {
  .right {
    view {
      margin-bottom: 15rpx;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>