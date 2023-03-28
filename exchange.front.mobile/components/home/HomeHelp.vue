<template>
  <view class="home-help px-28">
    <navigator url="/pages/home/help/index">
      <view class="fs-md fw mb-20">{{ $t('home.asset.help') }}</view>
      <view class="fs-xs c-tip2">{{ $t('home.help.easy') }}</view>
    </navigator>
    <view>
      <navigator
        url="/pages/mine/management/chargeCoin"
        class="ta-center flex-center fs-xs"
      >{{ $t('home.asset.recharge') }}</navigator>
      <navigator
        url="/pages/mine/management/mentionCoin/index"
        class="ta-center flex-center fs-xs"
      >{{ $t('home.asset.extract') }}</navigator>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
.home-help {
  display: flex;
  justify-content: space-between;

  > navigator,
  > view {
    height: 154rpx;
  }

  > navigator {
    width: 400rpx;
    border-radius: 6rpx;
    background: #fff url("/static/image/bg/home@help.png") no-repeat 268rpx 30rpx / 101rpx 91rpx;
    padding: 35rpx 0 0 25rpx;
    box-sizing: border-box;
  }

  > view {
    width: 283rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > navigator {
      width: 100%;
      height: 72rpx;
      background-color: #fff;
      border-radius: 6rpx;
      background: #fff url("/static/image/bg/home@coin.png") no-repeat 0 0 / 100% 100%;
    }
  }
}
</style>