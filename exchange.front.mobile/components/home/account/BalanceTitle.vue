<template>
  <view class="home-account-balance-title">
    <view class="icon"></view>
    {{ $t(`home.account.${['legal', 'coin'].includes(this.type) ? 'asset_details' : 'account_rights'}`) }}
  </view>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    type: String
  }
}
</script>
<style lang='scss' scoped>
.home-account-balance-title {
  height: 74rpx;
  background-color: #f4f4f4;
  padding-left: 28rpx;
  display: flex;
  align-items: center;
  color: #333;
  .icon {
    width: 5rpx;
    height: 28rpx;
    background-color: #4f5cd1;
    margin-right: 39rpx;
  }
}
</style>