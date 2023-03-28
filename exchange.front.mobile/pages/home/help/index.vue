<template>
  <view class="help-page">
    <page-layout>
      <view class="banner">
        <navigator url="/pages/home/help/detail?type=currency" class="item cb">
          <view class="mb-20 fs-xs fw">{{ $t('home.help.coin') }}</view>
          <view class="fs-xxxs c-tip1">{{ $t('home.help.learn') }}</view>
        </navigator>
        <navigator url="/pages/home/help/detail?type=realName" class="item rz">
          <view class="mb-20 fs-xs fw">{{ $t('home.help.authentication') }}</view>
          <view class="fs-xxxs c-tip1">{{ $t('home.help.easy') }}</view>
        </navigator>
      </view>
      <view class="title">{{ $t('home.help.option') }}</view>
      <!-- 如何开户 -->
      <navigator url="/pages/home/help/detail?type=account" class="option">
        <view class="c-tip1">{{ $t('home.help.account') }}</view>
        <view class="d-flex ai-center">
          <view class="c-tip2 fs-xs mr-45">{{ $t('common.view_details') }}</view>
          <c-icon name="right" class="c-tip2"></c-icon>
        </view>
      </navigator>
      <!-- 账户安全设置 -->
      <navigator url="/pages/home/help/detail?type=safety" class="option">
        <view class="c-tip1">{{ $t('home.help.safety') }}</view>
        <view class="d-flex ai-center">
          <view class="c-tip2 fs-xs mr-45">{{ $t('common.view_details') }}</view>
          <c-icon name="right" class="c-tip2"></c-icon>
        </view>
      </navigator>
      <!-- 添加收款账户 -->
      <navigator url="/pages/home/help/detail?type=pay" class="option">
        <view class="c-tip1">{{ $t('home.help.gathering') }}</view>
        <view class="d-flex ai-center">
          <view class="c-tip2 fs-xs mr-45">{{ $t('common.view_details') }}</view>
          <c-icon name="right" class="c-tip2"></c-icon>
        </view>
      </navigator>
      <!-- 什么是法币交易 -->
      <view class="title mt-70">{{ $t('home.help.option') }}</view>
      <navigator url="/pages/home/help/detail?type=legal" class="option">
        <view class="c-tip1">{{ $t('home.help.legal') }}</view>
        <view class="d-flex ai-center">
          <view class="c-tip2 fs-xs mr-45">{{ $t('common.view_details') }}</view>
          <c-icon name="right" class="c-tip2"></c-icon>
        </view>
      </navigator>
      <!-- 什么是合约交易 -->
      <navigator url="/pages/home/help/detail?type=lever" class="option">
        <view class="c-tip1">{{ $t('home.help.lever') }}</view>
        <view class="d-flex ai-center">
          <view class="c-tip2 fs-xs mr-45">{{ $t('common.view_details') }}</view>
          <c-icon name="right" class="c-tip2"></c-icon>
        </view>
      </navigator>
    </page-layout>
  </view>
</template>

<script>
export default {
  data () {
    return {
      pageTitle: 'home.asset.help'
    }
  }
}
</script>

<style lang="scss" scoped>
.help-page {
  padding: 28rpx;
  .banner {
    @extend .flex-between;
    margin-bottom: 43rpx;

    .item {
      width: 332rpx;
      height: 144rpx;
      border-radius: 10rpx;
      box-shadow: 0 3rpx 7rpx rgba(0, 0, 0, 0.1);
      padding: 40rpx 0 0 24rpx;
      box-sizing: border-box;
    }

    .cb {
      background: #fafaff url("/static/image/help/cb.png") 170rpx center/160rpx no-repeat;
    }

    .rz {
      background: #fafaff url("/static/image/help/rz.png") 220rpx center/110rpx no-repeat;
    }
  }

  .title {
    color: #666666;
    font-weight: 600;
    height: 28rpx;
    margin-bottom: 26rpx;
    position: relative;
    padding-left: 44rpx;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 5rpx;
      height: 28rpx;
      background-color: #4f5cd1;
    }
  }

  .option {
    @extend .flex-between;
    height: 78rpx;
  }
}
</style>
