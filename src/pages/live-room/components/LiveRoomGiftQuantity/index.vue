<script setup></script>

<template>
  <view class="live-room-gift-quantity">
    <view class="balance">
      <view class="balance-item">
        <text class="balance-text c-while">钻石：</text>
        <text class="balance-text balance-num">0</text>
      </view>
      <view class="balance-item">
        <text class="balance-text c-while">余额：</text>
        <text class="balance-text balance-num">0.0</text>
      </view>
    </view>
    <view class="recharge-btn">
      <text class="c-while">兑换钻石</text>
    </view>
    <view class="quantity-select">
      赠送
    </view>
  </view>
</template>

<style lang="scss" scoped>
.live-room-gift-quantity {
  padding: 40rpx 24rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .c-while {
    color: #fff;
  }

  .balance {
    .balance-item {
      flex-direction: row;
    }
    .balance-text {
      font-size: 24rpx;
      line-height: 36rpx;
    }
    .balance-num {
      color: #FFE736;
    }
  }

  .recharge-btn {
    width: 130rpx;
    height: 50rpx;
    border-radius: 25rpx;
    background: linear-gradient(to bottom, #8a38e8, #f75ca9);
    box-shadow: 0rpx 2rpx 0rpx 0rpx #762838;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .quantity-select {
    width: 240rpx;
    height: 56rpx;
    border: 2rpx solid #6E64BD;
    border-radius: 25rpx;
  }
}
</style>
